import { theme } from 'antd';
import { generatePath, Outlet, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const { useToken } = theme;

const PersonalLeave: React.FC = () => {
  const navigate = useNavigate();
  const token = useToken();
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

export default PersonalLeave;
