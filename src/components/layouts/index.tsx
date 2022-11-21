import { Layout } from "antd";
import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Siderbar from "./Siderbar";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "../../styles/components/layouts.css";
import layoutConfig from "../../config/layoutConfig";

const Layouts: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout id="components-layout-demo-custom-trigger">
      <Siderbar collapsed={collapsed} />
      <Layout className="site-layout">
        <Layout.Header
          className="site-layout-background header"
          style={{
            padding: 0,
            height: layoutConfig.headerHeight,
            position: "fixed",
            width: "100%",
            zIndex: 2,
          }}
        >
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
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
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
