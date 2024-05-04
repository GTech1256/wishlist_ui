import clsx from "clsx";

import { IconProps } from "types/interfaces/icons";

export const Copy = ({ fill = "currentColor", className = undefined }: IconProps) => (
  <svg
    className={clsx(className)}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_631_1370)">
      <path
        d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"
        fill={fill}
      />
    </g>
    <defs>
      <clipPath id="clip0_631_1370">
        <rect width="24" height="24" fill={fill} />
      </clipPath>
    </defs>
  </svg>
);