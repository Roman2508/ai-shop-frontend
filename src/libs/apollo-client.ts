import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
  credentials: 'include',
  headers: {
    'apollo-require-preflight': 'true',
  },
})

const splitLink = split(({ query }) => {
  const definition = getMainDefinition(query)
  console.log(definition)
  return definition.kind === 'OperationDefinition'
  // && definition.operation === 'subscription'
}, httpLink)

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
