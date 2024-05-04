import { setLocale } from "yup";

setLocale({
  object: {},
  mixed: {
    default: () => ({ key: "invalid" }),
    defined: () => ({ key: "invalid" }),
    required: () => ({ key: "required" }),
  },
  number: {
    lessThan: () => ({ key: "typeError", values: {} }),
    moreThan: () => ({ key: "typeError", values: {} }),
    min: ({ min }) => ({ key: "numberMin", values: { min } }),
    max: ({ max }) => ({ key: "numberMax", values: { max } }),
    integer: () => ({ key: "typeError", values: { type: "number" } }),
    positive: ({ value }) => ({ key: "positive", values: { value } }),
    negative: () => ({ key: "typeError", values: {} }),
  },
  string: {
    min: ({ min }) => ({ key: "stringMin", values: { min } }),
    max: ({ max }) => ({ key: "stringMax", values: { max } }),
    length: ({ length }) => ({ key: "stringLength", values: { length } }),
    email: ({ value }) => ({ key: "email", values: { value } }),
  },
});
