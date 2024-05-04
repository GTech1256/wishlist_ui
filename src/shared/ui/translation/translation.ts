import { Language, User } from "../../../types/models/user";
import { Translation, TRANSLATION_RESOURCES } from "../../config/translation";
import environment from "../../config/environment";

export const translation = ({
  language = environment.LANGUAGE,
  message,
  i18nKey,
}: {
  language?: Language;
  message?: string | keyof Translation;
  i18nKey?: keyof Translation;
}): string => {
  if (!message || language === Language.RU) {
    return message || "";
  }

  const resources = TRANSLATION_RESOURCES[language];

  return ((i18nKey && resources[i18nKey]) ||
    resources?.[(message || "") as keyof Translation] ||
    message ||
    "") as string;
};

export const t = (message: string, i18nKey?: keyof Translation) => translation({ message, i18nKey });
