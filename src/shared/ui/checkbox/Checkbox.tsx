import { ChangeEvent } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { ClassValue, clsx } from "clsx";

import styles from "./Checkbox.module.scss";

interface OwnProps<T extends FieldValues = any> {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  control?: Control<T>;
  label?: string;
  className?: ClassValue;
  labelClassName?: ClassValue;
  checked?: boolean;
  showError?: boolean;
}

type Props = OwnProps;

export const Checkbox = ({
  name = "",
  label,
  control,
  checked,
  className,
  labelClassName,
  onChange,
  showError,
}: Props) => {
  const renderInput = ({
    onChange,
    checked,
  }: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => (
    <input type="checkbox" checked={checked} name={name} onChange={onChange} />
  );

  const renderControlInput = () => (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange: onChangeControl, onBlur, value, ...controlParams } }) => {
        return renderInput({
          onChange: (event: ChangeEvent<HTMLInputElement>) => {
            onChange?.(event);
            onChangeControl?.(event.target.checked);
          },
          checked: value,
          ...controlParams,
        });
      }}
    />
  );

  return (
    <div className={clsx(styles.container, className)}>
      <label className={clsx(styles.checkbox)}>
        {control && name ? renderControlInput() : renderInput({ onChange, checked })}
        <span className={clsx(styles.checkmark, { [styles.checkmark__error]: showError })} />
      </label>
      <div className={clsx(styles.label, labelClassName, { [styles.label__error]: showError })}>{label}</div>
    </div>
  );
};
