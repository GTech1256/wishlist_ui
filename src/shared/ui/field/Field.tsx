import classNames, { Argument } from "classnames";
import { PropsWithChildren, ReactNode } from "react";
import { getInlineClassNames, getSpacingClassNames } from "shared/lib/classNames";
import { Typography } from "types/interfaces/typography";
import "./Field.scss";
import Trans from "../translation/Trans";
import { INPUT_ERRORS } from "../../config/inputErrors";
import { prepareInputError } from "../../lib/error";

interface OwnProps extends Partial<Typography> {
  label?: string | ReactNode;
  className?: Argument;
  errors?: any;
  id?: string;
  row?: boolean;
  showError?: boolean;
}

export type FiledProps = OwnProps;

const Field = (props: PropsWithChildren<FiledProps>) => {
  const { label, className, errors, id, row, showError } = props;
  let message = undefined;
  const errorMessage = errors?.message || undefined;
  const errorKey = errorMessage?.key || undefined;
  const errorType = errors?.type || undefined;

  if (showError) {
    if (errorKey) {
      message = errorKey in INPUT_ERRORS ? prepareInputError(errorMessage) : errorMessage;
    } else if (errorType) {
      message = errorType in INPUT_ERRORS ? INPUT_ERRORS[errorType as keyof typeof INPUT_ERRORS] : errorMessage;
    } else {
      message = errorMessage;
    }
  }

  return (
    <div className={classNames("field", { field_row: row }, className, getSpacingClassNames(props))}>
      {label ? (
        <label className={classNames("field__label", getInlineClassNames(props))} htmlFor={id}>
          {label}
        </label>
      ) : null}
      <div className={classNames("field__input", { field__input_error: !!errors })}>{props.children}</div>
      {!!message && (
        <div className="field__error">
          <Trans>{message}</Trans>
        </div>
      )}
    </div>
  );
};

export default Field;
