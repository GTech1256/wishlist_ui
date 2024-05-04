import { ReactNode } from "react";
import Box from "shared/ui/box";
import Button from "shared/ui/button/Button";
import Title from "shared/ui/title";
import styles from "./EmptyList.module.scss";
import { useTranslation } from "../translation/useTranslation";
import Span from "../span";

interface OwnProps {
  text?: string | ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
}

type Props = OwnProps;

const EmptyList = (props: Props) => {
  const t = useTranslation();
  const {
    text = t("К сожалению, на текущий момент ты не имеешь данный вид продукта", "empty"),
    buttonText,
    onButtonClick,
  } = props;

  const renderText = () => {
    if (typeof text === "string") {
      return <span dangerouslySetInnerHTML={{ __html: text }}></span>;
    }

    return text;
  };

  return (
    <Box className={styles.empty}>
      <Box align={"center"}>
        <Title weight={"bold"} caption level={3}>
          {renderText()}
        </Title>
      </Box>
      {buttonText && (
        <Box mt={16}>
          <Button block type="primary" onClick={onButtonClick}>
            <Span weight="bold">{buttonText}</Span>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EmptyList;
