import { PropsWithChildren, useEffect } from "react";
import Box from "shared/ui/box";
import styles from "./OverlayPage.module.scss";
import { useAppDispatch } from "app/hooks/store";
import { appActions } from "entities/app";

interface OwnProps {
  open?: boolean;
}

type Props = OwnProps;

const OverlayPage = (props: PropsWithChildren<Props>) => {
  const { open, children } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appActions.setIsSetOverlay(Boolean(open)));
  }, [open]);

  if (!open) {
    return null;
  }

  return <Box className={styles.overlay}>{children}</Box>;
};

export default OverlayPage;
