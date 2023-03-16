import { gql } from '../../../__generated__';

export const CHANGE_PASSWORD = gql(`
mutation Changeselfpassword($data: changepasswordinput) {
    Changeselfpassword(data: $data) {
      message
      status
    }
  }
`);
