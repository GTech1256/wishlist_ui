import React, { ChangeEvent, KeyboardEvent, ChangeEventHandler, PropsWithChildren, useState, useRef } from "react";
import "./Input.scss";
import classNames, { Argument } from "classnames";
import { Control, Controller, FieldValues } from "react-hook-form";
import { Size } from "types/interfaces/styles";

export interface InputProps<T extends FieldValues = any> {
  name?: string;
  control?: Control<T>;
  placeholder?: string;
  id?: string;
  type?: string;
  pattern?: string;
  disable?: boolean;
  size?: Size;
  prefix?: any;
  suffix?: any;
  className?: Argument;
  defaultValue?: string;
  value?: string;
  autoFocus?: boolean;
  onChange?: ChangeEventHandler<any>;
  autocomplete?: boolean;
  maxLength?: number;
  formatter?: (value: string) => string;
  parser?: (value: string) => string;
}

type Props = InputProps;

const Input = (props: PropsWithChildren<Props>) => {
  const {
    name = "",
    type,
    control,
    placeholder,
    disable,
    size = "lg",
    prefix,
    suffix,
    className,
    id,
    defaultValue,
    value,
    autoFocus,
    onChange,
    pattern,
    autocomplete = false,
    maxLength,
    formatter,
    parser,
  } = props;
  const [focus, setFocus] = useState(false);
  const [firstFocus, setFirstFocus] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);

  const onFocus = (event: any) => {
    if (autoFocus && !firstFocus) {
      event.target.select();
      setFirstFocus(true);
    }
    setFocus(true);
  };

  const renderPrefix = () => prefix && <div className="prefix">{prefix}</div>;

  const renderSuffix = () => suffix && <div className="suffix">{suffix}</div>;

  const renderInput = (
    params?: InputProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  ) => (
    <input
      ref={input}
      autoComplete={autocomplete ? "on" : "off"}
      autoFocus={autoFocus}
      id={id}
      placeholder={placeholder}
      disabled={disable}
      onFocus={(event) => onFocus(event)}
      onBlur={() => setFocus(false)}
      type={type}
      pattern={pattern}
      maxLength={maxLength}
      {...params}
      defaultValue={formatter && params?.defaultValue ? formatter?.(params?.defaultValue) : params?.defaultValue}
      value={formatter && params?.value ? formatter?.(params?.value) : params?.value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (parser && e?.target) {
          e.target.value = parser(e?.target?.value);
        }

        params?.onChange?.(e);
      }}
      onKeyDown={(e: KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
          input.current?.blur();
        }
      }}
    />
  );

  const renderInputControl = () => (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange: onChangeControl, onBlur, value, ...controlParam } }) => {
        return renderInput({
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            onChange?.(e);
            onChangeControl?.(e.target.value);
          },
          onBlur: (e: any) => {
            setFocus(false);
            onBlur?.();
          },
          value: value || "",
          ...controlParam,
        });
      }}
    />
  );

  return (
    <label
      className={classNames("input", className, {
        [`input_${size}`]: size,
        input_focus: focus,
        input_disable: disable,
      })}
    >
      {renderPrefix()}
      {control && name ? renderInputControl() : renderInput({ onChange, defaultValue, value })}
      {renderSuffix()}
    </label>
  );
};

export default Input;
