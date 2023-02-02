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
    "\n  mutation ValidateRoute($args: String!, $branch: String) {\n    validateRoute(args: $args, branch: $branch) {\n      acess\n      currentBranch {\n        branchId\n        branchName\n        companyId\n        companyName\n      }\n      path\n      reAccess\n      reFresh\n    }\n  }\n  ": types.ValidateRouteDocument,
    "\nquery Me {\n  me {\n    Role_Company {\n      access\n      id\n      name\n      __typename\n    }\n    companyBranch {\n      companyId\n      company {\n        companyCode\n        icon\n        id\n        name\n        __typename\n      }\n      createdAt\n      id\n      name\n      __typename\n    }\n    email\n    id\n    isOwner\n    profile {\n      id\n      bio\n      firstname_th\n      lastname_th\n      firstname_en\n      lastname_en\n      avatar\n      dob\n      age\n      relationship\n      shirt_size\n      prefix_th\n      prefix_en\n      citizen_id\n      social_id\n      staff_status\n      tel\n      address\n      gender\n      staff_code\n      religion\n      userId\n      citizen_addressnumber\n      citizen_address\n      citizen_country\n      citizen_province\n      citizen_district\n      citizen_state\n      citizen_zipcode\n      citizen_tel\n      contract_sameCitizen\n      contract_addressnumber\n      contract_address\n      contract_country\n      contract_province\n      contract_district\n      contract_state\n      contract_zipcode\n      contract_email\n      contract_companyemail\n      social_facebook\n      social_likedin\n      social_line\n      social_telegram\n      nickname\n      blood_type\n      employee_status\n      start_date_work\n      __typename\n    }\n  }\n}": types.MeDocument,
    "\n  query Company {\n    company {\n      _count {\n        branch\n      }\n      branch {\n        _count {\n          users\n        }\n        id\n        name\n        address\n        address_2\n        city\n        state\n        zip\n        country\n        tel\n        fax\n        website\n        lat\n        lng\n        email\n        email_2\n        company_type\n        sub_company_type\n        registeredamount\n        social_facebook\n        social_likedin\n        social_instragram\n        social_line\n        createdAt\n        updatedAt\n      }\n      userlimit\n      name\n    }\n  }\n": types.CompanyDocument,
    "\n    mutation CreatedPosition($data: [CreatedAndUpdatePosition!]) {\n        CreatedPosition(data: $data) {\n          message\n          status\n        }\n      }": types.CreatedPositionDocument,
    "\n    mutation EditPosition($data: [CreatedAndUpdatePosition!]) {\n        EditPosition(data: $data) {\n          message\n          status\n        }\n      }": types.EditPositionDocument,
    "\nmutation CreateAccountUser($data: CreateAccountUserInput!) {\n  createAccountUser(data: $data) {\n    message\n    status\n  }\n}": types.CreateAccountUserDocument,
    "\nmutation DeleteAccountUser($deleteAccountUserId: ID!) {\n  deleteAccountUser(id: $deleteAccountUserId) {\n    message\n    status\n  }\n}": types.DeleteAccountUserDocument,
    "\n  mutation Login($data: LoginaInput!) {\n    login(data: $data) {\n      access_token\n      refresh_token\n      status\n    }\n  }\n": types.LoginDocument,
    "\nmutation Mutation($data: createRoleCompanyGroup!) {\n    createRoleCompany(data: $data) {\n      message\n      status\n    }\n  }\n": types.MutationDocument,
    "\nmutation DeleteRoleCompany($deleteRoleCompanyId: ID!) {\n  deleteRoleCompany(id: $deleteRoleCompanyId) {\n    message\n    status\n  }\n}": types.DeleteRoleCompanyDocument,
    "\n  mutation CreateAccount($data: CreateAccountInput!) {\n    createAccount(data: $data) {\n      status\n      message\n  }\n}": types.CreateAccountDocument,
    "\n  query Query($companyname: String!) {\n  verifyCompanycode(companyname: $companyname)\n}\n": types.QueryDocument,
    "\n  query FetchcompanySelect {\n    company {\n      name\n      branch{\n        _count{\n          users\n        }\n        id\n        name\n        address\n      }\n    }\n  }\n": types.FetchcompanySelectDocument,
    "\nquery GetownCompany {\n  getownCompany {\n    redirect\n    isOwner\n    company {\n      companyCode\n      icon\n      id\n      name\n    }\n    companies {\n      companyCode\n      icon\n      id\n      name\n    }\n  }\n}\n": types.GetownCompanyDocument,
    "\nmutation CreateAndUpdateComBarance($data: createCompanyBranch!) {\n  createAndUpdateComBarance(data: $data) {\n    message\n    status\n  }\n}\n": types.CreateAndUpdateComBaranceDocument,
    "\nmutation DeleteComBarance($deleteComBaranceId: ID!) {\n  deleteComBarance(id: $deleteComBaranceId) {\n    message\n    status\n  }\n}\n": types.DeleteComBaranceDocument,
    "\nquery GetHoliDayYear {\n    GetHoliDayYear {\n      id\n      day\n      month\n      year\n      holiday_name\n    }\n  }\n": types.GetHoliDayYearDocument,
    "\nquery getMasPositon {\n    getMasPositon {\n      id\n      name\n      level\n      code\n      type\n      mas_positionlevel2 {\n        type\n        code\n        name\n        level\n        mas_positionlevel3 {\n          id\n          name\n          level\n          code\n          type\n        }\n        id\n      }\n      CompanyId\n      Position_user {\n        id\n        user_id\n        position1_id\n        position2_id\n        position3_id\n        role\n        headderId\n        date\n      }\n    }\n  }\n": types.GetMasPositonDocument,
    "\nquery Getposition_user {\n    getposition_user {\n      id\n      user {\n        id\n        email\n        password\n        profile {\n          firstname_th\n          lastname_th\n          id\n          firstname_en\n          lastname_en\n          prefix_th\n          prefix_en\n        }\n      }\n      position1_id\n      mas_positionlevel1 {\n        id\n        name\n        level\n      }\n      position2_id\n      mas_positionlevel2 {\n        id\n        name\n        level\n      }\n      position3_id\n      mas_positionlevel3 {\n        id\n        name\n        level\n      }\n      role\n      date\n      header {\n        email\n        profile {\n          firstname_th\n          lastname_th\n          firstname_en\n          lastname_en\n          prefix_th\n          prefix_en\n        }\n      }\n    }\n  }\n": types.Getposition_UserDocument,
    "\n  query getProvince {\n    getProvince {\n      name\n      id\n      district {\n        amphoe {\n          id\n          name\n          zipcode\n        }\n        id\n        name\n      }\n    }\n  }\n": types.GetProvinceDocument,
    "\nquery GetcompanyRole {\n    getcompanyRole {\n      access\n      id\n      name\n      status\n    }\n  }\n": types.GetcompanyRoleDocument,
    "\n  query GetcompanyRoleManagement {\n    getcompanyRole {\n      access\n      id\n      name\n  }\n}": types.GetcompanyRoleManagementDocument,
    "\n  mutation updateRoleCompanyManagement($data: [UpdateRoleCompanyMangementType!]!) {\n    updateRoleCompanyMangement(data: $data) {\n      message\n      status\n    }\n  }\n": types.UpdateRoleCompanyManagementDocument,
    "\nquery Users {\n    users {\n      id\n      email\n      profile {\n        address\n        age\n        avatar\n        bio\n        citizen_address\n        citizen_addressnumber\n        citizen_country\n        citizen_district\n        citizen_id\n        citizen_province\n        citizen_state\n        citizen_tel\n        citizen_zipcode\n        contract_address\n        contract_addressnumber\n        contract_companyemail\n        contract_country\n        contract_district\n        id\n        firstname_th\n        lastname_th\n        firstname_en\n        lastname_en\n        dob\n        relationship\n        shirt_size\n        prefix_th\n        prefix_en\n        social_id\n        staff_status\n        tel\n        gender\n        staff_code\n        religion\n        userId\n        contract_sameCitizen\n        contract_province\n        contract_state\n        contract_zipcode\n        contract_email\n        social_facebook\n        social_likedin\n        social_line\n        social_telegram\n        nickname\n        blood_type\n        employee_status\n        start_date_work\n        user {\n          email\n          password\n        }\n      }\n      Role_Company {\n        id\n        name\n\n      }\n    }\n\n  }\n": types.UsersDocument,
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
export function gql(source: "\n  mutation ValidateRoute($args: String!, $branch: String) {\n    validateRoute(args: $args, branch: $branch) {\n      acess\n      currentBranch {\n        branchId\n        branchName\n        companyId\n        companyName\n      }\n      path\n      reAccess\n      reFresh\n    }\n  }\n  "): (typeof documents)["\n  mutation ValidateRoute($args: String!, $branch: String) {\n    validateRoute(args: $args, branch: $branch) {\n      acess\n      currentBranch {\n        branchId\n        branchName\n        companyId\n        companyName\n      }\n      path\n      reAccess\n      reFresh\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Me {\n  me {\n    Role_Company {\n      access\n      id\n      name\n      __typename\n    }\n    companyBranch {\n      companyId\n      company {\n        companyCode\n        icon\n        id\n        name\n        __typename\n      }\n      createdAt\n      id\n      name\n      __typename\n    }\n    email\n    id\n    isOwner\n    profile {\n      id\n      bio\n      firstname_th\n      lastname_th\n      firstname_en\n      lastname_en\n      avatar\n      dob\n      age\n      relationship\n      shirt_size\n      prefix_th\n      prefix_en\n      citizen_id\n      social_id\n      staff_status\n      tel\n      address\n      gender\n      staff_code\n      religion\n      userId\n      citizen_addressnumber\n      citizen_address\n      citizen_country\n      citizen_province\n      citizen_district\n      citizen_state\n      citizen_zipcode\n      citizen_tel\n      contract_sameCitizen\n      contract_addressnumber\n      contract_address\n      contract_country\n      contract_province\n      contract_district\n      contract_state\n      contract_zipcode\n      contract_email\n      contract_companyemail\n      social_facebook\n      social_likedin\n      social_line\n      social_telegram\n      nickname\n      blood_type\n      employee_status\n      start_date_work\n      __typename\n    }\n  }\n}"): (typeof documents)["\nquery Me {\n  me {\n    Role_Company {\n      access\n      id\n      name\n      __typename\n    }\n    companyBranch {\n      companyId\n      company {\n        companyCode\n        icon\n        id\n        name\n        __typename\n      }\n      createdAt\n      id\n      name\n      __typename\n    }\n    email\n    id\n    isOwner\n    profile {\n      id\n      bio\n      firstname_th\n      lastname_th\n      firstname_en\n      lastname_en\n      avatar\n      dob\n      age\n      relationship\n      shirt_size\n      prefix_th\n      prefix_en\n      citizen_id\n      social_id\n      staff_status\n      tel\n      address\n      gender\n      staff_code\n      religion\n      userId\n      citizen_addressnumber\n      citizen_address\n      citizen_country\n      citizen_province\n      citizen_district\n      citizen_state\n      citizen_zipcode\n      citizen_tel\n      contract_sameCitizen\n      contract_addressnumber\n      contract_address\n      contract_country\n      contract_province\n      contract_district\n      contract_state\n      contract_zipcode\n      contract_email\n      contract_companyemail\n      social_facebook\n      social_likedin\n      social_line\n      social_telegram\n      nickname\n      blood_type\n      employee_status\n      start_date_work\n      __typename\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Company {\n    company {\n      _count {\n        branch\n      }\n      branch {\n        _count {\n          users\n        }\n        id\n        name\n        address\n        address_2\n        city\n        state\n        zip\n        country\n        tel\n        fax\n        website\n        lat\n        lng\n        email\n        email_2\n        company_type\n        sub_company_type\n        registeredamount\n        social_facebook\n        social_likedin\n        social_instragram\n        social_line\n        createdAt\n        updatedAt\n      }\n      userlimit\n      name\n    }\n  }\n"): (typeof documents)["\n  query Company {\n    company {\n      _count {\n        branch\n      }\n      branch {\n        _count {\n          users\n        }\n        id\n        name\n        address\n        address_2\n        city\n        state\n        zip\n        country\n        tel\n        fax\n        website\n        lat\n        lng\n        email\n        email_2\n        company_type\n        sub_company_type\n        registeredamount\n        social_facebook\n        social_likedin\n        social_instragram\n        social_line\n        createdAt\n        updatedAt\n      }\n      userlimit\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreatedPosition($data: [CreatedAndUpdatePosition!]) {\n        CreatedPosition(data: $data) {\n          message\n          status\n        }\n      }"): (typeof documents)["\n    mutation CreatedPosition($data: [CreatedAndUpdatePosition!]) {\n        CreatedPosition(data: $data) {\n          message\n          status\n        }\n      }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation EditPosition($data: [CreatedAndUpdatePosition!]) {\n        EditPosition(data: $data) {\n          message\n          status\n        }\n      }"): (typeof documents)["\n    mutation EditPosition($data: [CreatedAndUpdatePosition!]) {\n        EditPosition(data: $data) {\n          message\n          status\n        }\n      }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateAccountUser($data: CreateAccountUserInput!) {\n  createAccountUser(data: $data) {\n    message\n    status\n  }\n}"): (typeof documents)["\nmutation CreateAccountUser($data: CreateAccountUserInput!) {\n  createAccountUser(data: $data) {\n    message\n    status\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteAccountUser($deleteAccountUserId: ID!) {\n  deleteAccountUser(id: $deleteAccountUserId) {\n    message\n    status\n  }\n}"): (typeof documents)["\nmutation DeleteAccountUser($deleteAccountUserId: ID!) {\n  deleteAccountUser(id: $deleteAccountUserId) {\n    message\n    status\n  }\n}"];
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
export function gql(source: "\nmutation DeleteRoleCompany($deleteRoleCompanyId: ID!) {\n  deleteRoleCompany(id: $deleteRoleCompanyId) {\n    message\n    status\n  }\n}"): (typeof documents)["\nmutation DeleteRoleCompany($deleteRoleCompanyId: ID!) {\n  deleteRoleCompany(id: $deleteRoleCompanyId) {\n    message\n    status\n  }\n}"];
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
export function gql(source: "\n  query FetchcompanySelect {\n    company {\n      name\n      branch{\n        _count{\n          users\n        }\n        id\n        name\n        address\n      }\n    }\n  }\n"): (typeof documents)["\n  query FetchcompanySelect {\n    company {\n      name\n      branch{\n        _count{\n          users\n        }\n        id\n        name\n        address\n      }\n    }\n  }\n"];
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
export function gql(source: "\nmutation DeleteComBarance($deleteComBaranceId: ID!) {\n  deleteComBarance(id: $deleteComBaranceId) {\n    message\n    status\n  }\n}\n"): (typeof documents)["\nmutation DeleteComBarance($deleteComBaranceId: ID!) {\n  deleteComBarance(id: $deleteComBaranceId) {\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetHoliDayYear {\n    GetHoliDayYear {\n      id\n      day\n      month\n      year\n      holiday_name\n    }\n  }\n"): (typeof documents)["\nquery GetHoliDayYear {\n    GetHoliDayYear {\n      id\n      day\n      month\n      year\n      holiday_name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getMasPositon {\n    getMasPositon {\n      id\n      name\n      level\n      code\n      type\n      mas_positionlevel2 {\n        type\n        code\n        name\n        level\n        mas_positionlevel3 {\n          id\n          name\n          level\n          code\n          type\n        }\n        id\n      }\n      CompanyId\n      Position_user {\n        id\n        user_id\n        position1_id\n        position2_id\n        position3_id\n        role\n        headderId\n        date\n      }\n    }\n  }\n"): (typeof documents)["\nquery getMasPositon {\n    getMasPositon {\n      id\n      name\n      level\n      code\n      type\n      mas_positionlevel2 {\n        type\n        code\n        name\n        level\n        mas_positionlevel3 {\n          id\n          name\n          level\n          code\n          type\n        }\n        id\n      }\n      CompanyId\n      Position_user {\n        id\n        user_id\n        position1_id\n        position2_id\n        position3_id\n        role\n        headderId\n        date\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Getposition_user {\n    getposition_user {\n      id\n      user {\n        id\n        email\n        password\n        profile {\n          firstname_th\n          lastname_th\n          id\n          firstname_en\n          lastname_en\n          prefix_th\n          prefix_en\n        }\n      }\n      position1_id\n      mas_positionlevel1 {\n        id\n        name\n        level\n      }\n      position2_id\n      mas_positionlevel2 {\n        id\n        name\n        level\n      }\n      position3_id\n      mas_positionlevel3 {\n        id\n        name\n        level\n      }\n      role\n      date\n      header {\n        email\n        profile {\n          firstname_th\n          lastname_th\n          firstname_en\n          lastname_en\n          prefix_th\n          prefix_en\n        }\n      }\n    }\n  }\n"): (typeof documents)["\nquery Getposition_user {\n    getposition_user {\n      id\n      user {\n        id\n        email\n        password\n        profile {\n          firstname_th\n          lastname_th\n          id\n          firstname_en\n          lastname_en\n          prefix_th\n          prefix_en\n        }\n      }\n      position1_id\n      mas_positionlevel1 {\n        id\n        name\n        level\n      }\n      position2_id\n      mas_positionlevel2 {\n        id\n        name\n        level\n      }\n      position3_id\n      mas_positionlevel3 {\n        id\n        name\n        level\n      }\n      role\n      date\n      header {\n        email\n        profile {\n          firstname_th\n          lastname_th\n          firstname_en\n          lastname_en\n          prefix_th\n          prefix_en\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getProvince {\n    getProvince {\n      name\n      id\n      district {\n        amphoe {\n          id\n          name\n          zipcode\n        }\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProvince {\n    getProvince {\n      name\n      id\n      district {\n        amphoe {\n          id\n          name\n          zipcode\n        }\n        id\n        name\n      }\n    }\n  }\n"];
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
export function gql(source: "\nquery Users {\n    users {\n      id\n      email\n      profile {\n        address\n        age\n        avatar\n        bio\n        citizen_address\n        citizen_addressnumber\n        citizen_country\n        citizen_district\n        citizen_id\n        citizen_province\n        citizen_state\n        citizen_tel\n        citizen_zipcode\n        contract_address\n        contract_addressnumber\n        contract_companyemail\n        contract_country\n        contract_district\n        id\n        firstname_th\n        lastname_th\n        firstname_en\n        lastname_en\n        dob\n        relationship\n        shirt_size\n        prefix_th\n        prefix_en\n        social_id\n        staff_status\n        tel\n        gender\n        staff_code\n        religion\n        userId\n        contract_sameCitizen\n        contract_province\n        contract_state\n        contract_zipcode\n        contract_email\n        social_facebook\n        social_likedin\n        social_line\n        social_telegram\n        nickname\n        blood_type\n        employee_status\n        start_date_work\n        user {\n          email\n          password\n        }\n      }\n      Role_Company {\n        id\n        name\n\n      }\n    }\n\n  }\n"): (typeof documents)["\nquery Users {\n    users {\n      id\n      email\n      profile {\n        address\n        age\n        avatar\n        bio\n        citizen_address\n        citizen_addressnumber\n        citizen_country\n        citizen_district\n        citizen_id\n        citizen_province\n        citizen_state\n        citizen_tel\n        citizen_zipcode\n        contract_address\n        contract_addressnumber\n        contract_companyemail\n        contract_country\n        contract_district\n        id\n        firstname_th\n        lastname_th\n        firstname_en\n        lastname_en\n        dob\n        relationship\n        shirt_size\n        prefix_th\n        prefix_en\n        social_id\n        staff_status\n        tel\n        gender\n        staff_code\n        religion\n        userId\n        contract_sameCitizen\n        contract_province\n        contract_state\n        contract_zipcode\n        contract_email\n        social_facebook\n        social_likedin\n        social_line\n        social_telegram\n        nickname\n        blood_type\n        employee_status\n        start_date_work\n        user {\n          email\n          password\n        }\n      }\n      Role_Company {\n        id\n        name\n\n      }\n    }\n\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;