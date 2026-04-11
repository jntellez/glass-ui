import SelectDemo from "./native-select-demo"
import selectDemoCode from "./native-select-demo.tsx?raw"

import SelectGroups from "./native-select-groups"
import selectGroupsCode from "./native-select-groups.tsx?raw"

import SelectError from "./native-select-error"
import selectErrorCode from "./native-select-error.tsx?raw"

import SelectDisabled from "./native-select-disabled"
import selectDisabledCode from "./native-select-disabled.tsx?raw"

export const selectExamples = {
  "native-select-demo": {
    component: SelectDemo,
    code: selectDemoCode,
  },
  "native-select-groups": {
    component: SelectGroups,
    code: selectGroupsCode,
  },
  "native-select-error": {
    component: SelectError,
    code: selectErrorCode,
  },
  "native-select-disabled": {
    component: SelectDisabled,
    code: selectDisabledCode,
  },
} as const
