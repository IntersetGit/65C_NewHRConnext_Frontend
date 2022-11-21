import { Layout } from "antd";
import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Siderbar from "./Siderbar";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import '../../styles/components/layouts.css';
import layoutConfig from "../../config/layoutConfig";

const Layouts: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout id="components-layout-demo-custom-trigger">
      <Siderbar collapsed={collapsed} />
      <Layout className="site-layout">
        <Layout.Header
          className="site-layout-background header"
          style={{ padding: 0 , height : layoutConfig.headerHeight }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Layout.Header>
        <Layout.Content
          className="site-layout-background"
          style={{
            // margin: "10px 10px",
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
