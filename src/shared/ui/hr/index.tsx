import classNames, { ClassValue } from "clsx";
import React, { PropsWithChildren } from "react";
import { Typography } from "types/interfaces/typography";
import { getTypographyClassNames } from "../../lib/classNames";
import styles from "./styles.module.scss";

interface OwnProps extends Partial<Typography> {
  className?: ClassValue;
  id?: string;
}

type Props = OwnProps;

const Hr = (props: PropsWithChildren<Props>) => {
  const { className, id, children, bg = "dark", ...typography } = props;

  return <hr id={id} className={classNames(className, getTypographyClassNames({ bg, ...typography }), styles.hr)} />;
};

export default Hr;
