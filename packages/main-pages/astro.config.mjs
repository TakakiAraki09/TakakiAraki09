// @ts-check
import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';

import react from '@astrojs/react';
import remarkVideoPlugin from './lib/remark/video';


// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE,
  base: process.env.PUBLIC_SITE_BASE,
  integrations: [
    react({
      experimentalReactChildren: true,
    })
  ],
   markdown: {
     remarkPlugins: [
       remarkDirective,
       [remarkVideoPlugin, { baseURL: import.meta.env.BASE_URL }],
     ],
   },
});
