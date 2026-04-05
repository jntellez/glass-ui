import TextareaDemo from "./textarea-demo"
import textareaDemoCode from "./textarea-demo.tsx?raw"

import TextareaDefault from "./textarea-default"
import textareaDefaultCode from "./textarea-default.tsx?raw"

import TextareaGlass from "./textarea-glass"
import textareaGlassCode from "./textarea-glass.tsx?raw"

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
  "textarea-glass": {
    component: TextareaGlass,
    code: textareaGlassCode,
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
