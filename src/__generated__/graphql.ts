/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Custom date scarlar type. */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Amphoe = {
  __typename?: 'Amphoe';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
};

export type BankInput = {
  bank_code?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type BankResponseType = {
  __typename?: 'BankResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type Bookbank_Log_Type = {
  __typename?: 'Bookbank_log_type';
  User?: Maybe<User>;
  accept_date?: Maybe<Scalars['Date']>;
  accept_month?: Maybe<Scalars['Int']>;
  accept_years?: Maybe<Scalars['Int']>;
  all_collectId?: Maybe<Scalars['String']>;
  bank_number?: Maybe<Scalars['String']>;
  base_salary?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  mas_bank?: Maybe<Mas_Bank>;
  mas_bankId?: Maybe<Scalars['String']>;
  provident_com?: Maybe<Scalars['Float']>;
  provident_emp?: Maybe<Scalars['Float']>;
  provident_log?: Maybe<Array<Maybe<Provident_Log>>>;
  salary?: Maybe<Array<Maybe<Salary>>>;
  userId?: Maybe<Scalars['String']>;
};

export type Company = {
  __typename?: 'Company';
  branch?: Maybe<Array<Maybe<CompanyBranch>>>;
  companyCode?: Maybe<Scalars['String']>;
  company_registration_id?: Maybe<Scalars['String']>;
  company_vat_id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  ownerId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userlimit?: Maybe<Scalars['Int']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type CompanyBranch = {
  __typename?: 'CompanyBranch';
  Role_Company?: Maybe<Array<Maybe<Role_Company>>>;
  address?: Maybe<Scalars['String']>;
  address_2?: Maybe<Scalars['String']>;
  certificate_link?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['String']>;
  company_type?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['String']>;
  email_2?: Maybe<Scalars['String']>;
  expense_company?: Maybe<Array<Maybe<Expense_Company>>>;
  fax?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lat?: Maybe<Scalars['String']>;
  lng?: Maybe<Scalars['String']>;
  main_company_type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  photo_link?: Maybe<Scalars['String']>;
  regis_vat?: Maybe<Scalars['String']>;
  regiscomnumber?: Maybe<Scalars['String']>;
  registeredamount?: Maybe<Scalars['String']>;
  social_facebook?: Maybe<Scalars['String']>;
  social_instragram?: Maybe<Scalars['String']>;
  social_likedin?: Maybe<Scalars['String']>;
  social_line?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  sub_company_type?: Maybe<Scalars['String']>;
  tel?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  users?: Maybe<Array<Maybe<User>>>;
  vat_link?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type CountBranch = {
  __typename?: 'CountBranch';
  branch?: Maybe<Scalars['Int']>;
};

export type CountInsideBranch = {
  __typename?: 'CountInsideBranch';
  Role_Company?: Maybe<Scalars['Int']>;
  users?: Maybe<Scalars['Int']>;
};

export type CreateAccountInput = {
  BusinesstypeId?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  companyCode: Scalars['String'];
  company_address: Scalars['String'];
  company_city: Scalars['String'];
  company_country: Scalars['String'];
  company_icon?: InputMaybe<Scalars['String']>;
  company_name: Scalars['String'];
  company_phone: Scalars['String'];
  company_state: Scalars['String'];
  company_zip: Scalars['String'];
  dob: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  tel: Scalars['String'];
  userlimit?: InputMaybe<Scalars['Int']>;
};

export type CreateAccountUserInput = {
  BusinesstypeId?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  age?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blood_type?: InputMaybe<Scalars['String']>;
  citizen_address?: InputMaybe<Scalars['String']>;
  citizen_addressnumber?: InputMaybe<Scalars['String']>;
  citizen_country?: InputMaybe<Scalars['String']>;
  citizen_district?: InputMaybe<Scalars['String']>;
  citizen_id?: InputMaybe<Scalars['String']>;
  citizen_province?: InputMaybe<Scalars['String']>;
  citizen_state?: InputMaybe<Scalars['String']>;
  citizen_tel?: InputMaybe<Scalars['String']>;
  citizen_zipcode?: InputMaybe<Scalars['String']>;
  contract_address?: InputMaybe<Scalars['String']>;
  contract_addressnumber?: InputMaybe<Scalars['String']>;
  contract_companyemail?: InputMaybe<Scalars['String']>;
  contract_country?: InputMaybe<Scalars['String']>;
  contract_district?: InputMaybe<Scalars['String']>;
  contract_province?: InputMaybe<Scalars['String']>;
  contract_sameCitizen?: InputMaybe<Scalars['Boolean']>;
  contract_state?: InputMaybe<Scalars['String']>;
  contract_zipcode?: InputMaybe<Scalars['String']>;
  dob?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  employee_status?: InputMaybe<Scalars['String']>;
  firstname_en?: InputMaybe<Scalars['String']>;
  firstname_th?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  lastname_en?: InputMaybe<Scalars['String']>;
  lastname_th?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  prefix_en?: InputMaybe<Scalars['String']>;
  prefix_th?: InputMaybe<Scalars['String']>;
  relationship?: InputMaybe<Scalars['String']>;
  religion?: InputMaybe<Scalars['String']>;
  role_company?: InputMaybe<Scalars['ID']>;
  shirt_size?: InputMaybe<Scalars['String']>;
  social_facebook?: InputMaybe<Scalars['String']>;
  social_id?: InputMaybe<Scalars['String']>;
  social_likedin?: InputMaybe<Scalars['String']>;
  social_line?: InputMaybe<Scalars['String']>;
  social_telegram?: InputMaybe<Scalars['String']>;
  staff_code?: InputMaybe<Scalars['String']>;
  staff_status?: InputMaybe<Scalars['String']>;
  start_date_work?: InputMaybe<Scalars['Date']>;
  tel?: InputMaybe<Scalars['String']>;
};

export type CreateAndUpdateExpenseComResponseType = {
  __typename?: 'CreateAndUpdateExpenseComResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type CreateComapnyBranchResponseType = {
  __typename?: 'CreateComapnyBranchResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type CreateCompanyResponseType = {
  __typename?: 'CreateCompanyResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type CreateHolidayDate = {
  day?: InputMaybe<Scalars['Int']>;
  holiday_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  month?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['Int']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type CreateHolidayDateResponseType = {
  __typename?: 'CreateHolidayDateResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type CreateHolidayYearResponseType = {
  __typename?: 'CreateHolidayYearResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type CreateHolidayYears = {
  day?: InputMaybe<Scalars['Int']>;
  holiday_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  month?: InputMaybe<Scalars['Int']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type CreateRoleCompanyResponseType = {
  __typename?: 'CreateRoleCompanyResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type CreateUserResponseType = {
  __typename?: 'CreateUserResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type CreatedAndUpdatePosition = {
  code_position1?: InputMaybe<Scalars['String']>;
  id_Position1?: InputMaybe<Scalars['ID']>;
  level_Position1?: InputMaybe<Scalars['Int']>;
  masPosition2?: InputMaybe<Array<InputMaybe<CreatedmasPosition2>>>;
  name_Position1?: InputMaybe<Scalars['String']>;
};

export type CreatedmasPosition2 = {
  code_position2?: InputMaybe<Scalars['String']>;
  id_Position2?: InputMaybe<Scalars['ID']>;
  level_Position2?: InputMaybe<Scalars['Int']>;
  masPosition3?: InputMaybe<Array<InputMaybe<CreatedmasPosition3>>>;
  name_Position2?: InputMaybe<Scalars['String']>;
  positionlevel1_id?: InputMaybe<Scalars['ID']>;
};

export type CreatedmasPosition3 = {
  code_position3?: InputMaybe<Scalars['String']>;
  id_Position3?: InputMaybe<Scalars['ID']>;
  level_Position3?: InputMaybe<Scalars['Int']>;
  name_Position3?: InputMaybe<Scalars['String']>;
  positionlevel2_id?: InputMaybe<Scalars['String']>;
};

export type CreateleaveResponseType = {
  __typename?: 'CreateleaveResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type CreatepositionResponseType = {
  __typename?: 'CreatepositionResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type DeleteAccountUserResponseType = {
  __typename?: 'DeleteAccountUserResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type DeleteComapnyBranchResponseType = {
  __typename?: 'DeleteComapnyBranchResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type DeleteExpensecomResponseType = {
  __typename?: 'DeleteExpensecomResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type DeleteHolidayDateResponseType = {
  __typename?: 'DeleteHolidayDateResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type DeleteHolidayYearResponseType = {
  __typename?: 'DeleteHolidayYearResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type DeleteRoleCompanyRespnsetType = {
  __typename?: 'DeleteRoleCompanyRespnsetType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type DeleteSalaryResponseType = {
  __typename?: 'DeleteSalaryResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type DeletebookbankResponseType = {
  __typename?: 'DeletebookbankResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type DeleteleaveResponseType = {
  __typename?: 'DeleteleaveResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type District = {
  __typename?: 'District';
  amphoe?: Maybe<Array<Maybe<Amphoe>>>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type ExpenseComInput = {
  bankId?: InputMaybe<Scalars['String']>;
  cal_date_salary?: InputMaybe<Scalars['Date']>;
  check_vat?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  companyBranchId?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['Date']>;
  exp_com_month?: InputMaybe<Scalars['String']>;
  exp_com_years?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  ss_per?: InputMaybe<Scalars['Float']>;
  vat_per?: InputMaybe<Scalars['Float']>;
};

export type GetCompanyAccessType = {
  __typename?: 'GetCompanyAccessType';
  name?: Maybe<Scalars['String']>;
};

export type GetHolidayYearResponseType = {
  __typename?: 'GetHolidayYearResponseType';
  countYaer?: Maybe<Scalars['Int']>;
  dataAll?: Maybe<Array<Holiday_Date>>;
  year?: Maybe<Scalars['Int']>;
};

export type GetOwncompanytype = {
  __typename?: 'GetOwncompanytype';
  companies?: Maybe<Array<Maybe<OwnCompanyType>>>;
  company?: Maybe<OwnCompanyType>;
  isOwner?: Maybe<Scalars['Boolean']>;
  redirect?: Maybe<Scalars['Boolean']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token?: Maybe<Scalars['String']>;
  refresh_token?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type LoginaInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MainBusinessType = {
  __typename?: 'MainBusinessType';
  SubBusinessType?: Maybe<Array<Maybe<SubBusinessType>>>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Me = {
  __typename?: 'Me';
  Role_Company?: Maybe<MePositionType>;
  companyBranch?: Maybe<MeCompanyBranch>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isOwner?: Maybe<Scalars['Boolean']>;
  profile?: Maybe<Profile>;
  role?: Maybe<Role>;
};

export type MeCompanyBranch = {
  __typename?: 'MeCompanyBranch';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  company?: Maybe<MecompanyType>;
  companyId?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  zip?: Maybe<Scalars['String']>;
};

export type MePositionType = {
  __typename?: 'MePositionType';
  access?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type MecompanyType = {
  __typename?: 'MecompanyType';
  companyCode?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type MeprofileType = {
  __typename?: 'MeprofileType';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['Date']>;
  firstname_en?: Maybe<Scalars['String']>;
  firstname_th?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  lastname_en?: Maybe<Scalars['String']>;
  lastname_th?: Maybe<Scalars['String']>;
  prefix_en?: Maybe<Scalars['String']>;
  prefix_th?: Maybe<Scalars['String']>;
  staff_code?: Maybe<Scalars['String']>;
  tel?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateAndUpdateExpenseCom?: Maybe<CreateAndUpdateExpenseComResponseType>;
  CreateSalaryStatus?: Maybe<SalaryStatusResponseType>;
  Createandupdatebookbank?: Maybe<CreatebookbanklogResponseType>;
  Createandupdatesalary?: Maybe<CreatesalaryResponseType>;
  CreatedPosition?: Maybe<CreatepositionResponseType>;
  Createincometype?: Maybe<IncometypeResponseType>;
  Createmonth?: Maybe<MonthResponseType>;
  Createyears?: Maybe<YearsResponseType>;
  DeleteExpensecom?: Maybe<DeleteExpensecomResponseType>;
  DeleteSalary?: Maybe<DeleteSalaryResponseType>;
  Deletebookbank?: Maybe<DeletebookbankResponseType>;
  EditPosition?: Maybe<CreatepositionResponseType>;
  createAccount?: Maybe<CreateCompanyResponseType>;
  createAccountUser?: Maybe<CreateUserResponseType>;
  createAndUpdateComBarance?: Maybe<CreateComapnyBranchResponseType>;
  createAndUpdateHolidayDate?: Maybe<CreateHolidayDateResponseType>;
  createBank?: Maybe<BankResponseType>;
  createHolidayYear?: Maybe<CreateHolidayYearResponseType>;
  createRoleCompany?: Maybe<CreateRoleCompanyResponseType>;
  createddata_leave?: Maybe<CreateleaveResponseType>;
  createdposition_user?: Maybe<CreatepositionResponseType>;
  deleteAccountUser?: Maybe<DeleteAccountUserResponseType>;
  deleteComBarance?: Maybe<DeleteComapnyBranchResponseType>;
  deleteHolidayDate?: Maybe<DeleteHolidayDateResponseType>;
  deleteHolidayYear?: Maybe<DeleteHolidayYearResponseType>;
  deleteRoleCompany?: Maybe<DeleteRoleCompanyRespnsetType>;
  delete_leve?: Maybe<DeleteleaveResponseType>;
  delete_position1?: Maybe<DeletepositionResponseType>;
  delete_position2?: Maybe<DeletepositionResponseType>;
  delete_position3?: Maybe<DeletepositionResponseType>;
  editstatusleave?: Maybe<CreateleaveResponseType>;
  login?: Maybe<LoginResponse>;
  refreshToken?: Maybe<RefreshtokenResponseType>;
  updateRoleCompanyMangement?: Maybe<CreateRoleCompanyResponseType>;
  validateRoute?: Maybe<ValidateRoute>;
};


export type MutationCreateAndUpdateExpenseComArgs = {
  data?: InputMaybe<ExpenseComInput>;
};


export type MutationCreateSalaryStatusArgs = {
  data?: InputMaybe<Salary_Status_Input>;
};


export type MutationCreateandupdatebookbankArgs = {
  data?: InputMaybe<Bookbank_LogInput>;
};


export type MutationCreateandupdatesalaryArgs = {
  data?: InputMaybe<SalaryInput>;
};


export type MutationCreatedPositionArgs = {
  data?: InputMaybe<Array<CreatedAndUpdatePosition>>;
};


export type MutationCreateincometypeArgs = {
  data?: InputMaybe<Incometype>;
};


export type MutationCreatemonthArgs = {
  data?: InputMaybe<MonthInput>;
};


export type MutationCreateyearsArgs = {
  data?: InputMaybe<YearsInput>;
};


export type MutationDeleteExpensecomArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSalaryArgs = {
  salaryid: Scalars['ID'];
  userId: Scalars['String'];
};


export type MutationDeletebookbankArgs = {
  id: Scalars['ID'];
};


export type MutationEditPositionArgs = {
  data?: InputMaybe<Array<CreatedAndUpdatePosition>>;
};


export type MutationCreateAccountArgs = {
  data: CreateAccountInput;
};


export type MutationCreateAccountUserArgs = {
  data: CreateAccountUserInput;
};


export type MutationCreateAndUpdateComBaranceArgs = {
  data: CreateCompanyBranch;
};


export type MutationCreateAndUpdateHolidayDateArgs = {
  data?: InputMaybe<Array<CreateHolidayDate>>;
};


export type MutationCreateBankArgs = {
  data?: InputMaybe<BankInput>;
};


export type MutationCreateHolidayYearArgs = {
  data?: InputMaybe<Array<CreateHolidayYears>>;
};


export type MutationCreateRoleCompanyArgs = {
  data: CreateRoleCompanyGroup;
};


export type MutationCreateddata_LeaveArgs = {
  data?: InputMaybe<Leave>;
};


export type MutationCreatedposition_UserArgs = {
  data: Position;
};


export type MutationDeleteAccountUserArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteComBaranceArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteHolidayDateArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteHolidayYearArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteRoleCompanyArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_LeveArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Position1Args = {
  id: Scalars['ID'];
};


export type MutationDelete_Position2Args = {
  id: Scalars['ID'];
};


export type MutationDelete_Position3Args = {
  id: Scalars['ID'];
};


export type MutationEditstatusleaveArgs = {
  data?: InputMaybe<Leave>;
};


export type MutationLoginArgs = {
  data: LoginaInput;
};


export type MutationUpdateRoleCompanyMangementArgs = {
  data: Array<UpdateRoleCompanyMangementType>;
};


export type MutationValidateRouteArgs = {
  args: Scalars['String'];
  branch?: InputMaybe<Scalars['String']>;
};

export type OwnCompanyType = {
  __typename?: 'OwnCompanyType';
  companyCode?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Position_User = {
  __typename?: 'Position_user';
  date?: Maybe<Scalars['Date']>;
  headderId?: Maybe<Scalars['String']>;
  header?: Maybe<User>;
  id?: Maybe<Scalars['ID']>;
  log_position?: Maybe<Array<Maybe<Log_Positionn>>>;
  mas_positionlevel1?: Maybe<Mas_Positionlevel1>;
  mas_positionlevel2?: Maybe<Mas_Positionlevel2>;
  mas_positionlevel3?: Maybe<Mas_Positionlevel3>;
  position1_id?: Maybe<Scalars['String']>;
  position2_id?: Maybe<Scalars['String']>;
  position3_id?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

export type Profile = {
  __typename?: 'Profile';
  address?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  blood_type?: Maybe<Scalars['String']>;
  citizen_address?: Maybe<Scalars['String']>;
  citizen_addressnumber?: Maybe<Scalars['String']>;
  citizen_country?: Maybe<Scalars['String']>;
  citizen_district?: Maybe<Scalars['String']>;
  citizen_id?: Maybe<Scalars['String']>;
  citizen_province?: Maybe<Scalars['String']>;
  citizen_state?: Maybe<Scalars['String']>;
  citizen_tel?: Maybe<Scalars['String']>;
  citizen_zipcode?: Maybe<Scalars['String']>;
  contract_address?: Maybe<Scalars['String']>;
  contract_addressnumber?: Maybe<Scalars['String']>;
  contract_companyemail?: Maybe<Scalars['String']>;
  contract_country?: Maybe<Scalars['String']>;
  contract_district?: Maybe<Scalars['String']>;
  contract_email?: Maybe<Scalars['String']>;
  contract_province?: Maybe<Scalars['String']>;
  contract_sameCitizen?: Maybe<Scalars['Boolean']>;
  contract_state?: Maybe<Scalars['String']>;
  contract_zipcode?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['Date']>;
  employee_status?: Maybe<Scalars['String']>;
  firstname_en?: Maybe<Scalars['String']>;
  firstname_th?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastname_en?: Maybe<Scalars['String']>;
  lastname_th?: Maybe<Scalars['String']>;
  mas_positionlevel1?: Maybe<Mas_Positionlevel1>;
  mas_positionlevel2?: Maybe<Mas_Positionlevel2>;
  mas_positionlevel3?: Maybe<Mas_Positionlevel3>;
  masposition1_id?: Maybe<Scalars['String']>;
  masposition2_id?: Maybe<Scalars['String']>;
  masposition3_id?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  prefix_en?: Maybe<Scalars['String']>;
  prefix_th?: Maybe<Scalars['String']>;
  relationship?: Maybe<Scalars['String']>;
  religion?: Maybe<Scalars['String']>;
  shirt_size?: Maybe<Scalars['String']>;
  social_facebook?: Maybe<Scalars['String']>;
  social_id?: Maybe<Scalars['String']>;
  social_likedin?: Maybe<Scalars['String']>;
  social_line?: Maybe<Scalars['String']>;
  social_telegram?: Maybe<Scalars['String']>;
  staff_code?: Maybe<Scalars['String']>;
  staff_status?: Maybe<Scalars['String']>;
  start_date_work?: Maybe<Scalars['Date']>;
  tel?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type Province = {
  __typename?: 'Province';
  district?: Maybe<Array<Maybe<District>>>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  GetHoliDayYear?: Maybe<Array<Maybe<Holiday_Years>>>;
  GetHolidayDate?: Maybe<GetHolidayYearResponseType>;
  SalarySlip?: Maybe<Slipresolvers>;
  bookbank_log?: Maybe<Array<Maybe<Bookbank_Log_Type>>>;
  bookbank_log_admin?: Maybe<Array<Maybe<Bookbank_Log_Type>>>;
  company?: Maybe<ResponseCompany>;
  data_salary?: Maybe<Array<Maybe<Data_Salary>>>;
  expense_company?: Maybe<Array<Maybe<Expense_Company>>>;
  filter_bookbank?: Maybe<Array<Maybe<Bookbank_Log_Type>>>;
  filter_bookbank_admin?: Maybe<Array<Maybe<Bookbank_Log_Type>>>;
  getAllcompany?: Maybe<Array<Maybe<CompanyBranch>>>;
  getAllleave?: Maybe<GetleaveResponseType>;
  getBusinessType?: Maybe<Array<Maybe<MainBusinessType>>>;
  getMasPositon?: Maybe<Array<Maybe<Mas_Positionlevel1>>>;
  getProvince?: Maybe<Array<Maybe<Province>>>;
  getcompanyRole?: Maybe<Array<Maybe<Role_Company>>>;
  getleava_alldata?: Maybe<Array<Maybe<Leave_Data>>>;
  getleava_datame?: Maybe<GetleaveResponseType>;
  getleavetypedata?: Maybe<Array<Maybe<Mas_Leave_Type>>>;
  getownCompany?: Maybe<GetOwncompanytype>;
  getpositionMe?: Maybe<Array<Maybe<GetPositionUser>>>;
  getposition_user?: Maybe<Array<Maybe<GetPositionUser>>>;
  mas_all_collect?: Maybe<Mas_All_Collect>;
  mas_bank?: Maybe<Array<Maybe<Mas_Bank>>>;
  me?: Maybe<Me>;
  mydata_salary?: Maybe<Data_Salary>;
  provident_log?: Maybe<Array<Maybe<Provident_Log>>>;
  salary?: Maybe<Data_Salary>;
  salary_inmonthSlip?: Maybe<Array<Maybe<Data_Salary>>>;
  show_pervspUser?: Maybe<Array<Maybe<User>>>;
  show_years?: Maybe<Array<Maybe<Mas_Years>>>;
  users?: Maybe<Array<Maybe<User>>>;
  verifyCompanycode?: Maybe<Scalars['Boolean']>;
};


export type QueryGetHoliDayYearArgs = {
  year?: InputMaybe<Scalars['Int']>;
};


export type QueryGetHolidayDateArgs = {
  year?: InputMaybe<Scalars['Int']>;
};


export type QuerySalarySlipArgs = {
  month?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
  years?: InputMaybe<Scalars['String']>;
};


export type QueryBookbank_Log_AdminArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryCompanyArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryData_SalaryArgs = {
  Position2?: InputMaybe<Scalars['String']>;
  Position3?: InputMaybe<Scalars['String']>;
  fristname?: InputMaybe<Scalars['String']>;
};


export type QueryExpense_CompanyArgs = {
  date?: InputMaybe<Scalars['String']>;
};


export type QueryFilter_BookbankArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryFilter_Bookbank_AdminArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryGetAllcompanyArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryGetAllleaveArgs = {
  name?: InputMaybe<Scalars['String']>;
  position2Id?: InputMaybe<Scalars['ID']>;
  position3Id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['ID']>;
};


export type QueryGetcompanyRoleArgs = {
  role_name?: InputMaybe<Scalars['String']>;
};


export type QueryGetleava_AlldataArgs = {
  dataleaveId?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  position2Id?: InputMaybe<Scalars['ID']>;
  position3Id?: InputMaybe<Scalars['ID']>;
};


export type QueryGetleava_DatameArgs = {
  dataleaveId?: InputMaybe<Scalars['ID']>;
};


export type QueryGetposition_UserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryMas_BankArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryMydata_SalaryArgs = {
  years?: InputMaybe<Scalars['String']>;
};


export type QueryProvident_LogArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QuerySalaryArgs = {
  userId?: InputMaybe<Scalars['String']>;
  years?: InputMaybe<Scalars['String']>;
};


export type QuerySalary_InmonthSlipArgs = {
  month?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
  years?: InputMaybe<Scalars['String']>;
};


export type QueryShow_PervspUserArgs = {
  date?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryShow_YearsArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryUsersArgs = {
  name?: InputMaybe<Scalars['String']>;
  position2Id?: InputMaybe<Scalars['ID']>;
  position3Id?: InputMaybe<Scalars['ID']>;
  userid?: InputMaybe<Scalars['ID']>;
};


export type QueryVerifyCompanycodeArgs = {
  companyname: Scalars['String'];
};

export type RefreshtokenResponseType = {
  __typename?: 'RefreshtokenResponseType';
  access_token?: Maybe<Scalars['String']>;
};

export type RegisterProfileInput = {
  dob: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
};

export type ResponseBranchValidateRouteType = {
  __typename?: 'ResponseBranchValidateRouteType';
  branchId?: Maybe<Scalars['String']>;
  branchName?: Maybe<Scalars['String']>;
  companyId?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
};

export type ResponseCompany = {
  __typename?: 'ResponseCompany';
  _count?: Maybe<CountBranch>;
  branch?: Maybe<Array<Maybe<ResponseCompany_Branch>>>;
  companyCode?: Maybe<Scalars['String']>;
  company_registration_id?: Maybe<Scalars['String']>;
  company_vat_id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  ownerId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userlimit?: Maybe<Scalars['Int']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type ResponseCompany_Branch = {
  __typename?: 'ResponseCompany_Branch';
  Role_Company?: Maybe<Array<Maybe<Role_Company>>>;
  _count?: Maybe<CountInsideBranch>;
  address?: Maybe<Scalars['String']>;
  address_2?: Maybe<Scalars['String']>;
  certificate_link?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['String']>;
  company_type?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['String']>;
  email_2?: Maybe<Scalars['String']>;
  fax?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lat?: Maybe<Scalars['String']>;
  lng?: Maybe<Scalars['String']>;
  main_company_type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  photo_link?: Maybe<Scalars['String']>;
  regis_vat?: Maybe<Scalars['String']>;
  regiscomnumber?: Maybe<Scalars['String']>;
  registeredamount?: Maybe<Scalars['String']>;
  social_facebook?: Maybe<Scalars['String']>;
  social_instragram?: Maybe<Scalars['String']>;
  social_likedin?: Maybe<Scalars['String']>;
  social_line?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  sub_company_type?: Maybe<Scalars['String']>;
  tel?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  users?: Maybe<Array<Maybe<User>>>;
  vat_link?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type Role_Company = {
  __typename?: 'Role_Company';
  access?: Maybe<Scalars['JSON']>;
  companyBranch?: Maybe<CompanyBranch>;
  companyBranchId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type SalaryResponseType = {
  __typename?: 'SalaryResponseType';
  userId?: Maybe<Scalars['String']>;
};

export type SalaryStatusResponseType = {
  __typename?: 'SalaryStatusResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type SubBusinessType = {
  __typename?: 'SubBusinessType';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateRoleCompanyMangementType = {
  access: Array<Scalars['JSON']>;
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  Position_user?: Maybe<Array<Maybe<Position_User>>>;
  RoleCompanyID?: Maybe<Scalars['String']>;
  Role_Company?: Maybe<Role_Company>;
  bookbank_log?: Maybe<Array<Maybe<Bookbank_Log_Type>>>;
  company?: Maybe<Array<Maybe<Company>>>;
  companyBranch?: Maybe<CompanyBranch>;
  companyBranchId?: Maybe<Scalars['String']>;
  companyId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isOwner: Scalars['Boolean'];
  islogin: Scalars['Boolean'];
  lastlogin?: Maybe<Scalars['Date']>;
  password: Scalars['String'];
  profile?: Maybe<Profile>;
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['String']>;
  salary?: Maybe<Array<Maybe<Salary>>>;
};

export type ValidateRoute = {
  __typename?: 'ValidateRoute';
  acess?: Maybe<Scalars['Boolean']>;
  currentBranch?: Maybe<ResponseBranchValidateRouteType>;
  path?: Maybe<Scalars['String']>;
  reAccess?: Maybe<Scalars['String']>;
  reFresh?: Maybe<Scalars['String']>;
};

export type Book_Bank_LogResponseType = {
  __typename?: 'book_bank_logResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type Bookbank_Log = {
  __typename?: 'bookbank_log';
  Salary?: Maybe<Salary>;
  all_collectId?: Maybe<Scalars['String']>;
  bank_number?: Maybe<Scalars['String']>;
  base_salary?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  mas_bankId?: Maybe<Scalars['String']>;
  provident_com?: Maybe<Scalars['Float']>;
  provident_emp?: Maybe<Scalars['Float']>;
  userId?: Maybe<User>;
};

export type Bookbank_LogInput = {
  accept_date?: InputMaybe<Scalars['Date']>;
  all_collectId?: InputMaybe<Scalars['String']>;
  bank_number?: InputMaybe<Scalars['String']>;
  base_salary?: InputMaybe<Scalars['Float']>;
  date?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  mas_all_collectId?: InputMaybe<Scalars['String']>;
  mas_bankId?: InputMaybe<Scalars['String']>;
  pro_company?: InputMaybe<Scalars['Float']>;
  pro_employee?: InputMaybe<Scalars['Float']>;
  provident_com?: InputMaybe<Scalars['Float']>;
  provident_date?: InputMaybe<Scalars['Date']>;
  provident_emp?: InputMaybe<Scalars['Float']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateCompanyBranch = {
  address?: InputMaybe<Scalars['String']>;
  address_2?: InputMaybe<Scalars['String']>;
  certificate_link?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  companyId?: InputMaybe<Scalars['String']>;
  company_type?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  email_2?: InputMaybe<Scalars['String']>;
  fax?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  lat?: InputMaybe<Scalars['String']>;
  lng?: InputMaybe<Scalars['String']>;
  main_company_type?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  photo_link?: InputMaybe<Scalars['String']>;
  regis_vat?: InputMaybe<Scalars['String']>;
  regiscomnumber?: InputMaybe<Scalars['String']>;
  registeredamount?: InputMaybe<Scalars['String']>;
  social_facebook?: InputMaybe<Scalars['String']>;
  social_instragram?: InputMaybe<Scalars['String']>;
  social_likedin?: InputMaybe<Scalars['String']>;
  social_line?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  sub_company_type?: InputMaybe<Scalars['String']>;
  tel?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  vat_link?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type CreateRoleCompanyGroup = {
  access?: InputMaybe<Scalars['JSON']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  status: Scalars['Int'];
};

export type CreatebookbanklogResponseType = {
  __typename?: 'createbookbanklogResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type CreatesalaryResponseType = {
  __typename?: 'createsalaryResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type Data_Salary = {
  __typename?: 'data_salary';
  Position_user?: Maybe<Array<Maybe<Position_User>>>;
  RoleCompanyID?: Maybe<Scalars['String']>;
  Role_Company?: Maybe<Role_Company>;
  bookbank_log?: Maybe<Array<Maybe<Bookbank_Log_Type>>>;
  company?: Maybe<Array<Maybe<Company>>>;
  companyBranch?: Maybe<CompanyBranch>;
  companyBranchId?: Maybe<Scalars['String']>;
  companyId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['String']>;
  expense_company?: Maybe<Array<Maybe<Expense_Company>>>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  isOwner?: Maybe<Scalars['Boolean']>;
  islogin?: Maybe<Scalars['Boolean']>;
  lastlogin?: Maybe<Scalars['Date']>;
  profile?: Maybe<Profile>;
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['String']>;
  salary?: Maybe<Array<Maybe<Salary>>>;
};

export type Data_Salary_Me = {
  __typename?: 'data_salary_me';
  RoleCompanyID?: Maybe<Scalars['String']>;
  Role_Company?: Maybe<Role_Company>;
  bookbank_log?: Maybe<Array<Maybe<Bookbank_Log_Type>>>;
  company?: Maybe<Array<Maybe<Company>>>;
  companyBranch?: Maybe<CompanyBranch>;
  companyBranchId?: Maybe<Scalars['String']>;
  companyId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  isOwner?: Maybe<Scalars['Boolean']>;
  islogin?: Maybe<Scalars['Boolean']>;
  lastlogin?: Maybe<Scalars['Date']>;
  mas_bank?: Maybe<Mas_Bank>;
  profile?: Maybe<Profile>;
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['String']>;
  salary?: Maybe<Array<Maybe<Salary>>>;
};

export type DeletepositionResponseType = {
  __typename?: 'deletepositionResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type Expense_Company = {
  __typename?: 'expense_company';
  CompanyBranch?: Maybe<CompanyBranch>;
  Mas_month?: Maybe<Mas_Month>;
  Salary?: Maybe<Salary>;
  bankId?: Maybe<Scalars['String']>;
  cal_date_salary?: Maybe<Scalars['Date']>;
  check_vat?: Maybe<Array<Maybe<Scalars['String']>>>;
  companyBranchId?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  exp_com_month?: Maybe<Scalars['String']>;
  exp_com_years?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mas_bank?: Maybe<Mas_Bank>;
  monthId?: Maybe<Scalars['String']>;
  salary?: Maybe<Array<Maybe<Salary>>>;
  social_security?: Maybe<Scalars['Float']>;
  ss_per?: Maybe<Scalars['Float']>;
  vat_per?: Maybe<Scalars['Float']>;
};

export type GetPositionUser = {
  __typename?: 'getPositionUser';
  date?: Maybe<Scalars['Date']>;
  header?: Maybe<User>;
  id?: Maybe<Scalars['ID']>;
  mas_positionlevel1?: Maybe<Mas_Positionlevel1>;
  mas_positionlevel2?: Maybe<Mas_Positionlevel2>;
  mas_positionlevel3?: Maybe<Mas_Positionlevel3>;
  position1_id?: Maybe<Scalars['String']>;
  position2_id?: Maybe<Scalars['String']>;
  position3_id?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Getcount = {
  __typename?: 'getcount';
  count1?: Maybe<Scalars['Int']>;
  count2?: Maybe<Scalars['Int']>;
  count3?: Maybe<Scalars['Int']>;
  count4?: Maybe<Scalars['Int']>;
  name_1?: Maybe<Scalars['String']>;
  name_2?: Maybe<Scalars['String']>;
  name_3?: Maybe<Scalars['String']>;
  name_4?: Maybe<Scalars['String']>;
};

export type Getdataaboutleave = {
  __typename?: 'getdataaboutleave';
  Position_user?: Maybe<Array<Maybe<Position_User>>>;
  RoleCompanyID?: Maybe<Scalars['String']>;
  Role_Company?: Maybe<Role_Company>;
  company?: Maybe<Array<Maybe<Company>>>;
  companyBranch?: Maybe<CompanyBranch>;
  companyBranchId?: Maybe<Scalars['String']>;
  companyId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  data_leave?: Maybe<Array<Maybe<Leave_Data>>>;
  email: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isOwner: Scalars['Boolean'];
  islogin: Scalars['Boolean'];
  lastlogin?: Maybe<Scalars['Date']>;
  password: Scalars['String'];
  profile?: Maybe<Profile>;
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['String']>;
};

export type GetleaveResponseType = {
  __typename?: 'getleaveResponseType';
  data_all?: Maybe<Array<Maybe<Getdataaboutleave>>>;
  data_count?: Maybe<Getcount>;
};

export type Headderdata = {
  __typename?: 'headderdata';
  headderId?: Maybe<Scalars['String']>;
  headder_data?: Maybe<Profile>;
};

export type Holiday_Date = {
  __typename?: 'holiday_date';
  Company?: Maybe<Company>;
  CompanyId?: Maybe<Scalars['String']>;
  day?: Maybe<Scalars['Int']>;
  holiday_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  month?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type Holiday_Years = {
  __typename?: 'holiday_years';
  day?: Maybe<Scalars['Int']>;
  holiday_name?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  month?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type Incometype = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type IncometypeResponseType = {
  __typename?: 'incometypeResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type Leave = {
  Status?: InputMaybe<Scalars['Int']>;
  detail_leave?: InputMaybe<Scalars['String']>;
  end_date?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  leavetype_id?: InputMaybe<Scalars['String']>;
  quantity_day?: InputMaybe<Scalars['Int']>;
  quantity_hours?: InputMaybe<Scalars['Int']>;
  start_date?: InputMaybe<Scalars['Date']>;
  user_id?: InputMaybe<Scalars['String']>;
};

export type Leave_Data = {
  __typename?: 'leave_data';
  Status?: Maybe<Scalars['Int']>;
  detail_leave?: Maybe<Scalars['String']>;
  end_date?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  leavetype_id?: Maybe<Scalars['String']>;
  mas_leave_type?: Maybe<Mas_Leave_Type>;
  quantity_day?: Maybe<Scalars['Int']>;
  quantity_hours?: Maybe<Scalars['Int']>;
  start_date?: Maybe<Scalars['Date']>;
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['String']>;
};

export type Log_Positionn = {
  __typename?: 'log_positionn';
  Position_user?: Maybe<Array<Maybe<Position_User>>>;
  cretedBy?: Maybe<Scalars['String']>;
  cretedByfk?: Maybe<User>;
  creteddate?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  positionId?: Maybe<Scalars['String']>;
  updtedBy?: Maybe<Scalars['String']>;
  updtedByfk?: Maybe<User>;
  updteddate?: Maybe<Scalars['Date']>;
};

export type Mas_All_Collect = {
  __typename?: 'mas_all_collect';
  User?: Maybe<User>;
  date?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  income_collect?: Maybe<Scalars['Float']>;
  provident_collect_company?: Maybe<Scalars['Float']>;
  provident_collect_employee?: Maybe<Scalars['Float']>;
  provident_log?: Maybe<Array<Maybe<Provident_Log>>>;
  social_secu_collect?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  vat_collect?: Maybe<Scalars['Float']>;
};

export type Mas_Bank = {
  __typename?: 'mas_bank';
  bank_code?: Maybe<Scalars['String']>;
  bookbank_log?: Maybe<Bookbank_Log_Type>;
  expense_company?: Maybe<Expense_Company>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  salary?: Maybe<Array<Maybe<Salary>>>;
};

export type Mas_Leave_Type = {
  __typename?: 'mas_leave_type';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orderby?: Maybe<Scalars['Int']>;
};

export type Mas_Month = {
  __typename?: 'mas_month';
  bookbank_log?: Maybe<Array<Maybe<Bookbank_Log_Type>>>;
  expense_company?: Maybe<Array<Maybe<Expense_Company>>>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  salary?: Maybe<Array<Maybe<Salary>>>;
};

export type Mas_Position = {
  __typename?: 'mas_position';
  CompanyId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Mas_Positionlevel1 = {
  __typename?: 'mas_positionlevel1';
  CompanyId?: Maybe<Scalars['String']>;
  Position_user?: Maybe<Array<Maybe<Position_User>>>;
  code?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  level?: Maybe<Scalars['Int']>;
  mas_positionlevel2?: Maybe<Array<Maybe<Mas_Positionlevel2>>>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Mas_Positionlevel2 = {
  __typename?: 'mas_positionlevel2';
  Position_user?: Maybe<Array<Maybe<Position_User>>>;
  code?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  level?: Maybe<Scalars['Int']>;
  mas_positionlevel3?: Maybe<Array<Maybe<Mas_Positionlevel3>>>;
  name?: Maybe<Scalars['String']>;
  positionlevel1_id?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Mas_Positionlevel3 = {
  __typename?: 'mas_positionlevel3';
  Position_user?: Maybe<Array<Maybe<Position_User>>>;
  code?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  level?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  positionlevel2_id?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Mas_Salary_Status = {
  __typename?: 'mas_salary_status';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  no?: Maybe<Scalars['Int']>;
  salary?: Maybe<Array<Maybe<Salary>>>;
};

export type Mas_Years = {
  __typename?: 'mas_years';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type MonthInput = {
  id?: InputMaybe<Scalars['ID']>;
  month_number?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type MonthResponseType = {
  __typename?: 'monthResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type Position = {
  date?: InputMaybe<Scalars['Date']>;
  headderId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  position1_id?: InputMaybe<Scalars['String']>;
  position2_id?: InputMaybe<Scalars['String']>;
  position3_id?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
};

export type Position_Userr = {
  __typename?: 'position_userr';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  position1_id?: Maybe<Scalars['String']>;
  position2_id?: Maybe<Scalars['String']>;
  position3_id?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

export type Provident_Log = {
  __typename?: 'provident_log';
  User?: Maybe<User>;
  bookbank_log?: Maybe<Bookbank_Log_Type>;
  bookbank_logId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  mas_all_collect?: Maybe<Mas_All_Collect>;
  mas_all_collectId?: Maybe<Scalars['String']>;
  pro_company?: Maybe<Scalars['Float']>;
  pro_employee?: Maybe<Scalars['Float']>;
  provident_date?: Maybe<Scalars['Date']>;
  salary?: Maybe<Salary>;
  salaryId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type Provident_LogInput = {
  id?: InputMaybe<Scalars['ID']>;
  mas_all_collectId?: InputMaybe<Scalars['String']>;
  pro_company?: InputMaybe<Scalars['Float']>;
  pro_employee?: InputMaybe<Scalars['Float']>;
  provident_date?: InputMaybe<Scalars['Date']>;
  salaryId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type Salary = {
  __typename?: 'salary';
  bonus?: Maybe<Scalars['Float']>;
  bookbank_log?: Maybe<Bookbank_Log_Type>;
  bookbank_logId?: Maybe<Scalars['String']>;
  bursary?: Maybe<Scalars['Float']>;
  commission?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  incomeYears?: Maybe<Scalars['Float']>;
  late?: Maybe<Scalars['Float']>;
  mas_all_collectId?: Maybe<Scalars['String']>;
  mas_bank?: Maybe<Mas_Bank>;
  mas_bankId?: Maybe<Scalars['String']>;
  mas_income_typeId?: Maybe<Scalars['String']>;
  mas_salary_statusId?: Maybe<Scalars['String']>;
  miss?: Maybe<Scalars['Float']>;
  month?: Maybe<Scalars['String']>;
  net?: Maybe<Scalars['Float']>;
  ot?: Maybe<Scalars['Float']>;
  other?: Maybe<Scalars['Float']>;
  other_income?: Maybe<Scalars['Float']>;
  position_income?: Maybe<Scalars['Float']>;
  pro_company?: Maybe<Scalars['Float']>;
  pro_employee?: Maybe<Scalars['Float']>;
  provident_company?: Maybe<Scalars['Float']>;
  provident_date?: Maybe<Scalars['Date']>;
  provident_employee?: Maybe<Scalars['Float']>;
  ra?: Maybe<Scalars['Float']>;
  socialYears?: Maybe<Scalars['Float']>;
  social_security?: Maybe<Scalars['Float']>;
  special_income?: Maybe<Scalars['Float']>;
  ss_per?: Maybe<Scalars['Float']>;
  total_expense?: Maybe<Scalars['Float']>;
  total_income?: Maybe<Scalars['Float']>;
  travel_income?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  vat?: Maybe<Scalars['Float']>;
  vatYears?: Maybe<Scalars['Float']>;
  vatper?: Maybe<Scalars['Float']>;
  welfare_money?: Maybe<Scalars['Float']>;
  years?: Maybe<Scalars['String']>;
};

export type SalaryInput = {
  bonus?: InputMaybe<Scalars['Float']>;
  bookbank_logId?: InputMaybe<Scalars['String']>;
  bursary?: InputMaybe<Scalars['Float']>;
  commission?: InputMaybe<Scalars['Float']>;
  create_by?: InputMaybe<Scalars['String']>;
  create_date?: InputMaybe<Scalars['Date']>;
  date?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  incomeYears?: InputMaybe<Scalars['Float']>;
  late?: InputMaybe<Scalars['Float']>;
  mas_all_collectId?: InputMaybe<Scalars['String']>;
  mas_bankId?: InputMaybe<Scalars['String']>;
  mas_income_typeId?: InputMaybe<Scalars['String']>;
  mas_salary_statusId?: InputMaybe<Scalars['String']>;
  miss?: InputMaybe<Scalars['Float']>;
  month?: InputMaybe<Scalars['String']>;
  net?: InputMaybe<Scalars['Float']>;
  ot?: InputMaybe<Scalars['Float']>;
  other?: InputMaybe<Scalars['Float']>;
  other_income?: InputMaybe<Scalars['Float']>;
  position_income?: InputMaybe<Scalars['Float']>;
  pro_company?: InputMaybe<Scalars['Float']>;
  pro_employee?: InputMaybe<Scalars['Float']>;
  provident_company?: InputMaybe<Scalars['Float']>;
  provident_date?: InputMaybe<Scalars['Date']>;
  provident_employee?: InputMaybe<Scalars['Float']>;
  ra?: InputMaybe<Scalars['Float']>;
  socialYears?: InputMaybe<Scalars['Float']>;
  social_security?: InputMaybe<Scalars['Float']>;
  special_income?: InputMaybe<Scalars['Float']>;
  total_expense?: InputMaybe<Scalars['Float']>;
  total_income?: InputMaybe<Scalars['Float']>;
  travel_income?: InputMaybe<Scalars['Float']>;
  update_by?: InputMaybe<Scalars['String']>;
  update_date?: InputMaybe<Scalars['Date']>;
  userId?: InputMaybe<Scalars['String']>;
  vat?: InputMaybe<Scalars['Float']>;
  vatYears?: InputMaybe<Scalars['Float']>;
  welfare_money?: InputMaybe<Scalars['Float']>;
  year?: InputMaybe<Scalars['String']>;
};

export type Salary_Status_Input = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  no?: InputMaybe<Scalars['Int']>;
};

export type Show_Pervsp = {
  __typename?: 'show_pervsp';
  CompanyBranch?: Maybe<CompanyBranch>;
  Mas_month?: Maybe<Mas_Month>;
  bankId?: Maybe<Scalars['String']>;
  bookbank_log?: Maybe<Array<Maybe<Bookbank_Log_Type>>>;
  companyBranchId?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  mas_bank?: Maybe<Mas_Bank>;
  monthId?: Maybe<Scalars['String']>;
  salary?: Maybe<Array<Maybe<Salary>>>;
  ss_per?: Maybe<Scalars['Float']>;
  vat_per?: Maybe<Scalars['Float']>;
};

export type Show_Pervspuser = {
  __typename?: 'show_pervspuser';
  base_salary?: Maybe<Scalars['Float']>;
  provident_emp?: Maybe<Scalars['Float']>;
  ss_per?: Maybe<Scalars['Float']>;
  vat_per?: Maybe<Scalars['Float']>;
};

export type Slipresolvers = {
  __typename?: 'slipresolvers';
  message?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  status: Scalars['Boolean'];
};

export type YearsInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type YearsResponseType = {
  __typename?: 'yearsResponseType';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken?: { __typename?: 'RefreshtokenResponseType', access_token?: string | null } | null };

export type ValidateRouteMutationVariables = Exact<{
  args: Scalars['String'];
  branch?: InputMaybe<Scalars['String']>;
}>;


export type ValidateRouteMutation = { __typename?: 'Mutation', validateRoute?: { __typename?: 'ValidateRoute', acess?: boolean | null, path?: string | null, reAccess?: string | null, reFresh?: string | null, currentBranch?: { __typename?: 'ResponseBranchValidateRouteType', branchId?: string | null, branchName?: string | null, companyId?: string | null, companyName?: string | null } | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Me', email?: string | null, id: string, isOwner?: boolean | null, Role_Company?: { __typename: 'MePositionType', access?: any | null, id: string, name?: string | null } | null, companyBranch?: { __typename: 'MeCompanyBranch', companyId?: string | null, createdAt?: any | null, id: string, name?: string | null, company?: { __typename: 'MecompanyType', companyCode?: string | null, icon?: string | null, id: string, name?: string | null } | null } | null, profile?: { __typename: 'Profile', id: string, bio?: string | null, firstname_th?: string | null, lastname_th?: string | null, firstname_en?: string | null, lastname_en?: string | null, avatar?: string | null, dob?: any | null, age?: string | null, relationship?: string | null, shirt_size?: string | null, prefix_th?: string | null, prefix_en?: string | null, citizen_id?: string | null, social_id?: string | null, staff_status?: string | null, tel?: string | null, address?: string | null, gender?: string | null, staff_code?: string | null, religion?: string | null, userId?: string | null, citizen_addressnumber?: string | null, citizen_address?: string | null, citizen_country?: string | null, citizen_province?: string | null, citizen_district?: string | null, citizen_state?: string | null, citizen_zipcode?: string | null, citizen_tel?: string | null, contract_sameCitizen?: boolean | null, contract_addressnumber?: string | null, contract_address?: string | null, contract_country?: string | null, contract_province?: string | null, contract_district?: string | null, contract_state?: string | null, contract_zipcode?: string | null, contract_email?: string | null, contract_companyemail?: string | null, social_facebook?: string | null, social_likedin?: string | null, social_line?: string | null, social_telegram?: string | null, nickname?: string | null, blood_type?: string | null, employee_status?: string | null, start_date_work?: any | null } | null } | null };

export type CompanyQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyQuery = { __typename?: 'Query', company?: { __typename?: 'ResponseCompany', userlimit?: number | null, name?: string | null, _count?: { __typename?: 'CountBranch', branch?: number | null } | null, branch?: Array<{ __typename?: 'ResponseCompany_Branch', id: string, name?: string | null, address?: string | null, address_2?: string | null, city?: string | null, state?: string | null, zip?: string | null, country?: string | null, tel?: string | null, fax?: string | null, website?: string | null, lat?: string | null, lng?: string | null, email?: string | null, email_2?: string | null, company_type?: string | null, sub_company_type?: string | null, registeredamount?: string | null, social_facebook?: string | null, social_likedin?: string | null, social_instragram?: string | null, social_line?: string | null, createdAt?: any | null, updatedAt?: any | null, regis_vat?: string | null, regiscomnumber?: string | null, photo_link?: string | null, vat_link?: string | null, certificate_link?: string | null, _count?: { __typename?: 'CountInsideBranch', users?: number | null } | null } | null> | null } | null };

export type CreatedPositionMutationVariables = Exact<{
  data?: InputMaybe<Array<CreatedAndUpdatePosition> | CreatedAndUpdatePosition>;
}>;


export type CreatedPositionMutation = { __typename?: 'Mutation', CreatedPosition?: { __typename?: 'CreatepositionResponseType', message?: string | null, status?: boolean | null } | null };

export type EditPositionMutationVariables = Exact<{
  data?: InputMaybe<Array<CreatedAndUpdatePosition> | CreatedAndUpdatePosition>;
}>;


export type EditPositionMutation = { __typename?: 'Mutation', EditPosition?: { __typename?: 'CreatepositionResponseType', message?: string | null, status?: boolean | null } | null };

export type Delete_Position1MutationVariables = Exact<{
  deletePosition1Id: Scalars['ID'];
}>;


export type Delete_Position1Mutation = { __typename?: 'Mutation', delete_position1?: { __typename?: 'deletepositionResponseType', message?: string | null, status?: boolean | null } | null };

export type Delete_Position2MutationVariables = Exact<{
  deletePosition2Id: Scalars['ID'];
}>;


export type Delete_Position2Mutation = { __typename?: 'Mutation', delete_position2?: { __typename?: 'deletepositionResponseType', message?: string | null, status?: boolean | null } | null };

export type Delete_Position3MutationVariables = Exact<{
  deletePosition3Id: Scalars['ID'];
}>;


export type Delete_Position3Mutation = { __typename?: 'Mutation', delete_position3?: { __typename?: 'deletepositionResponseType', message?: string | null, status?: boolean | null } | null };

export type CreateAccountUserMutationVariables = Exact<{
  data: CreateAccountUserInput;
}>;


export type CreateAccountUserMutation = { __typename?: 'Mutation', createAccountUser?: { __typename?: 'CreateUserResponseType', message?: string | null, status?: boolean | null } | null };

export type DeleteAccountUserMutationVariables = Exact<{
  deleteAccountUserId: Scalars['ID'];
}>;


export type DeleteAccountUserMutation = { __typename?: 'Mutation', deleteAccountUser?: { __typename?: 'DeleteAccountUserResponseType', message?: string | null, status?: boolean | null } | null };

export type LoginMutationVariables = Exact<{
  data: LoginaInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginResponse', access_token?: string | null, refresh_token?: string | null, status?: boolean | null } | null };

export type MutationMutationVariables = Exact<{
  data: CreateRoleCompanyGroup;
}>;


export type MutationMutation = { __typename?: 'Mutation', createRoleCompany?: { __typename?: 'CreateRoleCompanyResponseType', message?: string | null, status?: boolean | null } | null };

export type DeleteRoleCompanyMutationVariables = Exact<{
  deleteRoleCompanyId: Scalars['ID'];
}>;


export type DeleteRoleCompanyMutation = { __typename?: 'Mutation', deleteRoleCompany?: { __typename?: 'DeleteRoleCompanyRespnsetType', message?: string | null, status?: boolean | null } | null };

export type CreateAccountMutationVariables = Exact<{
  data: CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount?: { __typename?: 'CreateCompanyResponseType', status?: boolean | null, message?: string | null } | null };

export type QueryQueryVariables = Exact<{
  companyname: Scalars['String'];
}>;


export type QueryQuery = { __typename?: 'Query', verifyCompanycode?: boolean | null };

export type Getleava_AlldataQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  position2Id?: InputMaybe<Scalars['ID']>;
  position3Id?: InputMaybe<Scalars['ID']>;
}>;


export type Getleava_AlldataQuery = { __typename?: 'Query', getleava_alldata?: Array<{ __typename?: 'leave_data', id?: string | null, leavetype_id?: string | null, start_date?: any | null, end_date?: any | null, quantity_day?: number | null, quantity_hours?: number | null, detail_leave?: string | null, Status?: number | null, user_id?: string | null, mas_leave_type?: { __typename?: 'mas_leave_type', id?: string | null, name?: string | null, orderby?: number | null } | null, user?: { __typename?: 'User', id: string, email: string, profile?: { __typename?: 'Profile', id: string, firstname_th?: string | null, lastname_th?: string | null, firstname_en?: string | null, lastname_en?: string | null, avatar?: string | null } | null } | null } | null> | null };

export type FetchcompanySelectQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchcompanySelectQuery = { __typename?: 'Query', company?: { __typename?: 'ResponseCompany', name?: string | null, branch?: Array<{ __typename?: 'ResponseCompany_Branch', id: string, name?: string | null, address?: string | null, _count?: { __typename?: 'CountInsideBranch', users?: number | null } | null } | null> | null } | null };

export type GetownCompanyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetownCompanyQuery = { __typename?: 'Query', getownCompany?: { __typename?: 'GetOwncompanytype', redirect?: boolean | null, isOwner?: boolean | null, company?: { __typename?: 'OwnCompanyType', companyCode?: string | null, icon?: string | null, id?: string | null, name?: string | null } | null, companies?: Array<{ __typename?: 'OwnCompanyType', companyCode?: string | null, icon?: string | null, id?: string | null, name?: string | null } | null> | null } | null };

export type GetBusinessTypeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBusinessTypeQuery = { __typename?: 'Query', getBusinessType?: Array<{ __typename?: 'MainBusinessType', id: string, name?: string | null, SubBusinessType?: Array<{ __typename?: 'SubBusinessType', id: string, name?: string | null } | null> | null } | null> | null };

export type CreateAndUpdateComBaranceMutationVariables = Exact<{
  data: CreateCompanyBranch;
}>;


export type CreateAndUpdateComBaranceMutation = { __typename?: 'Mutation', createAndUpdateComBarance?: { __typename?: 'CreateComapnyBranchResponseType', message?: string | null, status?: boolean | null } | null };

export type DeleteComBaranceMutationVariables = Exact<{
  deleteComBaranceId: Scalars['ID'];
}>;


export type DeleteComBaranceMutation = { __typename?: 'Mutation', deleteComBarance?: { __typename?: 'DeleteComapnyBranchResponseType', message?: string | null, status?: boolean | null } | null };

export type GetHoliDayYearQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHoliDayYearQuery = { __typename?: 'Query', GetHoliDayYear?: Array<{ __typename?: 'holiday_years', id: string, day?: number | null, month?: number | null, year?: number | null, holiday_name?: string | null } | null> | null };

export type GetAllleaveQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  position2Id?: InputMaybe<Scalars['ID']>;
  position3Id?: InputMaybe<Scalars['ID']>;
}>;


export type GetAllleaveQuery = { __typename?: 'Query', getAllleave?: { __typename?: 'getleaveResponseType', data_all?: Array<{ __typename?: 'getdataaboutleave', email: string, id: string, profile?: { __typename?: 'Profile', id: string, firstname_th?: string | null, lastname_th?: string | null, firstname_en?: string | null, lastname_en?: string | null, avatar?: string | null, bio?: string | null, dob?: any | null, age?: string | null, relationship?: string | null, shirt_size?: string | null, prefix_th?: string | null, prefix_en?: string | null, citizen_id?: string | null, social_id?: string | null, staff_status?: string | null, tel?: string | null, address?: string | null, gender?: string | null, staff_code?: string | null, religion?: string | null, userId?: string | null, citizen_addressnumber?: string | null, citizen_address?: string | null, citizen_country?: string | null, citizen_province?: string | null, citizen_district?: string | null, citizen_state?: string | null, citizen_zipcode?: string | null, citizen_tel?: string | null, contract_sameCitizen?: boolean | null, contract_addressnumber?: string | null, contract_address?: string | null, contract_country?: string | null, contract_province?: string | null, contract_district?: string | null, contract_state?: string | null, contract_zipcode?: string | null, contract_email?: string | null, contract_companyemail?: string | null, social_facebook?: string | null, social_likedin?: string | null, social_line?: string | null, social_telegram?: string | null, nickname?: string | null, blood_type?: string | null, employee_status?: string | null, start_date_work?: any | null } | null, Position_user?: Array<{ __typename?: 'Position_user', id?: string | null, user_id?: string | null, position1_id?: string | null, position2_id?: string | null, position3_id?: string | null, role?: string | null, headderId?: string | null, date?: any | null, header?: { __typename?: 'User', id: string, email: string, profile?: { __typename?: 'Profile', id: string, firstname_th?: string | null, lastname_th?: string | null, firstname_en?: string | null, lastname_en?: string | null, avatar?: string | null } | null } | null, mas_positionlevel1?: { __typename?: 'mas_positionlevel1', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null, CompanyId?: string | null } | null, mas_positionlevel2?: { __typename?: 'mas_positionlevel2', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null, positionlevel1_id?: string | null } | null, mas_positionlevel3?: { __typename?: 'mas_positionlevel3', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null, positionlevel2_id?: string | null } | null } | null> | null, data_leave?: Array<{ __typename?: 'leave_data', id?: string | null, leavetype_id?: string | null, start_date?: any | null, end_date?: any | null, quantity_day?: number | null, quantity_hours?: number | null, detail_leave?: string | null, Status?: number | null, user_id?: string | null, mas_leave_type?: { __typename?: 'mas_leave_type', id?: string | null, name?: string | null, orderby?: number | null } | null } | null> | null } | null> | null, data_count?: { __typename?: 'getcount', name_1?: string | null, count1?: number | null, name_2?: string | null, count2?: number | null, name_3?: string | null, count3?: number | null, name_4?: string | null, count4?: number | null } | null } | null };

export type Getleava_DatameQueryVariables = Exact<{ [key: string]: never; }>;


export type Getleava_DatameQuery = { __typename?: 'Query', getleava_datame?: { __typename?: 'getleaveResponseType', data_count?: { __typename?: 'getcount', name_1?: string | null, count1?: number | null, name_2?: string | null, count2?: number | null, name_3?: string | null, count3?: number | null, name_4?: string | null, count4?: number | null } | null, data_all?: Array<{ __typename?: 'getdataaboutleave', email: string, id: string, profile?: { __typename?: 'Profile', firstname_th?: string | null, lastname_th?: string | null, firstname_en?: string | null, lastname_en?: string | null, avatar?: string | null, dob?: any | null, id: string, userId?: string | null, start_date_work?: any | null, prefix_th?: string | null, prefix_en?: string | null } | null, Position_user?: Array<{ __typename?: 'Position_user', id?: string | null, position1_id?: string | null, position2_id?: string | null, position3_id?: string | null, user_id?: string | null, role?: string | null, headderId?: string | null, date?: any | null, mas_positionlevel1?: { __typename?: 'mas_positionlevel1', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null } | null, mas_positionlevel2?: { __typename?: 'mas_positionlevel2', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null } | null, mas_positionlevel3?: { __typename?: 'mas_positionlevel3', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null } | null } | null> | null, data_leave?: Array<{ __typename?: 'leave_data', id?: string | null, leavetype_id?: string | null, start_date?: any | null, end_date?: any | null, quantity_day?: number | null, quantity_hours?: number | null, detail_leave?: string | null, Status?: number | null, user_id?: string | null, mas_leave_type?: { __typename?: 'mas_leave_type', id?: string | null, name?: string | null, orderby?: number | null } | null } | null> | null } | null> | null } | null };

export type GetleavetypedataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetleavetypedataQuery = { __typename?: 'Query', getleavetypedata?: Array<{ __typename?: 'mas_leave_type', id?: string | null, name?: string | null, orderby?: number | null } | null> | null };

export type Createddata_LeaveMutationVariables = Exact<{
  data?: InputMaybe<Leave>;
}>;


export type Createddata_LeaveMutation = { __typename?: 'Mutation', createddata_leave?: { __typename?: 'CreateleaveResponseType', message?: string | null, status?: boolean | null } | null };

export type Delete_LeveMutationVariables = Exact<{
  deleteLeveId: Scalars['ID'];
}>;


export type Delete_LeveMutation = { __typename?: 'Mutation', delete_leve?: { __typename?: 'DeleteleaveResponseType', message?: string | null, status?: boolean | null } | null };

export type GetMasPositonQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMasPositonQuery = { __typename?: 'Query', getMasPositon?: Array<{ __typename?: 'mas_positionlevel1', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null, CompanyId?: string | null, mas_positionlevel2?: Array<{ __typename?: 'mas_positionlevel2', type?: string | null, code?: string | null, name?: string | null, level?: number | null, id: string, mas_positionlevel3?: Array<{ __typename?: 'mas_positionlevel3', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null } | null> | null } | null> | null, Position_user?: Array<{ __typename?: 'Position_user', id?: string | null, user_id?: string | null, position1_id?: string | null, position2_id?: string | null, position3_id?: string | null, role?: string | null, headderId?: string | null, date?: any | null } | null> | null } | null> | null };

export type Getposition_UserQueryVariables = Exact<{
  getpositionUserId?: InputMaybe<Scalars['ID']>;
}>;


export type Getposition_UserQuery = { __typename?: 'Query', getposition_user?: Array<{ __typename?: 'getPositionUser', id?: string | null, position1_id?: string | null, position2_id?: string | null, position3_id?: string | null, role?: string | null, date?: any | null, user?: { __typename?: 'User', id: string, email: string, password: string, profile?: { __typename?: 'Profile', firstname_th?: string | null, lastname_th?: string | null, id: string, firstname_en?: string | null, lastname_en?: string | null, prefix_th?: string | null, prefix_en?: string | null } | null } | null, mas_positionlevel1?: { __typename?: 'mas_positionlevel1', id: string, name?: string | null, level?: number | null } | null, mas_positionlevel2?: { __typename?: 'mas_positionlevel2', id: string, name?: string | null, level?: number | null } | null, mas_positionlevel3?: { __typename?: 'mas_positionlevel3', id: string, name?: string | null, level?: number | null } | null, header?: { __typename?: 'User', id: string, email: string, profile?: { __typename?: 'Profile', firstname_th?: string | null, lastname_th?: string | null, firstname_en?: string | null, lastname_en?: string | null, prefix_th?: string | null, prefix_en?: string | null } | null } | null } | null> | null };

export type GetpositionMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetpositionMeQuery = { __typename?: 'Query', getpositionMe?: Array<{ __typename?: 'getPositionUser', id?: string | null, position1_id?: string | null, position2_id?: string | null, position3_id?: string | null, role?: string | null, date?: any | null, user?: { __typename?: 'User', email: string, id: string, profile?: { __typename?: 'Profile', id: string, firstname_th?: string | null, lastname_th?: string | null, firstname_en?: string | null, lastname_en?: string | null, avatar?: string | null, dob?: any | null, userId?: string | null, start_date_work?: any | null } | null } | null, header?: { __typename?: 'User', email: string, id: string, profile?: { __typename?: 'Profile', firstname_th?: string | null, lastname_th?: string | null, firstname_en?: string | null, lastname_en?: string | null, avatar?: string | null, dob?: any | null, start_date_work?: any | null } | null } | null, mas_positionlevel1?: { __typename?: 'mas_positionlevel1', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null } | null, mas_positionlevel2?: { __typename?: 'mas_positionlevel2', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null } | null, mas_positionlevel3?: { __typename?: 'mas_positionlevel3', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null } | null } | null> | null };

export type Createdposition_UserMutationVariables = Exact<{
  data: Position;
}>;


export type Createdposition_UserMutation = { __typename?: 'Mutation', createdposition_user?: { __typename?: 'CreatepositionResponseType', message?: string | null, status?: boolean | null } | null };

export type GetProvinceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProvinceQuery = { __typename?: 'Query', getProvince?: Array<{ __typename?: 'Province', name?: string | null, id: string, district?: Array<{ __typename?: 'District', id: string, name?: string | null, amphoe?: Array<{ __typename?: 'Amphoe', id: string, name?: string | null, zipcode?: string | null } | null> | null } | null> | null } | null> | null };

export type GetcompanyRoleQueryVariables = Exact<{ [key: string]: never; }>;


export type GetcompanyRoleQuery = { __typename?: 'Query', getcompanyRole?: Array<{ __typename?: 'Role_Company', access?: any | null, id: string, name?: string | null, status?: number | null } | null> | null };

export type GetcompanyRoleManagementQueryVariables = Exact<{ [key: string]: never; }>;


export type GetcompanyRoleManagementQuery = { __typename?: 'Query', getcompanyRole?: Array<{ __typename?: 'Role_Company', access?: any | null, id: string, name?: string | null } | null> | null };

export type UpdateRoleCompanyManagementMutationVariables = Exact<{
  data: Array<UpdateRoleCompanyMangementType> | UpdateRoleCompanyMangementType;
}>;


export type UpdateRoleCompanyManagementMutation = { __typename?: 'Mutation', updateRoleCompanyMangement?: { __typename?: 'CreateRoleCompanyResponseType', message?: string | null, status?: boolean | null } | null };

export type Mas_BankQueryVariables = Exact<{ [key: string]: never; }>;


export type Mas_BankQuery = { __typename?: 'Query', mas_bank?: Array<{ __typename?: 'mas_bank', id?: string | null, name?: string | null } | null> | null };

export type Data_SalaryQueryVariables = Exact<{
  fristname?: InputMaybe<Scalars['String']>;
  position2?: InputMaybe<Scalars['String']>;
  position3?: InputMaybe<Scalars['String']>;
}>;


export type Data_SalaryQuery = { __typename?: 'Query', data_salary?: Array<{ __typename?: 'data_salary', id: string, companyBranchId?: string | null, profile?: { __typename?: 'Profile', id: string, firstname_th?: string | null, lastname_th?: string | null, prefix_th?: string | null, staff_code?: string | null, staff_status?: string | null, start_date_work?: any | null, userId?: string | null, employee_status?: string | null, avatar?: string | null } | null, bookbank_log?: Array<{ __typename?: 'Bookbank_log_type', base_salary?: number | null, id?: string | null, date?: any | null, bank_number?: string | null, mas_bankId?: string | null, all_collectId?: string | null, provident_com?: number | null, provident_emp?: number | null, userId?: string | null, accept_date?: any | null, accept_years?: number | null, accept_month?: number | null, mas_bank?: { __typename?: 'mas_bank', id?: string | null, name?: string | null } | null } | null> | null, Position_user?: Array<{ __typename?: 'Position_user', position2_id?: string | null, position3_id?: string | null, id?: string | null, user_id?: string | null, position1_id?: string | null, role?: string | null, headderId?: string | null, date?: any | null, mas_positionlevel2?: { __typename?: 'mas_positionlevel2', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null, positionlevel1_id?: string | null } | null, mas_positionlevel3?: { __typename?: 'mas_positionlevel3', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null, positionlevel2_id?: string | null } | null, mas_positionlevel1?: { __typename?: 'mas_positionlevel1', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null, CompanyId?: string | null } | null } | null> | null } | null> | null };

export type SalaryQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
  years?: InputMaybe<Scalars['String']>;
}>;


export type SalaryQuery = { __typename?: 'Query', salary?: { __typename?: 'data_salary', id: string, profile?: { __typename?: 'Profile', id: string, prefix_th?: string | null, firstname_th?: string | null, lastname_th?: string | null } | null, salary?: Array<{ __typename?: 'salary', month?: string | null, years?: string | null, total_income?: number | null, total_expense?: number | null, net?: number | null, id?: string | null, commission?: number | null, position_income?: number | null, ot?: number | null, bonus?: number | null, special_income?: number | null, other_income?: number | null, travel_income?: number | null, bursary?: number | null, welfare_money?: number | null, vatper?: number | null, ss_per?: number | null, vat?: number | null, social_security?: number | null, miss?: number | null, ra?: number | null, late?: number | null, other?: number | null, provident_employee?: number | null, provident_company?: number | null, userId?: string | null, bookbank_logId?: string | null, mas_income_typeId?: string | null, date?: any | null, mas_salary_statusId?: string | null, provident_date?: any | null, pro_employee?: number | null, pro_company?: number | null, mas_all_collectId?: string | null, socialYears?: number | null, vatYears?: number | null, incomeYears?: number | null, mas_bankId?: string | null } | null> | null, bookbank_log?: Array<{ __typename?: 'Bookbank_log_type', bank_number?: string | null, base_salary?: number | null, mas_bank?: { __typename?: 'mas_bank', name?: string | null } | null } | null> | null } | null };

export type CreateandupdatesalaryMutationVariables = Exact<{
  data?: InputMaybe<SalaryInput>;
}>;


export type CreateandupdatesalaryMutation = { __typename?: 'Mutation', Createandupdatesalary?: { __typename?: 'createsalaryResponseType', message?: string | null, status?: boolean | null } | null };

export type CreateAndUpdateExpenseComMutationVariables = Exact<{
  data?: InputMaybe<ExpenseComInput>;
}>;


export type CreateAndUpdateExpenseComMutation = { __typename?: 'Mutation', CreateAndUpdateExpenseCom?: { __typename?: 'CreateAndUpdateExpenseComResponseType', message?: string | null, status?: boolean | null } | null };

export type CreateandupdatebookbankMutationVariables = Exact<{
  data?: InputMaybe<Bookbank_LogInput>;
}>;


export type CreateandupdatebookbankMutation = { __typename?: 'Mutation', Createandupdatebookbank?: { __typename?: 'createbookbanklogResponseType', message?: string | null, status?: boolean | null } | null };

export type DeletebookbankMutationVariables = Exact<{
  deletebookbankId: Scalars['ID'];
}>;


export type DeletebookbankMutation = { __typename?: 'Mutation', Deletebookbank?: { __typename?: 'DeletebookbankResponseType', message?: string | null, status?: boolean | null } | null };

export type Bookbank_Log_AdminQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
}>;


export type Bookbank_Log_AdminQuery = { __typename?: 'Query', bookbank_log_admin?: Array<{ __typename?: 'Bookbank_log_type', id?: string | null, date?: any | null, mas_bankId?: string | null, bank_number?: string | null, base_salary?: number | null, provident_com?: number | null, provident_emp?: number | null, userId?: string | null, accept_date?: any | null, mas_bank?: { __typename?: 'mas_bank', id?: string | null, name?: string | null } | null } | null> | null };

export type Expense_CompanyQueryVariables = Exact<{
  date?: InputMaybe<Scalars['String']>;
}>;


export type Expense_CompanyQuery = { __typename?: 'Query', expense_company?: Array<{ __typename?: 'expense_company', id: string, vat_per?: number | null, ss_per?: number | null, check_vat?: Array<string | null> | null, date?: any | null, cal_date_salary?: any | null, mas_bank?: { __typename?: 'mas_bank', name?: string | null, id?: string | null } | null } | null> | null };

export type Filter_Bookbank_AdminQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
}>;


export type Filter_Bookbank_AdminQuery = { __typename?: 'Query', filter_bookbank_admin?: Array<{ __typename?: 'Bookbank_log_type', id?: string | null, bank_number?: string | null, base_salary?: number | null, userId?: string | null, provident_com?: number | null, provident_emp?: number | null, mas_bank?: { __typename?: 'mas_bank', name?: string | null } | null } | null> | null };

export type UsersQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  position2Id?: InputMaybe<Scalars['ID']>;
  position3Id?: InputMaybe<Scalars['ID']>;
}>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, email: string, profile?: { __typename?: 'Profile', address?: string | null, age?: string | null, avatar?: string | null, bio?: string | null, citizen_address?: string | null, citizen_addressnumber?: string | null, citizen_country?: string | null, citizen_district?: string | null, citizen_id?: string | null, citizen_province?: string | null, citizen_state?: string | null, citizen_tel?: string | null, citizen_zipcode?: string | null, contract_address?: string | null, contract_addressnumber?: string | null, contract_companyemail?: string | null, contract_country?: string | null, contract_district?: string | null, id: string, firstname_th?: string | null, lastname_th?: string | null, firstname_en?: string | null, lastname_en?: string | null, dob?: any | null, relationship?: string | null, shirt_size?: string | null, prefix_th?: string | null, prefix_en?: string | null, social_id?: string | null, staff_status?: string | null, tel?: string | null, gender?: string | null, staff_code?: string | null, religion?: string | null, userId?: string | null, contract_sameCitizen?: boolean | null, contract_province?: string | null, contract_state?: string | null, contract_zipcode?: string | null, contract_email?: string | null, social_facebook?: string | null, social_likedin?: string | null, social_line?: string | null, social_telegram?: string | null, nickname?: string | null, blood_type?: string | null, employee_status?: string | null, start_date_work?: any | null, user?: { __typename?: 'User', email: string, password: string } | null } | null, Role_Company?: { __typename?: 'Role_Company', id: string, name?: string | null } | null, Position_user?: Array<{ __typename?: 'Position_user', date?: any | null, mas_positionlevel1?: { __typename?: 'mas_positionlevel1', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null, CompanyId?: string | null } | null, mas_positionlevel2?: { __typename?: 'mas_positionlevel2', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null, positionlevel1_id?: string | null } | null, mas_positionlevel3?: { __typename?: 'mas_positionlevel3', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null, positionlevel2_id?: string | null } | null } | null> | null } | null> | null };


export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const ValidateRouteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ValidateRoute"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"args"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateRoute"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"Variable","name":{"kind":"Name","value":"args"}}},{"kind":"Argument","name":{"kind":"Name","value":"branch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branch"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acess"}},{"kind":"Field","name":{"kind":"Name","value":"currentBranch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"branchId"}},{"kind":"Field","name":{"kind":"Name","value":"branchName"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"reAccess"}},{"kind":"Field","name":{"kind":"Name","value":"reFresh"}}]}}]}}]} as unknown as DocumentNode<ValidateRouteMutation, ValidateRouteMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Role_Company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companyBranch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyCode"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_th"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_th"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_en"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_en"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"relationship"}},{"kind":"Field","name":{"kind":"Name","value":"shirt_size"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_th"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_en"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_id"}},{"kind":"Field","name":{"kind":"Name","value":"social_id"}},{"kind":"Field","name":{"kind":"Name","value":"staff_status"}},{"kind":"Field","name":{"kind":"Name","value":"tel"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"staff_code"}},{"kind":"Field","name":{"kind":"Name","value":"religion"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_addressnumber"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_address"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_country"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_province"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_district"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_state"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_zipcode"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_tel"}},{"kind":"Field","name":{"kind":"Name","value":"contract_sameCitizen"}},{"kind":"Field","name":{"kind":"Name","value":"contract_addressnumber"}},{"kind":"Field","name":{"kind":"Name","value":"contract_address"}},{"kind":"Field","name":{"kind":"Name","value":"contract_country"}},{"kind":"Field","name":{"kind":"Name","value":"contract_province"}},{"kind":"Field","name":{"kind":"Name","value":"contract_district"}},{"kind":"Field","name":{"kind":"Name","value":"contract_state"}},{"kind":"Field","name":{"kind":"Name","value":"contract_zipcode"}},{"kind":"Field","name":{"kind":"Name","value":"contract_email"}},{"kind":"Field","name":{"kind":"Name","value":"contract_companyemail"}},{"kind":"Field","name":{"kind":"Name","value":"social_facebook"}},{"kind":"Field","name":{"kind":"Name","value":"social_likedin"}},{"kind":"Field","name":{"kind":"Name","value":"social_line"}},{"kind":"Field","name":{"kind":"Name","value":"social_telegram"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"blood_type"}},{"kind":"Field","name":{"kind":"Name","value":"employee_status"}},{"kind":"Field","name":{"kind":"Name","value":"start_date_work"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const CompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"branch"}}]}},{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"address_2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"tel"}},{"kind":"Field","name":{"kind":"Name","value":"fax"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_2"}},{"kind":"Field","name":{"kind":"Name","value":"company_type"}},{"kind":"Field","name":{"kind":"Name","value":"sub_company_type"}},{"kind":"Field","name":{"kind":"Name","value":"registeredamount"}},{"kind":"Field","name":{"kind":"Name","value":"social_facebook"}},{"kind":"Field","name":{"kind":"Name","value":"social_likedin"}},{"kind":"Field","name":{"kind":"Name","value":"social_instragram"}},{"kind":"Field","name":{"kind":"Name","value":"social_line"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"regis_vat"}},{"kind":"Field","name":{"kind":"Name","value":"regiscomnumber"}},{"kind":"Field","name":{"kind":"Name","value":"photo_link"}},{"kind":"Field","name":{"kind":"Name","value":"vat_link"}},{"kind":"Field","name":{"kind":"Name","value":"certificate_link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userlimit"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CompanyQuery, CompanyQueryVariables>;
export const CreatedPositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatedPosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatedAndUpdatePosition"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CreatedPosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreatedPositionMutation, CreatedPositionMutationVariables>;
export const EditPositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditPosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatedAndUpdatePosition"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EditPosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<EditPositionMutation, EditPositionMutationVariables>;
export const Delete_Position1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Delete_position1"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deletePosition1Id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_position1"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deletePosition1Id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<Delete_Position1Mutation, Delete_Position1MutationVariables>;
export const Delete_Position2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Delete_position2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deletePosition2Id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_position2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deletePosition2Id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<Delete_Position2Mutation, Delete_Position2MutationVariables>;
export const Delete_Position3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Delete_position3"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deletePosition3Id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_position3"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deletePosition3Id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<Delete_Position3Mutation, Delete_Position3MutationVariables>;
export const CreateAccountUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAccountUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAccountUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccountUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateAccountUserMutation, CreateAccountUserMutationVariables>;
export const DeleteAccountUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAccountUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteAccountUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAccountUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteAccountUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeleteAccountUserMutation, DeleteAccountUserMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"createRoleCompanyGroup"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoleCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const DeleteRoleCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRoleCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteRoleCompanyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRoleCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteRoleCompanyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeleteRoleCompanyMutation, DeleteRoleCompanyMutationVariables>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAccountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyCompanycode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyname"}}}]}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const Getleava_AlldataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Getleava_alldata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position2Id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position3Id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getleava_alldata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"position2Id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position2Id"}}},{"kind":"Argument","name":{"kind":"Name","value":"position3Id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position3Id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leavetype_id"}},{"kind":"Field","name":{"kind":"Name","value":"mas_leave_type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderby"}}]}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"quantity_day"}},{"kind":"Field","name":{"kind":"Name","value":"quantity_hours"}},{"kind":"Field","name":{"kind":"Name","value":"detail_leave"}},{"kind":"Field","name":{"kind":"Name","value":"Status"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_th"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_th"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_en"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_en"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]}}]} as unknown as DocumentNode<Getleava_AlldataQuery, Getleava_AlldataQueryVariables>;
export const FetchcompanySelectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchcompanySelect"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]}}]} as unknown as DocumentNode<FetchcompanySelectQuery, FetchcompanySelectQueryVariables>;
export const GetownCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetownCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getownCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"redirect"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyCode"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyCode"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetownCompanyQuery, GetownCompanyQueryVariables>;
export const GetBusinessTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBusinessType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBusinessType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"SubBusinessType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetBusinessTypeQuery, GetBusinessTypeQueryVariables>;
export const CreateAndUpdateComBaranceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAndUpdateComBarance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"createCompanyBranch"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAndUpdateComBarance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateAndUpdateComBaranceMutation, CreateAndUpdateComBaranceMutationVariables>;
export const DeleteComBaranceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComBarance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteComBaranceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComBarance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteComBaranceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeleteComBaranceMutation, DeleteComBaranceMutationVariables>;
export const GetHoliDayYearDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHoliDayYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetHoliDayYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"holiday_name"}}]}}]}}]} as unknown as DocumentNode<GetHoliDayYearQuery, GetHoliDayYearQueryVariables>;
export const GetAllleaveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllleave"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position2Id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position3Id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllleave"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"position2Id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position2Id"}}},{"kind":"Argument","name":{"kind":"Name","value":"position3Id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position3Id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data_all"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_th"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_th"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_en"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_en"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"relationship"}},{"kind":"Field","name":{"kind":"Name","value":"shirt_size"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_th"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_en"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_id"}},{"kind":"Field","name":{"kind":"Name","value":"social_id"}},{"kind":"Field","name":{"kind":"Name","value":"staff_status"}},{"kind":"Field","name":{"kind":"Name","value":"tel"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"staff_code"}},{"kind":"Field","name":{"kind":"Name","value":"religion"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_addressnumber"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_address"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_country"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_province"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_district"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_state"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_zipcode"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_tel"}},{"kind":"Field","name":{"kind":"Name","value":"contract_sameCitizen"}},{"kind":"Field","name":{"kind":"Name","value":"contract_addressnumber"}},{"kind":"Field","name":{"kind":"Name","value":"contract_address"}},{"kind":"Field","name":{"kind":"Name","value":"contract_country"}},{"kind":"Field","name":{"kind":"Name","value":"contract_province"}},{"kind":"Field","name":{"kind":"Name","value":"contract_district"}},{"kind":"Field","name":{"kind":"Name","value":"contract_state"}},{"kind":"Field","name":{"kind":"Name","value":"contract_zipcode"}},{"kind":"Field","name":{"kind":"Name","value":"contract_email"}},{"kind":"Field","name":{"kind":"Name","value":"contract_companyemail"}},{"kind":"Field","name":{"kind":"Name","value":"social_facebook"}},{"kind":"Field","name":{"kind":"Name","value":"social_likedin"}},{"kind":"Field","name":{"kind":"Name","value":"social_line"}},{"kind":"Field","name":{"kind":"Name","value":"social_telegram"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"blood_type"}},{"kind":"Field","name":{"kind":"Name","value":"employee_status"}},{"kind":"Field","name":{"kind":"Name","value":"start_date_work"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Position_user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"position1_id"}},{"kind":"Field","name":{"kind":"Name","value":"position2_id"}},{"kind":"Field","name":{"kind":"Name","value":"position3_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"headderId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"header"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_th"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_th"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_en"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_en"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"CompanyId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"positionlevel1_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"positionlevel2_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"data_leave"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leavetype_id"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"quantity_day"}},{"kind":"Field","name":{"kind":"Name","value":"quantity_hours"}},{"kind":"Field","name":{"kind":"Name","value":"detail_leave"}},{"kind":"Field","name":{"kind":"Name","value":"Status"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"mas_leave_type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderby"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"data_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name_1"}},{"kind":"Field","name":{"kind":"Name","value":"count1"}},{"kind":"Field","name":{"kind":"Name","value":"name_2"}},{"kind":"Field","name":{"kind":"Name","value":"count2"}},{"kind":"Field","name":{"kind":"Name","value":"name_3"}},{"kind":"Field","name":{"kind":"Name","value":"count3"}},{"kind":"Field","name":{"kind":"Name","value":"name_4"}},{"kind":"Field","name":{"kind":"Name","value":"count4"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllleaveQuery, GetAllleaveQueryVariables>;
export const Getleava_DatameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Getleava_datame"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getleava_datame"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name_1"}},{"kind":"Field","name":{"kind":"Name","value":"count1"}},{"kind":"Field","name":{"kind":"Name","value":"name_2"}},{"kind":"Field","name":{"kind":"Name","value":"count2"}},{"kind":"Field","name":{"kind":"Name","value":"name_3"}},{"kind":"Field","name":{"kind":"Name","value":"count3"}},{"kind":"Field","name":{"kind":"Name","value":"name_4"}},{"kind":"Field","name":{"kind":"Name","value":"count4"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data_all"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstname_th"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_th"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_en"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_en"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"start_date_work"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_th"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Position_user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position1_id"}},{"kind":"Field","name":{"kind":"Name","value":"position2_id"}},{"kind":"Field","name":{"kind":"Name","value":"position3_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"headderId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"data_leave"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leavetype_id"}},{"kind":"Field","name":{"kind":"Name","value":"mas_leave_type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderby"}}]}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"quantity_day"}},{"kind":"Field","name":{"kind":"Name","value":"quantity_hours"}},{"kind":"Field","name":{"kind":"Name","value":"detail_leave"}},{"kind":"Field","name":{"kind":"Name","value":"Status"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<Getleava_DatameQuery, Getleava_DatameQueryVariables>;
export const GetleavetypedataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Getleavetypedata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getleavetypedata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderby"}}]}}]}}]} as unknown as DocumentNode<GetleavetypedataQuery, GetleavetypedataQueryVariables>;
export const Createddata_LeaveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Createddata_leave"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"leave"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createddata_leave"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<Createddata_LeaveMutation, Createddata_LeaveMutationVariables>;
export const Delete_LeveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Delete_leve"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteLeveId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_leve"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteLeveId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<Delete_LeveMutation, Delete_LeveMutationVariables>;
export const GetMasPositonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMasPositon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMasPositon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"CompanyId"}},{"kind":"Field","name":{"kind":"Name","value":"Position_user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"position1_id"}},{"kind":"Field","name":{"kind":"Name","value":"position2_id"}},{"kind":"Field","name":{"kind":"Name","value":"position3_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"headderId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]} as unknown as DocumentNode<GetMasPositonQuery, GetMasPositonQueryVariables>;
export const Getposition_UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Getposition_user"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getpositionUserId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getposition_user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getpositionUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstname_th"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_th"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_en"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_en"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_th"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"position1_id"}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position2_id"}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position3_id"}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"header"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstname_th"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_th"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_en"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_en"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_th"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_en"}}]}}]}}]}}]}}]} as unknown as DocumentNode<Getposition_UserQuery, Getposition_UserQueryVariables>;
export const GetpositionMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetpositionMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getpositionMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_th"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_th"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_en"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_en"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"start_date_work"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"header"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstname_th"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_th"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_en"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_en"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"start_date_work"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"position1_id"}},{"kind":"Field","name":{"kind":"Name","value":"position2_id"}},{"kind":"Field","name":{"kind":"Name","value":"position3_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<GetpositionMeQuery, GetpositionMeQueryVariables>;
export const Createdposition_UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Createdposition_user"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"position"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdposition_user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<Createdposition_UserMutation, Createdposition_UserMutationVariables>;
export const GetProvinceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProvince"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProvince"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"district"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amphoe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"zipcode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetProvinceQuery, GetProvinceQueryVariables>;
export const GetcompanyRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetcompanyRole"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getcompanyRole"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetcompanyRoleQuery, GetcompanyRoleQueryVariables>;
export const GetcompanyRoleManagementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetcompanyRoleManagement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getcompanyRole"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetcompanyRoleManagementQuery, GetcompanyRoleManagementQueryVariables>;
export const UpdateRoleCompanyManagementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateRoleCompanyManagement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRoleCompanyMangementType"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoleCompanyMangement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateRoleCompanyManagementMutation, UpdateRoleCompanyManagementMutationVariables>;
export const Mas_BankDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Mas_bank"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mas_bank"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<Mas_BankQuery, Mas_BankQueryVariables>;
export const Data_SalaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Data_salary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fristname"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position2"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position3"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data_salary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fristname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fristname"}}},{"kind":"Argument","name":{"kind":"Name","value":"Position2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position2"}}},{"kind":"Argument","name":{"kind":"Name","value":"Position3"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position3"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_th"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_th"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_th"}},{"kind":"Field","name":{"kind":"Name","value":"staff_code"}},{"kind":"Field","name":{"kind":"Name","value":"staff_status"}},{"kind":"Field","name":{"kind":"Name","value":"start_date_work"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"employee_status"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookbank_log"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"base_salary"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"bank_number"}},{"kind":"Field","name":{"kind":"Name","value":"mas_bank"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mas_bankId"}},{"kind":"Field","name":{"kind":"Name","value":"all_collectId"}},{"kind":"Field","name":{"kind":"Name","value":"provident_com"}},{"kind":"Field","name":{"kind":"Name","value":"provident_emp"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"accept_date"}},{"kind":"Field","name":{"kind":"Name","value":"accept_years"}},{"kind":"Field","name":{"kind":"Name","value":"accept_month"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Position_user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position2_id"}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"positionlevel1_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position3_id"}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"positionlevel2_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"position1_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"headderId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"CompanyId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"companyBranchId"}}]}}]}}]} as unknown as DocumentNode<Data_SalaryQuery, Data_SalaryQueryVariables>;
export const SalaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Salary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"years"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"salary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"years"},"value":{"kind":"Variable","name":{"kind":"Name","value":"years"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_th"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_th"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_th"}}]}},{"kind":"Field","name":{"kind":"Name","value":"salary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"total_income"}},{"kind":"Field","name":{"kind":"Name","value":"total_expense"}},{"kind":"Field","name":{"kind":"Name","value":"net"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"commission"}},{"kind":"Field","name":{"kind":"Name","value":"position_income"}},{"kind":"Field","name":{"kind":"Name","value":"ot"}},{"kind":"Field","name":{"kind":"Name","value":"bonus"}},{"kind":"Field","name":{"kind":"Name","value":"special_income"}},{"kind":"Field","name":{"kind":"Name","value":"other_income"}},{"kind":"Field","name":{"kind":"Name","value":"travel_income"}},{"kind":"Field","name":{"kind":"Name","value":"bursary"}},{"kind":"Field","name":{"kind":"Name","value":"welfare_money"}},{"kind":"Field","name":{"kind":"Name","value":"vatper"}},{"kind":"Field","name":{"kind":"Name","value":"ss_per"}},{"kind":"Field","name":{"kind":"Name","value":"vat"}},{"kind":"Field","name":{"kind":"Name","value":"social_security"}},{"kind":"Field","name":{"kind":"Name","value":"miss"}},{"kind":"Field","name":{"kind":"Name","value":"ra"}},{"kind":"Field","name":{"kind":"Name","value":"late"}},{"kind":"Field","name":{"kind":"Name","value":"other"}},{"kind":"Field","name":{"kind":"Name","value":"provident_employee"}},{"kind":"Field","name":{"kind":"Name","value":"provident_company"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"bookbank_logId"}},{"kind":"Field","name":{"kind":"Name","value":"mas_income_typeId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"mas_salary_statusId"}},{"kind":"Field","name":{"kind":"Name","value":"provident_date"}},{"kind":"Field","name":{"kind":"Name","value":"pro_employee"}},{"kind":"Field","name":{"kind":"Name","value":"pro_company"}},{"kind":"Field","name":{"kind":"Name","value":"mas_all_collectId"}},{"kind":"Field","name":{"kind":"Name","value":"socialYears"}},{"kind":"Field","name":{"kind":"Name","value":"vatYears"}},{"kind":"Field","name":{"kind":"Name","value":"incomeYears"}},{"kind":"Field","name":{"kind":"Name","value":"mas_bankId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookbank_log"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mas_bank"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bank_number"}},{"kind":"Field","name":{"kind":"Name","value":"base_salary"}}]}}]}}]}}]} as unknown as DocumentNode<SalaryQuery, SalaryQueryVariables>;
export const CreateandupdatesalaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Createandupdatesalary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"salaryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Createandupdatesalary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateandupdatesalaryMutation, CreateandupdatesalaryMutationVariables>;
export const CreateAndUpdateExpenseComDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAndUpdateExpenseCom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpenseComInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CreateAndUpdateExpenseCom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateAndUpdateExpenseComMutation, CreateAndUpdateExpenseComMutationVariables>;
export const CreateandupdatebookbankDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Createandupdatebookbank"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"bookbank_logInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Createandupdatebookbank"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateandupdatebookbankMutation, CreateandupdatebookbankMutationVariables>;
export const DeletebookbankDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Deletebookbank"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deletebookbankId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Deletebookbank"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deletebookbankId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeletebookbankMutation, DeletebookbankMutationVariables>;
export const Bookbank_Log_AdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Bookbank_log_admin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookbank_log_admin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"mas_bankId"}},{"kind":"Field","name":{"kind":"Name","value":"bank_number"}},{"kind":"Field","name":{"kind":"Name","value":"base_salary"}},{"kind":"Field","name":{"kind":"Name","value":"provident_com"}},{"kind":"Field","name":{"kind":"Name","value":"provident_emp"}},{"kind":"Field","name":{"kind":"Name","value":"mas_bank"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"accept_date"}}]}}]}}]} as unknown as DocumentNode<Bookbank_Log_AdminQuery, Bookbank_Log_AdminQueryVariables>;
export const Expense_CompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Expense_company"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expense_company"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vat_per"}},{"kind":"Field","name":{"kind":"Name","value":"ss_per"}},{"kind":"Field","name":{"kind":"Name","value":"mas_bank"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"check_vat"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"cal_date_salary"}}]}}]}}]} as unknown as DocumentNode<Expense_CompanyQuery, Expense_CompanyQueryVariables>;
export const Filter_Bookbank_AdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Filter_bookbank_admin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filter_bookbank_admin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bank_number"}},{"kind":"Field","name":{"kind":"Name","value":"base_salary"}},{"kind":"Field","name":{"kind":"Name","value":"mas_bank"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"provident_com"}},{"kind":"Field","name":{"kind":"Name","value":"provident_emp"}}]}}]}}]} as unknown as DocumentNode<Filter_Bookbank_AdminQuery, Filter_Bookbank_AdminQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position2Id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position3Id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"position2Id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position2Id"}}},{"kind":"Argument","name":{"kind":"Name","value":"position3Id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position3Id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_address"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_addressnumber"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_country"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_district"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_id"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_province"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_state"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_tel"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_zipcode"}},{"kind":"Field","name":{"kind":"Name","value":"contract_address"}},{"kind":"Field","name":{"kind":"Name","value":"contract_addressnumber"}},{"kind":"Field","name":{"kind":"Name","value":"contract_companyemail"}},{"kind":"Field","name":{"kind":"Name","value":"contract_country"}},{"kind":"Field","name":{"kind":"Name","value":"contract_district"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_th"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_th"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_en"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_en"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"relationship"}},{"kind":"Field","name":{"kind":"Name","value":"shirt_size"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_th"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_en"}},{"kind":"Field","name":{"kind":"Name","value":"social_id"}},{"kind":"Field","name":{"kind":"Name","value":"staff_status"}},{"kind":"Field","name":{"kind":"Name","value":"tel"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"staff_code"}},{"kind":"Field","name":{"kind":"Name","value":"religion"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"contract_sameCitizen"}},{"kind":"Field","name":{"kind":"Name","value":"contract_province"}},{"kind":"Field","name":{"kind":"Name","value":"contract_state"}},{"kind":"Field","name":{"kind":"Name","value":"contract_zipcode"}},{"kind":"Field","name":{"kind":"Name","value":"contract_email"}},{"kind":"Field","name":{"kind":"Name","value":"social_facebook"}},{"kind":"Field","name":{"kind":"Name","value":"social_likedin"}},{"kind":"Field","name":{"kind":"Name","value":"social_line"}},{"kind":"Field","name":{"kind":"Name","value":"social_telegram"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"blood_type"}},{"kind":"Field","name":{"kind":"Name","value":"employee_status"}},{"kind":"Field","name":{"kind":"Name","value":"start_date_work"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"Role_Company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Position_user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"CompanyId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"positionlevel1_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"positionlevel2_id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;