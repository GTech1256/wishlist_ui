import { TestContext, TestFunction, TestConfig } from "yup/lib/util/createValidation";
import {
  getAccountNumberCurrency,
  getTransferCurrency,
  isAccountNumber,
  isCardNumber,
} from "../../../entities/transfer/helper";
import { TransferFormSchema, TransferFormSubType, TransferFormType } from "../../../widgets/transfer-form";
import { AvailableAccountType, PaymentSubCategory } from "../../../types/models";
import { Currency } from "types/enums/currency";
import { TestTransferContext } from "types/interfaces/validation";
import { AnyPayIdAliasType } from "entities/transfer/lib/types";
import { PIN_MAX_LENGTH } from "./config";

export const validationAccount: TestFunction<string | undefined> = function (
  this,
  value,
  context: TestContext<TestTransferContext>
) {
  if (!value) {
    return true;
  }

  if (value.length < 16 || (value.length === 16 && !isCardNumber(value))) {
    return this.createError({ message: { key: "card", values: { value } }, type: "card" });
  } else if ((value.length > 16 && value.length !== 28) || (value.length === 28 && !isAccountNumber(value))) {
    return this.createError({ message: { key: "account", values: { value } }, type: "account" });
  } else if (isAccountNumber(value)) {
    const currency = getAccountNumberCurrency(value);
    const cards = context.options.context?.cards || [];
    if (
      !cards.some((card) => {
        const isRussianCardCurrency = card.currency === Currency.RUB || card.currency === Currency.RUR;
        const cardCurrencies = isRussianCardCurrency ? [Currency.RUB, Currency.RUR] : [card.currency];
        return cardCurrencies.includes(currency);
      })
    ) {
      const key = `${currency?.toLocaleLowerCase()}NotAvailable`;
      return this.createError({ message: { key, values: { value } }, type: key });
    }
  }

  return true;
};

export const validationTransferCurrency: TestFunction<TransferFormSchema> = function (this, value, context) {
  const type = value?.type;
  const from = value?.from;
  const to = value?.to?.self;
  const toAnother = value?.to?.anotherCard;
  if (!from?.currency || (!to?.currency && !toAnother)) {
    return true;
  }

  if (type === TransferFormType.Self) {
    if (from.currency !== to?.currency) {
      return this.createError({
        message: { key: "currency", values: { currency: getTransferCurrency(from.currency) } },
        type: "currency",
        path: "toSelf",
      });
    }
  } else {
    const currency = getAccountNumberCurrency(toAnother);

    if (currency && from.currency !== currency) {
      return this.createError({
        message: { key: "currency", values: { currency: getTransferCurrency(from.currency) } },
        type: "currency",
        path: "toAnother",
      });
    }
  }

  return true;
};

export const validationAnotherAnyPayValue = function (aliasType: AnyPayIdAliasType): TestFunction<string | undefined> {
  switch (aliasType) {
    case AnyPayIdAliasType.PIN:
      return validationAnotherAnyPayValuePIN;

    case AnyPayIdAliasType.TIN:
      return validationAnotherAnyPayValueTIN;

    case AnyPayIdAliasType.MOBILE:
      return validationAnotherAnyPayValueMOBILE;

    case AnyPayIdAliasType.EMAIL:
      return validationAnotherAnyPayValueEmail;

    default:
      return () => true;
  }
};

