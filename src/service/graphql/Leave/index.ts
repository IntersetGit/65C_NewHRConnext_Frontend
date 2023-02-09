import { gql } from '../../../__generated__';

export const FECTH_ALL_LEAVE = gql(`
query Getleava_datame {
    getleava_datame {
      data_count {
        name_1
        count1
        name_2
        count2
        name_3
        count3
        name_4
        count4
      }
      data_all {
        email
        id
        profile {
          firstname_th
          lastname_th
          firstname_en
          lastname_en
          avatar
          dob
          id
          userId
          start_date_work
          prefix_th
          prefix_en
        }
        Position_user {
          id
          position1_id
          position2_id
          position3_id
          user_id
          role
          headderId
          date
          mas_positionlevel1 {
            id
            name
            level
            code
            type
          }
          mas_positionlevel2 {
            id
            name
            level
            code
            type
          }
          mas_positionlevel3 {
            id
            name
            level
            code
            type
          }
        }
        data_leave {
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
          detail_leave
          Status
          user_id
        }
      }
    }
  }
`);
