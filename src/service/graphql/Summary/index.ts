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

export const FETCH_SALARY_ME = gql(`
query Mydata_salary($years: String) {
  mydata_salary(years: $years) {
    data_s {
      salary {
        id
        month
        years
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
        total_income
        total_expense
        net
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
        base_salary
      }
    }
    all_years
  }
}
`);

export const FETCH_AllSALARY_USER = gql(`
query Salary($userId: String, $years: String) {
  salary(userId: $userId, years: $years) {
    data_s {
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
        vatYears
        socialYears
        pro_employee
        pro_company
        provident_date
        mas_salary_statusId
        mas_income_typeId
        mas_bankId
        mas_all_collectId
        incomeYears
        date
        bookbank_logId
        base_salary
      }
      bookbank_log {
        bank_number
        base_salary
        mas_bank {
          name
        }
      }
      companyBranch {
        id
        expense_company {
          id
          cal_date_salary
          unix
        }
      }
    }
    all_years
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
`);

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
    User {
      companyBranch {
        expense_company {
          cal_date_salary
        }
      }
    }
    unix
    accept_month
  }
}
`);

export const FETCH_BOOKBANK_LOG_ME = gql(`
query Filter_bookbank {
  filter_bookbank {
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
      bank_code
    }
    User {
      id
      email
      profile {
        id
        bio
        firstname_th
        lastname_th
        firstname_en
        lastname_en
        avatar
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
        masposition1_id
        masposition2_id
        masposition3_id
      }
      Position_user {
        id
        user_id
        position1_id
        position2_id
        position3_id
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
}
`);

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
`);

export const FETCH_Filter_BOOKBANK_ADMIN = gql(`
query Filter_bookbank_admin($userId: String) {
  filter_bookbank_admin(userId: $userId) {
    id
    bank_number
    base_salary
    mas_bank {
      name
      id
    }
    userId
    provident_com
    provident_emp
  }
}
`);

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
`);

export const Create_UpdateSalary = gql(`
mutation Createandupdatesalary($data: salaryInput) {
  Createandupdatesalary(data: $data) {
    message
    status
  }
}
`);

export const FETCH_SALARY_SLIP = gql(`
mutation SalarySlip($userId: String, $date: Date) {
  SalarySlip(userId: $userId, date: $date) {
    message
    path
    status
  }
}
`);

export const FETCH_SHOW_YEARS = gql(`
query Show_years($name: String) {
  show_years(name: $name) {
    id
    name
  }
}
`);

export const Delete_Expense_Com = gql(`
mutation DeleteExpensecom($deleteExpensecomId: ID!) {
  DeleteExpensecom(id: $deleteExpensecomId) {
    message
    status
  }
}
`);

export const Delete_Salary = gql(`
mutation DeleteSalary($salaryid: ID!, $userId: String!) {
  DeleteSalary(salaryid: $salaryid, userId: $userId) {
    message
    status
  }
}
`);

export const FETCH_BOOK_BANK_LOG_USER = gql(`
query Bookbank_log {
  bookbank_log {
    id
    date
    accept_date
    base_salary
    mas_bankId
    bank_number
    provident_com
    provident_emp
    accept_month
    accept_years
    userId
    mas_bank {
      id
      name
    }
    User {
      id
      profile {
        id
        firstname_th
        lastname_th
        mas_positionlevel3 {
          id
          name
        }
      }
    }
    salary {
      id
      month
      years
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
      total_income
      total_expense
      net
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
      base_salary
    }
  }
}
`);

