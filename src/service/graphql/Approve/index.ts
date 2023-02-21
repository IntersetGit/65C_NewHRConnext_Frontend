import { gql } from '../../../__generated__';

export const FETCH_ALL_APPROVE = gql(`
query Getleava_alldata($name: String, $position2Id: ID, $position3Id: ID) {
  getleava_alldata(name: $name, position2Id: $position2Id, position3Id: $position3Id) {
      id
      leavetype_id
      mas_leave_type {
        id
        name
        orderby
      }
      start_date
      end_date
      quantity_day
      quantity_hours
      detail_leave
      Status
      user_id
      user {
        id
        email
        profile {
          id
          firstname_th
          lastname_th
          firstname_en
          lastname_en
          avatar
        }
      }
    }
  }
`);
