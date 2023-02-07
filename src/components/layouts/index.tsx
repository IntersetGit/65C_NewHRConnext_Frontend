import { useMutation } from '@apollo/client';
import { ReactNode, useEffect } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import { gql } from '../../__generated__';
import LoadingSpinner from '../loading-spinner';
import Layouts from './Layout';
import { Cookies } from 'react-cookie';
const cookie = new Cookies();

export type BaseLayoutProps = {
  noSidebar?: boolean;
  noCollapse?: boolean;
  py?: number;
  px?: number;
  children?: ReactNode;
};

const GQL_QUERY = gql(
  `
  mutation ValidateRoute($args: String!, $branch: String) {
    validateRoute(args: $args, branch: $branch) {
      acess
      currentBranch {
        branchId
        branchName
        companyId
        companyName
      }
      path
      reAccess
      reFresh
    }
  }
  `,
);

const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
  const { companycode } = useParams();
  const navaigate = useNavigate();
  const location = useLocation();
  let [searchparams, setSearchparam] = useSearchParams();
  const [validateRoute, { loading: validating, error: validaterror, data }] =
    useMutation(GQL_QUERY);
  useEffect(() => {
    if (companycode) {
      const branch = searchparams.get('branch');
      const c_branch = cookie.get('branch');
      if (branch) {
        cookie.set('branch', branch, {
          sameSite: 'lax',
          path: '/',
        });
        setSearchparam('');
      }
      validateRoute({
        variables: { args: companycode, branch: c_branch },
      })
        .then((res) => {
          const data = res.data?.validateRoute;
          if (!data?.acess) {
            navaigate('/overview');
          }

          if (data?.acess && data?.reAccess) {
            cookie.set('access', data?.reAccess, {
              sameSite: 'lax',
              path: '/',
            });
          }

          if (data?.acess && data?.reFresh) {
            cookie.set('refresh_token', data?.reFresh, {
              sameSite: 'lax',
              path: '/',
            });
          }
        })
        .catch(() => {
          navaigate('/overview');
        });
    } else {
      navaigate('/overview');
    }
  }, [companycode, searchparams.get('branch')]);

  if (validating) return null;

  return (
    <AuthProvider company={data?.validateRoute?.currentBranch}>
      <Layouts {...props} />
    </AuthProvider>
  );
};

export default BaseLayout;
