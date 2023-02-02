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
  name?: Maybe<Scalars['String']>;
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
  contract_sameCitizen: Scalars['Boolean'];
  contract_state?: InputMaybe<Scalars['String']>;
  contract_zipcode?: InputMaybe<Scalars['String']>;
  dob?: InputMaybe<Scalars['Date']>;
  email: Scalars['String'];
  employee_status?: InputMaybe<Scalars['String']>;
  firstname_en?: InputMaybe<Scalars['String']>;
  firstname_th?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  lastname_en?: InputMaybe<Scalars['String']>;
  lastname_th?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  prefix_en?: InputMaybe<Scalars['String']>;
  prefix_th?: InputMaybe<Scalars['String']>;
  relationship?: InputMaybe<Scalars['String']>;
  religion?: InputMaybe<Scalars['String']>;
  role_company?: InputMaybe<Scalars['String']>;
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
  CompanyId?: InputMaybe<Scalars['ID']>;
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

export type District = {
  __typename?: 'District';
  amphoe?: Maybe<Array<Maybe<Amphoe>>>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type GetCompanyAccessType = {
  __typename?: 'GetCompanyAccessType';
  name?: Maybe<Scalars['String']>;
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
  CreatedPosition?: Maybe<CreatepositionResponseType>;
  EditPosition?: Maybe<CreatepositionResponseType>;
  createAccount?: Maybe<CreateCompanyResponseType>;
  createAccountUser?: Maybe<CreateUserResponseType>;
  createAndUpdateComBarance?: Maybe<CreateComapnyBranchResponseType>;
  createAndUpdateHolidayDate?: Maybe<CreateHolidayDateResponseType>;
  createHolidayYear?: Maybe<CreateHolidayYearResponseType>;
  createRoleCompany?: Maybe<CreateRoleCompanyResponseType>;
  createdposition_user?: Maybe<CreatepositionResponseType>;
  deleteAccountUser?: Maybe<DeleteAccountUserResponseType>;
  deleteComBarance?: Maybe<DeleteComapnyBranchResponseType>;
  deleteHolidayDate?: Maybe<DeleteHolidayDateResponseType>;
  deleteHolidayYear?: Maybe<DeleteHolidayYearResponseType>;
  deleteRoleCompany?: Maybe<DeleteRoleCompanyRespnsetType>;
  login?: Maybe<LoginResponse>;
  refreshToken?: Maybe<RefreshtokenResponseType>;
  updateRoleCompanyMangement?: Maybe<CreateRoleCompanyResponseType>;
  validateRoute?: Maybe<ValidateRoute>;
};


export type MutationCreatedPositionArgs = {
  data?: InputMaybe<Array<CreatedAndUpdatePosition>>;
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
  data: CreateHolidayDate;
};


export type MutationCreateHolidayYearArgs = {
  data?: InputMaybe<Array<CreateHolidayYears>>;
};


export type MutationCreateRoleCompanyArgs = {
  data: CreateRoleCompanyGroup;
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
  id?: Maybe<Scalars['ID']>;
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
  GetHolidayDate?: Maybe<Array<Maybe<Holiday_Date>>>;
  company?: Maybe<ResponseCompany>;
  getAllcompany?: Maybe<Array<Maybe<CompanyBranch>>>;
  getMasPositon?: Maybe<Array<Maybe<Mas_Positionlevel1>>>;
  getProvince?: Maybe<Array<Maybe<Province>>>;
  getcompanyRole?: Maybe<Array<Maybe<Role_Company>>>;
  getownCompany?: Maybe<GetOwncompanytype>;
  getpositionMe?: Maybe<Array<Maybe<GetPositionUser>>>;
  getposition_user?: Maybe<Array<Maybe<GetPositionUser>>>;
  me?: Maybe<Me>;
  users?: Maybe<Array<Maybe<User>>>;
  verifyCompanycode?: Maybe<Scalars['Boolean']>;
};


export type QueryCompanyArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryGetAllcompanyArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryGetcompanyRoleArgs = {
  role_name?: InputMaybe<Scalars['String']>;
};


export type QueryGetposition_UserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersArgs = {
  userid?: InputMaybe<Scalars['String']>;
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
  name?: Maybe<Scalars['String']>;
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

export type UpdateRoleCompanyMangementType = {
  access: Array<Scalars['JSON']>;
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  RoleCompanyID?: Maybe<Scalars['String']>;
  Role_Company?: Maybe<Role_Company>;
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
};

export type ValidateRoute = {
  __typename?: 'ValidateRoute';
  acess?: Maybe<Scalars['Boolean']>;
  currentBranch?: Maybe<ResponseBranchValidateRouteType>;
  path?: Maybe<Scalars['String']>;
  reAccess?: Maybe<Scalars['String']>;
  reFresh?: Maybe<Scalars['String']>;
};

export type CreateCompanyBranch = {
  address?: InputMaybe<Scalars['String']>;
  address_2?: InputMaybe<Scalars['String']>;
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
  name?: InputMaybe<Scalars['String']>;
  registeredamount?: InputMaybe<Scalars['String']>;
  social_facebook?: InputMaybe<Scalars['String']>;
  social_instragram?: InputMaybe<Scalars['String']>;
  social_likedin?: InputMaybe<Scalars['String']>;
  social_line?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  sub_company_type?: InputMaybe<Scalars['String']>;
  tel?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  website?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type CreateRoleCompanyGroup = {
  access?: InputMaybe<Scalars['JSON']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  status: Scalars['Int'];
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

export type Headderdata = {
  __typename?: 'headderdata';
  headderId?: Maybe<Scalars['String']>;
  headder_data?: Maybe<Profile>;
};

export type Holiday_Date = {
  __typename?: 'holiday_date';
  Company?: Maybe<Array<Maybe<Company>>>;
  CompanyId?: Maybe<Scalars['String']>;
  day?: Maybe<Scalars['Int']>;
  holiday_name?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  month?: Maybe<Scalars['Int']>;
  yaer?: Maybe<Scalars['Int']>;
};

export type Holiday_Years = {
  __typename?: 'holiday_years';
  day?: Maybe<Scalars['Int']>;
  holiday_name?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  month?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
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


export type CompanyQuery = { __typename?: 'Query', company?: { __typename?: 'ResponseCompany', userlimit?: number | null, name?: string | null, _count?: { __typename?: 'CountBranch', branch?: number | null } | null, branch?: Array<{ __typename?: 'ResponseCompany_Branch', id: string, name?: string | null, address?: string | null, address_2?: string | null, city?: string | null, state?: string | null, zip?: string | null, country?: string | null, tel?: string | null, fax?: string | null, website?: string | null, lat?: string | null, lng?: string | null, email?: string | null, email_2?: string | null, company_type?: string | null, sub_company_type?: string | null, registeredamount?: string | null, social_facebook?: string | null, social_likedin?: string | null, social_instragram?: string | null, social_line?: string | null, createdAt?: any | null, updatedAt?: any | null, _count?: { __typename?: 'CountInsideBranch', users?: number | null } | null } | null> | null } | null };

export type CreatedPositionMutationVariables = Exact<{
  data?: InputMaybe<Array<CreatedAndUpdatePosition> | CreatedAndUpdatePosition>;
}>;


export type CreatedPositionMutation = { __typename?: 'Mutation', CreatedPosition?: { __typename?: 'CreatepositionResponseType', message?: string | null, status?: boolean | null } | null };

export type EditPositionMutationVariables = Exact<{
  data?: InputMaybe<Array<CreatedAndUpdatePosition> | CreatedAndUpdatePosition>;
}>;


export type EditPositionMutation = { __typename?: 'Mutation', EditPosition?: { __typename?: 'CreatepositionResponseType', message?: string | null, status?: boolean | null } | null };

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

export type FetchcompanySelectQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchcompanySelectQuery = { __typename?: 'Query', company?: { __typename?: 'ResponseCompany', name?: string | null, branch?: Array<{ __typename?: 'ResponseCompany_Branch', id: string, name?: string | null, address?: string | null, _count?: { __typename?: 'CountInsideBranch', users?: number | null } | null } | null> | null } | null };

export type GetownCompanyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetownCompanyQuery = { __typename?: 'Query', getownCompany?: { __typename?: 'GetOwncompanytype', redirect?: boolean | null, isOwner?: boolean | null, company?: { __typename?: 'OwnCompanyType', companyCode?: string | null, icon?: string | null, id?: string | null, name?: string | null } | null, companies?: Array<{ __typename?: 'OwnCompanyType', companyCode?: string | null, icon?: string | null, id?: string | null, name?: string | null } | null> | null } | null };

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

export type GetMasPositonQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMasPositonQuery = { __typename?: 'Query', getMasPositon?: Array<{ __typename?: 'mas_positionlevel1', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null, CompanyId?: string | null, mas_positionlevel2?: Array<{ __typename?: 'mas_positionlevel2', type?: string | null, code?: string | null, name?: string | null, level?: number | null, id: string, mas_positionlevel3?: Array<{ __typename?: 'mas_positionlevel3', id: string, name?: string | null, level?: number | null, code?: string | null, type?: string | null } | null> | null } | null> | null, Position_user?: Array<{ __typename?: 'Position_user', id?: string | null, user_id?: string | null, position1_id?: string | null, position2_id?: string | null, position3_id?: string | null, role?: string | null, headderId?: string | null, date?: any | null } | null> | null } | null> | null };

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

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, email: string, profile?: { __typename?: 'Profile', address?: string | null, age?: string | null, avatar?: string | null, bio?: string | null, citizen_address?: string | null, citizen_addressnumber?: string | null, citizen_country?: string | null, citizen_district?: string | null, citizen_id?: string | null, citizen_province?: string | null, citizen_state?: string | null, citizen_tel?: string | null, citizen_zipcode?: string | null, contract_address?: string | null, contract_addressnumber?: string | null, contract_companyemail?: string | null, contract_country?: string | null, contract_district?: string | null, id: string, firstname_th?: string | null, lastname_th?: string | null, firstname_en?: string | null, lastname_en?: string | null, dob?: any | null, relationship?: string | null, shirt_size?: string | null, prefix_th?: string | null, prefix_en?: string | null, social_id?: string | null, staff_status?: string | null, tel?: string | null, gender?: string | null, staff_code?: string | null, religion?: string | null, userId?: string | null, contract_sameCitizen?: boolean | null, contract_province?: string | null, contract_state?: string | null, contract_zipcode?: string | null, contract_email?: string | null, social_facebook?: string | null, social_likedin?: string | null, social_line?: string | null, social_telegram?: string | null, nickname?: string | null, blood_type?: string | null, employee_status?: string | null, start_date_work?: any | null, user?: { __typename?: 'User', email: string, password: string } | null } | null, Role_Company?: { __typename?: 'Role_Company', id: string, name?: string | null } | null } | null> | null };


export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const ValidateRouteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ValidateRoute"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"args"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateRoute"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"Variable","name":{"kind":"Name","value":"args"}}},{"kind":"Argument","name":{"kind":"Name","value":"branch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branch"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acess"}},{"kind":"Field","name":{"kind":"Name","value":"currentBranch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"branchId"}},{"kind":"Field","name":{"kind":"Name","value":"branchName"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"reAccess"}},{"kind":"Field","name":{"kind":"Name","value":"reFresh"}}]}}]}}]} as unknown as DocumentNode<ValidateRouteMutation, ValidateRouteMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Role_Company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companyBranch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyCode"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_th"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_th"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_en"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_en"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"relationship"}},{"kind":"Field","name":{"kind":"Name","value":"shirt_size"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_th"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_en"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_id"}},{"kind":"Field","name":{"kind":"Name","value":"social_id"}},{"kind":"Field","name":{"kind":"Name","value":"staff_status"}},{"kind":"Field","name":{"kind":"Name","value":"tel"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"staff_code"}},{"kind":"Field","name":{"kind":"Name","value":"religion"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_addressnumber"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_address"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_country"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_province"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_district"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_state"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_zipcode"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_tel"}},{"kind":"Field","name":{"kind":"Name","value":"contract_sameCitizen"}},{"kind":"Field","name":{"kind":"Name","value":"contract_addressnumber"}},{"kind":"Field","name":{"kind":"Name","value":"contract_address"}},{"kind":"Field","name":{"kind":"Name","value":"contract_country"}},{"kind":"Field","name":{"kind":"Name","value":"contract_province"}},{"kind":"Field","name":{"kind":"Name","value":"contract_district"}},{"kind":"Field","name":{"kind":"Name","value":"contract_state"}},{"kind":"Field","name":{"kind":"Name","value":"contract_zipcode"}},{"kind":"Field","name":{"kind":"Name","value":"contract_email"}},{"kind":"Field","name":{"kind":"Name","value":"contract_companyemail"}},{"kind":"Field","name":{"kind":"Name","value":"social_facebook"}},{"kind":"Field","name":{"kind":"Name","value":"social_likedin"}},{"kind":"Field","name":{"kind":"Name","value":"social_line"}},{"kind":"Field","name":{"kind":"Name","value":"social_telegram"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"blood_type"}},{"kind":"Field","name":{"kind":"Name","value":"employee_status"}},{"kind":"Field","name":{"kind":"Name","value":"start_date_work"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const CompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"branch"}}]}},{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"address_2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"tel"}},{"kind":"Field","name":{"kind":"Name","value":"fax"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_2"}},{"kind":"Field","name":{"kind":"Name","value":"company_type"}},{"kind":"Field","name":{"kind":"Name","value":"sub_company_type"}},{"kind":"Field","name":{"kind":"Name","value":"registeredamount"}},{"kind":"Field","name":{"kind":"Name","value":"social_facebook"}},{"kind":"Field","name":{"kind":"Name","value":"social_likedin"}},{"kind":"Field","name":{"kind":"Name","value":"social_instragram"}},{"kind":"Field","name":{"kind":"Name","value":"social_line"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userlimit"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CompanyQuery, CompanyQueryVariables>;
export const CreatedPositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatedPosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatedAndUpdatePosition"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CreatedPosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreatedPositionMutation, CreatedPositionMutationVariables>;
export const EditPositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditPosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatedAndUpdatePosition"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EditPosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<EditPositionMutation, EditPositionMutationVariables>;
export const CreateAccountUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAccountUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAccountUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccountUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateAccountUserMutation, CreateAccountUserMutationVariables>;
export const DeleteAccountUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAccountUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteAccountUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAccountUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteAccountUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeleteAccountUserMutation, DeleteAccountUserMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"createRoleCompanyGroup"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoleCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const DeleteRoleCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRoleCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteRoleCompanyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRoleCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteRoleCompanyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeleteRoleCompanyMutation, DeleteRoleCompanyMutationVariables>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAccountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyCompanycode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyname"}}}]}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const FetchcompanySelectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchcompanySelect"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]}}]} as unknown as DocumentNode<FetchcompanySelectQuery, FetchcompanySelectQueryVariables>;
export const GetownCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetownCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getownCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"redirect"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyCode"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyCode"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetownCompanyQuery, GetownCompanyQueryVariables>;
export const CreateAndUpdateComBaranceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAndUpdateComBarance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"createCompanyBranch"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAndUpdateComBarance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateAndUpdateComBaranceMutation, CreateAndUpdateComBaranceMutationVariables>;
export const DeleteComBaranceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComBarance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteComBaranceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComBarance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteComBaranceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeleteComBaranceMutation, DeleteComBaranceMutationVariables>;
export const GetHoliDayYearDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHoliDayYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetHoliDayYear"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"holiday_name"}}]}}]}}]} as unknown as DocumentNode<GetHoliDayYearQuery, GetHoliDayYearQueryVariables>;
export const GetMasPositonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMasPositon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMasPositon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"mas_positionlevel3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"CompanyId"}},{"kind":"Field","name":{"kind":"Name","value":"Position_user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"position1_id"}},{"kind":"Field","name":{"kind":"Name","value":"position2_id"}},{"kind":"Field","name":{"kind":"Name","value":"position3_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"headderId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]} as unknown as DocumentNode<GetMasPositonQuery, GetMasPositonQueryVariables>;
export const GetProvinceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProvince"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProvince"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"district"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amphoe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"zipcode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetProvinceQuery, GetProvinceQueryVariables>;
export const GetcompanyRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetcompanyRole"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getcompanyRole"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetcompanyRoleQuery, GetcompanyRoleQueryVariables>;
export const GetcompanyRoleManagementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetcompanyRoleManagement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getcompanyRole"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetcompanyRoleManagementQuery, GetcompanyRoleManagementQueryVariables>;
export const UpdateRoleCompanyManagementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateRoleCompanyManagement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRoleCompanyMangementType"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoleCompanyMangement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateRoleCompanyManagementMutation, UpdateRoleCompanyManagementMutationVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_address"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_addressnumber"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_country"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_district"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_id"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_province"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_state"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_tel"}},{"kind":"Field","name":{"kind":"Name","value":"citizen_zipcode"}},{"kind":"Field","name":{"kind":"Name","value":"contract_address"}},{"kind":"Field","name":{"kind":"Name","value":"contract_addressnumber"}},{"kind":"Field","name":{"kind":"Name","value":"contract_companyemail"}},{"kind":"Field","name":{"kind":"Name","value":"contract_country"}},{"kind":"Field","name":{"kind":"Name","value":"contract_district"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_th"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_th"}},{"kind":"Field","name":{"kind":"Name","value":"firstname_en"}},{"kind":"Field","name":{"kind":"Name","value":"lastname_en"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"relationship"}},{"kind":"Field","name":{"kind":"Name","value":"shirt_size"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_th"}},{"kind":"Field","name":{"kind":"Name","value":"prefix_en"}},{"kind":"Field","name":{"kind":"Name","value":"social_id"}},{"kind":"Field","name":{"kind":"Name","value":"staff_status"}},{"kind":"Field","name":{"kind":"Name","value":"tel"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"staff_code"}},{"kind":"Field","name":{"kind":"Name","value":"religion"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"contract_sameCitizen"}},{"kind":"Field","name":{"kind":"Name","value":"contract_province"}},{"kind":"Field","name":{"kind":"Name","value":"contract_state"}},{"kind":"Field","name":{"kind":"Name","value":"contract_zipcode"}},{"kind":"Field","name":{"kind":"Name","value":"contract_email"}},{"kind":"Field","name":{"kind":"Name","value":"social_facebook"}},{"kind":"Field","name":{"kind":"Name","value":"social_likedin"}},{"kind":"Field","name":{"kind":"Name","value":"social_line"}},{"kind":"Field","name":{"kind":"Name","value":"social_telegram"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"blood_type"}},{"kind":"Field","name":{"kind":"Name","value":"employee_status"}},{"kind":"Field","name":{"kind":"Name","value":"start_date_work"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"Role_Company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;