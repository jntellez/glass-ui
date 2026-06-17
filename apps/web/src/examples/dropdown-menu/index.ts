import DropdownMenuDemo from "./dropdown-menu-demo"
import dropdownMenuDemoCode from "./dropdown-menu-demo.tsx?raw"

import DropdownMenuSelection from "./dropdown-menu-selection"
import dropdownMenuSelectionCode from "./dropdown-menu-selection.tsx?raw"

import DropdownMenuVariants from "./dropdown-menu-variants"
import dropdownMenuVariantsCode from "./dropdown-menu-variants.tsx?raw"

export const dropdownMenuExamples = {
  "dropdown-menu-demo": {
    component: DropdownMenuDemo,
    code: dropdownMenuDemoCode,
  },
  "dropdown-menu-selection": {
    component: DropdownMenuSelection,
    code: dropdownMenuSelectionCode,
  },
  "dropdown-menu-variants": {
    component: DropdownMenuVariants,
    code: dropdownMenuVariantsCode,
  },
} as const
