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

export type AddToCartInput = {
  count: Scalars['Float']['input'];
  productId: Scalars['String']['input'];
};

export type AddToViewedInput = {
  productId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CartItemModel = {
  __typename?: 'CartItemModel';
  count: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  product: ProductModel;
  productId: Scalars['String']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type ChangeCartItemCountInput = {
  count: Scalars['Float']['input'];
  id: Scalars['String']['input'];
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
  orderId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateProductInput = {
  battery: Scalars['Float']['input'];
  brand: Scalars['String']['input'];
  builtInMemory: Scalars['Float']['input'];
  color: Scalars['String']['input'];
  deliverySet: Scalars['String']['input'];
  frontCamera: Scalars['Float']['input'];
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

export enum EnumOrderStatus {
  Delivered = 'DELIVERED',
  Payed = 'PAYED',
  Pending = 'PENDING'
}

export enum EnumUserRoles {
  Admin = 'ADMIN',
  User = 'USER'
}

export type FavoriteItemModel = {
  __typename?: 'FavoriteItemModel';
  id: Scalars['ID']['output'];
  product: ProductModel;
  productId: Scalars['String']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
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
  addProductPhoto: Scalars['Boolean']['output'];
  addProductToViewed: Scalars['Boolean']['output'];
  changeCartItemCount: Scalars['Boolean']['output'];
  changeEmail: Scalars['Boolean']['output'];
  changePassword: Scalars['Boolean']['output'];
  clearSessionCookie: Scalars['Boolean']['output'];
  createAllEmbeddings: Scalars['Boolean']['output'];
  createManyProducts: Scalars['Boolean']['output'];
  createOrder: OrderModel;
  createProduct: ProductModel;
  createReview: Scalars['Boolean']['output'];
  createUser: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
  deleteReview: Scalars['Boolean']['output'];
  loginUser: UserModel;
  logoutUser: Scalars['Boolean']['output'];
  removeProductPhoto: Scalars['Boolean']['output'];
  removeSession: Scalars['Boolean']['output'];
  toggleCart: Scalars['Boolean']['output'];
  toggleFavorite: Scalars['Boolean']['output'];
  updateProduct: ProductModel;
  updateUserData: Scalars['Boolean']['output'];
  updateUserRole: Scalars['Boolean']['output'];
  uploadAvatar: Scalars['Boolean']['output'];
  uploadFile: Scalars['String']['output'];
};


export type MutationAddProductPhotoArgs = {
  file: Scalars['Upload']['input'];
  productId: Scalars['String']['input'];
};


export type MutationAddProductToViewedArgs = {
  input: AddToViewedInput;
};


export type MutationChangeCartItemCountArgs = {
  input: ChangeCartItemCountInput;
};


export type MutationChangeEmailArgs = {
  data: ChangeEmailInput;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationCreateOrderArgs = {
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


export type MutationDeleteProductArgs = {
  productId: Scalars['String']['input'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  data: LoginInput;
};


export type MutationRemoveProductPhotoArgs = {
  filename: Scalars['String']['input'];
  productId: Scalars['String']['input'];
};


export type MutationRemoveSessionArgs = {
  id: Scalars['String']['input'];
};


export type MutationToggleCartArgs = {
  input: AddToCartInput;
};


export type MutationToggleFavoriteArgs = {
  productId: Scalars['String']['input'];
};


export type MutationUpdateProductArgs = {
  data: UpdateProductInput;
};


export type MutationUpdateUserDataArgs = {
  user: UpdateUserInput;
};


export type MutationUpdateUserRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationUploadAvatarArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload']['input'];
};

export type OrderItemDto = {
  price: Scalars['Float']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
};

export type OrderItemModel = {
  __typename?: 'OrderItemModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  order: OrderModel;
  orderId: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  product: ProductModel;
  productId: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderModel = {
  __typename?: 'OrderModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  items: Array<OrderItemModel>;
  orderId: Scalars['String']['output'];
  status: EnumOrderStatus;
  total: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
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
  reviews: Array<ReviewModel>;
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
  getAllOrders: Array<OrderModel>;
  getAllProducts: ProductsAndTotalModel;
  getAllProductsCount: Scalars['Float']['output'];
  getAverageRating: Scalars['Float']['output'];
  getMostPopularProducts: Array<ProductModel>;
  getProductById: ProductModel;
  getReviewByUserId: Array<ReviewModel>;
  getSimilarProducts: Array<ProductModel>;
  paginateAndFilter: ProductsAndTotalModel;
  searchProduct: Array<ProductModel>;
};


export type QueryGetAllProductsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetProductByIdArgs = {
  productId: Scalars['String']['input'];
};


export type QueryGetSimilarProductsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryPaginateAndFilterArgs = {
  data: PaginateAndFilterInput;
};


export type QuerySearchProductArgs = {
  data: Scalars['String']['input'];
};

export type ReviewModel = {
  __typename?: 'ReviewModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  product: ProductModel;
  productId: Scalars['String']['output'];
  rating: Scalars['Float']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
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

export type UpdateProductInput = {
  battery?: InputMaybe<Scalars['Float']['input']>;
  brand?: InputMaybe<Scalars['String']['input']>;
  builtInMemory?: InputMaybe<Scalars['Float']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  deliverySet?: InputMaybe<Scalars['String']['input']>;
  frontCamera?: InputMaybe<Scalars['Float']['input']>;
  mainCamera?: InputMaybe<Scalars['Float']['input']>;
  materials?: InputMaybe<Scalars['String']['input']>;
  os?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  processorCores?: InputMaybe<Scalars['String']['input']>;
  processorName?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['String']['input'];
  ram?: InputMaybe<Scalars['Float']['input']>;
  screenDiagonal?: InputMaybe<Scalars['Float']['input']>;
  simCount?: InputMaybe<Scalars['Float']['input']>;
  simFormat?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRoleInput = {
  id: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type UpdateUserInput = {
  city: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  postOffice: Scalars['String']['input'];
  street: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserModel = {
  __typename?: 'UserModel';
  avatar?: Maybe<Scalars['String']['output']>;
  cart: Array<CartItemModel>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  favorites: Array<FavoriteItemModel>;
  id: Scalars['ID']['output'];
  orders: Array<OrderModel>;
  password: Scalars['String']['output'];
  postOffice?: Maybe<Scalars['String']['output']>;
  reviews: Array<ReviewModel>;
  role: EnumUserRoles;
  street?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
  viewedProducts: Array<Scalars['String']['output']>;
};

export type ProductFragmentFragment = { __typename?: 'ProductModel', id: string, title: string, price: number, brand: string, frontCamera: number, mainCamera: number, ram: number, color: string, builtInMemory: number, processorName: string, processorCores: string, os: string, deliverySet: string, materials: string, simCount: number, simFormat: Array<string>, images: Array<string>, battery: number, screenDiagonal: number, createdAt: any, updatedAt: any };

export type ClearSessionCookieMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearSessionCookieMutation = { __typename?: 'Mutation', clearSessionCookie: boolean };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UserModel', username: string, email: string, displayName: string } };

export type RegisterMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', createUser: boolean };

export type RemoveSessionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveSessionMutation = { __typename?: 'Mutation', removeSession: boolean };

export type ChangeCartItemCountMutationVariables = Exact<{
  input: ChangeCartItemCountInput;
}>;


export type ChangeCartItemCountMutation = { __typename?: 'Mutation', changeCartItemCount: boolean };

export type AddProductPhotoMutationVariables = Exact<{
  productId: Scalars['String']['input'];
  file: Scalars['Upload']['input'];
}>;


export type AddProductPhotoMutation = { __typename?: 'Mutation', addProductPhoto: boolean };

export type UploadAvatarMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadAvatarMutation = { __typename?: 'Mutation', uploadAvatar: boolean };

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile: string };

export type CreateProductMutationVariables = Exact<{
  data: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'ProductModel', id: string } };

export type DeleteProductMutationVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: boolean };

export type RemoveProductPhotoMutationVariables = Exact<{
  productId: Scalars['String']['input'];
  filename: Scalars['String']['input'];
}>;


export type RemoveProductPhotoMutation = { __typename?: 'Mutation', removeProductPhoto: boolean };

export type UpdateProductMutationVariables = Exact<{
  data: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'ProductModel', id: string } };

export type CreateReviewMutationVariables = Exact<{
  data: CreateReviewInput;
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: boolean };

export type DeleteReviewMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteReviewMutation = { __typename?: 'Mutation', deleteReview: boolean };

export type AddProductToViewedMutationVariables = Exact<{
  input: AddToViewedInput;
}>;


export type AddProductToViewedMutation = { __typename?: 'Mutation', addProductToViewed: boolean };

export type ToggleCartMutationVariables = Exact<{
  input: AddToCartInput;
}>;


export type ToggleCartMutation = { __typename?: 'Mutation', toggleCart: boolean };

export type ToggleFavoriteMutationVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type ToggleFavoriteMutation = { __typename?: 'Mutation', toggleFavorite: boolean };

export type UpdateUserDataMutationVariables = Exact<{
  user: UpdateUserInput;
}>;


export type UpdateUserDataMutation = { __typename?: 'Mutation', updateUserData: boolean };

export type UpdateUserRoleMutationVariables = Exact<{
  input: UpdateRoleInput;
}>;


export type UpdateUserRoleMutation = { __typename?: 'Mutation', updateUserRole: boolean };

export type GetAllOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllOrdersQuery = { __typename?: 'Query', getAllOrders: Array<{ __typename?: 'OrderModel', id: string, status: EnumOrderStatus, total: number, createdAt: any, user: { __typename?: 'UserModel', id: string, email: string, displayName: string, avatar?: string | null } }> };

export type GetAllProductsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetAllProductsQuery = { __typename?: 'Query', getAllProducts: { __typename?: 'ProductsAndTotalModel', total: number, products: Array<{ __typename?: 'ProductModel', id: string, title: string, price: number, brand: string, frontCamera: number, mainCamera: number, ram: number, color: string, builtInMemory: number, processorName: string, processorCores: string, os: string, deliverySet: string, materials: string, simCount: number, simFormat: Array<string>, images: Array<string>, battery: number, screenDiagonal: number, createdAt: any, updatedAt: any }> } };

export type GetAllProductsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsCountQuery = { __typename?: 'Query', getAllProductsCount: number };

export type GetProductByIdQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', getProductById: { __typename?: 'ProductModel', id: string, title: string, price: number, brand: string, frontCamera: number, mainCamera: number, ram: number, color: string, builtInMemory: number, processorName: string, processorCores: string, os: string, deliverySet: string, materials: string, simCount: number, simFormat: Array<string>, images: Array<string>, battery: number, createdAt: any, screenDiagonal: number, updatedAt: any, reviews: Array<{ __typename?: 'ReviewModel', id: string, text: string, rating: number, createdAt: any, product: { __typename?: 'ProductModel', id: string, price: number, images: Array<string>, brand: string, ram: number, builtInMemory: number, color: string }, user: { __typename?: 'UserModel', id: string, displayName: string, avatar?: string | null } }> } };

export type GetSimilarProductsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetSimilarProductsQuery = { __typename?: 'Query', getSimilarProducts: Array<{ __typename?: 'ProductModel', id: string, title: string, price: number, brand: string, frontCamera: number, mainCamera: number, ram: number, color: string, builtInMemory: number, processorName: string, processorCores: string, os: string, deliverySet: string, materials: string, simCount: number, simFormat: Array<string>, images: Array<string>, battery: number, screenDiagonal: number, createdAt: any, updatedAt: any }> };

export type PaginateAndFilterProductsQueryVariables = Exact<{
  query: PaginateAndFilterInput;
}>;


export type PaginateAndFilterProductsQuery = { __typename?: 'Query', paginateAndFilter: { __typename?: 'ProductsAndTotalModel', total: number, products: Array<{ __typename?: 'ProductModel', id: string, title: string, price: number, brand: string, frontCamera: number, mainCamera: number, ram: number, color: string, builtInMemory: number, processorName: string, processorCores: string, os: string, deliverySet: string, materials: string, simCount: number, simFormat: Array<string>, images: Array<string>, battery: number, createdAt: any, screenDiagonal: number, updatedAt: any }> } };

export type SearchProductsQueryVariables = Exact<{
  data: Scalars['String']['input'];
}>;


export type SearchProductsQuery = { __typename?: 'Query', searchProduct: Array<{ __typename?: 'ProductModel', id: string, title: string, price: number, brand: string, frontCamera: number, mainCamera: number, ram: number, color: string, builtInMemory: number, processorName: string, processorCores: string, os: string, deliverySet: string, materials: string, simCount: number, simFormat: Array<string>, images: Array<string>, battery: number, screenDiagonal: number, createdAt: any, updatedAt: any }> };

export type FindCurrentSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type FindCurrentSessionQuery = { __typename?: 'Query', findCurrentSession: { __typename?: 'SessionModel', id: string, createdAt: string, metadata: { __typename?: 'SessionMetadataModel', ip: string, location: { __typename?: 'LocationModel', country: string, city: string, latitude: number, longitude: number }, device: { __typename?: 'DeviceModel', browser: string, os: string } } } };

export type FindProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type FindProfileQuery = { __typename?: 'Query', findProfile: { __typename?: 'UserModel', id: string, username: string, displayName: string, email: string, avatar?: string | null, role: EnumUserRoles, city?: string | null, street?: string | null, postOffice?: string | null, createdAt: any, updatedAt: any, favorites: Array<{ __typename?: 'FavoriteItemModel', product: { __typename?: 'ProductModel', id: string, title: string, price: number, brand: string, frontCamera: number, mainCamera: number, ram: number, color: string, builtInMemory: number, processorName: string, processorCores: string, os: string, deliverySet: string, materials: string, simCount: number, simFormat: Array<string>, images: Array<string>, battery: number, screenDiagonal: number, createdAt: any, updatedAt: any } }>, cart: Array<{ __typename?: 'CartItemModel', id: string, count: number, product: { __typename?: 'ProductModel', id: string, title: string, price: number, brand: string, frontCamera: number, mainCamera: number, ram: number, color: string, builtInMemory: number, processorName: string, processorCores: string, os: string, deliverySet: string, materials: string, simCount: number, simFormat: Array<string>, images: Array<string>, battery: number, screenDiagonal: number, createdAt: any, updatedAt: any } }>, reviews: Array<{ __typename?: 'ReviewModel', id: string, text: string, rating: number, createdAt: any, product: { __typename?: 'ProductModel', id: string, images: Array<string>, brand: string, ram: number, builtInMemory: number, color: string }, user: { __typename?: 'UserModel', id: string, displayName: string, avatar?: string | null } }>, orders: Array<{ __typename?: 'OrderModel', id: string, status: EnumOrderStatus, total: number, createdAt: any, items: Array<{ __typename?: 'OrderItemModel', id: string, price: number, quantity: number, product: { __typename?: 'ProductModel', id: string, title: string, price: number, brand: string, frontCamera: number, mainCamera: number, ram: number, color: string, builtInMemory: number, processorName: string, processorCores: string, os: string, deliverySet: string, materials: string, simCount: number, simFormat: Array<string>, images: Array<string>, battery: number, screenDiagonal: number, createdAt: any, updatedAt: any } }> }> } };

export type FindSessionsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSessionsByUserQuery = { __typename?: 'Query', findSessionsByUser: Array<{ __typename?: 'SessionModel', id: string, createdAt: string, metadata: { __typename?: 'SessionMetadataModel', ip: string, location: { __typename?: 'LocationModel', country: string, city: string, latitude: number, longitude: number }, device: { __typename?: 'DeviceModel', browser: string, os: string } } }> };

export type GetReviewsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReviewsByUserQuery = { __typename?: 'Query', getReviewByUserId: Array<{ __typename?: 'ReviewModel', id: string, text: string, rating: number, createdAt: any, product: { __typename?: 'ProductModel', id: string, price: number, images: Array<string>, brand: string, ram: number, builtInMemory: number, color: string }, user: { __typename?: 'UserModel', id: string, displayName: string, avatar?: string | null } }> };

export type GetAverageRatingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAverageRatingQuery = { __typename?: 'Query', getAverageRating: number };

export type FindAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllUsersQuery = { __typename?: 'Query', findAllUsers: Array<{ __typename?: 'UserModel', id: string, email: string, username: string, displayName: string, avatar?: string | null, role: EnumUserRoles, createdAt: any }> };

export const ProductFragmentFragmentDoc = gql`
    fragment ProductFragment on ProductModel {
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
  screenDiagonal
  createdAt
  updatedAt
}
    `;
export const ClearSessionCookieDocument = gql`
    mutation ClearSessionCookie {
  clearSessionCookie
}
    `;
export type ClearSessionCookieMutationFn = Apollo.MutationFunction<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>;

/**
 * __useClearSessionCookieMutation__
 *
 * To run a mutation, you first call `useClearSessionCookieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearSessionCookieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearSessionCookieMutation, { data, loading, error }] = useClearSessionCookieMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearSessionCookieMutation(baseOptions?: Apollo.MutationHookOptions<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>(ClearSessionCookieDocument, options);
      }
export type ClearSessionCookieMutationHookResult = ReturnType<typeof useClearSessionCookieMutation>;
export type ClearSessionCookieMutationResult = Apollo.MutationResult<ClearSessionCookieMutation>;
export type ClearSessionCookieMutationOptions = Apollo.BaseMutationOptions<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>;
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
export const RemoveSessionDocument = gql`
    mutation RemoveSession($id: String!) {
  removeSession(id: $id)
}
    `;
export type RemoveSessionMutationFn = Apollo.MutationFunction<RemoveSessionMutation, RemoveSessionMutationVariables>;

/**
 * __useRemoveSessionMutation__
 *
 * To run a mutation, you first call `useRemoveSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSessionMutation, { data, loading, error }] = useRemoveSessionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSessionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSessionMutation, RemoveSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSessionMutation, RemoveSessionMutationVariables>(RemoveSessionDocument, options);
      }
export type RemoveSessionMutationHookResult = ReturnType<typeof useRemoveSessionMutation>;
export type RemoveSessionMutationResult = Apollo.MutationResult<RemoveSessionMutation>;
export type RemoveSessionMutationOptions = Apollo.BaseMutationOptions<RemoveSessionMutation, RemoveSessionMutationVariables>;
export const ChangeCartItemCountDocument = gql`
    mutation ChangeCartItemCount($input: ChangeCartItemCountInput!) {
  changeCartItemCount(input: $input)
}
    `;
export type ChangeCartItemCountMutationFn = Apollo.MutationFunction<ChangeCartItemCountMutation, ChangeCartItemCountMutationVariables>;

/**
 * __useChangeCartItemCountMutation__
 *
 * To run a mutation, you first call `useChangeCartItemCountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeCartItemCountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeCartItemCountMutation, { data, loading, error }] = useChangeCartItemCountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeCartItemCountMutation(baseOptions?: Apollo.MutationHookOptions<ChangeCartItemCountMutation, ChangeCartItemCountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeCartItemCountMutation, ChangeCartItemCountMutationVariables>(ChangeCartItemCountDocument, options);
      }
export type ChangeCartItemCountMutationHookResult = ReturnType<typeof useChangeCartItemCountMutation>;
export type ChangeCartItemCountMutationResult = Apollo.MutationResult<ChangeCartItemCountMutation>;
export type ChangeCartItemCountMutationOptions = Apollo.BaseMutationOptions<ChangeCartItemCountMutation, ChangeCartItemCountMutationVariables>;
export const AddProductPhotoDocument = gql`
    mutation AddProductPhoto($productId: String!, $file: Upload!) {
  addProductPhoto(productId: $productId, file: $file)
}
    `;
export type AddProductPhotoMutationFn = Apollo.MutationFunction<AddProductPhotoMutation, AddProductPhotoMutationVariables>;

/**
 * __useAddProductPhotoMutation__
 *
 * To run a mutation, you first call `useAddProductPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductPhotoMutation, { data, loading, error }] = useAddProductPhotoMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useAddProductPhotoMutation(baseOptions?: Apollo.MutationHookOptions<AddProductPhotoMutation, AddProductPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProductPhotoMutation, AddProductPhotoMutationVariables>(AddProductPhotoDocument, options);
      }
export type AddProductPhotoMutationHookResult = ReturnType<typeof useAddProductPhotoMutation>;
export type AddProductPhotoMutationResult = Apollo.MutationResult<AddProductPhotoMutation>;
export type AddProductPhotoMutationOptions = Apollo.BaseMutationOptions<AddProductPhotoMutation, AddProductPhotoMutationVariables>;
export const UploadAvatarDocument = gql`
    mutation UploadAvatar($file: Upload!) {
  uploadAvatar(file: $file)
}
    `;
export type UploadAvatarMutationFn = Apollo.MutationFunction<UploadAvatarMutation, UploadAvatarMutationVariables>;

/**
 * __useUploadAvatarMutation__
 *
 * To run a mutation, you first call `useUploadAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadAvatarMutation, { data, loading, error }] = useUploadAvatarMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UploadAvatarMutation, UploadAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadAvatarMutation, UploadAvatarMutationVariables>(UploadAvatarDocument, options);
      }
export type UploadAvatarMutationHookResult = ReturnType<typeof useUploadAvatarMutation>;
export type UploadAvatarMutationResult = Apollo.MutationResult<UploadAvatarMutation>;
export type UploadAvatarMutationOptions = Apollo.BaseMutationOptions<UploadAvatarMutation, UploadAvatarMutationVariables>;
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
export const CreateProductDocument = gql`
    mutation CreateProduct($data: CreateProductInput!) {
  createProduct(data: $data) {
    id
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($productId: String!) {
  deleteProduct(productId: $productId)
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const RemoveProductPhotoDocument = gql`
    mutation RemoveProductPhoto($productId: String!, $filename: String!) {
  removeProductPhoto(productId: $productId, filename: $filename)
}
    `;
export type RemoveProductPhotoMutationFn = Apollo.MutationFunction<RemoveProductPhotoMutation, RemoveProductPhotoMutationVariables>;

/**
 * __useRemoveProductPhotoMutation__
 *
 * To run a mutation, you first call `useRemoveProductPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductPhotoMutation, { data, loading, error }] = useRemoveProductPhotoMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      filename: // value for 'filename'
 *   },
 * });
 */
export function useRemoveProductPhotoMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProductPhotoMutation, RemoveProductPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProductPhotoMutation, RemoveProductPhotoMutationVariables>(RemoveProductPhotoDocument, options);
      }
export type RemoveProductPhotoMutationHookResult = ReturnType<typeof useRemoveProductPhotoMutation>;
export type RemoveProductPhotoMutationResult = Apollo.MutationResult<RemoveProductPhotoMutation>;
export type RemoveProductPhotoMutationOptions = Apollo.BaseMutationOptions<RemoveProductPhotoMutation, RemoveProductPhotoMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($data: UpdateProductInput!) {
  updateProduct(data: $data) {
    id
  }
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const CreateReviewDocument = gql`
    mutation CreateReview($data: CreateReviewInput!) {
  createReview(data: $data)
}
    `;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const DeleteReviewDocument = gql`
    mutation DeleteReview($id: String!) {
  deleteReview(id: $id)
}
    `;
export type DeleteReviewMutationFn = Apollo.MutationFunction<DeleteReviewMutation, DeleteReviewMutationVariables>;

/**
 * __useDeleteReviewMutation__
 *
 * To run a mutation, you first call `useDeleteReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReviewMutation, { data, loading, error }] = useDeleteReviewMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteReviewMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReviewMutation, DeleteReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReviewMutation, DeleteReviewMutationVariables>(DeleteReviewDocument, options);
      }
export type DeleteReviewMutationHookResult = ReturnType<typeof useDeleteReviewMutation>;
export type DeleteReviewMutationResult = Apollo.MutationResult<DeleteReviewMutation>;
export type DeleteReviewMutationOptions = Apollo.BaseMutationOptions<DeleteReviewMutation, DeleteReviewMutationVariables>;
export const AddProductToViewedDocument = gql`
    mutation AddProductToViewed($input: AddToViewedInput!) {
  addProductToViewed(input: $input)
}
    `;
export type AddProductToViewedMutationFn = Apollo.MutationFunction<AddProductToViewedMutation, AddProductToViewedMutationVariables>;

/**
 * __useAddProductToViewedMutation__
 *
 * To run a mutation, you first call `useAddProductToViewedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductToViewedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductToViewedMutation, { data, loading, error }] = useAddProductToViewedMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddProductToViewedMutation(baseOptions?: Apollo.MutationHookOptions<AddProductToViewedMutation, AddProductToViewedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProductToViewedMutation, AddProductToViewedMutationVariables>(AddProductToViewedDocument, options);
      }
export type AddProductToViewedMutationHookResult = ReturnType<typeof useAddProductToViewedMutation>;
export type AddProductToViewedMutationResult = Apollo.MutationResult<AddProductToViewedMutation>;
export type AddProductToViewedMutationOptions = Apollo.BaseMutationOptions<AddProductToViewedMutation, AddProductToViewedMutationVariables>;
export const ToggleCartDocument = gql`
    mutation ToggleCart($input: AddToCartInput!) {
  toggleCart(input: $input)
}
    `;
export type ToggleCartMutationFn = Apollo.MutationFunction<ToggleCartMutation, ToggleCartMutationVariables>;

/**
 * __useToggleCartMutation__
 *
 * To run a mutation, you first call `useToggleCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleCartMutation, { data, loading, error }] = useToggleCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleCartMutation(baseOptions?: Apollo.MutationHookOptions<ToggleCartMutation, ToggleCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleCartMutation, ToggleCartMutationVariables>(ToggleCartDocument, options);
      }
export type ToggleCartMutationHookResult = ReturnType<typeof useToggleCartMutation>;
export type ToggleCartMutationResult = Apollo.MutationResult<ToggleCartMutation>;
export type ToggleCartMutationOptions = Apollo.BaseMutationOptions<ToggleCartMutation, ToggleCartMutationVariables>;
export const ToggleFavoriteDocument = gql`
    mutation ToggleFavorite($productId: String!) {
  toggleFavorite(productId: $productId)
}
    `;
export type ToggleFavoriteMutationFn = Apollo.MutationFunction<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>;

/**
 * __useToggleFavoriteMutation__
 *
 * To run a mutation, you first call `useToggleFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFavoriteMutation, { data, loading, error }] = useToggleFavoriteMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useToggleFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>(ToggleFavoriteDocument, options);
      }
export type ToggleFavoriteMutationHookResult = ReturnType<typeof useToggleFavoriteMutation>;
export type ToggleFavoriteMutationResult = Apollo.MutationResult<ToggleFavoriteMutation>;
export type ToggleFavoriteMutationOptions = Apollo.BaseMutationOptions<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>;
export const UpdateUserDataDocument = gql`
    mutation UpdateUserData($user: UpdateUserInput!) {
  updateUserData(user: $user)
}
    `;
export type UpdateUserDataMutationFn = Apollo.MutationFunction<UpdateUserDataMutation, UpdateUserDataMutationVariables>;

/**
 * __useUpdateUserDataMutation__
 *
 * To run a mutation, you first call `useUpdateUserDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserDataMutation, { data, loading, error }] = useUpdateUserDataMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUpdateUserDataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserDataMutation, UpdateUserDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserDataMutation, UpdateUserDataMutationVariables>(UpdateUserDataDocument, options);
      }
export type UpdateUserDataMutationHookResult = ReturnType<typeof useUpdateUserDataMutation>;
export type UpdateUserDataMutationResult = Apollo.MutationResult<UpdateUserDataMutation>;
export type UpdateUserDataMutationOptions = Apollo.BaseMutationOptions<UpdateUserDataMutation, UpdateUserDataMutationVariables>;
export const UpdateUserRoleDocument = gql`
    mutation UpdateUserRole($input: UpdateRoleInput!) {
  updateUserRole(input: $input)
}
    `;
export type UpdateUserRoleMutationFn = Apollo.MutationFunction<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;

/**
 * __useUpdateUserRoleMutation__
 *
 * To run a mutation, you first call `useUpdateUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserRoleMutation, { data, loading, error }] = useUpdateUserRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>(UpdateUserRoleDocument, options);
      }
export type UpdateUserRoleMutationHookResult = ReturnType<typeof useUpdateUserRoleMutation>;
export type UpdateUserRoleMutationResult = Apollo.MutationResult<UpdateUserRoleMutation>;
export type UpdateUserRoleMutationOptions = Apollo.BaseMutationOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;
export const GetAllOrdersDocument = gql`
    query GetAllOrders {
  getAllOrders {
    id
    status
    total
    user {
      id
      email
      displayName
      avatar
    }
    createdAt
  }
}
    `;

/**
 * __useGetAllOrdersQuery__
 *
 * To run a query within a React component, call `useGetAllOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
      }
export function useGetAllOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
        }
export function useGetAllOrdersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
        }
export type GetAllOrdersQueryHookResult = ReturnType<typeof useGetAllOrdersQuery>;
export type GetAllOrdersLazyQueryHookResult = ReturnType<typeof useGetAllOrdersLazyQuery>;
export type GetAllOrdersSuspenseQueryHookResult = ReturnType<typeof useGetAllOrdersSuspenseQuery>;
export type GetAllOrdersQueryResult = Apollo.QueryResult<GetAllOrdersQuery, GetAllOrdersQueryVariables>;
export const GetAllProductsDocument = gql`
    query getAllProducts($userId: String!) {
  getAllProducts(userId: $userId) {
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
      screenDiagonal
      createdAt
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
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAllProductsQuery(baseOptions: Apollo.QueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables> & ({ variables: GetAllProductsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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
export const GetAllProductsCountDocument = gql`
    query GetAllProductsCount {
  getAllProductsCount
}
    `;

/**
 * __useGetAllProductsCountQuery__
 *
 * To run a query within a React component, call `useGetAllProductsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProductsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProductsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProductsCountQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProductsCountQuery, GetAllProductsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProductsCountQuery, GetAllProductsCountQueryVariables>(GetAllProductsCountDocument, options);
      }
export function useGetAllProductsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProductsCountQuery, GetAllProductsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProductsCountQuery, GetAllProductsCountQueryVariables>(GetAllProductsCountDocument, options);
        }
export function useGetAllProductsCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllProductsCountQuery, GetAllProductsCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllProductsCountQuery, GetAllProductsCountQueryVariables>(GetAllProductsCountDocument, options);
        }
export type GetAllProductsCountQueryHookResult = ReturnType<typeof useGetAllProductsCountQuery>;
export type GetAllProductsCountLazyQueryHookResult = ReturnType<typeof useGetAllProductsCountLazyQuery>;
export type GetAllProductsCountSuspenseQueryHookResult = ReturnType<typeof useGetAllProductsCountSuspenseQuery>;
export type GetAllProductsCountQueryResult = Apollo.QueryResult<GetAllProductsCountQuery, GetAllProductsCountQueryVariables>;
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
    reviews {
      id
      text
      rating
      createdAt
      product {
        id
        price
        images
        brand
        ram
        builtInMemory
        color
      }
      user {
        id
        displayName
        avatar
      }
    }
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
export const GetSimilarProductsDocument = gql`
    query GetSimilarProducts($userId: String!) {
  getSimilarProducts(userId: $userId) {
    ...ProductFragment
  }
}
    ${ProductFragmentFragmentDoc}`;

/**
 * __useGetSimilarProductsQuery__
 *
 * To run a query within a React component, call `useGetSimilarProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSimilarProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSimilarProductsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetSimilarProductsQuery(baseOptions: Apollo.QueryHookOptions<GetSimilarProductsQuery, GetSimilarProductsQueryVariables> & ({ variables: GetSimilarProductsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSimilarProductsQuery, GetSimilarProductsQueryVariables>(GetSimilarProductsDocument, options);
      }
export function useGetSimilarProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSimilarProductsQuery, GetSimilarProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSimilarProductsQuery, GetSimilarProductsQueryVariables>(GetSimilarProductsDocument, options);
        }
export function useGetSimilarProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSimilarProductsQuery, GetSimilarProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSimilarProductsQuery, GetSimilarProductsQueryVariables>(GetSimilarProductsDocument, options);
        }
export type GetSimilarProductsQueryHookResult = ReturnType<typeof useGetSimilarProductsQuery>;
export type GetSimilarProductsLazyQueryHookResult = ReturnType<typeof useGetSimilarProductsLazyQuery>;
export type GetSimilarProductsSuspenseQueryHookResult = ReturnType<typeof useGetSimilarProductsSuspenseQuery>;
export type GetSimilarProductsQueryResult = Apollo.QueryResult<GetSimilarProductsQuery, GetSimilarProductsQueryVariables>;
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
export const SearchProductsDocument = gql`
    query SearchProducts($data: String!) {
  searchProduct(data: $data) {
    ...ProductFragment
  }
}
    ${ProductFragmentFragmentDoc}`;

/**
 * __useSearchProductsQuery__
 *
 * To run a query within a React component, call `useSearchProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProductsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSearchProductsQuery(baseOptions: Apollo.QueryHookOptions<SearchProductsQuery, SearchProductsQueryVariables> & ({ variables: SearchProductsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchProductsQuery, SearchProductsQueryVariables>(SearchProductsDocument, options);
      }
export function useSearchProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProductsQuery, SearchProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchProductsQuery, SearchProductsQueryVariables>(SearchProductsDocument, options);
        }
export function useSearchProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchProductsQuery, SearchProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchProductsQuery, SearchProductsQueryVariables>(SearchProductsDocument, options);
        }
export type SearchProductsQueryHookResult = ReturnType<typeof useSearchProductsQuery>;
export type SearchProductsLazyQueryHookResult = ReturnType<typeof useSearchProductsLazyQuery>;
export type SearchProductsSuspenseQueryHookResult = ReturnType<typeof useSearchProductsSuspenseQuery>;
export type SearchProductsQueryResult = Apollo.QueryResult<SearchProductsQuery, SearchProductsQueryVariables>;
export const FindCurrentSessionDocument = gql`
    query FindCurrentSession {
  findCurrentSession {
    id
    createdAt
    metadata {
      location {
        country
        city
        latitude
        longitude
      }
      device {
        browser
        os
      }
      ip
    }
  }
}
    `;

/**
 * __useFindCurrentSessionQuery__
 *
 * To run a query within a React component, call `useFindCurrentSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCurrentSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCurrentSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindCurrentSessionQuery(baseOptions?: Apollo.QueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
      }
export function useFindCurrentSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
        }
export function useFindCurrentSessionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
        }
export type FindCurrentSessionQueryHookResult = ReturnType<typeof useFindCurrentSessionQuery>;
export type FindCurrentSessionLazyQueryHookResult = ReturnType<typeof useFindCurrentSessionLazyQuery>;
export type FindCurrentSessionSuspenseQueryHookResult = ReturnType<typeof useFindCurrentSessionSuspenseQuery>;
export type FindCurrentSessionQueryResult = Apollo.QueryResult<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>;
export const FindProfileDocument = gql`
    query FindProfile {
  findProfile {
    id
    username
    displayName
    email
    avatar
    role
    city
    street
    postOffice
    createdAt
    updatedAt
    favorites {
      product {
        ...ProductFragment
      }
    }
    cart {
      id
      count
      product {
        ...ProductFragment
      }
    }
    reviews {
      id
      text
      rating
      createdAt
      product {
        id
        images
        brand
        ram
        builtInMemory
        color
      }
      user {
        id
        displayName
        avatar
      }
    }
    orders {
      id
      status
      total
      createdAt
      items {
        id
        price
        quantity
        product {
          ...ProductFragment
        }
      }
    }
  }
}
    ${ProductFragmentFragmentDoc}`;

/**
 * __useFindProfileQuery__
 *
 * To run a query within a React component, call `useFindProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindProfileQuery(baseOptions?: Apollo.QueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
      }
export function useFindProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
        }
export function useFindProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
        }
export type FindProfileQueryHookResult = ReturnType<typeof useFindProfileQuery>;
export type FindProfileLazyQueryHookResult = ReturnType<typeof useFindProfileLazyQuery>;
export type FindProfileSuspenseQueryHookResult = ReturnType<typeof useFindProfileSuspenseQuery>;
export type FindProfileQueryResult = Apollo.QueryResult<FindProfileQuery, FindProfileQueryVariables>;
export const FindSessionsByUserDocument = gql`
    query FindSessionsByUser {
  findSessionsByUser {
    id
    createdAt
    metadata {
      location {
        country
        city
        latitude
        longitude
      }
      device {
        browser
        os
      }
      ip
    }
  }
}
    `;

/**
 * __useFindSessionsByUserQuery__
 *
 * To run a query within a React component, call `useFindSessionsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSessionsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSessionsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindSessionsByUserQuery(baseOptions?: Apollo.QueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
      }
export function useFindSessionsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
        }
export function useFindSessionsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
        }
export type FindSessionsByUserQueryHookResult = ReturnType<typeof useFindSessionsByUserQuery>;
export type FindSessionsByUserLazyQueryHookResult = ReturnType<typeof useFindSessionsByUserLazyQuery>;
export type FindSessionsByUserSuspenseQueryHookResult = ReturnType<typeof useFindSessionsByUserSuspenseQuery>;
export type FindSessionsByUserQueryResult = Apollo.QueryResult<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>;
export const GetReviewsByUserDocument = gql`
    query GetReviewsByUser {
  getReviewByUserId {
    id
    text
    rating
    createdAt
    product {
      id
      price
      images
      brand
      ram
      builtInMemory
      color
    }
    user {
      id
      displayName
      avatar
    }
  }
}
    `;

/**
 * __useGetReviewsByUserQuery__
 *
 * To run a query within a React component, call `useGetReviewsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReviewsByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetReviewsByUserQuery, GetReviewsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReviewsByUserQuery, GetReviewsByUserQueryVariables>(GetReviewsByUserDocument, options);
      }
export function useGetReviewsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewsByUserQuery, GetReviewsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReviewsByUserQuery, GetReviewsByUserQueryVariables>(GetReviewsByUserDocument, options);
        }
export function useGetReviewsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetReviewsByUserQuery, GetReviewsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReviewsByUserQuery, GetReviewsByUserQueryVariables>(GetReviewsByUserDocument, options);
        }
export type GetReviewsByUserQueryHookResult = ReturnType<typeof useGetReviewsByUserQuery>;
export type GetReviewsByUserLazyQueryHookResult = ReturnType<typeof useGetReviewsByUserLazyQuery>;
export type GetReviewsByUserSuspenseQueryHookResult = ReturnType<typeof useGetReviewsByUserSuspenseQuery>;
export type GetReviewsByUserQueryResult = Apollo.QueryResult<GetReviewsByUserQuery, GetReviewsByUserQueryVariables>;
export const GetAverageRatingDocument = gql`
    query GetAverageRating {
  getAverageRating
}
    `;

/**
 * __useGetAverageRatingQuery__
 *
 * To run a query within a React component, call `useGetAverageRatingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAverageRatingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAverageRatingQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAverageRatingQuery(baseOptions?: Apollo.QueryHookOptions<GetAverageRatingQuery, GetAverageRatingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAverageRatingQuery, GetAverageRatingQueryVariables>(GetAverageRatingDocument, options);
      }
export function useGetAverageRatingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAverageRatingQuery, GetAverageRatingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAverageRatingQuery, GetAverageRatingQueryVariables>(GetAverageRatingDocument, options);
        }
export function useGetAverageRatingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAverageRatingQuery, GetAverageRatingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAverageRatingQuery, GetAverageRatingQueryVariables>(GetAverageRatingDocument, options);
        }
export type GetAverageRatingQueryHookResult = ReturnType<typeof useGetAverageRatingQuery>;
export type GetAverageRatingLazyQueryHookResult = ReturnType<typeof useGetAverageRatingLazyQuery>;
export type GetAverageRatingSuspenseQueryHookResult = ReturnType<typeof useGetAverageRatingSuspenseQuery>;
export type GetAverageRatingQueryResult = Apollo.QueryResult<GetAverageRatingQuery, GetAverageRatingQueryVariables>;
export const FindAllUsersDocument = gql`
    query FindAllUsers {
  findAllUsers {
    id
    email
    username
    displayName
    avatar
    role
    createdAt
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