import {
  registryIndexSchema,
  type RegistryIndex,
  type RegistryItem,
} from "@glass-ui-kit/schema";

const REGISTRY_URL = "https://ui-glass.vercel.app/registry.json";

export async function fetchRegistry(): Promise<RegistryIndex> {
  try {
    const response = await fetch(REGISTRY_URL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch registry from ${REGISTRY_URL}. Status: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    // Validate data against the shared schema
    const parsedRegistry = registryIndexSchema.safeParse(data);

    if (!parsedRegistry.success) {
      console.error(
        "❌ Registry schema validation failed:",
        parsedRegistry.error.format(),
      );
      throw new Error("Invalid registry format received from server.");
    }

    return parsedRegistry.data;
  } catch (error) {
    // Re-throw with a clean message for the CLI consumer
    if (error instanceof Error) {
      throw new Error(`Registry connection failed: ${error.message}`);
    }
    throw new Error("Unknown error while connecting to registry.");
  }
}

export function getItem(
  registry: RegistryIndex,
  name: string,
): RegistryItem | undefined {
  return registry.find((item) => item.name === name);
}
