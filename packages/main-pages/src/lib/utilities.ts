import { join } from "path";
import { BASE_PATH } from "./constants";

export const createPath = (path: string) => join(BASE_PATH, path);
