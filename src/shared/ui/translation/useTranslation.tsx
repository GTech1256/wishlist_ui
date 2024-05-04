import React, { ReactNode } from "react";
import { translation } from "./translation";
import { useAppSelector } from "../../../app/hooks/store";
import { selectUserLanguage } from "../../../entities/user/model";
import { Translation } from "../../config/translation";

export function useTranslation() {
  const language = useAppSelector(selectUserLanguage);

  return (message?: string, i18nKey?: keyof Translation): string =>
    translation({
      language,
      message,
      i18nKey,
    });
}
