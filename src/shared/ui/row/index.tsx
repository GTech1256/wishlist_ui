import React, { PropsWithChildren } from "react";
import RowAnt, { RowProps } from "antd/es/grid/row";
import classNames, { ClassValue } from "clsx";
import "antd/es/grid/style/index.css";

interface OwnProps extends Omit<RowProps, "className"> {
  className?: ClassValue;
  column?: boolean;
  nowrap?: boolean;
}

type Props = OwnProps;

const Row = (props: PropsWithChildren<Props>) => {
  const { column = false, nowrap = false, ...rowProps } = props;

  return (
    <RowAnt {...rowProps} className={classNames(props.className, { "direction-column": column, "nowrap": nowrap })} />
  );
};

export default Row;
