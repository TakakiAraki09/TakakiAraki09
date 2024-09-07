import type { CodegenConfig } from '@graphql-codegen/cli';

const graphqlEndpoint =
  'https://raw.githubusercontent.com/ci7lus/miraktest-plugins/cabde97b252529783d44db8fd1260877e1f33bc5/src/miraktest-annict/schema.graphql';

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
    [graphqlEndpoint]: {},
  },
  documents: ['./app/**/*.ts', './app/**/*.tsx'],
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
