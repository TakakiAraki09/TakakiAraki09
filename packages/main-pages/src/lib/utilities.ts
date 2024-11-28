import { BASE_PATH } from './constants';
import { join } from 'path';

export const createPath = (path: string) => join(BASE_PATH, path);
