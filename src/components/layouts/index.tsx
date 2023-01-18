import { useMutation } from '@apollo/client';
import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
  mutation ValidateRoute($args: String!) {
    validateRoute(args: $args) {
      path
      currentBranch {
        branchId
        branchName
        companyId
        companyName
      }
      acess
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
  const [validateRoute, { loading: validating, error: validaterror, data }] =
    useMutation(GQL_QUERY);

  useEffect(() => {
    if (!companycode) {
      navaigate('/overview');
    } else {
      validateRoute({ variables: { args: companycode } })
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
    }
  }, []);

  if (validating) return <LoadingSpinner loadingtext="Validating route..." />;

  return (
    <AuthProvider company={data?.validateRoute?.currentBranch}>
      <Layouts {...props} />
    </AuthProvider>
  );
};

export default BaseLayout;
