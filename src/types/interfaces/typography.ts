import { Align, Color, Weight } from "./styles";

export interface Typography {
  color: Color;
  bg: Color;
  align: Align;
  weight: Weight;
  m: number;
  mt: number;
  mr: number;
  mb: number;
  ml: number;
  p: number;
  pt: number;
  pr: number;
  pb: number;
  pl: number;
  ellipsis?: boolean;
}
