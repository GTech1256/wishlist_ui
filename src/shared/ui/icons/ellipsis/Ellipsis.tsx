import clsx from "clsx";

import { IconProps } from "types/interfaces/icons";

export const Ellipsis = ({ fill = "currentColor", className = undefined }: IconProps) => (
  <svg
    className={clsx(className)}
    width="18"
    height="4"
    viewBox="0 0 18 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.0615234 2.0918C0.0615234 1.61328 0.230143 1.2054 0.567383 0.868164C0.90918 0.530924 1.31706 0.362305 1.79102 0.362305C2.26953 0.362305 2.67741 0.530924 3.01465 0.868164C3.35645 1.2054 3.52734 1.61328 3.52734 2.0918C3.52734 2.57031 3.35645 2.98047 3.01465 3.32227C2.67741 3.65951 2.26953 3.82812 1.79102 3.82812C1.31706 3.82812 0.90918 3.65951 0.567383 3.32227C0.230143 2.98047 0.0615234 2.57031 0.0615234 2.0918ZM6.96973 2.0918C6.96973 1.61328 7.13835 1.2054 7.47559 0.868164C7.81738 0.530924 8.22526 0.362305 8.69922 0.362305C9.17773 0.362305 9.58561 0.530924 9.92285 0.868164C10.2646 1.2054 10.4355 1.61328 10.4355 2.0918C10.4355 2.57031 10.2646 2.98047 9.92285 3.32227C9.58561 3.65951 9.17773 3.82812 8.69922 3.82812C8.22526 3.82812 7.81738 3.65951 7.47559 3.32227C7.13835 2.98047 6.96973 2.57031 6.96973 2.0918ZM13.8779 2.0918C13.8779 1.61328 14.0465 1.2054 14.3838 0.868164C14.7256 0.530924 15.1335 0.362305 15.6074 0.362305C16.0859 0.362305 16.4938 0.530924 16.8311 0.868164C17.1729 1.2054 17.3438 1.61328 17.3438 2.0918C17.3438 2.57031 17.1729 2.98047 16.8311 3.32227C16.4938 3.65951 16.0859 3.82812 15.6074 3.82812C15.1335 3.82812 14.7256 3.65951 14.3838 3.32227C14.0465 2.98047 13.8779 2.57031 13.8779 2.0918Z"
      fill={fill}
    />
  </svg>
);