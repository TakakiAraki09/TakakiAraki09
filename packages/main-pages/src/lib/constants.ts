import { join, resolve } from 'path';

/* TODO: env化する */
export const BASE_PATH = '/TakakiAraki09';

export const PACKAGE_ROOT = resolve();
export const PROJECT_ROOT = join(PACKAGE_ROOT, '../..');
export const BLOG_CONTENT_PATH = join(PACKAGE_ROOT, 'src/pages/blog');
