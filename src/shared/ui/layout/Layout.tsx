import clsx from "clsx";
import BackButton from "features/back-button/BackButton";
import CloseButton from "features/close-button/CloseButton";
import React, { PropsWithChildren, ReactNode, useEffect, useMemo, useState } from "react";
import Box from "shared/ui/box";
import styles from "shared/ui/layout/Layout.module.scss";
import Logo from "shared/ui/logo/Logo";
import Title from "shared/ui/title";

interface OwnProps {
  logo?: boolean;
  title?: string | ReactNode;
  buttons?: ReactNode | ReactNode[];
  backButtonRoute?: string;
  backButtonOnRoute?: (data?: any) => void;
  closeButton?: boolean;
  fullContent?: boolean;
  isSetOverlay?: boolean;
}

type Props = OwnProps;

const Layout = (props: PropsWithChildren<Props>) => {
  const {
    logo,
    title,
    backButtonRoute,
    backButtonOnRoute,
    closeButton,
    buttons: extraButtons,
    children,
    fullContent,
    isSetOverlay,
  } = props;
  const prepareButtons = useMemo(() => {
    const buttons = React.Children.toArray(extraButtons);

    if (backButtonRoute || backButtonOnRoute) {
      buttons.push(<BackButton route={backButtonRoute} onRoute={backButtonOnRoute} />);
    }

    if (closeButton) {
      buttons.push(<CloseButton />);
    }

    return buttons;
  }, [extraButtons, backButtonRoute, backButtonOnRoute, closeButton]);
  const [buttons, setButtons] = useState<ReactNode[]>(prepareButtons);

  useEffect(() => {
    setButtons(prepareButtons);
  }, [prepareButtons]);

  return (
    <Box className={clsx(styles.layer, { [styles.layer__isSetOverlay]: isSetOverlay })}>
      <Box className={clsx(styles.header)}>
        {logo && (
          <Box mb={16}>
            <Logo />
          </Box>
        )}
        {title && (
          <Title weight={"bold"} level={3} mb={12} className={clsx(styles.title)}>
            {title}
          </Title>
        )}
      </Box>
      <Box className={clsx(styles.content, { [styles.full]: fullContent })}>{children}</Box>
      {!!buttons?.length && !isSetOverlay && (
        <Box mt={28} className={clsx(styles.buttons)}>
          {buttons.map((button, index) => (
            <Box key={index} mt={index !== 0 ? 8 : 0}>
              {button}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Layout;
