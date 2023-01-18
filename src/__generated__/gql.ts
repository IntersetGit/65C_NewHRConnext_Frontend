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
    "\n  mutation ValidateRoute($args: String!) {\n    validateRoute(args: $args) {\n      path\n      currentBranch {\n        branchId\n        branchName\n        companyId\n        companyName\n      }\n      acess\n      reAccess\n      reFresh\n    }\n  }\n  ": types.ValidateRouteDocument,
    "\nquery Me {\n  me {\n    Role_Company {\n      access\n      id\n      name\n      __typename\n    }\n    companyBranch {\n      companyId\n      company {\n        companyCode\n        icon\n        id\n        name\n        __typename\n      }\n      createdAt\n      id\n      name\n      __typename\n    }\n    email\n    id\n    isOwner\n    profile {\n      firstname_th\n      lastname_en\n      firstname_en\n      lastname_th\n      prefix_en\n      prefix_th\n      staff_code\n      __typename\n    }\n  }\n}": types.MeDocument,
    "\n  query Company {\n    company {\n      _count {\n        branch\n      }\n      branch {\n        _count {\n          users\n        }\n        id\n        name\n        address\n        address_2\n        city\n        state\n        zip\n        country\n        tel\n        fax\n        website\n        lat\n        lng\n        email\n        email_2\n        company_type\n        sub_company_type\n        registeredamount\n        social_facebook\n        social_likedin\n        social_instragram\n        social_line\n        createdAt\n        updatedAt\n      }\n      userlimit\n      name\n    }\n  }\n": types.CompanyDocument,
    "\n  query GetProvince {\n    getProvince {\n      name\n      district {\n        name\n        amphoe {\n          name\n          zipcode\n        }\n      }\n    }\n  }\n": types.GetProvinceDocument,
    "\nmutation DeleteAccountUser($deleteAccountUserId: ID!) {\n  deleteAccountUser(id: $deleteAccountUserId) {\n    message\n    status\n  }\n}": types.DeleteAccountUserDocument,
    "\nmutation CreateAccountUser($data: CreateAccountUserInput!) {\n  createAccountUser(data: $data) {\n    message\n    status\n  }\n}": types.CreateAccountUserDocument,
    "\n  mutation Login($data: LoginaInput!) {\n    login(data: $data) {\n      access_token\n      refresh_token\n      status\n    }\n  }\n": types.LoginDocument,
    "\nmutation Mutation($data: createRoleCompanyGroup!) {\n    createRoleCompany(data: $data) {\n      message\n      status\n    }\n  }\n": types.MutationDocument,
    "\n  mutation CreateAccount($data: CreateAccountInput!) {\n    createAccount(data: $data) {\n      status\n      message\n  }\n}": types.CreateAccountDocument,
    "\n  query Query($companyname: String!) {\n  verifyCompanycode(companyname: $companyname)\n}\n": types.QueryDocument,
    "\nquery GetownCompany {\n  getownCompany {\n    redirect\n    isOwner\n    company {\n      companyCode\n      icon\n      id\n      name\n    }\n    companies {\n      companyCode\n      icon\n      id\n      name\n    }\n  }\n}\n": types.GetownCompanyDocument,
    "\nmutation CreateAndUpdateComBarance($data: createCompanyBranch!) {\n  createAndUpdateComBarance(data: $data) {\n    message\n    status\n  }\n}\n": types.CreateAndUpdateComBaranceDocument,
    "\nquery GetcompanyRole {\n    getcompanyRole {\n      access\n      id\n      name\n      status\n    }\n  }\n": types.GetcompanyRoleDocument,
    "\n  query GetcompanyRoleManagement {\n    getcompanyRole {\n      access\n      id\n      name\n  }\n}": types.GetcompanyRoleManagementDocument,
    "\n  mutation updateRoleCompanyManagement($data: [UpdateRoleCompanyMangementType!]!) {\n    updateRoleCompanyMangement(data: $data) {\n      message\n      status\n    }\n  }\n": types.UpdateRoleCompanyManagementDocument,
    "\nquery Users {\n    users {\n      id\n      email\n      profile {\n        address\n        age\n        avatar\n        bio\n        citizen_address\n        citizen_addressnumber\n        citizen_country\n        citizen_district\n        citizen_id\n        citizen_province\n        citizen_state\n        citizen_tel\n        citizen_zipcode\n        contract_address\n        contract_addressnumber\n        contract_companyemail\n        contract_country\n        contract_district\n        id\n        firstname_th\n        lastname_th\n        firstname_en\n        lastname_en\n        dob\n        relationship\n        shirt_size\n        prefix_th\n        prefix_en\n        social_id\n        staff_status\n        tel\n        gender\n        staff_code\n        religion\n        userId\n        contract_sameCitizen\n        contract_province\n        contract_state\n        contract_zipcode\n        contract_email\n        social_facebook\n        social_likedin\n        social_line\n        social_telegram\n        user {\n          email\n          password\n        }\n      }\n      Role_Company {\n        id\n        name\n\n      }\n    }\n\n  }\n": types.UsersDocument,
};

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
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation refreshToken {\n    refreshToken {\n      access_token\n    }\n  }\n"): (typeof documents)["\n  mutation refreshToken {\n    refreshToken {\n      access_token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ValidateRoute($args: String!) {\n    validateRoute(args: $args) {\n      path\n      currentBranch {\n        branchId\n        branchName\n        companyId\n        companyName\n      }\n      acess\n      reAccess\n      reFresh\n    }\n  }\n  "): (typeof documents)["\n  mutation ValidateRoute($args: String!) {\n    validateRoute(args: $args) {\n      path\n      currentBranch {\n        branchId\n        branchName\n        companyId\n        companyName\n      }\n      acess\n      reAccess\n      reFresh\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Me {\n  me {\n    Role_Company {\n      access\n      id\n      name\n      __typename\n    }\n    companyBranch {\n      companyId\n      company {\n        companyCode\n        icon\n        id\n        name\n        __typename\n      }\n      createdAt\n      id\n      name\n      __typename\n    }\n    email\n    id\n    isOwner\n    profile {\n      firstname_th\n      lastname_en\n      firstname_en\n      lastname_th\n      prefix_en\n      prefix_th\n      staff_code\n      __typename\n    }\n  }\n}"): (typeof documents)["\nquery Me {\n  me {\n    Role_Company {\n      access\n      id\n      name\n      __typename\n    }\n    companyBranch {\n      companyId\n      company {\n        companyCode\n        icon\n        id\n        name\n        __typename\n      }\n      createdAt\n      id\n      name\n      __typename\n    }\n    email\n    id\n    isOwner\n    profile {\n      firstname_th\n      lastname_en\n      firstname_en\n      lastname_th\n      prefix_en\n      prefix_th\n      staff_code\n      __typename\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Company {\n    company {\n      _count {\n        branch\n      }\n      branch {\n        _count {\n          users\n        }\n        id\n        name\n        address\n        address_2\n        city\n        state\n        zip\n        country\n        tel\n        fax\n        website\n        lat\n        lng\n        email\n        email_2\n        company_type\n        sub_company_type\n        registeredamount\n        social_facebook\n        social_likedin\n        social_instragram\n        social_line\n        createdAt\n        updatedAt\n      }\n      userlimit\n      name\n    }\n  }\n"): (typeof documents)["\n  query Company {\n    company {\n      _count {\n        branch\n      }\n      branch {\n        _count {\n          users\n        }\n        id\n        name\n        address\n        address_2\n        city\n        state\n        zip\n        country\n        tel\n        fax\n        website\n        lat\n        lng\n        email\n        email_2\n        company_type\n        sub_company_type\n        registeredamount\n        social_facebook\n        social_likedin\n        social_instragram\n        social_line\n        createdAt\n        updatedAt\n      }\n      userlimit\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProvince {\n    getProvince {\n      name\n      district {\n        name\n        amphoe {\n          name\n          zipcode\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProvince {\n    getProvince {\n      name\n      district {\n        name\n        amphoe {\n          name\n          zipcode\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteAccountUser($deleteAccountUserId: ID!) {\n  deleteAccountUser(id: $deleteAccountUserId) {\n    message\n    status\n  }\n}"): (typeof documents)["\nmutation DeleteAccountUser($deleteAccountUserId: ID!) {\n  deleteAccountUser(id: $deleteAccountUserId) {\n    message\n    status\n  }\n}"];
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
export function gql(source: "\nmutation Mutation($data: createRoleCompanyGroup!) {\n    createRoleCompany(data: $data) {\n      message\n      status\n    }\n  }\n"): (typeof documents)["\nmutation Mutation($data: createRoleCompanyGroup!) {\n    createRoleCompany(data: $data) {\n      message\n      status\n    }\n  }\n"];
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
export function gql(source: "\nmutation CreateAndUpdateComBarance($data: createCompanyBranch!) {\n  createAndUpdateComBarance(data: $data) {\n    message\n    status\n  }\n}\n"): (typeof documents)["\nmutation CreateAndUpdateComBarance($data: createCompanyBranch!) {\n  createAndUpdateComBarance(data: $data) {\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetcompanyRole {\n    getcompanyRole {\n      access\n      id\n      name\n      status\n    }\n  }\n"): (typeof documents)["\nquery GetcompanyRole {\n    getcompanyRole {\n      access\n      id\n      name\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetcompanyRoleManagement {\n    getcompanyRole {\n      access\n      id\n      name\n  }\n}"): (typeof documents)["\n  query GetcompanyRoleManagement {\n    getcompanyRole {\n      access\n      id\n      name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateRoleCompanyManagement($data: [UpdateRoleCompanyMangementType!]!) {\n    updateRoleCompanyMangement(data: $data) {\n      message\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation updateRoleCompanyManagement($data: [UpdateRoleCompanyMangementType!]!) {\n    updateRoleCompanyMangement(data: $data) {\n      message\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Users {\n    users {\n      id\n      email\n      profile {\n        address\n        age\n        avatar\n        bio\n        citizen_address\n        citizen_addressnumber\n        citizen_country\n        citizen_district\n        citizen_id\n        citizen_province\n        citizen_state\n        citizen_tel\n        citizen_zipcode\n        contract_address\n        contract_addressnumber\n        contract_companyemail\n        contract_country\n        contract_district\n        id\n        firstname_th\n        lastname_th\n        firstname_en\n        lastname_en\n        dob\n        relationship\n        shirt_size\n        prefix_th\n        prefix_en\n        social_id\n        staff_status\n        tel\n        gender\n        staff_code\n        religion\n        userId\n        contract_sameCitizen\n        contract_province\n        contract_state\n        contract_zipcode\n        contract_email\n        social_facebook\n        social_likedin\n        social_line\n        social_telegram\n        user {\n          email\n          password\n        }\n      }\n      Role_Company {\n        id\n        name\n\n      }\n    }\n\n  }\n"): (typeof documents)["\nquery Users {\n    users {\n      id\n      email\n      profile {\n        address\n        age\n        avatar\n        bio\n        citizen_address\n        citizen_addressnumber\n        citizen_country\n        citizen_district\n        citizen_id\n        citizen_province\n        citizen_state\n        citizen_tel\n        citizen_zipcode\n        contract_address\n        contract_addressnumber\n        contract_companyemail\n        contract_country\n        contract_district\n        id\n        firstname_th\n        lastname_th\n        firstname_en\n        lastname_en\n        dob\n        relationship\n        shirt_size\n        prefix_th\n        prefix_en\n        social_id\n        staff_status\n        tel\n        gender\n        staff_code\n        religion\n        userId\n        contract_sameCitizen\n        contract_province\n        contract_state\n        contract_zipcode\n        contract_email\n        social_facebook\n        social_likedin\n        social_line\n        social_telegram\n        user {\n          email\n          password\n        }\n      }\n      Role_Company {\n        id\n        name\n\n      }\n    }\n\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;