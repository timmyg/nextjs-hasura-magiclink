// import gql from 'graphql-tag'

// export default function Login() { 

//     // const gql = require('graphql-tag');
//     // A subscription query to get changes for author with parametrised id 
//     // using $id as a query variable
//     const SUBSCRIBE_QUERY = gql`
//     subscription liveActivity {
//         activities {
//             id
//             type
//         }
//     }
//     `;

//     const subscriptionClient = createSubscriptionObservable(
//     process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT, //   'https://test-gql-sub.herokuapp.com/v1alpha1/graphql', // GraphQL endpoint
//     SUBSCRIBE_QUERY,                                       // Subscription query
//     //   {id: 1}                                                // Query variables
//     );
//     var consumer = subscriptionClient.subscribe(eventData => {
//     // Do something on receipt of the event
//     console.log("Received event: ");
//     console.log(JSON.stringify(eventData, null, 2));
//     }, (err) => {
//     console.log('Err');
//     console.log(err);
//     });
// }