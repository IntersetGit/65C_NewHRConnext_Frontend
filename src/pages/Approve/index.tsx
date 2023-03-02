import { generatePath, Outlet, useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Approveroot: React.FC = () => {
  const navigate = useNavigate();
  let { companycode } = useParams();

  const onChange = (key: string) => {
    navigate(generatePath(key, { companycode }));
  };

  return (
    <>
      <Outlet />
    </>
  );
};

export default Approveroot;
