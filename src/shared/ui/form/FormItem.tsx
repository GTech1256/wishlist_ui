import { Argument } from "classnames";
import get from "lodash.get";
import React, { PropsWithChildren, ReactElement, ReactNode, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Field from "shared/ui/field/Field";
import { Typography } from "types/interfaces/typography";

interface OwnProps extends Partial<Typography> {
  name: string;
  className?: Argument;
  label?: ReactNode | string;
  id?: string;
  children: ReactElement;
  row?: boolean;
  showError?: boolean;
}

type Props = OwnProps;

const FormItem = (props: PropsWithChildren<Props>) => {
  const { className, name, label, children, id, row, showError = true, ...typography } = props;
  const {
    control,
    unregister,
    formState: { isSubmitted, touchedFields, errors },
  } = useFormContext() || {};

  useEffect(() => {
    return () => {
      if (unregister && name) {
        try {
          unregister(name);
        } catch (e) {
          console.log(e);
        }
      }
    };
  }, []);

  return (
    <Field
      {...typography}
      className={className}
      row={row}
      label={label}
      id={id}
      errors={get(touchedFields, name) || isSubmitted ? get(errors, name) : undefined}
      showError={showError}
    >
      {React.Children.map(children, (child: ReactElement) =>
        React.cloneElement(child, { ...child.props, name, control, id: id })
      )}
    </Field>
  );
};

export default FormItem;
