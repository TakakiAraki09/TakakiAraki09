import { GITHUB_GRAPHQL_ENDPOINT } from '@/constants';
import { createContext, useContext } from 'react';
import { type Client, createClient, fetchExchange } from 'urql';

//
// const getToken = () => '';
// curl -H "Authorization: bearer TOKEN" -X POST -d " \
// https://commerce.nearform.com/open-source/urql/docs/basics/react-preact/
// fetchOptions: () => {
//   const token = getToken();
//   return {
//     headers: { authorization: token ? `Bearer ${token}` : '' },
//   };
// },
//

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

const urqlContext = createContext<Client | null>(null);
export const useUrqlClient = () => {
  const ctx = useContext(urqlContext);
  if (ctx == null)
    throw new Error('useUrqlClient must be used inside a UrqlProvider');
  return ctx;
};
