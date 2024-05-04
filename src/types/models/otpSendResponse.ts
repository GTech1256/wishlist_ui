import { OtpCheckErrorCode } from "types/enums/otp";

export interface OtpCheckResponse {
  sendSmsCodeCount: number;
  errorCode: OtpCheckErrorCode;
  errorText: string;
}

export interface OtpSendResponse {
  sessionId: string;
  sendSmsCodeCount: number;
}
