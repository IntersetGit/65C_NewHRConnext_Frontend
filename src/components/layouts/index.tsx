import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import Layouts from './Layout';

export type BaseLayoutProps = {
  noSidebar?: boolean;
  noCollapse?: boolean;
  py?: number;
  px?: number;
};

const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
  const { companycode } = useParams();
  const navaigate = useNavigate();

  useEffect(() => {
    if (!companycode) {
      navaigate('/overview');
    }
  }, []);

  return (
    <AuthProvider>
      <Layouts {...props} />
    </AuthProvider>
  );
};

export default BaseLayout;
