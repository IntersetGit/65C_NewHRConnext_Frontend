import { gql } from '../../../__generated__';

export const POSITION = gql(`
query getMasPositon {
    getMasPositon {
      id
      name
      level
      code
      type
      mas_positionlevel2 {
        positionlevel1_id
        type
        code
      }
      CompanyId
      Position_user {
        id
        user_id
        position1_id
        position2_id
        position3_id
        role
        headderId
        date
      }
    }
  }
`);