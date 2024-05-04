import React, { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";
import { UseFormReturn } from "react-hook-form/dist/types";

interface OwnProps {
  children: (data: UseFormReturn<any>) => React.ReactElement | null;
}

type Props = OwnProps;

const FormConnect: React.FC<Props> = ({ children }) => {
  const form = useFormContext();

  return children({
    ...form,
  });
};

export default FormConnect;
