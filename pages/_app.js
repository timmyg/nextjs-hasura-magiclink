import { Provider as ReduxProvider } from 'react-redux'
import { useStore } from '../state/store'
import apolloClient from '../utils/apolloClient'
import { ApolloProvider } from '@apollo/react-hooks'
 
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
