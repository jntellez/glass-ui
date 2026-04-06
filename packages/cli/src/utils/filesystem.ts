import fs from "node:fs"
import path from "node:path"

function resolveFromBaseDir(filePath: string, baseDir = process.cwd()) {
  return path.resolve(baseDir, filePath)
}

/**
 * Escribe contenido en un archivo, creando directorios si no existen.
 * Compatible con Node.js
 */
export async function writeFile(filePath: string, content: string, baseDir = process.cwd()) {
  const absolutePath = resolveFromBaseDir(filePath, baseDir)
  const dir = path.dirname(absolutePath)

  // Crear directorio si no existe (recursivo)
  if (!fs.existsSync(dir)) {
    await fs.promises.mkdir(dir, { recursive: true })
  }

  // Escribir archivo
  await fs.promises.writeFile(absolutePath, content, "utf-8")
  return absolutePath
}

/**
 * Lee un archivo local.
 */
export async function readFile(filePath: string, baseDir = process.cwd()): Promise<string> {
  const absolutePath = resolveFromBaseDir(filePath, baseDir)

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${filePath}`)
  }

  return await fs.promises.readFile(absolutePath, "utf-8")
}

/**
 * Verifica si un archivo existe (Síncrono para facilitar los ifs en init/add)
 */
export function exists(filePath: string, baseDir = process.cwd()): boolean {
  return fs.existsSync(resolveFromBaseDir(filePath, baseDir))
}
