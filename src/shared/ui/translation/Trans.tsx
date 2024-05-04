import { PropsWithChildren } from "react";
import { useTranslation } from "./useTranslation";
// import { Translation } from "../../config/translation";


type Translation = {
  en: string
}

interface OwnProps {
  i18nKey?: keyof Translation;
}

type Props = OwnProps;

const Trans = (props: PropsWithChildren<Props>) => {
  const { children, i18nKey } = props;
  const t = useTranslation();

  if (!i18nKey && !children) {
    return null;
  }

  return <>{t(children?.toString() || "", i18nKey)}</>;
};

export default Trans;
