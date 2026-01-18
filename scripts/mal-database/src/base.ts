import { resolve } from "path"

export const ROOT_DIR = resolve(import.meta.dirname, '..');
export const DIST_DIR = resolve(ROOT_DIR, 'dist');
export const createCache = (fileName: string) => resolve(DIST_DIR, fileName);
