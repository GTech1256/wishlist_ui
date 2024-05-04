import { PropsWithChildren } from "react";
import ModalAnt, { ModalFuncProps, ModalProps } from "antd/es/modal";
import classNames, { Argument } from "classnames";
import "antd/es/modal/style/index.css";
import "./Modal.scss";
import { t } from "../translation/translation";
import Row from "../row";
import Col from "../col";
import Icon from "../icon/Icon";

interface OwnProps extends Omit<ModalProps, "className"> {
  className?: Argument;
  footerSticky?: boolean;
}

type Props = OwnProps;

const Modal = (props: PropsWithChildren<Props>) => {
  const { className, footer = null, footerSticky = false, ...modalProps } = props;
  const okButtonProps = { ...modalProps?.okButtonProps, className: "e2e-modal-ok" };
  const cancelButtonProps = { ...modalProps?.cancelButtonProps, className: "e2e-modal-cancel" };

  return (
    <ModalAnt
      className={classNames("modal", className, "e2e-modal", { "modal_footer-sticky": footerSticky })}
      footer={footer}
      {...modalProps}
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
    >
      {props.children}
    </ModalAnt>
  );
};

export default Modal;

interface ModalConfirmProps extends ModalFuncProps {}

export const modalConfirm = (props: ModalConfirmProps) => {
  const className = classNames(["modal", "modal-confirm", "e2e-modal"]);

  return ModalAnt.confirm({
    icon: null,
    zIndex: 1060,
    title: t("Вы уверены что хотите подтвердить?"),
    content: null,
    okText: t("Да"),
    cancelText: t("Отменить"),
    centered: true,
    className,
    okButtonProps: {
      className: "e2e-modal-ok",
    },
    cancelButtonProps: {
      className: "e2e-modal-cancel",
    },
    ...props,
  });
};

export const modalDelete = (props: ModalConfirmProps) => {
  const title = (
    <Row nowrap gutter={16} align={"middle"}>
      <Col>
        <Icon block name={"warning"} color={"danger"} size={22} />
      </Col>
      <Col>{props?.title}</Col>
    </Row>
  );

  modalConfirm({
    content: null,
    okText: t("Удалить"),
    cancelButtonProps: {
      className: "e2e-modal-cancel modal-cancel",
    },
    okButtonProps: {
      className: "e2e-modal-ok modal-ok_delete",
    },
    ...props,
    title,
  });
};
