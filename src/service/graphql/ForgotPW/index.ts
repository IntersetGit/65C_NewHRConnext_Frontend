import { gql } from '../../../__generated__';

export const FORGOT_PASSWORD = gql(`
mutation Forgotpassword($data: forgetpasswordInput) {
    Forgotpassword(data: $data) {
      message
      status
    }
  }
`);

export const CHANGE_PW_fORGOT = gql(`
mutation Changesepasswordinforgot($data: changepasswordInforgotpasswordinput) {
    Changesepasswordinforgot(data: $data) {
      message
      status
    }
  }
`);

