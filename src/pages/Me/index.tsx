import Layouts from '../../components/layouts/Layout';
import type { BaseLayoutProps } from '../../components/layouts';
import { AuthProvider } from '../../context/AuthContext';
import { Avatar, Tabs, Typography, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  HiOutlineIdentification,
  HiOutlineCog6Tooth,
  HiOutlineClipboard,
} from 'react-icons/hi2';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

const { useToken } = theme;

const MeLayout: React.FC<BaseLayoutProps> = (props) => {
  const token = useToken();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/me') navigate('/me/profile');
  }, []);

  const onChange = (key: string) => {
    navigate(key);
  };

  return (
    <Layouts {...props}>
      <div className="w-full flex justify-center items-center flex-col">
        <Typography.Title level={3}>จัดการผู้ใช้</Typography.Title>
        <Avatar
          style={{
            cursor: 'pointer',
            marginLeft: 10,
            backgroundColor: token.token.colorPrimary,
          }}
          size={60}
          shape="circle"
          icon={<UserOutlined />}
        />
        <p>
          <Typography.Text>
            {user?.me?.profile?.firstname} {user?.me?.profile?.lastname}
          </Typography.Text>
        </p>
      </div>
      <Tabs
        activeKey={location.pathname}
        centered
        onChange={onChange}
        items={[
          {
            label: (
              <span className="flex">
                <HiOutlineIdentification size={'18'} />
                โปรไฟล์
              </span>
            ),
            key: '/me/profile',
          },
          {
            label: (
              <span className="flex">
                <HiOutlineClipboard size={'18'} />
                กิจกรรม
              </span>
            ),
            key: '/me/activity',
          },
          {
            label: (
              <span className="flex">
                <HiOutlineCog6Tooth size={'18'} />
                ตั้งค่าผู้ใช้
              </span>
            ),
            key: '/me/setting',
          },
        ]}
      />
      <Outlet />
    </Layouts>
  );
};

const Mewrapper: React.FC<BaseLayoutProps> = (props) => {
  return (
    <AuthProvider>
      <MeLayout {...props} />
    </AuthProvider>
  );
};

export default Mewrapper;
