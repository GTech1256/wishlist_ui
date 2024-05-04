import React, { PropsWithChildren } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./Transition.scss";

type TransitionType = "accordion" | "fade" | "rotate";

interface OwnProps {
  type?: TransitionType;
  name: string;
  timeout?: number;
}

type Props = OwnProps;

const Transition = React.memo((props: PropsWithChildren<Props>) => {
  const { type = "fade", name, timeout = 400, children } = props;
  const timeoutMap: { [key in TransitionType]: number } = {
    fade: timeout || 400,
    rotate: 500,
    accordion: 400,
  };

  return (
    <SwitchTransition>
      <CSSTransition timeout={timeoutMap[type]} key={name} classNames={type}>
        {children}
      </CSSTransition>
    </SwitchTransition>
  );
});

export default Transition;
