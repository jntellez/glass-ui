import TextareaDemo from "./textarea-demo"
import textareaDemoCode from "./textarea-demo.tsx?raw"

import TextareaDefault from "./textarea-default"
import textareaDefaultCode from "./textarea-default.tsx?raw"

import TextareaSizes from "./textarea-sizes"
import textareaSizesCode from "./textarea-sizes.tsx?raw"

import TextareaGlass from "./textarea-glass"
import textareaGlassCode from "./textarea-glass.tsx?raw"

import TextareaError from "./textarea-error"
import textareaErrorCode from "./textarea-error.tsx?raw"

import TextareaDisabled from "./textarea-disabled"
import textareaDisabledCode from "./textarea-disabled.tsx?raw"

import TextareaComposition from "./textarea-composition"
import textareaCompositionCode from "./textarea-composition.tsx?raw"

export const textareaExamples = {
  "textarea-demo": {
    component: TextareaDemo,
    code: textareaDemoCode,
  },
  "textarea-default": {
    component: TextareaDefault,
    code: textareaDefaultCode,
  },
  "textarea-sizes": {
    component: TextareaSizes,
    code: textareaSizesCode,
  },
  "textarea-glass": {
    component: TextareaGlass,
    code: textareaGlassCode,
  },
  "textarea-error": {
    component: TextareaError,
    code: textareaErrorCode,
  },
  "textarea-disabled": {
    component: TextareaDisabled,
    code: textareaDisabledCode,
  },
  "textarea-composition": {
    component: TextareaComposition,
    code: textareaCompositionCode,
  },
} as const
