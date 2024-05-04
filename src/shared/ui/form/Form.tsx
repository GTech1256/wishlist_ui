import { PropsWithChildren, SyntheticEvent, useEffect } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
// import { UseFormReturn } from "react-hook-form/dist/types";
// import { Subscription } from "react-hook-form/dist/utils/createSubject";

interface OwnProps<T extends any> {
  form: UseFormReturn<any>;
  onSubmit?: (data: T | any) => void;
  id?: string;
  onValueChange?: (data: T) => void;
  onValid?: (valid: boolean) => void;
}

type Props<T extends any> = OwnProps<T>;

const Form = <T extends any>(props: PropsWithChildren<Props<T>>) => {
  const { id, form, onSubmit, children, onValueChange, onValid } = props;
  const {
    handleSubmit,
    watch,
    getValues,
    formState: { isValid },
  } = form;

  const onSubmitForm = (e: SyntheticEvent) => {
    e.stopPropagation();

    return handleSubmit((data: any) => onSubmit?.(data))(e);
  };

  useEffect(() => {
    onValid?.(isValid);
  }, [isValid]);

  useEffect(() => {
    let subscription: any//: Subscription;

    if (onValueChange) {
      subscription = watch((_, { type }: { type?: any }) => {
        if (type !== undefined) {
          const values = getValues();
          onValueChange?.(values);
        }
      });
    }

    return () => onValueChange && subscription && subscription.unsubscribe();
  }, [watch, onValueChange]);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmitForm} id={id}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
