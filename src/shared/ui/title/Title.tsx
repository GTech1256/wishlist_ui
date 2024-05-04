import { PropsWithChildren } from "react";
import classNames, { ClassValue } from "clsx";
import { getTypographyClassNames } from "../../lib/classNames";
import { Typography } from "../../../types/interfaces/typography";

interface OwnProps extends Partial<Typography> {
  className?: ClassValue;
  level?: number;
  caption?: boolean;
  id?: string;
}

type Props = OwnProps;

const Title = (props: PropsWithChildren<Props>) => {
  const { className, children, level = 1, caption = false, id, ...typography } = props;

  const Component: any = caption ? "div" : `h${level}`;

  return (
    <Component className={classNames(className, `h${level}`, getTypographyClassNames(typography))} id={id}>
      {children}
    </Component>
  );
};

export default Title;
