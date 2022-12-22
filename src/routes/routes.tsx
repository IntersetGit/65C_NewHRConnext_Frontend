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
const Userprofileroot = React.lazy(() => import('../pages/Userprofile'))
const ProfileUser = React.lazy(() => import('../pages/Userprofile/profile'))
const Work = React.lazy(() => import('../pages/Userprofile/work'))
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const Overview = React.lazy(() => import('../pages/Overview'));
const DataCompany = React.lazy(() => import('../pages/Company/data_company'));
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
  forcerenderMenu? : boolean
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
      {
        path: ':companycode/userprofile',
        label: 'ข้อมูลของฉัน',
        icon: <RiContactsLine size={'18'} />,
        forcerenderMenu : true,
        element: <Userprofileroot />,
        children: [
          {
            path: '/:companycode/userprofile',
            element: <ProfileUser />,
          },
          {
            path: '/:companycode/userprofile/work',
            element: <Work />,
          },
          {
            path: '/:companycode/userprofile/salary',
            hideInmenu: true,
            element: <CompanyStructure />,
          },
          {
            path: '/:companycode/userprofile/vacation',
            hideInmenu: true,
            element: <CompanyPosition />,
          },
          {
            path: '/:companycode/userprofile/training',
            element: <CompanyLocation />,
          },
          {
            path: '/:companycode/userprofile/asset',
            element: <CompanyLocation />,
          },
          {
            path: '/:companycode/userprofile/file',
            element: <CompanyLocation />,
          },
          {
            path: '/:companycode/userprofile/credit',
            element: <CompanyLocation />,
          },
        ],
      },
      {
        path: '/:companycode/company',
        label: 'ข้อมูลบริษัท',
        icon: <RiHotelLine size={'18'} />,
        element: <DataCompany />,
      },
      {
        path: '/:companycode/employee',
        label: 'พนักงาน',
        icon: <RiUserLine size={'18'} />,
        element: <></>
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
