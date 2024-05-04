import clsx from "clsx";

import { IconProps } from "types/interfaces/icons";

export const ArrowLeft = ({ fill = "currentColor", className = undefined }: IconProps) => (
  <svg
    className={clsx(className)}
    width="9"
    height="14"
    viewBox="0 0 9 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.20019 11.7625L3.40624 7.0001L8.20019 2.23766L6.59717 0.600098L0.200195 7.0001L6.59717 13.4001L8.20019 11.7625Z"
      fill={fill}
    />
  </svg>
);
