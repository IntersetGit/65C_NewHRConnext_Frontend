/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Custom date scarlar type. */
  Date: any;
};

export type Amphoe = {
  __typename?: 'Amphoe';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
};

export type Company = {
  __typename?: 'Company';
  address?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Maybe<Company>>>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Company>;
  parentId?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  positions?: Maybe<Array<Maybe<Position>>>;
  state?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  users?: Maybe<Array<Maybe<User>>>;
  website?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type CreateAccountInput = {
  avatar?: InputMaybe<Scalars['String']>;
  companyCode: Scalars['String'];
  company_address: Scalars['String'];
  company_city: Scalars['String'];
  company_country: Scalars['String'];
  company_icon?: InputMaybe<Scalars['String']>;
  company_name: Scalars['String'];
  company_phone: Scalars['String'];
  company_state: Scalars['String'];
  company_zip: Scalars['String'];
  dob: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  tel: Scalars['String'];
};

export type CreateCompanyResponseType = {
  __typename?: 'CreateCompanyResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type District = {
  __typename?: 'District';
  amphoe?: Maybe<Array<Maybe<Amphoe>>>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type GetCompanyAccessType = {
  __typename?: 'GetCompanyAccessType';
  name?: Maybe<Scalars['String']>;
};

export type GetowmComoanyType = {
  __typename?: 'GetowmComoanyType';
  codeCompany?: Maybe<Scalars['String']>;
  companyType?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token?: Maybe<Scalars['String']>;
  refresh_token?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type LoginaInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Me = {
  __typename?: 'Me';
  company?: Maybe<MecompanyType>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  position?: Maybe<MePositionType>;
  profile?: Maybe<MeprofileType>;
  role?: Maybe<Role>;
};

export type MePositionType = {
  __typename?: 'MePositionType';
  access?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type MecompanyType = {
  __typename?: 'MecompanyType';
  companyCode?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  iocn?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type MeprofileType = {
  __typename?: 'MeprofileType';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['Date']>;
  firstname?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  prefix?: Maybe<Scalars['String']>;
  staff_code?: Maybe<Scalars['String']>;
  tel?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount?: Maybe<CreateCompanyResponseType>;
  login?: Maybe<LoginResponse>;
  refreshToken?: Maybe<RefreshtokenResponseType>;
};


export type MutationCreateAccountArgs = {
  data: CreateAccountInput;
};


export type MutationLoginArgs = {
  data: LoginaInput;
};

export type Position = {
  __typename?: 'Position';
  access?: Maybe<Scalars['String']>;
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type Profile = {
  __typename?: 'Profile';
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['Date']>;
  firstname?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastname?: Maybe<Scalars['String']>;
  prefix?: Maybe<Scalars['String']>;
  religion?: Maybe<Scalars['String']>;
  staff_code?: Maybe<Scalars['String']>;
  tel?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type Province = {
  __typename?: 'Province';
  district?: Maybe<Array<Maybe<District>>>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getProvince?: Maybe<Array<Maybe<Province>>>;
  getownCompany?: Maybe<Array<Maybe<GetowmComoanyType>>>;
  me?: Maybe<Me>;
  users?: Maybe<Array<Maybe<User>>>;
  verifyCompanycode?: Maybe<Scalars['Boolean']>;
};


export type QueryUsersArgs = {
  userid?: InputMaybe<Scalars['String']>;
};


export type QueryVerifyCompanycodeArgs = {
  companyname: Scalars['String'];
};

export type RefreshtokenResponseType = {
  __typename?: 'RefreshtokenResponseType';
  access_token?: Maybe<Scalars['String']>;
};

export type RegisterProfileInput = {
  dob: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type User = {
  __typename?: 'User';
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  islogin: Scalars['Boolean'];
  lastlogin?: Maybe<Scalars['Date']>;
  position?: Maybe<Position>;
  positionId?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['String']>;
};

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken?: { __typename?: 'RefreshtokenResponseType', access_token?: string | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, email?: string | null, profile?: { __typename?: 'MeprofileType', firstname?: string | null, lastname?: string | null, avatar?: string | null } | null, role?: { __typename?: 'Role', id: string, name?: string | null } | null, company?: { __typename?: 'MecompanyType', id: string, name?: string | null } | null } | null };

export type LoginMutationVariables = Exact<{
  data: LoginaInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginResponse', access_token?: string | null, refresh_token?: string | null, status?: boolean | null } | null };

export type GetProvinceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProvinceQuery = { __typename?: 'Query', getProvince?: Array<{ __typename?: 'Province', name?: string | null, district?: Array<{ __typename?: 'District', name?: string | null, amphoe?: Array<{ __typename?: 'Amphoe', name?: string | null, zipcode?: string | null } | null> | null } | null> | null } | null> | null };

export type CreateAccountMutationVariables = Exact<{
  data: CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount?: { __typename?: 'CreateCompanyResponseType', status?: boolean | null, message?: string | null } | null };

export type QueryQueryVariables = Exact<{
  companyname: Scalars['String'];
}>;


export type QueryQuery = { __typename?: 'Query', verifyCompanycode?: boolean | null };

export type GetownCompanyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetownCompanyQuery = { __typename?: 'Query', getownCompany?: Array<{ __typename?: 'GetowmComoanyType', codeCompany?: string | null, companyType?: string | null, name?: string | null, icon?: string | null, id?: string | null } | null> | null };


export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GetProvinceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProvince"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProvince"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"district"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amphoe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"zipcode"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProvinceQuery, GetProvinceQueryVariables>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAccountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyCompanycode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyname"}}}]}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const GetownCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetownCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getownCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"codeCompany"}},{"kind":"Field","name":{"kind":"Name","value":"companyType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetownCompanyQuery, GetownCompanyQueryVariables>;