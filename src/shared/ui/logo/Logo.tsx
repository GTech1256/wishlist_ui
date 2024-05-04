import React from "react";
import logo from "shared/assets/images/logo_en.svg";
import logoWhite from "shared/assets/images/logo_en_white.svg";
import Box from "shared/ui/box";
import Row from "shared/ui/row";
import { useTelegram } from "../../../app/hooks/telegram";

interface OwnProps {}

type Props = OwnProps;

const Logo = (props: Props) => {
  const { isDark } = useTelegram();

  return (
    <header>
      <Box>
        <Row justify={"center"}>
          <img width={70} src={isDark ? logoWhite : logo} alt="ВТБ" />
        </Row>
      </Box>
    </header>
  );
};

export default Logo;
