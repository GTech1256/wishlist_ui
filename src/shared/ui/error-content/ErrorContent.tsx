import { ReactNode } from "react";
import Box from "shared/ui/box";
import Title from "shared/ui/title";
import styles from "./ErrorContent.module.scss";
import { useTranslation } from "../translation/useTranslation";

interface OwnProps {
  text?: string | null | ReactNode;
}

type Props = OwnProps;

const ErrorContent = (props: Props) => {
  const t = useTranslation();
  const { text = t("К сожалению, на данный момент не удалось выполнить операцию. Пожалуйста, попробуй позднее.") } =
    props;

  const renderText = () => {
    if (typeof text === "string") {
      return <span dangerouslySetInnerHTML={{ __html: text || "" }}></span>;
    }

    return text;
  };

  return (
    <Box className={styles.error}>
      <Title weight={"bold"} caption level={3}>
        {renderText()}
      </Title>
    </Box>
  );
};

export default ErrorContent;
