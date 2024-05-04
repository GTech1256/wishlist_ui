import "antd/es/radio/style/index.css";
import classNames, { Argument } from "classnames";
import React, { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { getSpacingClassNames } from "shared/lib/classNames";
import { Typography } from "types/interfaces/typography";
import "./Radio.scss";
import { Controller } from "react-hook-form";
import { RadioOptionType } from "./RadioGroup";

interface OwnProps extends Partial<Typography> {
  checked?: boolean;
  value?: string;
  onChange?: (value: any) => void;
  onClick?: () => void;
  name?: string;
  control?: any;
  unregister?: any;
  disable?: boolean;
  className?: Argument;
  defaultValue?: any;
  id?: string;
  optionType?: RadioOptionType;
}

export type Props = OwnProps;

const Radio = (props: PropsWithChildren<Props>) => {
  const {
    id,
    name = "",
    defaultValue,
    control,
    unregister,
    disable,
    checked,
    onChange,
    className,
    value,
    optionType = "default",
    onClick,
    ...params
  } = props;
  const isButton = optionType === "button";

  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  const renderInput = ({ onChange: onChangeField, value: valueField, onBlur, ...fildProps }: any) => {
    return (
      <input
        type={"radio"}
        name={name}
        value={value}
        disabled={disable}
        checked={checked || valueField === value}
        id={id}
        defaultChecked={defaultValue}
        onChange={({ target }) => {
          onChange?.(target.value);
          onChangeField?.(target.value);
          onBlur();
          return target.checked;
        }}
        onBlur={onBlur}
        {...fildProps}
      />
    );
  };

  const renderDefault = (
    <label className={"radio__label"}>
      <div className={"radio__input"}>
        <Controller name={name} control={control} render={({ field }) => renderInput(field)} />
        <span className={"radio__circle"} />
        <span className={"radio__border"} />
      </div>
      <span className={"radio__text"}>{props.children}</span>
    </label>
  );

  const renderButton = (
    <label className={"radio__label"}>
      <div className={"radio__input"}>
        <Controller name={name} control={control} render={({ field }) => renderInput(field)} />
        <div className={"radio__button"}>
          <span className={"radio__text"}>{props.children}</span>
        </div>
      </div>
    </label>
  );

  return (
    <div
      onClick={handleClick}
      className={classNames("radio", className, getSpacingClassNames(params), {
        radio_disable: disable,
        radio_button: isButton,
        radio_default: !isButton,
      })}
    >
      {isButton ? renderButton : renderDefault}
    </div>
  );
};

export default Radio;
