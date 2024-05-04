import { useEffect, useState } from "react";
import { useAppSelector } from "./store";
import { selectUserLanguage } from "../../entities/user/model";
import environment from "../../shared/config/environment";
import moment from "moment/moment";
import "moment/locale/ru";
import "moment/locale/az";
import { User, Language } from "../../types/models/user";

interface OwnProps {}

type Props = OwnProps;

export const useMomentLocale = () => {
  const language = useAppSelector(selectUserLanguage);
  const [locale, setLocale] = useState(moment.locale());

  useEffect(() => {
    if (environment.LANGUAGE === Language.EN) {
      moment.lang("en");
      // moment.locale('en');
    } else if (environment.LANGUAGE === Language.AZ) {
      moment.lang("az");
      // moment.locale('az');
    } else if (environment.LANGUAGE === Language.RU) {
      moment.lang("ru");
      // moment.locale('ru');
    }
    setLocale(moment.locale());
  }, [language]);

  return locale;
};
