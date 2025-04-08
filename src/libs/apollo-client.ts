import { ApolloClient, InMemoryCache } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

export const client = new ApolloClient({
  link: createUploadLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: 'include',
    headers: {
      'apollo-require-preflight': 'true',
    },
  }),
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
  credentials: 'include',
  cache: new InMemoryCache(),
})
