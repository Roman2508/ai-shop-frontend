'use client'
import { ApolloProvider } from '@apollo/client'
import React, { PropsWithChildren } from 'react'

import { client } from '../libs/apollo-client'

const ApolloClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloClientProvider
