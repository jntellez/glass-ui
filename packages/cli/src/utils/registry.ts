import {
  registryIndexSchema,
  type RegistryIndex,
  type RegistryItem,
} from "@glass-ui-kit/schema";

// Placeholder: En producción esto apuntará a glassui.dev/registry.json
const REGISTRY_URL = "https://glass-ui-kit.vercel.app/registry.json";

export async function fetchRegistry(): Promise<RegistryIndex> {
  try {
    const response = await fetch(REGISTRY_URL);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return registryIndexSchema.parse(data);
  } catch (error) {
    // FALLBACK MOCK: Para permitir probar el CLI antes de desplegar la web
    // Esto simula que el registry ya tiene un componente.
    return [
      {
        name: "glass-card",
        type: "registry:ui",
        dependencies: ["clsx", "tailwind-merge"],
        files: [
          {
            path: "glass-card.tsx",
            type: "client",
            content: `import { cn } from "@/lib/utils";

export function GlassCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-glass-surface border border-glass-border backdrop-blur-glass p-6 rounded-xl", className)} {...props}>
      {children}
    </div>
  );
}`,
          },
        ],
      },
    ];
  }
}

export function getItem(
  registry: RegistryIndex,
  name: string,
): RegistryItem | undefined {
  return registry.find((item) => item.name === name);
}
