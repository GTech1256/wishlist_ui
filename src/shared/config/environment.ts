import { Env } from "types/enums/env";
import { Environment } from "types/interfaces/environment";
import { Language } from "types/models";
import packageInfo from "../../../package.json";

const env: Env = (process.env.REACT_APP_ENV as Env) || Env.Prod;

const ENVIRONMENT: { [key in Env]: Partial<Environment> } = {
  [Env.Local]: {
    ENV: Env.Local,
    // Быстрый переход на Qa
    // API_URL: process.env.PUBLIC_URL + "/qa/api",
    // Back
    // API_URL: "https://ext.dev.seven.tech/vtb-bot/api/",
  },
  [Env.Dev]: {
    ENV: Env.Dev,
  },
  [Env.Qa]: {
    ENV: Env.Qa,
  },
  [Env.Prod]: {
    ENV: Env.Prod,
  },
};

let initDataLanguage = Language.RU;
let telegramId = 0;

try {
  const userJsonString = new URLSearchParams(Telegram.WebApp.initData).get("user");
  const user = JSON.parse(userJsonString || "");
  initDataLanguage = user.language_code.trim().toUpperCase() || Language.RU;
  telegramId = user.id;
} catch (e) {
  console.error(e);
}

export const environment: Environment = {
  ENV: Env.Prod,
  VERSION: packageInfo?.version,
  API_URL: process.env.PUBLIC_URL + "/api/",
  PUBLIC_URL: process.env.PUBLIC_URL,
  BASENAME: process.env.PUBLIC_URL,
  LANGUAGE: initDataLanguage,
  // GOOGLE_MAPS_API_KEY: "AIzaSyCWT5xNWbh7tB4hilJgiYCiinR8FOqe3l8",
  SENTRY_DSN: null,
  TELEGRAM_ID: telegramId,
  ...ENVIRONMENT[env],
};

export default environment;
