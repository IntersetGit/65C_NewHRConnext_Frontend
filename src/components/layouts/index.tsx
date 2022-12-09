import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import { gql } from '../../__generated__';
import LoadingSpinner from '../loading-spinner';
import Layouts from './Layout';

export type BaseLayoutProps = {
  noSidebar?: boolean;
  noCollapse?: boolean;
  py?: number;
  px?: number;
};

const GQL_QUERY = gql(
  `
  mutation ValidateRoute($args: String!) {
    validateRoute(args: $args) {
      acess
      path
    }
  }
  `,
);

const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
  const { companycode } = useParams();
  const navaigate = useNavigate();
  const [validateRoute, { loading: validating, error: validaterror }] =
    useMutation(GQL_QUERY);

  useEffect(() => {
    console.log(companycode);
    if (!companycode) {
      navaigate('/overview');
    } else {
      validateRoute({ variables: { args: companycode } })
        .then((res) => {
          if (!res.data?.validateRoute?.acess) {
            navaigate('/overview');
          }
        })
        .catch(() => {
          navaigate('/overview');
        });
    }
  }, []);

  if (validating) return <LoadingSpinner loadingtext="Validating route..." />;

  return (
    <AuthProvider>
      <Layouts {...props} />
    </AuthProvider>
  );
};

export default BaseLayout;
