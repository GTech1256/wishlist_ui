/**
 * Telegram adapter vtb - HTTP API
 * API vtb-bot-telegram-adapter
 *
 * OpenAPI spec version: 1.0
 * Contact: support@seven.tech
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { Currency } from "../enums/currency";
import { PaymentSystemType } from "./cardCardInfo";

/**
 * Счет/карта клиента
 */
export interface AvailableAccount {
  /**
   * Id счета или карты
   */
  id?: number;
  /**
   * Номер счета или PAN карты
   */
  number?: string;
  /**
   * Тип счета: A - счет, C - карта
   */
  type?: AvailableAccountType;
  /**
   * Наименование продукта, только для карт
   */
  productName?: string;
  /**
   * Платежная система
   */
  paymentSystemType?: PaymentSystemType;
  /**
   * Признак кредитной карты, только для карт
   */
  isCreditCard?: boolean;
  /**
   * Остаток на счете
   */
  amount?: number;
  /**
   * Тип валюты
   */
  currency?: Currency;
}

export enum AvailableAccountType {
  A = "A",
  C = "C",
}