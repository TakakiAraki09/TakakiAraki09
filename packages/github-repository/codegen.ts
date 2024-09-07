import type { CodegenConfig } from '@graphql-codegen/cli';

const graphqlEndpoint =
  'https://docs.github.com/public/fpt/schema.docs.graphql';

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
