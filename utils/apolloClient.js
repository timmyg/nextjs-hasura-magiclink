import ApolloClient from "apollo-client";
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-boost';

const wsLink = process.browser ? new WebSocketLink({ // if you instantiate in the server, the error will be thrown
  uri: process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT_WS,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": process.env.NEXT_PUBLIC__HASURA_GRAPHQL_ADMIN_SECRET,
        Authorization: "Bearer xxxxx"
      }
    },
  },
}) : null;

const httplink = new HttpLink({
	uri: process.env.NEXT_PUBLIC__GRAPHQL_ENDPOINT,
});

const link = process.browser ? split( //only create the split in the browser
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
  request: (operation) => {
    operation.setContext({
      headers: {
        "x-hasura-admin-secret": process.env.NEXT_PUBLIC__HASURA_GRAPHQL_ADMIN_SECRET
      }
    })
  }
})

export default apolloClient;