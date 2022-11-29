import { AuthProvider } from '../../context/AuthContext';
import Layouts from './Layout';

const BaseLayout = () => {
  return (
    <AuthProvider>
      <Layouts />
    </AuthProvider>
  );
};

export default BaseLayout;
