import CollapsibleDemo from "./collapsible-demo"
import collapsibleDemoCode from "./collapsible-demo.tsx?raw"

import CollapsibleVariants from "./collapsible-variants"
import collapsibleVariantsCode from "./collapsible-variants.tsx?raw"

import CollapsibleDisabled from "./collapsible-disabled"
import collapsibleDisabledCode from "./collapsible-disabled.tsx?raw"

import CollapsibleSizes from "./collapsible-sizes"
import collapsibleSizesCode from "./collapsible-sizes.tsx?raw"

export const collapsibleExamples = {
  "collapsible-demo": {
    component: CollapsibleDemo,
    code: collapsibleDemoCode,
  },
  "collapsible-variants": {
    component: CollapsibleVariants,
    code: collapsibleVariantsCode,
  },
  "collapsible-disabled": {
    component: CollapsibleDisabled,
    code: collapsibleDisabledCode,
  },
  "collapsible-sizes": {
    component: CollapsibleSizes,
    code: collapsibleSizesCode,
  },
} as const
