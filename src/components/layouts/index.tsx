import { useMutation } from '@apollo/client';
import { ReactNode, useEffect, useState } from 'react';
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

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
  const { companycode } = useParams();
  const navaigate = useNavigate();
  const location = useLocation();
  let [searchparams, setSearchparam] = useSearchParams();
  const [validateRoute, { loading: validating, error: validaterror, data }] =
    useMutation(GQL_QUERY);
  const [dataDecode, setDataDecode] = useState(null)


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
            let paramJWT = parseJwt(data?.reAccess)
            setDataDecode(paramJWT)
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
    <AuthProvider company={{ ...data?.validateRoute?.currentBranch, ...dataDecode as any }}>
      <Layouts {...props} />
    </AuthProvider>
  );
};

export default BaseLayout;
