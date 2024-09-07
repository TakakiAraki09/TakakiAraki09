import { LoginTypeQuery } from '@gql/graphql';
import { graphql } from '@gql/index';

const gql = graphql(`
  query LoginType {
    viewer {
      login
    }
  }
`);

const type: LoginTypeQuery = {
  viewer: {
    login: '',
  },
};
console.log(type, gql);

export const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';
