import { createClient, fetchExchange } from 'urql';
import { GITHUB_GRAPHQL_ENDPOINT } from '../constants';

export const urqlClient = createClient({
  url: GITHUB_GRAPHQL_ENDPOINT,
  exchanges: [fetchExchange],
  fetchOptions: () => {
    const token = '';
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  },
});
