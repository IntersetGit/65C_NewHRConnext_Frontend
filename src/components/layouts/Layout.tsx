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
import { BaseLayoutProps } from '.';

import icon from '../../assets/HR logo.png';

const Layouts: React.FC<BaseLayoutProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { loading, user, company, ability } = useAuth();
  const location = useLocation();
  useEffect(() => {
    nprogress.start();
    nprogress.done();
  }, [location.pathname]);
  return (
    <Layout id="components-layout-demo-custom-trigger">
      {!props.noSidebar && (
        <Siderbar setCollapsed={setCollapsed} collapsed={collapsed} />
      )}
      <Layout className="site-layout">
        <Layout.Header
          className="header header-bg"
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
          <div style={{ display: 'flex' }}>
            {!props.noCollapse &&
              React.createElement(
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
            <div
              style={{ paddingLeft: 10 }}
              className=" md:max-w-full max-w-[150px] text-center"
            >
              {!props.noSidebar ? (
                <p
                  className="break-all truncate"
                  style={{
                    margin: 0,
                    userSelect: 'none',
                    fontWeight: 'bold',
                    fontSize: '1em',
                  }}
                >
                  {company?.companyName} | {company?.branchName}
                </p>
              ) : (
                <img src={icon} width={50} />
              )}
            </div>
          </div>

          <RightNavbarContent
            company={company}
            isUserloading={loading}
            user={user}
            ability={ability}
          />
        </Layout.Header>
        <Layout.Content
          className="site-layout-background bg-gray-300"
          style={{
            height: '100vh',
            marginTop: `${layoutConfig.headerHeight}px`,
            marginLeft: `${
              !props.noSidebar
                ? collapsed
                  ? layoutConfig.siderbarCollpasedWidth
                  : layoutConfig.siderbarWidth
                : 0
            }px`,
            padding: `${props.py || 10}px ${props.px || 10}px ${
              props.py || 10
            }px ${props.px || 10}px`,
            minHeight: 280,
          }}
        >
          {props.children ? props.children : <Outlet />}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Layouts;
