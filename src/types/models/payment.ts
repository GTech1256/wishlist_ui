import { PaymentCategoryId } from "types/enums/payment";

export interface PaymentCategory {
  num: number;
  name: string;
  categoryId: PaymentCategoryId;
  subCategories?: PaymentSubCategory[];
}

export interface PaymentSubCategory {
  num: number;
  name: string;
  categoryId: string;
  favorite: boolean;
  parentCategoryId: PaymentCategoryId;
  minPaymentAmount?: number;
  maxPaymentAmount?: number;
}

export interface PaymentTransaction {
  num: number;
  category: PaymentCategoryId;
  subCategory: string;
  date: string;
  amount: number;
}

export interface PaymentUtilityCheckResponse {
  subscriberCode: string;
  subscriberName: string;
  status: string;
  debt: number;
  locationRef?: string;
}
