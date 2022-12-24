import { AbilityTuple, MongoAbility, MongoQuery, Subject } from '@casl/ability';
import { AnyObject } from '@casl/ability/dist/types/types';
import { MeQuery } from '../__generated__/graphql';

export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type LoginParams = {
  email: string;
  password: string;
};

export type UserDataType = {
  id: number;
  role: string;
  email: string;
  fullName: string;
  username: string;
  password: string;
  avatar?: string | null;
};

export type CompanyBranchType = {
  branchId?: string | null | undefined;
  branchName?: string | null | undefined;
  companyId?: string | null | undefined;
  companyName?: string | null | undefined;
};

export type AuthValuesType = {
  loading: boolean;
  user: MeQuery | undefined;
  setCompany: (value: CompanyBranchType | undefined) => void;
  company: CompanyBranchType | undefined;
  ability: MongoAbility<AbilityTuple<string, Subject>, MongoQuery<AnyObject>>;
};
