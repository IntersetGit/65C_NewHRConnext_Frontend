import { gql } from '../../../__generated__';

export const FETCH_SELECT_BOOK_BANK = gql(`
query Mas_bank {
  mas_bank {
    id
    name
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
      avatar
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
      accept_date
      accept_years
      accept_month
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
    companyBranchId
  }
}
`);

export const FETCH_AllSALARY_USER = gql(`
query Salary($userId: String, $years: String) {
  salary(userId: $userId, years: $years) {
    id
    profile {
      id
      prefix_th
      firstname_th
      lastname_th
    }
    salary {
      month
      years
      total_income
      total_expense
      net
      id
      commission
      position_income
      ot
      bonus
      special_income
      other_income
      travel_income
      bursary
      welfare_money
      vatper
      ss_per
      vat
      social_security
      miss
      ra
      late
      other
      provident_employee
      provident_company
      userId
      bookbank_logId
      mas_income_typeId
      date
      mas_salary_statusId
      provident_date
      pro_employee
      pro_company
      mas_all_collectId
      socialYears
      vatYears
      incomeYears
      mas_bankId
    }
    bookbank_log {
      mas_bank {
        name
      }
      bank_number
      base_salary
    }
  }
}
`);

export const CREATE_SALARY_USER = gql(`
  mutation Createandupdatesalary($data: salaryInput) {
    Createandupdatesalary(data: $data) {
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

export const CREATE_UPDATE_BOOKBANK = gql(`
  mutation Createandupdatebookbank($data: bookbank_logInput) {
    Createandupdatebookbank(data: $data) {
      message
      status
    }
  }
`);

export const DELETE_BOOKBANK = gql(`
mutation Deletebookbank($deletebookbankId: ID!) {
  Deletebookbank(id: $deletebookbankId) {
    message
    status
  }
}
`)

export const FETCH_GETALLBOOKBANK_LOG = gql(`
query Bookbank_log_admin($userId: String) {
  bookbank_log_admin(userId: $userId) {
    id
    date
    mas_bankId
    bank_number
    base_salary
    provident_com
    provident_emp
    mas_bank {
      id
      name
    }
    userId
    accept_date
  }
}
`)

export const FETCH_ExpenseCompany = gql(`
query Expense_company($date: String) {
  expense_company(date: $date) {
    id
    vat_per
    ss_per
    mas_bank {
      name
      id
    }
    check_vat
    date
    cal_date_salary
  }
}
`)

export const FETCH_Filter_BOOKBANK_ADMIN = gql(`
query Filter_bookbank_admin($userId: String) {
  filter_bookbank_admin(userId: $userId) {
    id
    bank_number
    base_salary
    mas_bank {
      name
    }
    userId
    provident_com
    provident_emp
  }
}
`)

export const FETCH_Show_PervspUser = gql(`
query Show_pervspUser($userId: String, $date: String) {
  show_pervspUser(userId: $userId, date: $date) {
    id
    email
    bookbank_log {
      base_salary
      bank_number
      provident_emp
      provident_com
    }
    companyBranch {
      expense_company {
        ss_per
        vat_per
        check_vat
      }
      id
    }
  }
}
`)

