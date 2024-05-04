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

export interface CreateTransferResponseIpsDetails {
  /**
   * Получатель перевода: ФИО физического лица или наименование
   */
  toName?: string;
  /**
   * ИНН юрлица получателя
   */
  toTin?: string;
  /**
   * Тип алиаса
   */
  aliasType?: CreateTransferResponseIpsDetails.AliasTypeEnum;
  /**
   * Значение алиаса
   */
  aliasValue?: string;
}
export namespace CreateTransferResponseIpsDetails {
  export type AliasTypeEnum = "TIN" | "PIN" | "MOBILE" | "EMAIL";
  export const AliasTypeEnum = {
    TIN: "TIN" as AliasTypeEnum,
    PIN: "PIN" as AliasTypeEnum,
    MOBILE: "MOBILE" as AliasTypeEnum,
    EMAIL: "EMAIL" as AliasTypeEnum,
  };
}
