import clsx from "clsx";

import { IconProps } from "types/interfaces/icons";

export const ArrowRight = ({ fill = "currentColor", className = undefined }: IconProps) => (
  <svg
    className={clsx(className)}
    width="9"
    height="14"
    viewBox="0 0 9 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.799989 11.7625L5.59394 7.0001L0.799989 2.23766L2.40301 0.600098L8.79999 7.0001L2.40301 13.4001L0.799989 11.7625Z"
      fill={fill}
    />
  </svg>
);
