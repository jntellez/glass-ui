import SeparatorDemo from "./separator-demo"
import separatorDemoCode from "./separator-demo.tsx?raw"

import SeparatorSemantic from "./separator-semantic"
import separatorSemanticCode from "./separator-semantic.tsx?raw"

import SeparatorVertical from "./separator-vertical"
import separatorVerticalCode from "./separator-vertical.tsx?raw"

export const separatorExamples = {
  "separator-demo": {
    component: SeparatorDemo,
    code: separatorDemoCode,
  },
  "separator-semantic": {
    component: SeparatorSemantic,
    code: separatorSemanticCode,
  },
  "separator-vertical": {
    component: SeparatorVertical,
    code: separatorVerticalCode,
  },
} as const
