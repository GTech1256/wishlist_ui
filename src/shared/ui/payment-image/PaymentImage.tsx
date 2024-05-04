// import React from "react";
// import { CARD_PAYMENT } from "../../../entities/card";
import styles from "./PaymentImage.module.scss";

// import { t } from "../translation/translation";
// import { PaymentSystemType } from "../../../types/models";
import clsx from "clsx";
import Box from "../box";
import { Color } from "../../../types/interfaces/styles";

type Props = {
  payment?: { icon: string };
  inline?: boolean;
  color?: Color;
};

export const PaymentImage = (props: Props) => {
  const { payment, inline, color } = props;
  const cardPayment = payment // && CARD_PAYMENT[payment];
  const IconPayment = cardPayment?.icon;

  return (
    <div className={clsx(styles.img_wrap, { [styles.inline]: inline })}>
      {IconPayment && (
        <Box color={color} className={styles.img}>
          <IconPayment />
        </Box>
      )}
    </div>
  );
};
