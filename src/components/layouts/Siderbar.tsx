import { Layout, Menu } from 'antd';
import layoutConfig from '../../config/layoutConfig';
import logo from '../../assets/HRConnext.png';
import icon from '../../assets/HR logo.png';
import {
  useNavigate,
  useLocation,
  useParams,
  generatePath,
} from 'react-router-dom';
import { routing, RoutingType } from '../../routes/routes';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export type SiderbarType = {
  collapsed: boolean;
  setCollapsed(x: boolean): void;
};

export type Menurendertype = {
  path: string;
  id: string;
  children: Menurendertype[];
};

const Siderbar: React.FC<SiderbarType> = (props) => {
  const { collapsed } = props;
  const { ability } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { companycode } = useParams();
  const [activekey, setActivekey] = useState<string>('');
  const [obp, setObp] = useState<boolean>(false);
  const baseRoute = routing.find(
    (e) => e.path === layoutConfig.dashboardRoute,
  )?.children;

  useEffect(() => {
    const el = document.getElementById('scrollbar-menu');
    const scrollFunction = () => {
      if (el) {
        console.log('scroll');
        el.classList.add('on-scrollbar');
      }
    };
    el?.addEventListener('scroll', scrollFunction);
    return () => {
      el?.removeEventListener('scroll', scrollFunction);
    };
  }, []);

  const onMenuclick = (e: { key: string }) => {
    setActivekey(e.key);
    navigate(generatePath(e.key, { companycode }));
  };

  const Menurender = (el?: RoutingType[]): RoutingType[] => {
    let menu: any[] = [];
    el?.forEach((e) => {
      /** Check if how many can access */
      if (e.children) {
        let f = e.children?.filter((__e) =>
          __e.requireRole
            ? ability.can(
                __e.requireRole?.action as string,
                __e.requireRole?.subject as string,
              )
            : true,
        );
        if (f.length <= 0) return;
      }
      /** Can render menu */
      const canRender = e.requireRole
        ? ability.can(e.requireRole?.action, e.requireRole?.subject)
        : true;

      if (!e.hideInmenu && canRender) {
        menu.push({
          icon: e.icon,
          label: e.label,
          key: e.path,
          children:
            e.children && !e.forcerendermenu
              ? Menurender(e.children)
              : undefined,
        });
      }
    });
    return menu;
  };

  return (
    <>
      <Layout.Sider
        breakpoint={'lg'}
        style={{
          position: 'fixed',
          zIndex: 3,
          userSelect: 'none',
          overflowY: 'scroll',
        }}
        id="scrollbar-menu"
        className="siderbar-custom"
        width={layoutConfig.siderbarWidth}
        collapsedWidth={layoutConfig.siderbarCollpasedWidth}
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        onBreakpoint={(broken) => {
          props.setCollapsed(broken);
          setObp(broken);
        }}
      >
        <img src={collapsed ? icon : logo} className="logo" alt="logo" />
        <Menu
          //aria-current="page"
          style={{ width: '100%', position: 'relative' }}
          className="menu-custom"
          mode="inline"
          onClick={onMenuclick}
          selectedKeys={[activekey]}
          // @ts-ignore
          items={Menurender(baseRoute)}
        />
      </Layout.Sider>
    </>
  );
};

export default Siderbar;
