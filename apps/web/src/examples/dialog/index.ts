import DialogDemo from "./dialog-demo"
import dialogDemoCode from "./dialog-demo.tsx?raw"

import DialogSizes from "./dialog-sizes"
import dialogSizesCode from "./dialog-sizes.tsx?raw"

import DialogVariants from "./dialog-variants"
import dialogVariantsCode from "./dialog-variants.tsx?raw"

export const dialogExamples = {
  "dialog-demo": {
    component: DialogDemo,
    code: dialogDemoCode,
  },
  "dialog-sizes": {
    component: DialogSizes,
    code: dialogSizesCode,
  },
  "dialog-variants": {
    component: DialogVariants,
    code: dialogVariantsCode,
  },
} as const
