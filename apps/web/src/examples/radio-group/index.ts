import RadioGroupDemo from "./radio-group-demo"
import radioGroupDemoCode from "./radio-group-demo.tsx?raw"

import RadioGroupDisabled from "./radio-group-disabled"
import radioGroupDisabledCode from "./radio-group-disabled.tsx?raw"

export const radioGroupExamples = {
  "radio-group-demo": {
    component: RadioGroupDemo,
    code: radioGroupDemoCode,
  },
  "radio-group-disabled": {
    component: RadioGroupDisabled,
    code: radioGroupDisabledCode,
  },
} as const
