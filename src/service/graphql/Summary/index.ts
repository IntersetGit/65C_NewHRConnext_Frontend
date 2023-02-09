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

export const UPDATE_SALARY_BASE = gql(`
mutation Createbookbank($data: bookbank_logInput) {
  Createbookbank(data: $data) {
    message
    status
  }
}
`);

export const FETCH_AllSALARY_BASE = gql(`
query Data_salary($fristname: String, $position2: String, $position3: String) {
  data_salary(fristname: $fristname, Position2: $position2, Position3: $position3) {
    id
    profile {
      id
      firstname_th
      lastname_th
      prefix_th
      staff_code
      staff_status
      start_date_work
      userId
      employee_status
    }
    bookbank_log {
      base_salary
      id
      date
      bank_number
      mas_bank {
        id
        name
      }
      mas_bankId
      all_collectId
      provident_com
      provident_emp
      userId
    }
    Position_user {
      position2_id
      mas_positionlevel2 {
        id
        name
        level
        code
        type
        positionlevel1_id
      }
      position3_id
      mas_positionlevel3 {
        id
        name
        level
        code
        type
        positionlevel2_id
      }
      id
      user_id
      position1_id
      role
      headderId
      date
      mas_positionlevel1 {
        id
        name
        level
        code
        type
        CompanyId
      }
    }
  }
}
`);

export const FETCH_AllSALARY_USER = gql(`
query Salary($userId: String) {
  salary(userId: $userId) {
    id
    profile {
      firstname_th
      lastname_th
    }
    salary {
      net
      month
      years
    }
    Position_user {
      role
      user_id
      date
      mas_positionlevel3 {
        name
      }
    }
    bookbank_log {
      mas_bank {
        name
      }
      bank_number
      base_salary
    }
    companyBranch {
      company {
        name
      }
      address
      address_2
    }
  }
}
`);

export const CREATE_SALARY_USER = gql(`
  mutation Createsalary($data: salaryInput) {
    Createsalary(data: $data) {
      message
      status
    }
  }
`);

export const CREATE_ExpenseCom = gql(`
  mutation CreateAndUpdateExpenseCom($data: ExpenseComInput) {
    CreateAndUpdateExpenseCom(data: $data) {
      message
      status
    }
  }
`);

