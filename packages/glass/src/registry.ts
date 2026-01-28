import type { RegistryIndex } from "@glass-ui-kit/schema";

/**
 * MASTER REGISTRY INDEX
 * Aquí se definen manualmente los componentes disponibles.
 * El script de build leerá esto para generar el registry.json final.
 */
export const registry: RegistryIndex = [
  {
    name: "card",
    type: "registry:ui",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/card.tsx",
        type: "client",
      },
    ],
  },
];
