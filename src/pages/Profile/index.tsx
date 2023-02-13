import { Tabs, theme } from 'antd';
import { generatePath, Outlet, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const { useToken } = theme;

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const token = useToken();
  const { user } = useAuth();
  let { companycode } = useParams();

  const onChange = (key: string) => {
    navigate(generatePath(key, { companycode }));
  };

  return (
    <>
      {/* <Tabs
        defaultActiveKey="/:companycode/profile"
        className="right-tab"
        onChange={onChange}
        items={[
          {
            label: `ข้อมูลของฉัน`,
            key: `/:companycode/profile`,
          },
          {
            label: `ตำแหน่งงานของฉัน`,
            key: `/:companycode/profile/position`,
          },
          {
            label: `ข้อมูลบริษัทของฉัน`,
            key: '/:companycode/profile/company',
          },
          {
            label: `การลา`,
            key: '/:companycode/profile/approve',
          },
        ]}
      /> */}
      <Outlet />
    </>
  );
};

export default Profile;
