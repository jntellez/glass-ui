import SliderDemo from "./slider-demo"
import sliderDemoCode from "./slider-demo.tsx?raw"

import SliderSizes from "./slider-sizes"
import sliderSizesCode from "./slider-sizes.tsx?raw"

import SliderVariants from "./slider-variants"
import sliderVariantsCode from "./slider-variants.tsx?raw"

export const sliderExamples = {
  "slider-demo": {
    component: SliderDemo,
    code: sliderDemoCode,
  },
  "slider-sizes": {
    component: SliderSizes,
    code: sliderSizesCode,
  },
  "slider-variants": {
    component: SliderVariants,
    code: sliderVariantsCode,
  },
} as const
