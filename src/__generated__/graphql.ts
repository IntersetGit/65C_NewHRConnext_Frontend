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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
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
  branch?: Maybe<Array<Maybe<CompanyBranch>>>;
  city?: Maybe<Scalars['String']>;
  companyCode?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  ownerId?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  users?: Maybe<Array<Maybe<User>>>;
  website?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type CompanyBranch = {
  __typename?: 'CompanyBranch';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  positions?: Maybe<Array<Maybe<Position>>>;
  state?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  users?: Maybe<Array<Maybe<User>>>;
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

export type GetOwncompanytype = {
  __typename?: 'GetOwncompanytype';
  companies?: Maybe<Array<Maybe<OwnCompanyType>>>;
  company?: Maybe<OwnCompanyType>;
  isOwner?: Maybe<Scalars['Boolean']>;
  redirect?: Maybe<Scalars['Boolean']>;
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
  Position?: Maybe<MePositionType>;
  companyBranch?: Maybe<MeCompanyBranch>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isOwner?: Maybe<Scalars['Boolean']>;
  profile?: Maybe<MeprofileType>;
  role?: Maybe<Role>;
};

export type MeCompanyBranch = {
  __typename?: 'MeCompanyBranch';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  company?: Maybe<MecompanyType>;
  companyId?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  zip?: Maybe<Scalars['String']>;
};

export type MePositionType = {
  __typename?: 'MePositionType';
  access?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type MecompanyType = {
  __typename?: 'MecompanyType';
  companyCode?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
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
  validateRoute?: Maybe<ValidateRoute>;
};


export type MutationCreateAccountArgs = {
  data: CreateAccountInput;
};


export type MutationLoginArgs = {
  data: LoginaInput;
};


export type MutationValidateRouteArgs = {
  args: Scalars['String'];
};

export type OwnCompanyType = {
  __typename?: 'OwnCompanyType';
  companyCode?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Position = {
  __typename?: 'Position';
  access?: Maybe<Scalars['JSON']>;
  companyBranch?: Maybe<CompanyBranch>;
  companyBranchId?: Maybe<Scalars['String']>;
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
  getownCompany?: Maybe<GetOwncompanytype>;
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
  Position?: Maybe<Position>;
  company?: Maybe<Array<Maybe<Company>>>;
  companyBranch?: Maybe<CompanyBranch>;
  companyBranchId?: Maybe<Scalars['String']>;
  companyId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isOwner: Scalars['Boolean'];
  islogin: Scalars['Boolean'];
  lastlogin?: Maybe<Scalars['Date']>;
  positionId?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['String']>;
};

export type ValidateRoute = {
  __typename?: 'ValidateRoute';
  acess?: Maybe<Scalars['Boolean']>;
  path?: Maybe<Scalars['String']>;
};

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken?: { __typename?: 'RefreshtokenResponseType', access_token?: string | null } | null };

export type ValidateRouteMutationVariables = Exact<{
  args: Scalars['String'];
}>;


export type ValidateRouteMutation = { __typename?: 'Mutation', validateRoute?: { __typename?: 'ValidateRoute', acess?: boolean | null, path?: string | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, email?: string | null, isOwner?: boolean | null, companyBranch?: { __typename?: 'MeCompanyBranch', name?: string | null, company?: { __typename?: 'MecompanyType', name?: string | null, id: string, icon?: string | null, companyCode?: string | null } | null } | null, role?: { __typename?: 'Role', id: string, name?: string | null } | null, Position?: { __typename?: 'MePositionType', access?: any | null, id: string, name?: string | null } | null, profile?: { __typename?: 'MeprofileType', firstname?: string | null, lastname?: string | null, avatar?: string | null } | null } | null };

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


export type GetownCompanyQuery = { __typename?: 'Query', getownCompany?: { __typename?: 'GetOwncompanytype', redirect?: boolean | null, isOwner?: boolean | null, company?: { __typename?: 'OwnCompanyType', companyCode?: string | null, icon?: string | null, id?: string | null, name?: string | null } | null, companies?: Array<{ __typename?: 'OwnCompanyType', companyCode?: string | null, icon?: string | null, id?: string | null, name?: string | null } | null> | null } | null };


export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const ValidateRouteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ValidateRoute"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"args"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateRoute"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"Variable","name":{"kind":"Name","value":"args"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acess"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]} as unknown as DocumentNode<ValidateRouteMutation, ValidateRouteMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"companyBranch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"companyCode"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GetProvinceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProvince"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProvince"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"district"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amphoe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"zipcode"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProvinceQuery, GetProvinceQueryVariables>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAccountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyCompanycode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyname"}}}]}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const GetownCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetownCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getownCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"redirect"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyCode"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyCode"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetownCompanyQuery, GetownCompanyQueryVariables>;