export const validationAnotherAnyPayValueEmail: TestFunction<string | undefined> = function (this, value, context) {
  value = value ?? "";
  const error = this.createError({
    message: { key: "EMAIL" },
  });

  // Проверка наличия '@' и '.'
  if (value.indexOf("@") === -1 || value.indexOf(".") === -1) {
    return error;
  }

  // Проверка максимальной длины
  if (value.length > 100) {
    return error;
  }

  // Проверка на допустимые символы
  const validCharsRegex = /^[A-Z0-9!#%/,.\-'_]+$/;
  if (!validCharsRegex.test(value)) {
    return error;
  }

  return true;
};

export const validationAnotherAnyPayValuePIN: TestFunction<string | undefined> = function (this, value, context) {
  value = value ?? "";
  const error = this.createError({
    message: { key: "PIN" },
  });

  // Проверка длины строки от 5 до 7 символов
  if (value.length < 5 || value.length > PIN_MAX_LENGTH) {
    return error;
  }

  // Проверка на допустимые символы (цифры и латинские символы в верхнем регистре)
  const validCharsRegex = /^[A-Z0-9]+$/;
  if (!validCharsRegex.test(value)) {
    return error;
  }

  return true;
};

export const validationAnotherAnyPayValueTIN: TestFunction<string | undefined> = function (this, value, context) {
  value = value ?? "";
  const error = this.createError({
    message: { key: "TIN" },
  });

  // Проверка длины строки - ровно 10 символов
  if (value.length !== 10) {
    return error;
  }

  // Проверка на допустимые символы (только цифры)
  const validDigitsRegex = /^[0-9]+$/;
  if (!validDigitsRegex.test(value)) {
    return error;
  }

  return true;
};

export const validationAnotherAnyPayValueMOBILE: TestFunction<string | undefined> = function (this, value, context) {
  value = value ?? "";

  // Проверка +994 (ХХ) ХХХ ХХ ХХ, где: +994 – постоянно по умолчанию
  // Все остальное – свободный ввод цифр
  const phone = value?.replace(/\D/g, "");
  if (!/^994\d{9}/.test(phone)) {
    return this.createError({
      message: { key: "typeError" },
    });
  }

  return true;
};

export const validationAmount: TestConfig = {
  test: function (this, value = 0) {
    if (Number(value) <= 0) {
      return this.createError({
        message: { key: "amountMin" },
        type: "amountMin",
        path: "amount",
      });
    }

    return true;
  },
};

export const validationAmountLimit: TestFunction<TransferFormSchema> = function (
  this,
  value,
  context: TestContext<TestTransferContext>
) {
  const commission = context.options.context?.commission || 0;
  const from = value?.from;
  const fromAmount = from?.amount || 0;
  const amount = value?.amount;
  if (!from?.id || !amount) {
    return true;
  }

  if (fromAmount < amount + commission) {
    return this.createError({
      message: { key: "amountLimit", values: { limit: fromAmount } },
      type: "amountLimit",
      path: "amount",
    });
  }

  return true;
};

// С кредитной карты возможен перевод только на карту (свою или чужую)
export const validationCreditCard: TestFunction<TransferFormSchema> = function (this, value, context) {
  const type = value?.type;
  const from = value?.from;

  if (!from?.isCreditCard) {
    return true;
  }

  const error = this.createError({
    message: { key: "creditCard" },
    type: "creditCard",
    path: "from",
  });

  if (type === TransferFormType.Self && value.to?.self?.type === AvailableAccountType.A) {
    return error;
  }

  if (type === TransferFormType.Another && value.subType !== TransferFormSubType.Card) {
    return error;
  }

  return true;
};

export const validationAnotherTransferOnlyMonat: TestFunction<TransferFormSchema> = function (this, value, context) {
  if (value.from?.currency && value.type === TransferFormType.Another && value.from.currency !== Currency.AZN) {
    return this.createError({
      message: { key: "anotherTransferInMonatCurrency" },
      type: "anotherTransferInMonatCurrency",
      path: "from",
    });
  }

  return true;
};

export const validationPhone: TestFunction<any> = function (this, value, context) {
  const phone = value?.replace(/\D/g, "");
  if (!/^994(10|50|51|55|70|77|99)\d{7}/.test(phone)) {
    return this.createError({
      message: { key: "typeError" },
      type: "typeError",
      path: "phone",
    });
  }
  const str = phone.slice(5, 12);
  let r = true;
  for (let i = 0; i < str.length; i++) {
    if (r) {
      r = str[i] === str[0];
    }
  }
  if (r) {
    return this.createError({
      message: { key: "typeError" },
      type: "typeError",
      path: "phone",
    });
  }

  return true;
};

export const validationSalary: TestFunction<any> = function (this, value, context) {
  const salaryNumber = Number(value);
  if (salaryNumber < 315) {
    return this.createError({
      message: { key: "minSalary", values: { sum: 315 } },
      type: "minSalary",
      path: "salary",
    });
  }
  if (salaryNumber > 40000) {
    return this.createError({
      message: { key: "maxSalary", values: { sum: "40 000" } },
      type: "maxSalary",
      path: "salary",
    });
  }

  return true;
};

export const validationAdditionalIncome: TestFunction<any> = function (this, value, context: any) {
  if (!context?.options?.parent?.isExistAdditionalIncome) {
    return true;
  }
  const salaryNumber = Number(value);
  if (salaryNumber < 40) {
    return this.createError({
      message: { key: "minSalary", values: { sum: 40 } },
      type: "minSalary",
      path: "additionalIncome",
    });
  }
  if (salaryNumber > 10000) {
    return this.createError({
      message: { key: "maxSalary", values: { sum: "10 000" } },
      type: "maxSalary",
      path: "additionalIncome",
    });
  }

  return true;
};

export const validationPaymentAccount: TestFunction<any> = function (this, value) {
  if (value?.account?.amount === undefined) {
    return this.createError({
      message: { key: "typeError" },
      type: "typeError",
      path: "account",
    });
  }

  if ((value?.account?.amount || 0) < value.amount) {
    return this.createError({
      message: { key: "insufficientFunds" },
      type: "insufficientFunds",
      path: "amount",
    });
  }

  return true;
};

export const validationPaymentAmount: TestFunction<any> = function (this, value) {
  const amount = value?.amount || 0;
  if (value?.minPaymentAmount && amount < value?.minPaymentAmount) {
    return this.createError({
      message: { key: "paymentAmount", values: { min: value?.minPaymentAmount, max: value?.maxPaymentAmount } },
      type: "paymentAmount",
      path: "amount",
    });
  }
  if (value?.maxPaymentAmount && amount > value?.maxPaymentAmount) {
    return this.createError({
      message: { key: "paymentAmount", values: { min: value?.minPaymentAmount, max: value?.maxPaymentAmount } },
      type: "paymentAmount",
      path: "amount",
    });
  }

  return true;
};

export const validationSubscriberCode: TestFunction<any> = function (this, value: any, context: any) {
  const subCategory: PaymentSubCategory = context.options.context?.subCategory;
  const length = value?.length || 0;
  if (subCategory.categoryId === "AZERISHIQ") {
    if (length < 11 || length > 15) {
      return this.createError({
        message: { key: "typeError" },
        type: "typeError",
        path: "subscriberCode",
      });
    }
  }
  if (subCategory.categoryId === "AZERSU") {
    if (length < 1 || length > 13) {
      return this.createError({
        message: { key: "typeError" },
        type: "typeError",
        path: "subscriberCode",
      });
    }
  }
  if (subCategory.categoryId === "AZERIQAZ") {
    if (length < 1 || length > 15) {
      return this.createError({
        message: { key: "typeError" },
        type: "typeError",
        path: "subscriberCode",
      });
    }
  }

  return true;
};
