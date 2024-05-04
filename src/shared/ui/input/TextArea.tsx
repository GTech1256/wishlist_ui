import { useEffect, useMemo, useRef, useState } from "react";
import "./Input.scss";
import classNames from "classnames";
import { Argument } from "classnames";
import { useWatch } from "react-hook-form";
import { Size } from "types/interfaces/styles";

interface OwnProps {
  name?: string;
  control?: any;
  placeholder?: string;
  disable?: boolean;
  size?: Size;
  rows?: number;
  className?: Argument;
  value?: string;
  autoFocus?: boolean;
  autoSize?: boolean;
  id?: string;
}

type Props = OwnProps;

const TextArea: React.FC<Props> = (props) => {
  const {
    id,
    name = "",
    control,
    className,
    placeholder,
    disable,
    // size = "md",
    rows = 3,
    value,
    autoFocus,
    autoSize,
  } = props;
  const [focus, setFocus] = useState(false);
  const [firstFocus, setFirstFocus] = useState(false);
  const [autoRows, setAutoRows] = useState(rows);
  const watch = useWatch({ control, name });
  const refInput = useRef<HTMLDivElement>(null);
  const paddingHeight = 30;
  const lineHeight = 24;
  const getSize = (scrollHeight: number) => Math.ceil((scrollHeight - paddingHeight) / lineHeight);

  const getSizeControl = useMemo(() => {
    const scrollHeight = control?._fields?.[name]?._f?.ref?.scrollHeight;

    return scrollHeight && getSize(scrollHeight);
  }, [control?._fields?.[name]?._f?.ref?.scrollHeight]);

  const getSizeRef = useMemo(() => {
    const scrollHeight = refInput.current?.scrollHeight;

    return scrollHeight && getSize(scrollHeight);
  }, [refInput?.current?.scrollHeight]);

  useEffect(() => {
    if (autoSize && watch && control?._fields?.[name]?._f?.ref?.scrollHeight) {
      const watchRows = getSizeControl;
      if (watchRows > rows && watchRows !== autoRows) {
        setAutoRows(watchRows);
      }
    }
  }, [autoSize, watch, control?._fields?.[name]]);

  useEffect(() => {
    if (autoSize && refInput?.current?.scrollHeight) {
      const watchRows = getSizeRef;
      if (watchRows && watchRows > rows && watchRows !== autoRows) {
        setAutoRows(watchRows);
      }
    }
  }, [autoSize, refInput?.current?.scrollHeight]);

  const onFocus = (event: any) => {
    if (autoFocus && !firstFocus) {
      event?.persist();
      setTimeout(() => event?.target?.select(), 1);
      setFirstFocus(true);
    }
    setFocus(true);
  };

  return (
    <div className={classNames("input", "textarea", className, { input_focus: focus })}>
      <textarea
        autoFocus={autoFocus}
        {...(control ? control.register(name) : { ref: refInput })}
        value={value || undefined}
        name={name}
        placeholder={placeholder}
        rows={autoRows}
        disabled={disable}
        onFocus={(event) => onFocus(event)}
        onBlur={() => setFocus(false)}
        id={id}
      />
    </div>
  );
};

export default TextArea;
