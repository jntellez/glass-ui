import TooltipDemo from "./tooltip-demo"
import tooltipDemoCode from "./tooltip-demo.tsx?raw"

import TooltipSides from "./tooltip-sides"
import tooltipSidesCode from "./tooltip-sides.tsx?raw"

export const tooltipExamples = {
  "tooltip-demo": {
    component: TooltipDemo,
    code: tooltipDemoCode,
  },
  "tooltip-sides": {
    component: TooltipSides,
    code: tooltipSidesCode,
  },
} as const
