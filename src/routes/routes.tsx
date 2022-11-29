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
import BaseLayout from '../components/layouts';

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

export type RoutingType = {
  path: string;
  element: JSX.Element;
  icon?: JSX.Element;
  label?: string;
  key?: string | number;
  hideInmenu?: boolean;
  children?: RoutingType[];
};

// const Layouts = React.lazy(() => import('../components/layouts/Layout'));

export const routing: RoutingType[] = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        label: 'หน้าแรก',
        icon: <RiHome2Line />,
        element: <Home />,
      },
      {
        path: '/company',
        label: 'บริษัท',
        icon: <RiHotelLine />,
        element: <Companyroot />,
        children: [
          {
            path: '/company/location',
            label: 'ข้อมูลบริษัท',
            icon: <RiFolder2Line />,
            element: <CompanyLocation />,
          },
          {
            path: '/company/structure',
            label: 'ที่ตั้งบริษัท',
            hideInmenu: true,
            element: <CompanyStructure />,
          },
          {
            path: '/company/position',
            label: 'ที่ตั้งบริษัท',
            hideInmenu: true,
            element: <CompanyPosition />,
          },
          {
            path: '/company/holiday',
            label: 'วันหยุด',
            icon: <RiChatHistoryLine />,
            element: <CompanyLocation />,
          },
        ],
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
