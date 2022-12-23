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
    "\n  mutation ValidateRoute($args: String!) {\n    validateRoute(args: $args) {\n      acess\n      path\n    }\n  }\n  ": types.ValidateRouteDocument,
    "\nquery Me {\n  me {\n    id\n    email\n    isOwner\n    companyBranch {\n      name\n      company {\n        name\n        id\n        icon\n        companyCode\n      }\n    }\n    role {\n      id\n      name\n    }\n    Position {\n      access\n      id\n      name\n    }\n    profile {\n      firstname\n      lastname\n      avatar\n    }\n  }\n}": types.MeDocument,
    "\n  mutation Login($data: LoginaInput!) {\n    login(data: $data) {\n      access_token\n      refresh_token\n      status\n    }\n  }\n": types.LoginDocument,
    "\n  query GetProvince {\n    getProvince {\n      name\n      district {\n        name\n        amphoe {\n          name\n          zipcode\n        }\n      }\n    }\n  }\n": types.GetProvinceDocument,
    "\n  mutation CreateAccount($data: CreateAccountInput!) {\n    createAccount(data: $data) {\n      status\n      message\n  }\n}": types.CreateAccountDocument,
    "\n  query Query($companyname: String!) {\n  verifyCompanycode(companyname: $companyname)\n}\n": types.QueryDocument,
    "\nquery GetownCompany {\n  getownCompany {\n    redirect\n    isOwner\n    company {\n      companyCode\n      icon\n      id\n      name\n    }\n    companies {\n      companyCode\n      icon\n      id\n      name\n    }\n  }\n}\n": types.GetownCompanyDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation refreshToken {\n    refreshToken {\n      access_token\n    }\n  }\n"): (typeof documents)["\n  mutation refreshToken {\n    refreshToken {\n      access_token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ValidateRoute($args: String!) {\n    validateRoute(args: $args) {\n      acess\n      path\n    }\n  }\n  "): (typeof documents)["\n  mutation ValidateRoute($args: String!) {\n    validateRoute(args: $args) {\n      acess\n      path\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Me {\n  me {\n    id\n    email\n    isOwner\n    companyBranch {\n      name\n      company {\n        name\n        id\n        icon\n        companyCode\n      }\n    }\n    role {\n      id\n      name\n    }\n    Position {\n      access\n      id\n      name\n    }\n    profile {\n      firstname\n      lastname\n      avatar\n    }\n  }\n}"): (typeof documents)["\nquery Me {\n  me {\n    id\n    email\n    isOwner\n    companyBranch {\n      name\n      company {\n        name\n        id\n        icon\n        companyCode\n      }\n    }\n    role {\n      id\n      name\n    }\n    Position {\n      access\n      id\n      name\n    }\n    profile {\n      firstname\n      lastname\n      avatar\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($data: LoginaInput!) {\n    login(data: $data) {\n      access_token\n      refresh_token\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation Login($data: LoginaInput!) {\n    login(data: $data) {\n      access_token\n      refresh_token\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProvince {\n    getProvince {\n      name\n      district {\n        name\n        amphoe {\n          name\n          zipcode\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProvince {\n    getProvince {\n      name\n      district {\n        name\n        amphoe {\n          name\n          zipcode\n        }\n      }\n    }\n  }\n"];
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