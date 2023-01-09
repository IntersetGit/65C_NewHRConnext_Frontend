import { gql } from '../../../__generated__';

export const FETCH_GETALLUSER = gql(`
query Users {
    users {
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
        user {
          email
          password
        }
      }
      Role_Company {
        id
        name

      }
    }

  }
`);
