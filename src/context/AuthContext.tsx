import { createContext, ReactNode, useEffect, useState } from 'react';
import type { AuthValuesType, UserDataType } from './types';
import { Cookies } from 'react-cookie';
import { gql } from '../__generated__';
import { useQuery } from '@apollo/client';
import { MeQuery } from '../__generated__/graphql';

const cookie = new Cookies();

const GET_ME = gql(`
query Me {
  me {
    id
    email
    profile {
      firstname
      lastname
      id
      avatar
    }
    role {
      id
      name
    }
    company {
      id
      name
    }
  }
}`);

const defaultProvider: AuthValuesType = {
  user: undefined,
  loading: true,
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const { data: user, loading, error, refetch } = useQuery(GET_ME);

  const value = {
    user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
