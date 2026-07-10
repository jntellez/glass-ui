import type { RegistryIndex } from "@glass-ui-kit/schema"

/**
 * MASTER REGISTRY INDEX
 * Aquí se definen manualmente los componentes disponibles.
 * El script de build leerá esto para generar el registry.json final.
 */
export const registry: RegistryIndex = [
  {
    name: "accordion",
    type: "registry:ui",
    dependencies: [
      "@radix-ui/react-accordion",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    files: [
      {
        path: "ui/accordion/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "badge",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/badge/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "button",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/button/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "card",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/card/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "checkbox",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/checkbox/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "collapsible",
    type: "registry:ui",
    dependencies: [
      "@radix-ui/react-collapsible",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    files: [
      {
        path: "ui/collapsible/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "color-picker",
    type: "registry:ui",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/color-picker/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "dialog",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-dialog", "class-variance-authority", "clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/dialog/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "dropdown-menu",
    type: "registry:ui",
    dependencies: [
      "@radix-ui/react-dropdown-menu",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    files: [
      {
        path: "ui/dropdown-menu/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "field",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/field/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "input",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/input/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "label",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/label/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "native-select",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/native-select/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "popover",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-popover", "class-variance-authority", "clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/popover/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "radio-group",
    type: "registry:ui",
    dependencies: [
      "@radix-ui/react-radio-group",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    files: [
      {
        path: "ui/radio-group/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "select",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-select", "class-variance-authority", "clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/select/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "slider",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-slider", "class-variance-authority", "clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/slider/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "switch",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-switch", "class-variance-authority", "clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/switch/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "tabs",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-tabs", "class-variance-authority", "clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/tabs/index.tsx",
        type: "client",
      },
    ],
  },
  {
    name: "textarea",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/textarea/index.tsx",
        type: "client",
      },
    ],
  },
]
