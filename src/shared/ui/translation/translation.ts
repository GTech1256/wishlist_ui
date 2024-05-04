/* eslint-disable no-empty-pattern */
// import { Language } from "../../../types/models/user";
// import { Translation, TRANSLATION_RESOURCES } from "../../config/translation";
// import environment from "../../config/environment";

type T = {
  // language?: Language;
  // message?: string | keyof Translation;
  // i18nKey?: keyof Translation;
}

export const translation = ({
  // language = environment.LANGUAGE,
  // message,
  // i18nKey,
}: T): string => {
  // if (!message || language === Language.RU) {
  //   return message || "";
  // }

  // const resources = TRANSLATION_RESOURCES[language];

  return ""

  // return ((i18nKey && resources[i18nKey]) ||
  //   resources?.[(message || "") as keyof Translation] ||
  //   message ||
  //   "") as string;
};

type Translation = {
  en: string
}

export const t = (message: string, i18nKey?: keyof Translation) => translation({ message, i18nKey });
