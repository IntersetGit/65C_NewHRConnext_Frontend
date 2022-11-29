import { Layout, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Siderbar from './Siderbar';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import '../../styles/components/layouts.css';
import nprogress from 'nprogress';
import { useLocation } from 'react-router-dom';
import layoutConfig from '../../config/layoutConfig';
import RightNavbarContent from './RightNavberContent';
import { useAuth } from '../../hooks/useAuth';

const Layouts: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { loading, user } = useAuth();
  const location = useLocation();
  useEffect(() => {
    nprogress.start();
    nprogress.done();
  }, [location.pathname]);
  return (
    <Layout id="components-layout-demo-custom-trigger">
      <Siderbar collapsed={collapsed} />
      <Layout className="site-layout">
        <Layout.Header
          className="site-layout-background header"
          style={{
            padding: 0,
            height: layoutConfig.headerHeight,
            position: 'fixed',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            zIndex: 2,
          }}
        >
          <div>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                style: {
                  marginLeft: `${
                    collapsed
                      ? layoutConfig.siderbarCollpasedWidth
                      : layoutConfig.siderbarWidth
                  }px`,
                },
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              },
            )}
            <Typography.Text>{user?.me?.company?.name}</Typography.Text>
          </div>

          <RightNavbarContent />
        </Layout.Header>
        <Layout.Content
          className="site-layout-background"
          style={{
            marginTop: `${layoutConfig.headerHeight}px`,
            marginLeft: `${
              collapsed
                ? layoutConfig.siderbarCollpasedWidth
                : layoutConfig.siderbarWidth
            }px`,
            padding: 10,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Layouts;
