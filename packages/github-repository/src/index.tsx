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

const repositoryGql = graphql(`
query GetRepository{
	repository(name: "TakakiAraki09", owner: "TakakiAraki09"){
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

export function Github() {
  const query = useCallback(async () => {
    const hoge = await urqlClient.query(repositoryGql, {});
    console.log(hoge);
  }, []);

  return (
    <div>
      <p>Github</p>
      <button onClick={query}>send</button>
    </div>
  );
}
