export enum PaymentCategoryId {
  MOBILE = "MOBILE",
  UTILITY = "UTILITY",
}

export enum DateRange {
  recent = "recent",
  last_week = "last_week",
  last_month = "last_month",
  last_three_month = "last_three_month",
}

export const paymentCategoryName: Record<PaymentCategoryId, string> = {
  [PaymentCategoryId.MOBILE]: "Мобильные операторы",
  [PaymentCategoryId.UTILITY]: "Коммунальные",
};
