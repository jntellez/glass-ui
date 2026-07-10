import CommandDemo from "./command-demo"
import commandDemoCode from "./command-demo.tsx?raw"

import CommandDialog from "./command-dialog"
import commandDialogCode from "./command-dialog.tsx?raw"

import CommandGroups from "./command-groups"
import commandGroupsCode from "./command-groups.tsx?raw"

export const commandExamples = {
  "command-demo": {
    component: CommandDemo,
    code: commandDemoCode,
  },
  "command-dialog": {
    component: CommandDialog,
    code: commandDialogCode,
  },
  "command-groups": {
    component: CommandGroups,
    code: commandGroupsCode,
  },
} as const
