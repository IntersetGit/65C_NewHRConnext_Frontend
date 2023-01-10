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
`) 