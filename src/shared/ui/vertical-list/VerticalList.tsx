import React, { ReactNode, useEffect, useState } from "react";
import Box from "../box";
import Row from "../row";
import styles from "./VerticalList.module.scss";
import Col from "../col";
import Icon, { IconType } from "../icon/Icon";
import Hr from "../hr";
import clsx from "clsx";

export interface VerticalListItem {
  id: string | number;
  element: string | ReactNode;
  icon?: ReactNode;
  onClick?: (isExpanded: boolean) => void;
  extended?: string | ReactNode;
  extendedOpen?: boolean;
}

type Props = {
  items: VerticalListItem[];
};

export const VerticalList = (props: Props) => {
  const { items } = props;
  const [viewExtended, setViewExtended] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setViewExtended((state) => ({
      ...state,
      ...items.reduce((obj: { [key: string]: boolean }, item) => {
        if (item.extendedOpen !== undefined) {
          obj[item.id] = item.extendedOpen;
        }

        return obj;
      }, {}),
    }));
  }, [items]);

  return (
    <div className={styles.rows}>
      {items?.map((item: VerticalListItem, index, array) => (
        <Box key={item.id || index} mb={16}>
          <Row
            gutter={16}
            align={"middle"}
            className={clsx(styles.row, { [styles.row_pointer]: item.onClick || item.extended })}
            onClick={() => {
              setViewExtended((state) => ({
                ...state,
                [item.id]: !viewExtended?.[item.id],
              }));
              item.onClick?.(!viewExtended?.[item.id]);
            }}
          >
            {item.icon && <Col flex="0 1 34px">{item.icon}</Col>}
            <Col flex="1 1 auto">{item.element}</Col>
            {item?.extended && (
              <Col flex="0 1 34px">
                <Icon block name={viewExtended?.[item.id] ? "arrow-top" : "arrow-bottom"} size={12} />
              </Col>
            )}
          </Row>
          {item?.extended && viewExtended?.[item.id] && <Box mt={20}>{item.extended}</Box>}
          {index !== array.length - 1 && (
            <Box mt={16}>
              <Row gutter={14}>
                {item.icon && <Col flex="0 1 34px"></Col>}
                <Col flex="1 1 auto">
                  <Hr bg={"gray"} />
                </Col>
              </Row>
            </Box>
          )}
        </Box>
      ))}
    </div>
  );
};
