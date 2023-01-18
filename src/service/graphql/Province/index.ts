import { gql } from '../../../__generated__/gql';

export const GET_PROVINCE = gql(/* GraphQL */ `
  query getProvince {
    getProvince {
      name
      id
      district {
        amphoe {
          id
          name
          zipcode
        }
        id
        name
      }
    }
  }
`);
