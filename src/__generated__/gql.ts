/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  mutation refreshToken {\n    refreshToken {\n      access_token\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  mutation ValidateRoute($args: String!) {\n    validateRoute(args: $args) {\n      path\n      currentBranch {\n        branchId\n        branchName\n        companyId\n        companyName\n      }\n      acess\n      reAccess\n    }\n  }\n  ": types.ValidateRouteDocument,
    "\nquery Me {\n  me {\n    Role_Company {\n      access\n      id\n      name\n      __typename\n    }\n    companyBranch {\n      companyId\n      company {\n        companyCode\n        icon\n        id\n        name\n        __typename\n      }\n      createdAt\n      id\n      name\n      __typename\n    }\n    email\n    id\n    isOwner\n    profile {\n      firstname_th\n      lastname_en\n      firstname_en\n      lastname_th\n      prefix_en\n      prefix_th\n      staff_code\n      __typename\n    }\n  }\n}": types.MeDocument,
    "\n  query Company {\n    company {\n      _count {\n        branch\n      }\n      branch {\n        _count {\n          users\n        }\n        name\n        address\n        tel\n        website\n        id\n      }\n      userlimit\n      name\n    }\n  }\n": types.CompanyDocument,
    "\n  query GetProvince {\n    getProvince {\n      name\n      district {\n        name\n        amphoe {\n          name\n          zipcode\n        }\n      }\n    }\n  }\n": types.GetProvinceDocument,
    "\nmutation CreateAccountUser($data: CreateAccountUserInput!) {\n  createAccountUser(data: $data) {\n    message\n    status\n  }\n}": types.CreateAccountUserDocument,
    "\n  mutation Login($data: LoginaInput!) {\n    login(data: $data) {\n      access_token\n      refresh_token\n      status\n    }\n  }\n": types.LoginDocument,
    "\n  mutation CreateAccount($data: CreateAccountInput!) {\n    createAccount(data: $data) {\n      status\n      message\n  }\n}": types.CreateAccountDocument,
    "\n  query Query($companyname: String!) {\n  verifyCompanycode(companyname: $companyname)\n}\n": types.QueryDocument,
    "\nquery GetownCompany {\n  getownCompany {\n    redirect\n    isOwner\n    company {\n      companyCode\n      icon\n      id\n      name\n    }\n    companies {\n      companyCode\n      icon\n      id\n      name\n    }\n  }\n}\n": types.GetownCompanyDocument,
    "\nquery Users {\n    users {\n      email\n      profile {\n        id\n        firstname_th\n        firstname_en\n        lastname_th\n        lastname_en\n      }\n      Role_Company {\n        id\n        name\n\n      }\n    }\n\n  }\n": types.UsersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation refreshToken {\n    refreshToken {\n      access_token\n    }\n  }\n"): (typeof documents)["\n  mutation refreshToken {\n    refreshToken {\n      access_token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ValidateRoute($args: String!) {\n    validateRoute(args: $args) {\n      path\n      currentBranch {\n        branchId\n        branchName\n        companyId\n        companyName\n      }\n      acess\n      reAccess\n    }\n  }\n  "): (typeof documents)["\n  mutation ValidateRoute($args: String!) {\n    validateRoute(args: $args) {\n      path\n      currentBranch {\n        branchId\n        branchName\n        companyId\n        companyName\n      }\n      acess\n      reAccess\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Me {\n  me {\n    Role_Company {\n      access\n      id\n      name\n      __typename\n    }\n    companyBranch {\n      companyId\n      company {\n        companyCode\n        icon\n        id\n        name\n        __typename\n      }\n      createdAt\n      id\n      name\n      __typename\n    }\n    email\n    id\n    isOwner\n    profile {\n      firstname_th\n      lastname_en\n      firstname_en\n      lastname_th\n      prefix_en\n      prefix_th\n      staff_code\n      __typename\n    }\n  }\n}"): (typeof documents)["\nquery Me {\n  me {\n    Role_Company {\n      access\n      id\n      name\n      __typename\n    }\n    companyBranch {\n      companyId\n      company {\n        companyCode\n        icon\n        id\n        name\n        __typename\n      }\n      createdAt\n      id\n      name\n      __typename\n    }\n    email\n    id\n    isOwner\n    profile {\n      firstname_th\n      lastname_en\n      firstname_en\n      lastname_th\n      prefix_en\n      prefix_th\n      staff_code\n      __typename\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Company {\n    company {\n      _count {\n        branch\n      }\n      branch {\n        _count {\n          users\n        }\n        name\n        address\n        tel\n        website\n        id\n      }\n      userlimit\n      name\n    }\n  }\n"): (typeof documents)["\n  query Company {\n    company {\n      _count {\n        branch\n      }\n      branch {\n        _count {\n          users\n        }\n        name\n        address\n        tel\n        website\n        id\n      }\n      userlimit\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProvince {\n    getProvince {\n      name\n      district {\n        name\n        amphoe {\n          name\n          zipcode\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProvince {\n    getProvince {\n      name\n      district {\n        name\n        amphoe {\n          name\n          zipcode\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateAccountUser($data: CreateAccountUserInput!) {\n  createAccountUser(data: $data) {\n    message\n    status\n  }\n}"): (typeof documents)["\nmutation CreateAccountUser($data: CreateAccountUserInput!) {\n  createAccountUser(data: $data) {\n    message\n    status\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($data: LoginaInput!) {\n    login(data: $data) {\n      access_token\n      refresh_token\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation Login($data: LoginaInput!) {\n    login(data: $data) {\n      access_token\n      refresh_token\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateAccount($data: CreateAccountInput!) {\n    createAccount(data: $data) {\n      status\n      message\n  }\n}"): (typeof documents)["\n  mutation CreateAccount($data: CreateAccountInput!) {\n    createAccount(data: $data) {\n      status\n      message\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Query($companyname: String!) {\n  verifyCompanycode(companyname: $companyname)\n}\n"): (typeof documents)["\n  query Query($companyname: String!) {\n  verifyCompanycode(companyname: $companyname)\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetownCompany {\n  getownCompany {\n    redirect\n    isOwner\n    company {\n      companyCode\n      icon\n      id\n      name\n    }\n    companies {\n      companyCode\n      icon\n      id\n      name\n    }\n  }\n}\n"): (typeof documents)["\nquery GetownCompany {\n  getownCompany {\n    redirect\n    isOwner\n    company {\n      companyCode\n      icon\n      id\n      name\n    }\n    companies {\n      companyCode\n      icon\n      id\n      name\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Users {\n    users {\n      email\n      profile {\n        id\n        firstname_th\n        firstname_en\n        lastname_th\n        lastname_en\n      }\n      Role_Company {\n        id\n        name\n\n      }\n    }\n\n  }\n"): (typeof documents)["\nquery Users {\n    users {\n      email\n      profile {\n        id\n        firstname_th\n        firstname_en\n        lastname_th\n        lastname_en\n      }\n      Role_Company {\n        id\n        name\n\n      }\n    }\n\n  }\n"];

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function gql(source: string): unknown;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;