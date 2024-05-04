import { PropsWithChildren } from "react";
import Spin, { SpinProps } from "antd/es/spin";
import classNames from "clsx";
import Icon from "shared/ui/icon/Icon";
import { getColorClassNames } from "../../lib/classNames";
import { Color } from "../../../types/interfaces/styles";
import "antd/es/spin/style/index.css";
import "./styles.scss";

interface OwnProps extends SpinProps {
  color?: Color;
  full?: boolean;
  indicator?: React.ReactElement<HTMLElement>;
  id?: string;
  inline?: boolean;
}

type Props = OwnProps;

const Spinner = (props: PropsWithChildren<Props>) => {
  const { color = "text", full, indicator, id, inline, ...spin } = props;

  return (
    <div className={classNames(["spinner", { spinner_full: full, spinner_inline: inline }])} id={id}>
      <Spin
        {...spin}
        indicator={indicator || <Icon name={"spinner"} size={20} spin color={color} />}
        className={classNames(getColorClassNames(props))}
      />
    </div>
  );
};

export default Spinner;
