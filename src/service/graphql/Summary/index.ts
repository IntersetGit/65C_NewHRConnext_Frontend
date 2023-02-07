import { gql } from '../../../__generated__';

export const FETCH_SELECT_BOOK_BANK = gql(`
query Mas_bank {
  mas_bank {
    id
    name
    }
  }
`);

export const FETCH_DATA_SUMMARY = gql(`
query Datasalary_mee {
  datasalary_mee {
    email
    id
    profile {
      firstname_th
      lastname_th
      avatar
    }
    salary {
      month
      years
      net
      total_expense
      total_income
      provident_company
      provident_employee
      mas_bank {
        name
      }
      bookbank_log {
        bank_number
      }
    }
  }
}
`);


