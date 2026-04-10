import CheckboxDemo from "./checkbox-demo"
import checkboxDemoCode from "./checkbox-demo.tsx?raw"

import CheckboxDefault from "./checkbox-default"
import checkboxDefaultCode from "./checkbox-default.tsx?raw"

import CheckboxDisabled from "./checkbox-disabled"
import checkboxDisabledCode from "./checkbox-disabled.tsx?raw"

import CheckboxField from "./checkbox-field"
import checkboxFieldCode from "./checkbox-field.tsx?raw"

export const checkboxExamples = {
  "checkbox-demo": {
    component: CheckboxDemo,
    code: checkboxDemoCode,
  },
  "checkbox-default": {
    component: CheckboxDefault,
    code: checkboxDefaultCode,
  },
  "checkbox-field": {
    component: CheckboxField,
    code: checkboxFieldCode,
  },
  "checkbox-disabled": {
    component: CheckboxDisabled,
    code: checkboxDisabledCode,
  },
} as const
