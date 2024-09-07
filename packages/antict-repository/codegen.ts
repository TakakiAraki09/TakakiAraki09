import type { CodegenConfig } from '@graphql-codegen/cli';

const graphqlEndpoint =
  'https://raw.githubusercontent.com/ci7lus/miraktest-plugins/cabde97b252529783d44db8fd1260877e1f33bc5/src/miraktest-annict/schema.graphql';

const config = {
  schema: {
    [graphqlEndpoint]: {},
  },
  documents: ['./src/**/*.ts', './src/**/*.tsx'],
  ignoreNoDocuments: true,
  generates: {
    'schema.generated.json': {
      plugins: ['introspection'],
    },
    'gql/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
} as const satisfies CodegenConfig;

export default config;
