import {
  createBrowserRouter,
  LoaderFunctionArgs,
  redirect,
} from 'react-router-dom';
import React from 'react';
/**
 * ?Layout
 *
 */

const BaseLayout = React.lazy(() => import('../components/layouts'));

/**
 * ? Components
 */
const CompanyLocation = React.lazy(() => import('../pages/Company/location'));
const Home = React.lazy(() => import('../pages/Home'));
const Companyroot = React.lazy(() => import('../pages/Company'));
const CompanyStructure = React.lazy(() => import('../pages/Company/structure'));
const CompanyPosition = React.lazy(() => import('../pages/Company/position'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const Overview = React.lazy(() => import('../pages/Overview'));
const Error500 = React.lazy(() => import('../pages/500'));

/**
 * ?Profile setting
 */
const Mewrapper = React.lazy(() => import('../pages/Me'));
const Profile = React.lazy(() => import('../pages/Me/profile'));
const Activity = React.lazy(() => import('../pages/Me/activity'));
const Usersetting = React.lazy(() => import('../pages/Me/setting'));

/**
 * ?Import icons
 */
import {
  RiHotelLine,
  RiFolder2Line,
  RiChatHistoryLine,
  RiHome2Line,
} from 'react-icons/ri';

export type RoutingType = {
  path: string;
  element: JSX.Element;
  icon?: JSX.Element;
  label?: string;
  key?: string | number;
  hideInmenu?: boolean;
  shouldrevalidate?: any;
  children?: RoutingType[];
  loader?: (v: LoaderFunctionArgs) => any;
};

export const routing: RoutingType[] = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: ':companycode/',
        label: 'ภาพรวม',
        icon: <RiHome2Line size={'18'} />,
        element: <Home />,
      },
      {
        path: '/:companycode/company',
        label: 'บริษัท',
        icon: <RiHotelLine size={'18'} />,
        element: <Companyroot />,
        children: [
          {
            path: '/:companycode/company/location',
            label: 'ข้อมูลบริษัท',
            icon: <RiFolder2Line size={'18'} />,
            element: <CompanyLocation />,
          },
          {
            path: '/:companycode/company/structure',
            label: 'ที่ตั้งบริษัท',
            hideInmenu: true,
            element: <CompanyStructure />,
          },
          {
            path: '/:companycode/company/position',
            label: 'ที่ตั้งบริษัท',
            hideInmenu: true,
            element: <CompanyPosition />,
          },
          {
            path: '/:companycode/company/holiday',
            label: 'วันหยุด',
            icon: <RiChatHistoryLine size={'18'} />,
            element: <CompanyLocation />,
          },
        ],
      },
    ],
  },
  {
    path: '/me',
    element: <Mewrapper noSidebar={true} noCollapse />,
    children: [
      {
        path: '/me/profile',
        element: <Profile />,
      },
      {
        path: '/me/activity',
        element: <Activity />,
      },
      {
        path: '/me/setting',
        element: <Usersetting />,
      },
    ],
  },
  {
    path: '/overview',
    element: <BaseLayout noSidebar={true} noCollapse />,
    children: [
      {
        path: '/overview',
        element: <Overview />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/500',
    element: <Error500 />,
  },
];

const router = createBrowserRouter(routing);
export default router;

createBrowserRouter([{ loader: ({}) => {} }]);
