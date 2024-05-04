import clsx from "clsx";

import { IconProps } from "types/interfaces/icons";

export const MapInfoBlockLogo = ({ className = undefined }: IconProps) => (
  <svg
    className={clsx(className)}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#458FFF" />
    <g filter="url(#filter0_b_4291_10727)">
      <path
        d="M7 10.3934C7 8.5193 8.5193 7 10.3934 7H21.6066C23.4807 7 25 8.5193 25 10.3934V21.6066C25 23.4807 23.4807 25 21.6066 25H10.3934C8.5193 25 7 23.4807 7 21.6066V10.3934Z"
        fill="url(#paint0_linear_4291_10727)"
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.7483 18.3991C19.8163 18.206 19.6811 18.0005 19.486 18.0005H11.069C10.8482 18.0005 10.6507 18.1454 10.5736 18.3639L10.2639 19.2424C10.1959 19.4355 10.3311 19.641 10.5262 19.641H18.9432C19.164 19.641 19.3615 19.4961 19.4386 19.2776L19.7483 18.3991ZM20.7416 15.5449C20.8097 15.3519 20.6745 15.1464 20.4794 15.1464H12.0623C11.8415 15.1464 11.644 15.2913 11.567 15.5098L11.2573 16.3883C11.1892 16.5813 11.3244 16.7868 11.5195 16.7868H19.9366C20.1574 16.7868 20.3549 16.6419 20.4319 16.4234L20.7416 15.5449ZM21.4253 13.5886C21.3482 13.8071 21.1507 13.952 20.9299 13.952H12.5129C12.3178 13.952 12.1826 13.7465 12.2506 13.5534L12.5604 12.6749C12.6374 12.4564 12.8349 12.3115 13.0557 12.3115H21.4728C21.6678 12.3115 21.803 12.517 21.735 12.7101L21.4253 13.5886Z"
      fill="white"
    />
    <defs>
      <filter
        id="filter0_b_4291_10727"
        x="-13.9016"
        y="-13.9016"
        width="59.8033"
        height="59.8033"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="10.4508" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_4291_10727" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_4291_10727" result="shape" />
      </filter>
      <linearGradient
        id="paint0_linear_4291_10727"
        x1="21.7541"
        y1="7.00003"
        x2="3.16395"
        y2="29.5738"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#458FFF" />
      </linearGradient>
    </defs>
  </svg>
);
