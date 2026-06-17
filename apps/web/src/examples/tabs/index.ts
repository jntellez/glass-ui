import TabsDemo from "./tabs-demo"
import tabsDemoCode from "./tabs-demo.tsx?raw"

import TabsVariants from "./tabs-variants"
import tabsVariantsCode from "./tabs-variants.tsx?raw"

import TabsSizes from "./tabs-sizes"
import tabsSizesCode from "./tabs-sizes.tsx?raw"

import TabsVertical from "./tabs-vertical"
import tabsVerticalCode from "./tabs-vertical.tsx?raw"

export const tabsExamples = {
  "tabs-demo": {
    component: TabsDemo,
    code: tabsDemoCode,
  },
  "tabs-variants": {
    component: TabsVariants,
    code: tabsVariantsCode,
  },
  "tabs-sizes": {
    component: TabsSizes,
    code: tabsSizesCode,
  },
  "tabs-vertical": {
    component: TabsVertical,
    code: tabsVerticalCode,
  },
} as const
