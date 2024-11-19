import { GITHUB_GRAPHQL_ENDPOINT } from '@/constants';
import { createClient, fetchExchange } from 'urql';


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
