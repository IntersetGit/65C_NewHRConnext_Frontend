import { createContext, ReactNode, useEffect, useState } from 'react';
import type { AuthValuesType, CompanyBranchType, UserDataType } from './types';
import { Cookies } from 'react-cookie';
import { gql } from '../__generated__';
import { useQuery } from '@apollo/client';
import { MeQuery } from '../__generated__/graphql';
import { AbilityContext } from './AbilityContext';
import { createMongoAbility } from '@casl/ability';
import {
  NavigateOptions,
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import ErrorBoundary from '../Error/BaseError';
import { routing, RoutingType } from '../routes/routes';
import ErrorPage from '../Error/ErrorPage';

const cookie = new Cookies();

export type RoleAndPermission = {
  action: string;
  subject: string;
};

export type PageRoleAndPermissionType = {
  add?: RoleAndPermission;
  edit?: RoleAndPermission;
  delete?: RoleAndPermission;
  read?: RoleAndPermission;
};

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
  companycode: undefined,
  companyNavigate: () => null,
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
  company?: CompanyBranchType | undefined | null;
};

const AuthProvider = ({ children, company: companydata }: Props) => {
  const { data: user, loading } = useQuery(GET_ME);
  const [permission, setPermisstion] = useState<
    { action: string; subject: string }[]
  >([]);
  const ability = createMongoAbility(permission);
  const [isError, setError] = useState<boolean>(false);

  // useEffect(() => {
  //   /** Compare routing. */
  //   const array: {
  //     path: string;
  //     requireRole?: { action: string; subject: string };
  //   }[] = [];
  //   (async () => {
  //     const PAIR_ROUTES = (data: RoutingType[]) => {
  //       data.forEach((e, i) => {
  //         array.push({
  //           path: generatePath(e.path, { companycode }),
  //           requireRole: e.requireRole,
  //         });
  //         if (e.children) {
  //           PAIR_ROUTES(e.children);
  //         }
  //       });
  //     };
  //     PAIR_ROUTES(routing);
  //     console.log(array);
  //   })();
  //   setRoutinglist(array);
  // }, []);

  useEffect(() => {
    const array: {
      path: string;
      requireRole?: { action: string; subject: string };
    }[] = [];
    (async () => {
      const PAIR_ROUTES = (data: RoutingType[]) => {
        data.forEach((e, i) => {
          const path = generatePath(e.path, { companycode });
          //if (array.find((e) => e.path === path)) return;
          array.push({
            path: path,
            requireRole: e.requireRole,
          });
          if (e.children) {
            PAIR_ROUTES(e.children);
          }
        });
      };
      PAIR_ROUTES(routing);
      //console.log(array);
    })();
    const F = array?.find((e) => e.path === location.pathname);
    console.log(F, location.pathname);
    if (F && permission.length >= 1) {
      if (F.requireRole) {
        if (!ability.can(F.requireRole.action, F.requireRole.subject)) {
          setError(true);
        } else {
          setError(false);
        }
      }
    }
  }, [permission, location.pathname]);

  useEffect(() => {
    let rawData: { action: string; subject: string }[] = [];
    user?.me?.Role_Company?.access?.forEach((e, i) => {
      if (typeof e.action === 'string') {
        rawData.push({ action: e.action, subject: e.subject });
      } else {
        e.action?.forEach((_e) => {
          rawData.push({ action: _e, subject: e.subject });
        });
      }
    });
    setPermisstion(rawData);
  }, [loading]);
  const [company, setCompany] = useState<CompanyBranchType | undefined>({
    branchId: companydata?.branchId,
    branchName: companydata?.branchName,
    companyId: companydata?.companyId,
    companyName: companydata?.companyName,
  });
  const navigate = useNavigate();

  const { companycode } = useParams();

  const companyNavigate = (
    path: string,
    opts?: NavigateOptions | undefined,
    param?: string | '',
  ) => {
    if (!companycode) {
      console.error('Company code not found.');
    }
    return navigate(generatePath(path, { companycode }) + param, opts);
  };

  const value = {
    user,
    loading,
    ability,
    setCompany,
    company,
    companyNavigate,
    companycode,
  };

  // if (isError && permission.length >= 1)
  // return <ErrorPage title="Access denied" />;
  return (
    <AuthContext.Provider value={value}>
      {isError ? <ErrorPage title="Access denied" /> : children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
