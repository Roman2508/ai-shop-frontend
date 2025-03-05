import { CodegenConfig } from './node_modules/@graphql-codegen/cli/typings/config.d'

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_SERVER_URL,
  documents: './src/graphql/**/*.graphql',
  generates: {
    'src/graphql/generated/output.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
  ignoreNoDocuments: true,
}

export default config
