import { createBrowserRouter, LoaderFunctionArgs } from 'react-router-dom';
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
const Userprofileroot = React.lazy(() => import('../pages/Userprofile'));
const ProfileUser = React.lazy(() => import('../pages/Userprofile/profile'));
const Work = React.lazy(() => import('../pages/Userprofile/work'));
const Employeeroot = React.lazy(() => import('../pages/Employee'));
const Employee = React.lazy(() => import('../pages/Employee/employee'));
const UserEmployee = React.lazy(
  () => import('../pages/Employee/employee/useremployee'),
);
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const Overview = React.lazy(() => import('../pages/Overview'));
const MainCompany = React.lazy(() => import('../pages/Company/company'));
const ManageCompanyData = React.lazy(
  () => import('../pages/Company/company/newCompany'),
);
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
  RiHome2Line,
  RiUserLine,
  RiContactsLine,
  RiMoneyDollarCircleLine,
  RiHistoryLine,
  RiSlideshow3Line,
  RiBarChartBoxLine,
  RiLineChartLine,
  RiFile3Line,
  RiTeamLine,
  RiHandCoinLine,
} from 'react-icons/ri';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';

export type RoutingType = {
  path: string;
  element: JSX.Element;
  icon?: JSX.Element;
  label?: string;
  key?: string | number;
  hideInmenu?: boolean;
  forcerendermenu?: boolean;
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
        label: 'Home',
        icon: <RiHome2Line size={'18'} />,
        element: <Home />,
      },
      // {
      //   path: ':companycode/userprofile',
      //   label: 'ข้อมูลของฉัน',
      //   icon: <RiContactsLine size={'18'} />,
      //   forcerendermenu: true,
      //   element: <Userprofileroot />,
      //   children: [
      //     {
      //       path: '/:companycode/userprofile',
      //       element: <ProfileUser />,
      //     },
      //     {
      //       path: '/:companycode/userprofile/work',
      //       element: <Work />,
      //     },
      //     {
      //       path: '/:companycode/userprofile/salary',
      //       hideInmenu: true,
      //       element: <></>,
      //     },
      //     {
      //       path: '/:companycode/userprofile/vacation',
      //       hideInmenu: true,
      //       element: <></>,
      //     },
      //     {
      //       path: '/:companycode/userprofile/training',
      //       element: <></>,
      //     },
      //     {
      //       path: '/:companycode/userprofile/asset',
      //       element: <></>,
      //     },
      //     {
      //       path: '/:companycode/userprofile/file',
      //       element: <></>,
      //     },
      //     {
      //       path: '/:companycode/userprofile/credit',
      //       element: <></>,
      //     },
      //   ],
      // },
      {
        path: '/:companycode/company',
        label: 'บริษัท',
        icon: <RiHotelLine size={'18'} />,
        element: <MainCompany />,
      },
      {
        path: '/:companycode/company/manage/:method/:id',
        hideInmenu: true,
        icon: <RiHotelLine size={'18'} />,
        element: <ManageCompanyData />,
      },
      {
        path: '/:companycode/employee',
        label: 'พนักงาน',
        icon: <RiUserLine size={'18'} />,
        forcerendermenu: true,
        element: <Employeeroot />,
        children: [
          {
            path: '/:companycode/employee',
            element: <Employee />,
            hideInmenu: true,
          },
          {
            path: '/:companycode/employee/useremployee',
            element: <UserEmployee />,
            hideInmenu: true,
          },
        ],
      },
      {
        path: '/:companycode/summary',
        label: 'เงินเดือน',
        icon: <RiMoneyDollarCircleLine size={'18'} />,
        element: <CompanyLocation />,
      },
      {
        path: '/:companycode/vacation',
        label: 'การลา',
        icon: <RiHistoryLine size={'18'} />,
        element: <CompanyLocation />,
      },
      {
        path: '/:companycode/training',
        label: 'การฝึกอบรม',
        icon: <RiSlideshow3Line size={'18'} />,
        element: <></>,
      },
      {
        path: '/:companycode/assessment',
        label: 'การประเมิน',
        icon: <HiOutlineClipboardDocumentCheck size={'18'} />,
        element: <></>,
      },
      {
        path: '/:companycode/project',
        label: 'โครงการ',
        icon: <RiLineChartLine size={'18'} />,
        element: <></>,
      },
      {
        path: '/:companycode/dashboard',
        label: 'DASHBOARD',
        icon: <RiBarChartBoxLine size={'18'} />,
        element: <></>,
      },
      {
        path: '/:companycode/file',
        label: 'ไฟล์',
        icon: <RiFile3Line size={'18'} />,
        element: <></>,
      },
      {
        path: '/:companycode/activity',
        label: 'กิจกรรม',
        icon: <RiTeamLine size={'18'} />,
        element: <></>,
      },
      {
        path: '/:companycode/campaign',
        label: 'แคมเปญการเงิน',
        icon: <RiHandCoinLine size={'18'} />,
        element: <></>,
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
