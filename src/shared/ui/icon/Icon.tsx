import { ReactComponent as ArrowBottom } from "../../assets/icons/arrow-bottom.svg";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";
import { ReactComponent as ArrowTop } from "../../assets/icons/arrow-top.svg";
import { ReactComponent as Check } from "../../assets/icons/check.svg";
import { ReactComponent as CheckCircle } from "../../assets/icons/check-circle.svg";
import { ReactComponent as CheckThin } from "../../assets/icons/check-thin.svg";
import { ReactComponent as Clear } from "../../assets/icons/clear.svg";
import { ReactComponent as Dashed } from "../../assets/icons/dashed.svg";
import { ReactComponent as Date } from "../../assets/icons/date.svg";
import { ReactComponent as Dotted } from "../../assets/icons/dotted.svg";
import { ReactComponent as Drag } from "../../assets/icons/drag.svg";
import { ReactComponent as Exit } from "../../assets/icons/exit.svg";
import { ReactComponent as File } from "../../assets/icons/file.svg";
import { ReactComponent as Info } from "../../assets/icons/info.svg";
import { ReactComponent as InfoCircle } from "../../assets/icons/info-circle.svg";
import { ReactComponent as Loader } from "../../assets/icons/loader.svg";
import { ReactComponent as Logout } from "../../assets/icons/logout.svg";
import { ReactComponent as Minus } from "../../assets/icons/minus.svg";
import { ReactComponent as Paragraph } from "../../assets/icons/paragraph.svg";
import { ReactComponent as Pluse } from "../../assets/icons/pluse.svg";
import { ReactComponent as Refresh } from "../../assets/icons/refresh.svg";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import { ReactComponent as SelectArrow } from "../../assets/icons/select-arrow.svg";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { ReactComponent as Time } from "../../assets/icons/time.svg";
import { ReactComponent as Timer } from "../../assets/icons/timer.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { ReactComponent as User } from "../../assets/icons/user.svg";
import { ReactComponent as Warning } from "../../assets/icons/warning.svg";
import { ReactComponent as WarningCircle } from "../../assets/icons/warning-circle.svg";
import { ReactComponent as Filter } from "../../assets/icons/filter.svg";
import { ReactComponent as Copy } from "../../assets/icons/copy.svg";
import { ReactComponent as EyeOff } from "../../assets/icons/eye-off.svg";
import { ReactComponent as Calendar } from "../../assets/icons/calendar.svg";
import { ReactComponent as Change } from "../../assets/icons/change.svg";
import { ReactComponent as Vtb } from "../../assets/icons/vtb.svg";
import { ReactComponent as Card } from "../../assets/icons/card.svg";
import { ReactComponent as Mail } from "../../assets/icons/mail.svg";
import { ReactComponent as Document } from "../../assets/icons/document.svg";
import React from "react";
import classNames from "clsx";
import Span from "../span";
import { Color } from "../../../types/interfaces/styles";

export type IconType =
  | "arrow-bottom"
  | "arrow-left"
  | "arrow-right"
  | "arrow-top"
  | "check"
  | "check-circle"
  | "check-thin"
  | "clear"
  | "dashed"
  | "date"
  | "dotted"
  | "drag"
  | "exit"
  | "file"
  | "filter"
  | "info"
  | "info-circle"
  | "loader"
  | "logout"
  | "minus"
  | "paragraph"
  | "pluse"
  | "refresh"
  | "search"
  | "select-arrow"
  // | "spinner"
  | "star"
  | "time"
  | "timer"
  | "trash"
  | "user"
  | "copy"
  | "eye-off"
  | "calendar"
  | "change"
  | "vtb"
  | "card"
  | "mail"
  | "document"
  | "warning"
  | "warning-circle";

const ICONS: { [key in IconType]: any } = {
  "user": User,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-bottom": ArrowBottom,
  "arrow-top": ArrowTop,
  "pluse": Pluse,
  "dotted": Dotted,
  "star": Star,
  "info": Info,
  "info-circle": InfoCircle,
  "check": Check,
  "check-thin": CheckThin,
  "file": File,
  "filter": Filter,
  "exit": Exit,
  "minus": Minus,
  "search": Search,
  "trash": Trash,
  "select-arrow": SelectArrow,
  "logout": Logout,
  "date": Date,
  "time": Time,
  "warning": Warning,
  "warning-circle": WarningCircle,
  "refresh": Refresh,
  "paragraph": Paragraph,
  // "spinner": Spinner,
  "dashed": Dashed,
  "drag": Drag,
  "timer": Timer,
  "loader": Loader,
  "check-circle": CheckCircle,
  "clear": Clear,
  "copy": Copy,
  "eye-off": EyeOff,
  "calendar": Calendar,
  "change": Change,
  "vtb": Vtb,
  "card": Card,
  "mail": Mail,
  "document": Document,
};

interface OwnProps {
  name: IconType;
  color?: Color;
  size?: number;
  spin?: boolean;
  flash?: boolean;
  slow?: boolean;
  block?: boolean;
}

type Props = OwnProps;

const Icon: React.FC<Props> = ({
  name,
  color,
  size = 16,
  spin = false,
  flash = false,
  slow = false,
  block = false,
}) => {
  const params = {
    fill: "currentColor",
    width: size,
    height: size,
  };

  if (ICONS[name]) {
    const Component = ICONS[name];

    return (
      <Span color={color} className={classNames({ "d-inline-flex": !block, "d-block": block })}>
        <Component
          {...params}
          className={classNames({ "spin": spin && !slow, "spin_slow": spin && slow, "flash": flash, "d-block": block })}
        />
      </Span>
    );
  } else {
    return null;
  }
};

export default Icon;
