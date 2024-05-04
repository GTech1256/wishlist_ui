import { PropsWithChildren } from "react";
import classNames, { ClassValue } from "clsx";
import { getTypographyClassNames } from "../../lib/classNames";
import { Typography } from "../../../types/interfaces/typography";

interface OwnProps extends Partial<Typography> {
  className?: ClassValue;
  onClick?: (event?: any) => any;
  onDoubleClick?: (event?: any) => any;
  maxWidth?: string | number;
  width?: string | number;
  height?: string | number;
  id?: string;
}

export type BoxProps = OwnProps;

const Box = (props: PropsWithChildren<BoxProps>) => {
  const { className, height, width, maxWidth, onClick, onDoubleClick, children, id, ...typographyProps } = props;

  return (
    <div
      style={{ height, width, maxWidth }}
      className={classNames(className, getTypographyClassNames(typographyProps))}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      id={id}
    >
      {children}
    </div>
  );
};

export default Box;
