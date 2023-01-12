import { gql } from '../../../__generated__';

export const FETCH_OWNCOMAPNY = gql(`
query GetownCompany {
  getownCompany {
    redirect
    isOwner
    company {
      companyCode
      icon
      id
      name
    }
    companies {
      companyCode
      icon
      id
      name
    }
  }
}
`);

export const CREATE_COMPANY_ACCOUNT = gql(`
  mutation UpdateRoleCompanyMangement($data: [UpdateRoleCompanyMangementType!]!) {
    updateRoleCompanyMangement(data: $data) {
      status
      message
    }
  }
`);
