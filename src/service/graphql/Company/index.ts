import { gql } from '../../../__generated__';

export const FETCH_COMPANY_SELECT = gql(`
  query FetchcompanySelect {
    company {
      name
      branch{
        _count{
          users
        }
        id
        name
        address
      }
    }
  }
`);

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

export const COMPANY_BUSSINESS_TYPE = gql(`
query GetBusinessType {
  getBusinessType {
    id
    name
    SubBusinessType {
      id
      name
    }
  }
}
`);

export const CREATE_COMPANY_ACCOUNT = gql(`
mutation CreateAndUpdateComBarance($data: createCompanyBranch!) {
  createAndUpdateComBarance(data: $data) {
    message
    status
  }
}
`);

export const DELETE_COMPANY = gql(`
mutation DeleteComBarance($deleteComBaranceId: ID!) {
  deleteComBarance(id: $deleteComBaranceId) {
    message
    status
  }
}
`);
