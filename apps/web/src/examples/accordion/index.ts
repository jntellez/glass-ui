import AccordionDemo from "./accordion-demo"
import accordionDemoCode from "./accordion-demo.tsx?raw"

import AccordionMultiple from "./accordion-multiple"
import accordionMultipleCode from "./accordion-multiple.tsx?raw"

import AccordionVariants from "./accordion-variants"
import accordionVariantsCode from "./accordion-variants.tsx?raw"

import AccordionDisabled from "./accordion-disabled"
import accordionDisabledCode from "./accordion-disabled.tsx?raw"

export const accordionExamples = {
  "accordion-demo": {
    component: AccordionDemo,
    code: accordionDemoCode,
  },
  "accordion-multiple": {
    component: AccordionMultiple,
    code: accordionMultipleCode,
  },
  "accordion-variants": {
    component: AccordionVariants,
    code: accordionVariantsCode,
  },
  "accordion-disabled": {
    component: AccordionDisabled,
    code: accordionDisabledCode,
  },
} as const
