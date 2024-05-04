import { Env } from "../enums/env";
import { Language } from "../models/user";

export interface Environment {
  VERSION: string;
  ENV: Env;
  API_URL: string;
  PUBLIC_URL: string;
  BASENAME: string;
  // GOOGLE_MAPS_API_KEY: string;
  LANGUAGE: Language;
  SENTRY_DSN: string | null;
  TELEGRAM_ID: number;
}
