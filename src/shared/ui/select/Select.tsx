import { Select as AntdSelect, SelectProps } from "antd";
import { clsx } from "clsx";

import styles from "./Select.module.scss";

interface OwnProps extends SelectProps {}

type Props = OwnProps;

export const Select = ({ className, ...restProps }: Props) => {
  return <AntdSelect className={clsx(styles.select, className)} {...restProps} />;
};
