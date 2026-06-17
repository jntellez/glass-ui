import PopoverDemo from "./popover-demo"
import popoverDemoCode from "./popover-demo.tsx?raw"

import PopoverSides from "./popover-sides"
import popoverSidesCode from "./popover-sides.tsx?raw"

import PopoverVariants from "./popover-variants"
import popoverVariantsCode from "./popover-variants.tsx?raw"

export const popoverExamples = {
  "popover-demo": {
    component: PopoverDemo,
    code: popoverDemoCode,
  },
  "popover-sides": {
    component: PopoverSides,
    code: popoverSidesCode,
  },
  "popover-variants": {
    component: PopoverVariants,
    code: popoverVariantsCode,
  },
} as const
