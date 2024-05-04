import React, { PropsWithChildren } from "react";
import { InputType } from "types/enums/form";
import Input, { InputProps } from "./Input";
import Icon from "../icon/Icon";

type Props = InputProps;

const InputSearch = (props: PropsWithChildren<Props>) => {
  const params: Props = {
    size: "md",
    ...props,
  };

  return (
    <Input
      {...params}
      className={"search"}
      type={InputType.Text}
      suffix={<Icon name={"search"} size={17} color={"subText"} />}
    />
  );
};

export default InputSearch;
