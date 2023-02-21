import { gql } from '../../../__generated__';

export const FETCH_GETALLUSER = gql(`
query Users($name: String, $position2Id: ID, $position3Id: ID) {
  users(name: $name, position2Id: $position2Id, position3Id: $position3Id) {
      id
      email
      profile {
        address
        age
        avatar
        bio
        citizen_address
        citizen_addressnumber
        citizen_country
        citizen_district
        citizen_id
        citizen_province
        citizen_state
        citizen_tel
        citizen_zipcode
        contract_address
        contract_addressnumber
        contract_companyemail
        contract_country
        contract_district
        id
        firstname_th
        lastname_th
        firstname_en
        lastname_en
        dob
        relationship
        shirt_size
        prefix_th
        prefix_en
        social_id
        staff_status
        tel
        gender
        staff_code
        religion
        userId
        contract_sameCitizen
        contract_province
        contract_state
        contract_zipcode
        contract_email
        social_facebook
        social_likedin
        social_line
        social_telegram
        nickname
        blood_type
        employee_status
        start_date_work
        user {
          email
          password
        }
      }
      Role_Company {
        id
        name

      }
      Position_user {
        date
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
    }

  }
`);
