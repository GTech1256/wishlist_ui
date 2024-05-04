import React, { PropsWithChildren, ReactElement } from "react";
import "./RadioGroup.scss";
import classNames from "classnames";

export type RadioOptionType = "default" | "button";

interface OwnProps {
  name?: string;
  control?: any;
  register?: any;
  unregister?: any;
  children: ReactElement | ReactElement[];
  optionType?: RadioOptionType;
}

type Props = OwnProps;

const RadioGroup = (props: PropsWithChildren<Props>) => {
  const { name, control, register, unregister, children, optionType = "default" } = props;

  return (
    <div
      className={classNames("radio-group", {
        "radio-group_buttons": optionType === "button",
      })}
    >
      {React.Children.map(children, (child: ReactElement) =>
        React.cloneElement(child, { ...child.props, name, control, register, unregister, optionType })
      )}
    </div>
  );
};

export default RadioGroup;
