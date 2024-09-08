import { urqlClient } from './resources/urql';
import { graphql } from '@gql/index';
import { useCallback } from 'react';

// const gql = graphql(`
//   query LoginType {
//     viewer {
//       login
//     }
//   }
// `);

// k"StringValue"
const repositoryGql = graphql(`
query GetRepository($name: String!, $owner: String!){
	repository(name: $name, owner: $owner){
		createdAt
		issues(first: 3){
			nodes{
				url
				title
				closed
				number
			}
		}
	}
}
`)

const hogeGql = graphql(`
query User {
  user(login: "TakakiAraki09") {
      issues(first: 10) {
          nodes {
              title
          }
      }
      pullRequests(first: 10) {
          totalCount
      }
  }
}
`)

export function Github() {

  const query = useCallback(async () => {
    console.log(repositoryGql);
    const hoge = await urqlClient.query(repositoryGql, {
      name: 'TakakiAraki09',
      owner: 'TakakiAraki09',
    });
    console.log(hoge);
  }, []);

  const query2 = useCallback(async () => {
    console.log(hogeGql);
    const hoge = await urqlClient.query(hogeGql, {});
    console.log(hoge);
  }, []);

  return (
    <div>
      <p>Github</p>
      <button onClick={query}>send</button>
      <button onClick={query2}>send2</button>
    </div>
  );
};
