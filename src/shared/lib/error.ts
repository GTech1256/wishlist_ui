import { INPUT_ERRORS } from "../config/inputErrors";
import { t } from "../ui/translation/translation";

export const prepareInputError = ({
  key,
  values,
}: {
  key: keyof typeof INPUT_ERRORS;
  values?: { [key: string]: string | number };
}) => {
  let result: string = INPUT_ERRORS[key];
  result = t(result);

  if (values) {
    Object.entries(values).forEach(([param, value]) => {
      result = result.replaceAll(`{{${param}}}`, value.toString());
    });
  }

  return result;
};
