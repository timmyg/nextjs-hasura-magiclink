import { Provider as ReduxProvider } from 'react-redux'
import { useStore } from '../state/store'
// Remove the apollo-boost import and change to this:
import ApolloClient from "apollo-client";
// // Setup the network "links"
import { WebSocketLink } from 'apollo-link-ws';
// import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import * as ws from 'ws';
var WebSocketClient = require('websocket').client;
// // import ws from 'ws'
// const WebSocketClient = require('websocket').client;
// import { SubscriptionClient, addGraphQLSubscriptions } from "subscriptions-transport-ws";



// console.log(process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT,
//   process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT_WS,
//   process.env.NEXT_PUBLIC__HASURA_GRAPHQL_ADMIN_SECRET);

// const httpLink = new HttpLink({
//   uri :process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT, // use https for secure endpoint
// });

// // Create a WebSocket link:
// const wsLink = new WebSocketLink({
//   uri: process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT_WS, // use wss for a secure endpoint
//   options: {
//     reconnect: true
//   },
//   webSocketImpl: WebSocket,
//   connectionParams: {
//     headers: {
//       "x-hasura-admin-secret": process.env.NEXT_PUBLIC__HASURA_GRAPHQL_ADMIN_SECRET
//     }
//   }
// });

// const wsClient = new SubscriptionClient(process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT_WS, {
//   reconnect: true,
//   connectionParams: {
//     headers: {
//       "x-hasura-admin-secret": process.env.NEXT_PUBLIC__HASURA_GRAPHQL_ADMIN_SECRET
//     }
//   },
//     webSocketImpl: WebSocketClient,
// });

// // Extend the network interface with the WebSocket
// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
//   networkInterface,
//   wsClient
// );

// const wsLink = new WebSocketLink(wsClient);

// // using the ability to split links, you can send data to each link
// // depending on what kind of operation is being sent
// const link = split(
//   // split based on operation type
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query);
//     return kind === 'OperationDefinition' && operation === 'subscription';
//   },
//   wsLink,
//   httpLink,
// );

// // Instantiate client
// const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache(),
//   networkInterface: networkInterfaceWithSubscriptions,
//   request: (operation) => {
//     // const token = localStorage.getItem('token')
//     operation.setContext({
//       headers: {
//         "x-hasura-admin-secret": process.env.NEXT_PUBLIC__HASURA_GRAPHQL_ADMIN_SECRET
//       }
//     })
//   }
// })

import { SubscriptionClient } from 'subscriptions-transport-ws';
import { HttpLink } from 'apollo-boost';
// import ApolloClient from 'apollo-client';

// const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT_WS;

// const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
//   reconnect: true,
// }, ws);

// const apolloClient = new ApolloClient({
//     networkInterface: client,
//     link,
//     cache: new InMemoryCache(),
//     request: (operation) => {
//       // const token = localStorage.getItem('token')
//       operation.setContext({
//         headers: {
//           "x-hasura-admin-secret": process.env.NEXT_PUBLIC__HASURA_GRAPHQL_ADMIN_SECRET
//         }
//       })
//     }
// });

const wsLink = process.browser ? new WebSocketLink({ // if you instantiate in the server, the error will be thrown
  uri: process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT_WS,
  options: {
    reconnect: true
  }
}) : null;

const httplink = new HttpLink({
	uri: process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT,
	// credentials: 'same-origin'
});

const link = process.browser ? split( //only create the split in the browser
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httplink,
) : httplink;

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  // networkInterface: networkInterfaceWithSubscriptions,
  request: (operation) => {
    // const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        "x-hasura-admin-secret": process.env.NEXT_PUBLIC__HASURA_GRAPHQL_ADMIN_SECRET
      }
    })
  }
})

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  return (
    <ApolloProvider client={apolloClient}>
      <ReduxProvider store={store}>
        <Component {...pageProps} />
      </ReduxProvider>
    </ApolloProvider>
  )
}
