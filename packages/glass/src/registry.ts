import type { RegistryIndex } from "@glass-ui-kit/schema"

/**
 * MASTER REGISTRY INDEX
 * Aquí se definen manualmente los componentes disponibles.
 * El script de build leerá esto para generar el registry.json final.
 */
export const registry: RegistryIndex = [
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
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/button/index.tsx",
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
