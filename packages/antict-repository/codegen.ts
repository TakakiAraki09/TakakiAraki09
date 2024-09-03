import type { CodegenConfig } from '@graphql-codegen/cli';

const graphqlEndpoint = 'https://docs.github.com/public/fpt/schema.docs.graphql'

const scalars = {
  Time: 'DateString',
  Date: 'DateString',
  ImagePath: 'ImgixImagePath',
  Uint: 'number',
  MarkDown: 'MarkdownString',
  JISX0402: 'string',
};

const config = {
  schema: {
    [graphqlEndpoint]: {
    },
  },
  documents: [
    './app/**/*.ts',
    './app/**/*.tsx',
  ],
  ignoreNoDocuments: true,
  generates: {
    'schema.generated.json': {
      plugins: ['introspection'],
    },
    'gql/': {
      preset: 'client',
      config: {
        scalars,
        useTypeImports: true,
      },
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
} as const satisfies CodegenConfig;

export default config;
