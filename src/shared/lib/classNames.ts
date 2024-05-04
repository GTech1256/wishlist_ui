import { Typography } from "types/interfaces/typography";

export const getColorClassNames = (props: Partial<Typography>) => ({
  [`color-${props.color}`]: props.color !== undefined,
});
export const getBgClassNames = (props: Partial<Typography>) => ({
  [`bg-${props.bg}`]: props.bg !== undefined,
});
export const getEllipsisClassName = (props: Partial<Typography>) => ({
  [`ellipsis`]: props.ellipsis !== undefined,
});

export const getInlineClassNames = (props: Partial<Typography>) => ({
  [`bg-${props.bg}`]: props.bg !== undefined,
  [`text-${props.align}`]: props.align !== undefined,
  [`weight-${props.weight}`]: props.weight !== undefined,
  ...getColorClassNames(props),
  ...getBgClassNames(props),
  ...getEllipsisClassName(props),
});

export const getSpacingClassNames = (props: Partial<Typography>) => ({
  [`m-${props.m}`]: props.m !== undefined,
  [`mt-${props.mt}`]: props.mt !== undefined,
  [`mr-${props.mr}`]: props.mr !== undefined,
  [`mb-${props.mb}`]: props.mb !== undefined,
  [`ml-${props.ml}`]: props.ml !== undefined,
  [`p-${props.p}`]: props.p !== undefined,
  [`pt-${props.pt}`]: props.pt !== undefined,
  [`pr-${props.pr}`]: props.pr !== undefined,
  [`pb-${props.pb}`]: props.pb !== undefined,
  [`pl-${props.pl}`]: props.pl !== undefined,
});

export const getTypographyClassNames = (props: Partial<Typography>) => ({
  ...getInlineClassNames(props),
  ...getSpacingClassNames(props),
});
