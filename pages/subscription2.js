import { useQuery } from 'urql';

export default function Login() { 
    const [res, executeQuery] = useQuery({
      query: `
        query { activities { id } }
      `,
    });
    console.log({res});
    if (res.fetching) return <p>Loading...</p>;
    if (res.error) return <p>Errored!</p>;
    return (
      <ul>
        {res.data.activities.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    );
  };

// // import { useMutation, useSubscription } from "@apollo/react-hooks";
// import gql from 'graphql-tag'
// import ApolloClient from 'apollo-boost';
// const client = new ApolloClient({
//     uri:  process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT
// });

// const SUBSCRIBE_QUERY = gql`
// subscription liveActivity {
//     activities {
//         id
//         type
//     }
// }
// `;

// export default function Login() { 
//     console.log({client});
// //  client
// //   .subscription({subscription: SUBSCRIBE_QUERY})
// //   .then(result => console.log(result));

//     // const { loading, error, data } = useSubscription(
//     //     gql`
//     //     subscription liveActivity {
//     //         activities {
//     //             id
//     //             type
//     //         }
//     //     }
//     //     `
//     //   );
    
//     //   if (loading) {
//     //     return <span>Loading...</span>;
//     //   }
//     //   if (error) {
//     //     console.error(error);
//     //     return <span>Error!</span>;
//     //   }
//     //   if (data) {
//     //     console.log({data});
//     //     onlineUsersList = data.online_users.map(u => (
//     //       <OnlineUser key={u.id} user={u.user} />
//     //     ));
//     //   }
    
//     //   return (
//     //     <div className="onlineUsersWrapper">
//     //       <Fragment>
//     //         <div className="sliderHeader">
//     //           Online users - {onlineUsersList.length}
//     //         </div>
//     //         {onlineUsersList}
//     //       </Fragment>
//     //     </div>
//     //   );
//     return (<>hello!</>)
// };