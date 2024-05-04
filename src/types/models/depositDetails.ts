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
import { DepositDetailsDepositDetail } from "./depositDetailsDepositDetail";
import { DepositDetailsDepositInfo } from "./depositDetailsDepositInfo";

/**
 * Детали вклада клиента
 */
export interface DepositDetails {
  /**
   * ID вклада
   */
  id: number;
  depositInfo?: DepositDetailsDepositInfo;
  depositDetail?: DepositDetailsDepositDetail;
}
