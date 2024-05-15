import { Env } from "types/enums/env";
import { Environment } from "types/interfaces/environment";
import { Language } from "types/models";
import packageInfo from "../../../package.json";
// console.log(import.meta.env)
const env: Env = (import.meta.env.MODE as Env) || Env.Prod;

const ENVIRONMENT: { [key in Env]: Partial<Environment> } = {
  [Env.Dev]: {
    ENV: Env.Dev,
  },
  [Env.Prod]: {
    ENV: Env.Prod,
  },
};

const initDataLanguage = Language.RU;
// let telegramId = 0;

// try {
//   const userJsonString = new URLSearchParams(Telegram.WebApp.initData).get("user");
//   const user = JSON.parse(userJsonString || "");
//   initDataLanguage = user.language_code.trim().toUpperCase() || Language.RU;
//   telegramId = user.id;
// } catch (e) {
//   console.error(e);
// }

// console.log({ env }, ENVIRONMENT[env], import.meta.env)

export const environment: Environment = {
  ENV: Env.Prod,
  VERSION: packageInfo?.version,
  API_URL: import.meta.env.PUBLIC_URL + "/api/",
  PUBLIC_URL: import.meta.env.PUBLIC_URL,
  BASENAME: import.meta.env.PUBLIC_URL,
  LANGUAGE: initDataLanguage,
  // GOOGLE_MAPS_API_KEY: "AIzaSyCWT5xNWbh7tB4hilJgiYCiinR8FOqe3l8",
  SENTRY_DSN: null,
  TELEGRAM_ID: 0,
  ...ENVIRONMENT[env],
};

export default environment;
