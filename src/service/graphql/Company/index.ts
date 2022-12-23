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
