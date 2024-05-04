import clsx from "clsx";

import { IconProps } from "types/interfaces/icons";

export const BranchDepartmentRowLogo = ({ className = undefined }: IconProps) => (
  <svg
    className={clsx(className)}
    width="100%"
    height="100%"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#458FFF" />
    <g clipPath="url(#clip0_4250_10431)">
      <path
        d="M21.9101 14.4999H10.0901C9.53007 14.4999 9.29007 13.8899 9.73007 13.5999L15.6401 9.72987C15.7492 9.66568 15.8735 9.63184 16.0001 9.63184C16.1267 9.63184 16.251 9.66568 16.3601 9.72987L22.2701 13.5999C22.7101 13.8899 22.4701 14.4999 21.9101 14.4999Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 20H10C9.72386 20 9.5 20.2239 9.5 20.5V22C9.5 22.2761 9.72386 22.5 10 22.5H22C22.2761 22.5 22.5 22.2761 22.5 22V20.5C22.5 20.2239 22.2761 20 22 20Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 14.5V20M13.5 14.5V20M16 14.5V20M18.5 14.5V20M21 14.5V20"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_4250_10431">
        <rect width="14" height="14" fill="white" transform="translate(9 9)" />
      </clipPath>
    </defs>
  </svg>
);
