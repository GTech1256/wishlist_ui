import classNames, { ClassValue } from "clsx";
import { PropsWithChildren } from "react";
import { Size } from "types/interfaces/styles";
import { Typography } from "types/interfaces/typography";
import { getTypographyClassNames } from "../../lib/classNames";
import styles from "./styles.module.scss";

interface OwnProps extends Partial<Typography> {
  className?: ClassValue;
  size?: Size;
  id?: string;
}

type Props = OwnProps;

const Paragraph = (props: PropsWithChildren<Props>) => {
  const { className, id, children, size = "md", ...typography } = props;

  return (
    <p
      className={classNames(className, getTypographyClassNames(typography), {
        [(styles as { [key in Size]: string })[size]]: size,
      })}
      id={id}
    >
      {children}
    </p>
  );
};

export default Paragraph;
