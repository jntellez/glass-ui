import ColorPickerControlled from "./color-picker-controlled"
import colorPickerControlledCode from "./color-picker-controlled.tsx?raw"

import ColorPickerDemo from "./color-picker-demo"
import colorPickerDemoCode from "./color-picker-demo.tsx?raw"

export const colorPickerExamples = {
  "color-picker-controlled": {
    component: ColorPickerControlled,
    code: colorPickerControlledCode,
  },
  "color-picker-demo": {
    component: ColorPickerDemo,
    code: colorPickerDemoCode,
  },
} as const
