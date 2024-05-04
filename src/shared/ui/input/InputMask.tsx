import { useState } from "react";
import ReactInputMask from "react-input-mask";
import { Control, Controller, ControllerRenderProps } from "react-hook-form";
import classNames, { Argument } from "classnames";
// import { ControllerRenderProps } from "react-hook-form/dist/types/controller";
import { Size } from "../../../types/interfaces/styles";
import "./Input.scss";

interface OwnProps {
  mask: string | Array<string | RegExp>;
  maskChar?: any;
  name?: string;
  control?: Control;
  placeholder?: string;
  id?: string;
  disable?: boolean;
  size?: Size;
  prefix?: any;
  suffix?: any;
  className?: Argument;
  defaultValue?: any;
  type?: string;
  inputMode?: string;
}

export type InputMaskProps = OwnProps;

const InputMask: React.FC<InputMaskProps> = (props) => {
  const {
    name = "",
    control,
    placeholder,
    disable,
    size = "md",
    prefix,
    suffix,
    className,
    id,
    defaultValue = "",
    mask,
    // type,
    inputMode,
    // maskChar,
  } = props;
  const [focus, setFocus] = useState(false);

  const renderPrefix = () => prefix && <div className="prefix">{prefix}</div>;

  const renderSuffix = () => suffix && <div className="suffix">{suffix}</div>;

  const renderInput = (field?: ControllerRenderProps) => (
    <ReactInputMask
      mask={mask}
      placeholder={placeholder}
      disabled={disable}
      id={id}
      onFocus={() => setFocus(true)}
      {...field}
      {...({ inputMode } as any)}
      onBlur={() => {
        setFocus(false);
        field?.onBlur();
      }}
    />
  );

  return (
    <label className={classNames("input", className, { [`input_${size}`]: size, input_focus: focus })}>
      {renderPrefix()}
      {control ? (
        <Controller
          render={({ field }) => renderInput(field)}
          defaultValue={defaultValue}
          name={name}
          control={control}
        />
      ) : (
        renderInput()
      )}
      {renderSuffix()}
    </label>
  );
};

export default InputMask;
