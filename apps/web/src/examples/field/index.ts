import FieldDemo from "./field-demo"
import fieldDemoCode from "./field-demo.tsx?raw"

import FieldError from "./field-error"
import fieldErrorCode from "./field-error.tsx?raw"

import FieldTextarea from "./field-textarea"
import fieldTextareaCode from "./field-textarea.tsx?raw"

export const fieldExamples = {
  "field-demo": {
    component: FieldDemo,
    code: fieldDemoCode,
  },
  "field-error": {
    component: FieldError,
    code: fieldErrorCode,
  },
  "field-textarea": {
    component: FieldTextarea,
    code: fieldTextareaCode,
  },
} as const
