import NativeSelectDemo from "./native-select-demo"
import nativeSelectDemoCode from "./native-select-demo.tsx?raw"

import NativeSelectGroups from "./native-select-groups"
import nativeSelectGroupsCode from "./native-select-groups.tsx?raw"

import NativeSelectError from "./native-select-error"
import nativeSelectErrorCode from "./native-select-error.tsx?raw"

import NativeSelectDisabled from "./native-select-disabled"
import nativeSelectDisabledCode from "./native-select-disabled.tsx?raw"

export const nativeSelectExamples = {
  "native-select-demo": {
    component: NativeSelectDemo,
    code: nativeSelectDemoCode,
  },
  "native-select-groups": {
    component: NativeSelectGroups,
    code: nativeSelectGroupsCode,
  },
  "native-select-error": {
    component: NativeSelectError,
    code: nativeSelectErrorCode,
  },
  "native-select-disabled": {
    component: NativeSelectDisabled,
    code: nativeSelectDisabledCode,
  },
} as const
