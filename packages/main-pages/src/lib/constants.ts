import { readdirSync } from "fs";
import { join, resolve, parse } from "path";

/* TODO: env化する */
export const BASE_PATH = '/TakakiAraki09';

export const PACKAGE_ROOT = resolve();
export const PROJECT_ROOT = join(PACKAGE_ROOT, '../..');

export const BLOG_CONTENTS = readdirSync(join(PACKAGE_ROOT, 'src/pages/blog')).map(val => join('blog', parse(val).name));

