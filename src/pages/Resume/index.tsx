import { generatePath, Outlet, useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Resumeroot: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Resumeroot;
