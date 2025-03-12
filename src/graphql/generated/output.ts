import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type ChangeEmailInput = {
  email: Scalars['String']['input'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type CreateOrderInput = {
  items: Array<OrderItemDto>;
  status: Scalars['String']['input'];
};

export type CreateProductInput = {
  battery: Scalars['Float']['input'];
  brand: Scalars['String']['input'];
  builtInMemory: Scalars['Float']['input'];
  color: Scalars['String']['input'];
  deliverySet: Scalars['String']['input'];
  frontCamera: Scalars['Float']['input'];
  images: Array<Scalars['String']['input']>;
  mainCamera: Scalars['Float']['input'];
  materials: Scalars['String']['input'];
  os: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  processorCores: Scalars['String']['input'];
  processorName: Scalars['String']['input'];
  ram: Scalars['Float']['input'];
  screenDiagonal: Scalars['Float']['input'];
  simCount: Scalars['Float']['input'];
  simFormat: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateReviewInput = {
  productId: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
  text: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DeviceModel = {
  __typename?: 'DeviceModel';
  browser: Scalars['String']['output'];
  os: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type LocationModel = {
  __typename?: 'LocationModel';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type LoginInput = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeEmail: Scalars['Boolean']['output'];
  changePassword: Scalars['Boolean']['output'];
  clearSessionCookie: Scalars['Boolean']['output'];
  createManyProducts: Scalars['Boolean']['output'];
  createPayment: Scalars['Boolean']['output'];
  createProduct: ProductModel;
  createReview: Scalars['Boolean']['output'];
  createUser: Scalars['Boolean']['output'];
  deleteReview: Scalars['Boolean']['output'];
  loginUser: UserModel;
  logoutUser: Scalars['Boolean']['output'];
  removeSession: Scalars['Boolean']['output'];
  toggleFavorite: Scalars['Boolean']['output'];
  updateProduct: ProductModel;
  updateStatus: Scalars['Boolean']['output'];
  uploadFile: Scalars['String']['output'];
};


export type MutationChangeEmailArgs = {
  data: ChangeEmailInput;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationCreatePaymentArgs = {
  data: CreateOrderInput;
};


export type MutationCreateProductArgs = {
  data: CreateProductInput;
};


export type MutationCreateReviewArgs = {
  data: CreateReviewInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteReviewArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  data: LoginInput;
};


export type MutationRemoveSessionArgs = {
  id: Scalars['String']['input'];
};


export type MutationToggleFavoriteArgs = {
  data: Scalars['String']['input'];
};


export type MutationUpdateProductArgs = {
  productId: Scalars['String']['input'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload']['input'];
};

export type OrderItemDto = {
  price: Scalars['Float']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
};

export type PaginateAndFilterInput = {
  battery?: InputMaybe<Scalars['String']['input']>;
  brand?: InputMaybe<Scalars['String']['input']>;
  builtInMemory?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  deliverySet?: InputMaybe<Scalars['String']['input']>;
  frontCamera?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mainCamera?: InputMaybe<Scalars['String']['input']>;
  materials?: InputMaybe<Scalars['String']['input']>;
  os?: InputMaybe<Scalars['String']['input']>;
  priceFrom?: InputMaybe<Scalars['Int']['input']>;
  priceTo?: InputMaybe<Scalars['Int']['input']>;
  processorCores?: InputMaybe<Scalars['String']['input']>;
  processorName?: InputMaybe<Scalars['String']['input']>;
  ram?: InputMaybe<Scalars['String']['input']>;
  screenDiagonal?: InputMaybe<Scalars['String']['input']>;
  simCount?: InputMaybe<Scalars['String']['input']>;
  simFormat?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type ProductModel = {
  __typename?: 'ProductModel';
  battery: Scalars['Float']['output'];
  brand: Scalars['String']['output'];
  builtInMemory: Scalars['Float']['output'];
  color: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deliverySet: Scalars['String']['output'];
  frontCamera: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  mainCamera: Scalars['Float']['output'];
  materials: Scalars['String']['output'];
  os: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  processorCores: Scalars['String']['output'];
  processorName: Scalars['String']['output'];
  ram: Scalars['Float']['output'];
  screenDiagonal: Scalars['Float']['output'];
  simCount: Scalars['Float']['output'];
  simFormat: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductsAndTotalModel = {
  __typename?: 'ProductsAndTotalModel';
  products: Array<ProductModel>;
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAllUsers: Array<UserModel>;
  findCurrentSession: SessionModel;
  findProfile: UserModel;
  findSessionsByUser: Array<SessionModel>;
  getAllProducts: ProductsAndTotalModel;
  getMostPopularProducts: Array<ProductModel>;
  getProductById: ProductModel;
  getSimilarProducts: ProductModel;
  paginateAndFilter: ProductsAndTotalModel;
  searchProduct: Array<ProductModel>;
};


export type QueryGetProductByIdArgs = {
  productId: Scalars['String']['input'];
};


export type QueryGetSimilarProductsArgs = {
  productId: Scalars['String']['input'];
};


export type QueryPaginateAndFilterArgs = {
  data: PaginateAndFilterInput;
};


export type QuerySearchProductArgs = {
  data: Scalars['String']['input'];
};

export type SessionMetadataModel = {
  __typename?: 'SessionMetadataModel';
  device: DeviceModel;
  ip: Scalars['String']['output'];
  location: LocationModel;
};

export type SessionModel = {
  __typename?: 'SessionModel';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata: SessionMetadataModel;
  userId: Scalars['String']['output'];
};

export type UserModel = {
  __typename?: 'UserModel';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UserModel', username: string, email: string, displayName: string } };

export type RegisterMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', createUser: boolean };

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile: string };

export type FindAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllUsersQuery = { __typename?: 'Query', findAllUsers: Array<{ __typename?: 'UserModel', id: string, username: string, displayName: string, email: string }> };

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { __typename?: 'Query', getAllProducts: { __typename?: 'ProductsAndTotalModel', total: number, products: Array<{ __typename?: 'ProductModel', id: string, title: string, price: number, brand: string, frontCamera: number, mainCamera: number, ram: number, color: string, builtInMemory: number, processorName: string, processorCores: string, os: string, deliverySet: string, materials: string, simCount: number, simFormat: Array<string>, images: Array<string>, battery: number, createdAt: any, screenDiagonal: number, updatedAt: any }> } };

export type GetProductByIdQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', getProductById: { __typename?: 'ProductModel', id: string, title: string, price: number, brand: string, frontCamera: number, mainCamera: number, ram: number, color: string, builtInMemory: number, processorName: string, processorCores: string, os: string, deliverySet: string, materials: string, simCount: number, simFormat: Array<string>, images: Array<string>, battery: number, createdAt: any, screenDiagonal: number, updatedAt: any } };

export type PaginateAndFilterProductsQueryVariables = Exact<{
  query: PaginateAndFilterInput;
}>;


export type PaginateAndFilterProductsQuery = { __typename?: 'Query', paginateAndFilter: { __typename?: 'ProductsAndTotalModel', total: number, products: Array<{ __typename?: 'ProductModel', id: string, title: string, price: number, brand: string, frontCamera: number, mainCamera: number, ram: number, color: string, builtInMemory: number, processorName: string, processorCores: string, os: string, deliverySet: string, materials: string, simCount: number, simFormat: Array<string>, images: Array<string>, battery: number, createdAt: any, screenDiagonal: number, updatedAt: any }> } };


export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  loginUser(data: $data) {
    username
    email
    displayName
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: CreateUserInput!) {
  createUser(data: $data)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UploadFileDocument = gql`
    mutation UploadFile($file: Upload!) {
  uploadFile(file: $file)
}
    `;
export type UploadFileMutationFn = Apollo.MutationFunction<UploadFileMutation, UploadFileMutationVariables>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, options);
      }
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<UploadFileMutation, UploadFileMutationVariables>;
export const FindAllUsersDocument = gql`
    query findAllUsers {
  findAllUsers {
    id
    username
    displayName
    email
  }
}
    `;

/**
 * __useFindAllUsersQuery__
 *
 * To run a query within a React component, call `useFindAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<FindAllUsersQuery, FindAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllUsersQuery, FindAllUsersQueryVariables>(FindAllUsersDocument, options);
      }
export function useFindAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllUsersQuery, FindAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllUsersQuery, FindAllUsersQueryVariables>(FindAllUsersDocument, options);
        }
export function useFindAllUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllUsersQuery, FindAllUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllUsersQuery, FindAllUsersQueryVariables>(FindAllUsersDocument, options);
        }
export type FindAllUsersQueryHookResult = ReturnType<typeof useFindAllUsersQuery>;
export type FindAllUsersLazyQueryHookResult = ReturnType<typeof useFindAllUsersLazyQuery>;
export type FindAllUsersSuspenseQueryHookResult = ReturnType<typeof useFindAllUsersSuspenseQuery>;
export type FindAllUsersQueryResult = Apollo.QueryResult<FindAllUsersQuery, FindAllUsersQueryVariables>;
export const GetAllProductsDocument = gql`
    query getAllProducts {
  getAllProducts {
    products {
      id
      title
      price
      brand
      frontCamera
      mainCamera
      ram
      color
      builtInMemory
      processorName
      processorCores
      os
      deliverySet
      materials
      simCount
      simFormat
      images
      battery
      createdAt
      screenDiagonal
      updatedAt
    }
    total
  }
}
    `;

/**
 * __useGetAllProductsQuery__
 *
 * To run a query within a React component, call `useGetAllProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
      }
export function useGetAllProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
        }
export function useGetAllProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
        }
export type GetAllProductsQueryHookResult = ReturnType<typeof useGetAllProductsQuery>;
export type GetAllProductsLazyQueryHookResult = ReturnType<typeof useGetAllProductsLazyQuery>;
export type GetAllProductsSuspenseQueryHookResult = ReturnType<typeof useGetAllProductsSuspenseQuery>;
export type GetAllProductsQueryResult = Apollo.QueryResult<GetAllProductsQuery, GetAllProductsQueryVariables>;
export const GetProductByIdDocument = gql`
    query GetProductById($productId: String!) {
  getProductById(productId: $productId) {
    id
    title
    price
    brand
    frontCamera
    mainCamera
    ram
    color
    builtInMemory
    processorName
    processorCores
    os
    deliverySet
    materials
    simCount
    simFormat
    images
    battery
    createdAt
    screenDiagonal
    updatedAt
  }
}
    `;

/**
 * __useGetProductByIdQuery__
 *
 * To run a query within a React component, call `useGetProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByIdQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetProductByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables> & ({ variables: GetProductByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
      }
export function useGetProductByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
        }
export function useGetProductByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
        }
export type GetProductByIdQueryHookResult = ReturnType<typeof useGetProductByIdQuery>;
export type GetProductByIdLazyQueryHookResult = ReturnType<typeof useGetProductByIdLazyQuery>;
export type GetProductByIdSuspenseQueryHookResult = ReturnType<typeof useGetProductByIdSuspenseQuery>;
export type GetProductByIdQueryResult = Apollo.QueryResult<GetProductByIdQuery, GetProductByIdQueryVariables>;
export const PaginateAndFilterProductsDocument = gql`
    query PaginateAndFilterProducts($query: PaginateAndFilterInput!) {
  paginateAndFilter(data: $query) {
    products {
      id
      title
      price
      brand
      frontCamera
      mainCamera
      ram
      color
      builtInMemory
      processorName
      processorCores
      os
      deliverySet
      materials
      simCount
      simFormat
      images
      battery
      createdAt
      screenDiagonal
      updatedAt
    }
    total
  }
}
    `;

/**
 * __usePaginateAndFilterProductsQuery__
 *
 * To run a query within a React component, call `usePaginateAndFilterProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginateAndFilterProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginateAndFilterProductsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function usePaginateAndFilterProductsQuery(baseOptions: Apollo.QueryHookOptions<PaginateAndFilterProductsQuery, PaginateAndFilterProductsQueryVariables> & ({ variables: PaginateAndFilterProductsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaginateAndFilterProductsQuery, PaginateAndFilterProductsQueryVariables>(PaginateAndFilterProductsDocument, options);
      }
export function usePaginateAndFilterProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginateAndFilterProductsQuery, PaginateAndFilterProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaginateAndFilterProductsQuery, PaginateAndFilterProductsQueryVariables>(PaginateAndFilterProductsDocument, options);
        }
export function usePaginateAndFilterProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PaginateAndFilterProductsQuery, PaginateAndFilterProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PaginateAndFilterProductsQuery, PaginateAndFilterProductsQueryVariables>(PaginateAndFilterProductsDocument, options);
        }
export type PaginateAndFilterProductsQueryHookResult = ReturnType<typeof usePaginateAndFilterProductsQuery>;
export type PaginateAndFilterProductsLazyQueryHookResult = ReturnType<typeof usePaginateAndFilterProductsLazyQuery>;
export type PaginateAndFilterProductsSuspenseQueryHookResult = ReturnType<typeof usePaginateAndFilterProductsSuspenseQuery>;
export type PaginateAndFilterProductsQueryResult = Apollo.QueryResult<PaginateAndFilterProductsQuery, PaginateAndFilterProductsQueryVariables>;