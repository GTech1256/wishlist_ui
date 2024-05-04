import clsx from "clsx";

import { IconProps } from "types/interfaces/icons";

export const ContextMenu = ({ fill = "currentColor", className = undefined }: IconProps) => (
  <svg
    className={clsx(className)}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="3" cy="3" r="3" fill={fill} />
    <circle cx="13" cy="3" r="3" fill={fill} />
    <circle cx="3" cy="13" r="3" fill={fill} />
    <circle cx="13" cy="13" r="3" fill={fill} />
  </svg>
);
