import { Layout, Menu } from 'antd';
import layoutConfig from '../../config/layoutConfig';
import logo from '../../assets/logo.png';
import icon from '../../assets/icon.png';
import {
  useNavigate,
  useLocation,
  useParams,
  generatePath,
} from 'react-router-dom';
import { routing, RoutingType } from '../../routes/routes';
import { useState } from 'react';

export type SiderbarType = {
  collapsed: boolean;
};

export type Menurendertype = {
  path: string;
  id: string;
  children: Menurendertype[];
};

export const Menurender = (el?: RoutingType[]): RoutingType[] => {
  let menu: RoutingType[] = [];
  el?.forEach((e) => {
    if (!e.hideInmenu) {
      menu.push({
        ...e,
        key: e.path,
        children: e.children ? Menurender(e.children) : undefined,
      });
    }
  });
  return menu;
};

console.log(location);

const Siderbar: React.FC<SiderbarType> = (props) => {
  const { collapsed } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { companycode } = useParams();
  const [activekey, setActivekey] = useState<string>('');
  const baseRoute = routing.find(
    (e) => e.path === layoutConfig.dashboardRoute,
  )?.children;

  const onMenuclick = (e: { key: string }) => {
    setActivekey(e.key);
    navigate(generatePath(e.key, { companycode }));
  };

  return (
    <Layout.Sider
      style={{
        position: 'fixed',
        zIndex: 3,
        userSelect: 'none',
      }}
      className="siderbar-custom"
      width={layoutConfig.siderbarWidth}
      collapsedWidth={layoutConfig.siderbarCollpasedWidth}
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <img src={collapsed ? icon : logo} className="logo" alt="logo" />
      <Menu
        //aria-current="page"
        aria
        style={{ width: '100%', position: 'relative' }}
        className="menu-custom"
        mode="inline"
        onClick={onMenuclick}
        selectedKeys={[activekey]}
        // @ts-ignore
        items={Menurender(baseRoute)}
      />
    </Layout.Sider>
  );
};

export default Siderbar;
