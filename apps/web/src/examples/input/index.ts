import InputDemo from "./input-demo"
import inputDemoCode from "./input-demo.tsx?raw"

import InputDefault from "./input-default"
import inputDefaultCode from "./input-default.tsx?raw"

import InputGlass from "./input-glass"
import inputGlassCode from "./input-glass.tsx?raw"

import InputSizes from "./input-sizes"
import inputSizesCode from "./input-sizes.tsx?raw"

import InputError from "./input-error"
import inputErrorCode from "./input-error.tsx?raw"

import InputDisabled from "./input-disabled"
import inputDisabledCode from "./input-disabled.tsx?raw"

import InputComposition from "./input-composition"
import inputCompositionCode from "./input-composition.tsx?raw"

import InputPassword from "./input-password"
import inputPasswordCode from "./input-password.tsx?raw"

export const inputExamples = {
  "input-demo": {
    component: InputDemo,
    code: inputDemoCode,
  },
  "input-default": {
    component: InputDefault,
    code: inputDefaultCode,
  },
  "input-glass": {
    component: InputGlass,
    code: inputGlassCode,
  },
  "input-sizes": {
    component: InputSizes,
    code: inputSizesCode,
  },
  "input-disabled": {
    component: InputDisabled,
    code: inputDisabledCode,
  },
  "input-error": {
    component: InputError,
    code: inputErrorCode,
  },
  "input-composition": {
    component: InputComposition,
    code: inputCompositionCode,
  },
  "input-password": {
    component: InputPassword,
    code: inputPasswordCode,
  },
} as const
