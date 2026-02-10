import { Config } from "./get-project-info";

/**
 * Transforma los imports del código fuente para que coincidan con los alias del usuario.
 * @param content El contenido crudo del archivo (leído desde tu monorepo)
 * @param config La configuración del usuario (glass.config.json)
 */
export function transformImports(content: string, config: Config): string {
  let transformed = content;

  // 1. Reemplazo para 'utils' (cn, clsx, etc.)
  // Busca: import ... from "../lib/utils" O import ... from "../../lib/utils"
  // Reemplaza por: import ... from "@/lib/utils" (o lo que diga la config)
  transformed = transformed.replace(
    /from\s+["'](\.\.\/)+lib\/utils["']/g,
    `from "${config.aliases.utils}"`,
  );

  // (Opcional) Soporte por si alguna vez usas el alias interno ~glass
  transformed = transformed.replace(
    /from\s+["']~glass\/lib\/utils["']/g,
    `from "${config.aliases.utils}"`,
  );

  // 2. Reemplazo para componentes UI internos (Componentes compuestos)
  // Caso de uso: Un componente complejo importa otro componente simple.
  // Origen: import { Button } from "../ui/button"
  // Destino: import { Button } from "@/components/ui/button"
  transformed = transformed.replace(
    /from\s+["'](\.\.\/)+ui\/([\w-]+)["']/g,
    (match, prefix, componentName) => {
      // Quitamos la extensión si viniera (raro en imports, pero por seguridad)
      const cleanName = componentName.replace(/\.tsx?$/, "");
      return `from "${config.aliases.components}/${cleanName}"`;
    },
  );

  return transformed;
}
