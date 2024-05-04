import "antd/es/grid/style/index.css";
import React, { PropsWithChildren } from "react";
import ColAnt, { ColProps } from "antd/es/grid/col";
import classNames, { ClassValue } from "clsx";

interface OwnProps extends Omit<ColProps, "className"> {
  className?: ClassValue;
  minWidth?: string | number;
  maxWidth?: string | number;
  width?: string | number;
}

type Props = OwnProps;

const Col = (props: PropsWithChildren<Props>) => {
  const { className, minWidth, maxWidth, width, ...params } = props;

  return <ColAnt {...params} style={{ minWidth, maxWidth, width }} className={classNames(className)} />;
};

export default Col;
