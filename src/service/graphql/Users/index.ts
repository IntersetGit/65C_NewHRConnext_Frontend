import { gql } from '../../../__generated__';

export const FETCH_GETALLUSER = gql(`
query Users {
    users {
      email
      profile {
        id
        firstname_th
        firstname_en
        lastname_th
        lastname_en
      }
      Role_Company {
        id
        name

      }
    }

  }
`);
