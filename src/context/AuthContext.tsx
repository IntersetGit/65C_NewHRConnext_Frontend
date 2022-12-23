import { createContext, ReactNode, useEffect, useState } from 'react';
import type { AuthValuesType, UserDataType } from './types';
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
    id
    email
    isOwner
    companyBranch {
      name
      company {
        name
        id
        icon
        companyCode
      }
    }
    role {
      id
      name
    }
    Position {
      access
      id
      name
    }
    profile {
      firstname
      lastname
      avatar
    }
  }
}`);

const defaultProvider: AuthValuesType = {
  user: undefined,
  loading: true,
  ability: createMongoAbility([]),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const { data: user, loading } = useQuery(GET_ME);
  const defaultAbility: any[] = [];
  const ability = createMongoAbility(
    user?.me?.Position?.access || defaultAbility,
  );

  const value = {
    user,
    loading,
    ability,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
