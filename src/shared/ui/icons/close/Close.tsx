import clsx from "clsx";

import { IconProps } from "types/interfaces/icons";

export const Close = ({ fill = "currentColor", className = undefined }: IconProps) => (
  <svg
    className={clsx(className)}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.00001 6.58549L2.05026 0.635742L0.636047 2.04996L6.58579 7.9997L0.636047 13.9495L2.05026 15.3637L8.00001 9.41392L13.9498 15.3637L15.364 13.9494L9.41422 7.9997L15.364 2.04996L13.9498 0.635742L8.00001 6.58549Z"
      fill={fill}
    />
  </svg>
);
