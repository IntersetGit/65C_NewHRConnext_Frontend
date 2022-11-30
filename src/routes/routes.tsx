import { createBrowserRouter } from 'react-router-dom';

/**
 * ? Components
 */
import CompanyLocation from '../pages/Company/location';
import Home from '../pages/Home';
import Companyroot from '../pages/Company';
import CompanyStructure from '../pages/Company/structure';
import CompanyPosition from '../pages/Company/position';
import Login from '../pages/Login';
import Register from '../pages/Register';
// import BaseLayout from '../components/layouts';

/**
 * ?Import icons
 */
import {
  RiHotelLine,
  RiFolder2Line,
  RiChatHistoryLine,
  RiHome2Line,
} from 'react-icons/ri';
import React from 'react';
import Overview from '../pages/Overview';

export type RoutingType = {
  path: string;
  element: JSX.Element;
  icon?: JSX.Element;
  label?: string;
  key?: string | number;
  hideInmenu?: boolean;
  shouldrevalidate?: any;
  children?: RoutingType[];
};

const BaseLayout = React.lazy(() => import('../components/layouts'));

export const routing: RoutingType[] = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: ':companycode/',
        label: 'หน้าแรก',
        icon: <RiHome2Line />,
        element: <Home />,
      },
      {
        path: '/:companycode/company',
        label: 'บริษัท',
        icon: <RiHotelLine />,
        element: <Companyroot />,
        children: [
          {
            path: '/:companycode/company/location',
            label: 'ข้อมูลบริษัท',
            icon: <RiFolder2Line />,
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
            icon: <RiChatHistoryLine />,
            element: <CompanyLocation />,
          },
        ],
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
];

const router = createBrowserRouter(routing);
export default router;
