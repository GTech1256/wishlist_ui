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
import { DepositDepositInfo } from "./depositDepositInfo";

/**
 * Вклад клиента
 */
export interface Deposit {
  /**
   * ID вклада
   */
  id: number;
  depositInfo?: DepositDepositInfo;
}
