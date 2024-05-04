import { StringSchema } from "yup";

declare module "yup" {
  interface StringSchema {
    time(): StringSchema
  }

  interface ObjectSchema {
    atLeastOneOf(list: string[]): ObjectSchema
    atLeastOneOfTrue(list: string[]): ObjectSchema
  }
}
