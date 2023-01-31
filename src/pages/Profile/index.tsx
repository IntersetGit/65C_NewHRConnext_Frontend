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
  console.log(user?.me?.profile);

  const onChange = (key: string) => {
    navigate(generatePath(key, { companycode }));
  };

  return (
    <>
      <Tabs
        defaultActiveKey="/:companycode/profile"
        className="right-tab"
        onChange={onChange}
        items={[
          {
            label: `ข้อมูลของฉัน`,
            key: `/:companycode/profile`,
          },
          //   {
          //     label: `ข้อมูลบริษัท`,
          //     key: `/:companycode/profile?${user?.me?.id}`,
          //   },
          //   {
          //     label: `เงินเดือน`,
          //     key: '/:companycode/summary',
          //   },
          //   {
          //     label: `การลา`,
          //     key: '/:companycode/company/CompanyStructure',
          //   },
        ]}
      />
      <Outlet />
    </>
  );
};

export default Profile;
