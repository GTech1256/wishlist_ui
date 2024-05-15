import classNames, { ClassValue } from "clsx";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Size, Type } from "../../../types/interfaces/styles";

import styles from "shared/ui/button/Button.module.scss";
import { Spin } from "antd";

export type ButtonType = "button" | "submit" | "link" | "router";

interface OwnProps {
  children?: any;
  onClick?: (props?: any) => any;
  type: Type;
  size: Size;
  buttonType: ButtonType;
  to: string;
  href: string;
  block?: boolean;
  inline?: boolean;
  circle?: boolean;
  icon?: boolean;
  disabled?: boolean;
  loading?: boolean;
  text?: boolean;
  underline?: boolean;
  inversion?: boolean;
  squared?: boolean;
  className?: ClassValue;
  target?: string;
  shadow?: boolean;
  ellipsis?: boolean;
  dashed?: boolean;
  id?: string;
}

export type ButtonProps = OwnProps;

const Button: React.FC<Partial<ButtonProps>> = (props) => {
  const params: ButtonProps = {
    to: "/",
    href: "/",
    size: "lg",
    type: "default",
    buttonType: "button",
    shadow: false,
    ellipsis: false,
    dashed: false,
    ...props,
    disabled: props.disabled || props.loading || false,
  };

  const inversionColorClass = {
    [styles.text]: params.text,
    [styles[`${params.type}_inversion`]]: params.type,
  };

  const colorClass = {
    [styles.text]: params.text,
    [styles[params.type]]: params.type,
  };

  const textClass = {
    [styles.text]: params.text,
    [styles.underline]: params.underline,
    [styles.ellipsis]: params.ellipsis,
    [styles[`${params.type}_text`]]: params.type,
  };

  const buttonClass = {
    [styles.button_base]: true,
    [styles[params.size]]: params.size,
    [styles.circle]: params.circle,
    [styles.shadow]: !params.inversion && params.shadow,
    [styles.block]: params.block,
    [styles.inline]: params.inline,
    [styles.dashed]: params.dashed,
    ...(params.text ? textClass : params.inversion ? inversionColorClass : colorClass),
  };

  const iconClass = {
    [styles.icon]: params.icon,
    [styles.circle_icon]: params.circle,
    [styles[`icon_${params.size}`]]: params.size,
    [styles.block]: params.block,
    [styles.inline]: params.inline,
    [styles.dashed]: params.dashed,
    ...(params.inversion ? inversionColorClass : colorClass),
  };

  const className = classNames(
    styles.button,
    {
      ...(params.icon ? iconClass : buttonClass),
      [styles.squared]: params.squared,
    },
    params.className
  );

  // const getSpinnerColor = (): Color => {
  //   if (params.inversion || params.type === "secondary") {
  //     return "dark";
  //   } else {
  //     return "white";
  //   }
  // };

  const renderContent = () => {
    return (
      <Fragment>{!!params.loading ? <Spin size={"small"} /> : props.children}</Fragment>
    );
  };

  if (params.buttonType === "link") {
    return (
      <a href={params.href} className={className} target={params?.target} id={params?.id}>
        {renderContent()}
      </a>
    );
  } else if (params.buttonType === "router") {
    return (
      <Link to={params.to} className={className} id={params?.id}>
        {renderContent()}
      </Link>
    );
  } else {
    return (
      <button
        disabled={!!params.disabled}
        type={params.buttonType === "submit" ? "submit" : "button"}
        className={className}
        onClick={params.onClick}
        id={params?.id}
      >
        {renderContent()}
      </button>
    );
  }
};

export default Button;
