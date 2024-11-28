/// <reference types="mdast-util-directive" />
import type { ElementContent } from 'hast';
import type { Root } from 'mdast';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { visit } from 'unist-util-visit';

interface Props {
  baseURL: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function remarkVideoPlugin({ baseURL }: Props) {
  return function (tree: Root) {
    visit(tree, 'leafDirective', (node) => {
      if (node.name !== 'video') return;
      if (!node.attributes?.src) return;

      // webm の存在チェックのためにパスを構築する
      const mp4VideoPath = path.join(
        __dirname,
        '../../../public',
        node.attributes.src
      );
      const webmVideoPath = `${mp4VideoPath.slice(0, -3)}webm`;
      const mp4VideoUrl = path.join(baseURL, node.attributes.src);

      const sources: ElementContent[] = [];
      if (fs.existsSync(webmVideoPath)) {
        sources.push({
          type: 'element',
          tagName: 'source',
          properties: {
            src: `${mp4VideoUrl.slice(0, -3)}webm`,
            type: 'video/webm',
          },
          children: [],
        });
      }
      sources.push({
        type: 'element',
        tagName: 'source',
        properties: {
          src: mp4VideoUrl,
          type: 'video/mp4',
        },
        children: [],
      });

      node.data = {
        hName: 'div',
        hProperties: {
          class: ['mb-8', 'flex', 'justify-center'],
        },
        hChildren: [
          {
            type: 'element',
            tagName: 'video',
            properties: {
              controls: true,
              preload: 'metadata',
            },
            children: sources,
          },
        ],
      };
    });
  };
}
