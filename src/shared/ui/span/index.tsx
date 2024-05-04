import { MouseEvent, PropsWithChildren, useCallback } from "react";
import classNames, { ClassValue } from "clsx";
import { Size } from "../../../types/interfaces/styles";
import { Typography } from "../../../types/interfaces/typography";
import { getTypographyClassNames } from "../../lib/classNames";
import styles from "./styles.module.scss";

interface OwnProps extends Partial<Typography> {
  className?: ClassValue;
  size?: Size;
  id?: string;
  onClick?: (event: MouseEvent) => void;
}

type Props = OwnProps;

const Span = (props: PropsWithChildren<Props>) => {
  const { className, onClick, id, children, size = "md", ...typography } = props;
  const handleClick = useCallback(
    (event: MouseEvent) => {
      onClick?.(event);
    },
    [onClick]
  );

  return (
    <span
      onClick={handleClick}
      className={classNames(className, getTypographyClassNames(typography), {
        [styles[size]]: size,
      })}
      id={id}
    >
      {children}
    </span>
  );
};

export default Span;
