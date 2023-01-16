import { gql } from '../../../__generated__';

export const FETCH_GETALLROLE = gql(`
query GetcompanyRole {
    getcompanyRole {
      access
      id
      name
      status
    }
  }
`);

export const FETCH_GETALLROLE_MANAGEMENT = gql(`
  query GetcompanyRoleManagement {
    getcompanyRole {
      access
      id
      name
  }
}`);

export const SAVE_COMPANY_ROLE = gql(`
  mutation updateRoleCompanyManagement($data: [UpdateRoleCompanyMangementType!]!) {
    updateRoleCompanyMangement(data: $data) {
      message
      status
    }
  }
`);
