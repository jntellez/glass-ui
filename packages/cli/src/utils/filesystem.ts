import path from "node:path";
import { existsSync, mkdirSync } from "node:fs";

/**
 * Escribe contenido en un archivo, creando directorios si no existen.
 * Usa Bun.write para máximo rendimiento.
 */
export async function writeFile(filePath: string, content: string) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const dir = path.dirname(absolutePath);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  await Bun.write(absolutePath, content);
  return absolutePath;
}

/**
 * Lee un archivo local.
 */
export async function readFile(filePath: string): Promise<string> {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const file = Bun.file(absolutePath);

  if (!(await file.exists())) {
    throw new Error(`File not found: ${filePath}`);
  }

  return await file.text();
}

/**
 * Verifica si un archivo existe.
 */
export function exists(filePath: string): boolean {
  return existsSync(path.resolve(process.cwd(), filePath));
}
