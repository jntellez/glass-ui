import { z } from "zod";

export const registryTypeSchema = z.enum([
  "registry:ui",
  "registry:lib",
  "registry:hook",
  "registry:theme",
]);

export const registryItemSchema = z.object({
  name: z.string(),
  type: registryTypeSchema,
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(
    z.object({
      path: z.string(),
      content: z.string().optional(), // Se rellena en build-time
      type: z.enum(["client", "server"]).default("client"), // Future-proofing para RSC
    }),
  ),
  meta: z
    .object({
      // Metadatos específicos para Glass UI (ej. si requiere backdrop-filter específico)
      requiresBlur: z.boolean().default(true),
    })
    .optional(),
});

export const registryIndexSchema = z.array(registryItemSchema);

export type RegistryItem = z.infer<typeof registryItemSchema>;
export type RegistryIndex = z.infer<typeof registryIndexSchema>;
export type RegistryType = z.infer<typeof registryTypeSchema>;
