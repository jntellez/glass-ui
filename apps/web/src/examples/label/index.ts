import LabelDemo from "./label-demo"
import labelDemoCode from "./label-demo.tsx?raw"

import LabelDefault from "./label-default"
import labelDefaultCode from "./label-default.tsx?raw"

import LabelField from "./label-field"
import labelFieldCode from "./label-field.tsx?raw"

export const labelExamples = {
  "label-demo": {
    component: LabelDemo,
    code: labelDemoCode,
  },
  "label-default": {
    component: LabelDefault,
    code: labelDefaultCode,
  },
  "label-field": {
    component: LabelField,
    code: labelFieldCode,
  },
} as const
