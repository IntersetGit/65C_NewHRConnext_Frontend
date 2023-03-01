import { gql } from '../../../__generated__';

export const FETCH_ALL_LEAVE = gql(`
query GetAllleave($userId: ID, $name: String, $position2Id: ID, $position3Id: ID) {
  getAllleave(userId: $userId, name: $name, position2Id: $position2Id, position3Id: $position3Id) {
    data_all {
      email
      id
      profile {
        id
        firstname_th
        lastname_th
        firstname_en
        lastname_en
        avatar
        bio
        dob
        age
        relationship
        shirt_size
        prefix_th
        prefix_en
        citizen_id
        social_id
        staff_status
        tel
        address
        gender
        staff_code
        religion
        userId
        citizen_addressnumber
        citizen_address
        citizen_country
        citizen_province
        citizen_district
        citizen_state
        citizen_zipcode
        citizen_tel
        contract_sameCitizen
        contract_addressnumber
        contract_address
        contract_country
        contract_province
        contract_district
        contract_state
        contract_zipcode
        contract_email
        contract_companyemail
        social_facebook
        social_likedin
        social_line
        social_telegram
        nickname
        blood_type
        employee_status
        start_date_work
      }
      Position_user {
        id
        user_id
        position1_id
        position2_id
        position3_id
        role
        headderId
        date
        header {
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
        mas_positionlevel1 {
          id
          name
          level
          code
          type
          CompanyId
        }
        mas_positionlevel2 {
          id
          name
          level
          code
          type
          positionlevel1_id
        }
        mas_positionlevel3 {
          id
          name
          level
          code
          type
          positionlevel2_id
        }
      }
      data_leave {
        id
        leavetype_id
        start_date
        end_date
        quantity_day
        quantity_hours
        detail_leave
        Status
        user_id
        mas_leave_type {
          id
          name
          orderby
        }
        link_pdf
      }
    }
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
  }
}
`);

export const FETCH_BYID_LEAVE = gql(`
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
          quantity_hours
          detail_leave
          Status
          user_id
        }
      }
    }
  }
`);

export const LEAVE_TYPE_DATA = gql(`
query Getleavetypedata {
  getleavetypedata {
    id
    name
    orderby
  }
}
`);

export const CREATE_LEAVE = gql(`
mutation Createddata_leave($data: leave) {
  createddata_leave(data: $data) {
    message
    status
  }
}
`);

export const DELETE_LEAVE = gql(`
mutation Delete_leve($deleteLeveId: ID!) {
  delete_leve(id: $deleteLeveId) {
    message
    status
  }
}
`);
