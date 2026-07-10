import SwitchDemo from "./switch-demo"
import switchDemoCode from "./switch-demo.tsx?raw"

import SwitchDisabled from "./switch-disabled"
import switchDisabledCode from "./switch-disabled.tsx?raw"

import SwitchSizes from "./switch-sizes"
import switchSizesCode from "./switch-sizes.tsx?raw"

export const switchExamples = {
  "switch-demo": {
    component: SwitchDemo,
    code: switchDemoCode,
  },
  "switch-disabled": {
    component: SwitchDisabled,
    code: switchDisabledCode,
  },
  "switch-sizes": {
    component: SwitchSizes,
    code: switchSizesCode,
  },
} as const
