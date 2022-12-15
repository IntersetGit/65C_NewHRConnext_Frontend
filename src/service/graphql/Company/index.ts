import { gql } from '../../../__generated__';

export const FETCH_OWNCOMAPNY = gql(`
query GetownCompany {
  getownCompany {
    codeCompany
    companyType
    name
    icon
    id
  }
}
`);
