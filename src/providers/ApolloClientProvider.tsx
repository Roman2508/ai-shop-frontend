'use client'
import { ApolloProvider } from '@apollo/client'
import { client } from '../libs/apollo-client'
import React, { PropsWithChildren } from 'react'

const ApolloClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloClientProvider
