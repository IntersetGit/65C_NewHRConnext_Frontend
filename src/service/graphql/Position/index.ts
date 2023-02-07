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
        type
        code
        name
        level
        mas_positionlevel3 {
          id
          name
          level
          code
          type
        }
        id
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

export const FETCH_GETALL_POSITION = gql(`
query Getposition_user($getpositionUserId: ID) {
    getposition_user(id: $getpositionUserId) {
      id
      user {
        id
        email
        password
        profile {
          firstname_th
          lastname_th
          id
          firstname_en
          lastname_en
          prefix_th
          prefix_en
        }
      }
      position1_id
      mas_positionlevel1 {
        id
        name
        level
      }
      position2_id
      mas_positionlevel2 {
        id
        name
        level
      }
      position3_id
      mas_positionlevel3 {
        id
        name
        level
      }
      role
      date
      header {
        id
        email
        profile {
          firstname_th
          lastname_th
          firstname_en
          lastname_en
          prefix_th
          prefix_en
        }
      }
    }
  }
`);

export const FETCH_BYID_POSITION = gql(`
query GetpositionMe {
  getpositionMe {
    id
    user {
      email
      id
      profile {
        id
        firstname_th
        lastname_th
        firstname_en
        lastname_en
        avatar
        dob
        userId
        start_date_work
      }
    }
    header {
      email
      id
      profile {
        firstname_th
        lastname_th
        firstname_en
        lastname_en
        avatar
        dob
        start_date_work
      }
    }
    position1_id
    position2_id
    position3_id
    role
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
}`);

export const CRETE_POSITION_USER = gql(`
mutation Createdposition_user($data: position!) {
  createdposition_user(data: $data) {
    message
    status
  }
}`);
