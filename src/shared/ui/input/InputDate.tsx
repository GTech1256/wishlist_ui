import React, { PropsWithChildren } from "react";
import InputMask, { InputMaskProps } from "./InputMask";

interface OwnProps extends Omit<InputMaskProps, "mask"> {}

export type Props = OwnProps;

const InputDate = (props: PropsWithChildren<Props>) => {
  return <InputMask {...props} mask={"99.99.9999"} placeholder="__.__.____" />;
};

export default InputDate;
