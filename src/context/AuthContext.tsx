import { createContext, ReactNode, useEffect, useState } from 'react';
import type { AuthValuesType, CompanyBranchType, UserDataType } from './types';
import { Cookies } from 'react-cookie';
import { gql } from '../__generated__';
import { useQuery } from '@apollo/client';
import { MeQuery } from '../__generated__/graphql';
import { AbilityContext } from './AbilityContext';
import { createMongoAbility } from '@casl/ability';

const cookie = new Cookies();

const GET_ME = gql(`
query Me {
  me {
    Role_Company {
      access
      id
      name
      __typename
    }
    companyBranch {
      companyId
      company {
        companyCode
        icon
        id
        name
        __typename
      }
      createdAt
      id
      name
      __typename
    }
    email
    id
    isOwner
    profile {
      firstname_th
      lastname_en
      firstname_en
      lastname_th
      prefix_en
      prefix_th
      staff_code
      __typename
    }
  }
}`);

const defaultProvider: AuthValuesType = {
  user: undefined,
  loading: true,
  ability: createMongoAbility([]),
  company: undefined,
  setCompany: () => null,
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
  company?: CompanyBranchType | undefined | null;
};

const AuthProvider = ({ children, company: companydata }: Props) => {
  const { data: user, loading } = useQuery(GET_ME);
  const defaultAbility: any[] = [];
  const ability = createMongoAbility(
    user?.me?.Role_Company?.access || defaultAbility,
  );
  const [company, setCompany] = useState<CompanyBranchType | undefined>({
    branchId: companydata?.branchId,
    branchName: companydata?.branchName,
    companyId: companydata?.companyId,
    companyName: companydata?.companyName,
  });

  const value = {
    user,
    loading,
    ability,
    setCompany,
    company,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
