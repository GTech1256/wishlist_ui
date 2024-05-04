import { ReactNode } from "react";
import Box from "../box";
import Hr from "../hr";
import Span from "../span";

export interface FieldListItem {
  id?: string;
  name: string;
  element: string | ReactNode;
  hideSeparator?: boolean;
}

type Props = {
  items: FieldListItem[];
};

export const FieldList = (props: Props) => {
  const { items } = props;

  return (
    <div>
      {items?.map((item: FieldListItem, index, array) => (
        <Box key={item.id || index} mb={8}>
          <Box>
            <Span color={"subText"}>{item.name}</Span>
          </Box>
          <Box>{item.element || "-"}</Box>
          {index !== array.length - 1 && !item.hideSeparator && (
            <Box mt={8}>
              <Hr bg={"border"} />
            </Box>
          )}
        </Box>
      ))}
    </div>
  );
};
