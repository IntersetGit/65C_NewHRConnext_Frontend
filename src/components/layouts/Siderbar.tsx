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

const Siderbar: React.FC<SiderbarType> = (props) => {
  const { collapsed } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { companycode } = useParams();
  const baseRoute = routing.find(
    (e) => e.path === layoutConfig.dashboardRoute,
  )?.children;

  const onMenuclick = (e: { key: string }) => {
    navigate(generatePath(e.key, { companycode }));
  };

  return (
    <Layout.Sider
      style={{
        position: 'fixed',
        zIndex: 3,
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
        style={{ width: '100%', position: 'relative' }}
        className="menu-custom"
        mode="inline"
        onClick={onMenuclick}
        selectedKeys={[location.pathname]}
        // @ts-ignore
        items={Menurender(baseRoute)}
      />
    </Layout.Sider>
  );
};

export default Siderbar;
