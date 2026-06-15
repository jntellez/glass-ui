import SelectDemo from "./select-demo"
import selectDemoCode from "./select-demo.tsx?raw"

import SelectSizes from "./select-sizes"
import selectSizesCode from "./select-sizes.tsx?raw"

import SelectVariants from "./select-variants"
import selectVariantsCode from "./select-variants.tsx?raw"

import SelectGroups from "./select-groups"
import selectGroupsCode from "./select-groups.tsx?raw"

import SelectDisabled from "./select-disabled"
import selectDisabledCode from "./select-disabled.tsx?raw"

import SelectForm from "./select-form"
import selectFormCode from "./select-form.tsx?raw"

export const selectExamples = {
  "select-demo": {
    component: SelectDemo,
    code: selectDemoCode,
  },
  "select-sizes": {
    component: SelectSizes,
    code: selectSizesCode,
  },
  "select-variants": {
    component: SelectVariants,
    code: selectVariantsCode,
  },
  "select-groups": {
    component: SelectGroups,
    code: selectGroupsCode,
  },
  "select-disabled": {
    component: SelectDisabled,
    code: selectDisabledCode,
  },
  "select-form": {
    component: SelectForm,
    code: selectFormCode,
  },
} as const
