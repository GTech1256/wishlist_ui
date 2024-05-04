import clsx from "clsx";

import { IconProps } from "types/interfaces/icons";

export const ArrowRightBig = ({ fill = "currentColor", className = undefined }: IconProps) => (
  <svg
    className={clsx(className)}
    width="10"
    height="16"
    viewBox="0 0 10 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 13.9531L5.99244 8L0 2.04695L2.00378 0L10 8L2.00378 16L0 13.9531Z" fill={fill} />
  </svg>
);
