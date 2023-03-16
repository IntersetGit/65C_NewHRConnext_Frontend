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
const Holidays = React.lazy(() => import('../pages/Vacation'));
const HolidayCalendar = React.lazy(
  () => import('../pages/Vacation/HolidayCalendar'),
);
const Leave = React.lazy(() => import('../pages/Vacation/Leave'));
const Home = React.lazy(() => import('../pages/Home'));
const Companyroot = React.lazy(() => import('../pages/Company'));
const CompanyStructure = React.lazy(() => import('../pages/Company/structure'));
const CompanyPosition = React.lazy(() => import('../pages/Company/position'));
const ProfileUser = React.lazy(() => import('../pages/Profile'));
const ProfileEmployee = React.lazy(
  () => import('../pages/Employee/employee/component'),
);
const ProfilePosition = React.lazy(
  () => import('../pages/Employee/employeeposition/component'),
);
const ProfileCompany = React.lazy(
  () => import('../pages/Company/company/component'),
);
const ProfileApprove = React.lazy(
  () => import('../pages/PersonalLeave/approve/component'),
);
const CompensationProfile = React.lazy(
  () => import('../pages/Summary/profilecompensation/component'),
);
const ProfileRemuneration = React.lazy(
  () => import('../pages/Summary/remuneration/component'),
);
const ApproveLeave = React.lazy(() => import('../pages/Approve/approve'));
const Approveroot = React.lazy(() => import('../pages/Approve'));
const Employeeroot = React.lazy(() => import('../pages/Employee'));
const Employee = React.lazy(() => import('../pages/Employee/employee'));
const Clock = React.lazy(() => import('../pages/Clock'));
const ClockInClockOut = React.lazy(
  () => import('../pages/Clock/clockinclockout'),
);
const ClockInClockOutLog = React.lazy(() => import('../pages/Clock/clocklog'));
const PositionEmployee = React.lazy(
  () => import('../pages/Employee/employeeposition'),
);
const Summaryroot = React.lazy(() => import('../pages/Summary'));
const Compensation = React.lazy(() => import('../pages/Summary/compensation'));
const ProfileCompensation = React.lazy(
  () => import('../pages/Summary/profilecompensation'),
);
const Compensationbase = React.lazy(
  () => import('../pages/Summary/compensationbase'),
);
const Remuneration = React.lazy(() => import('../pages/Summary/remuneration'));
const Payslip = React.lazy(() => import('../pages/Summary/payslip'));
const UserEmployee = React.lazy(
  () => import('../pages/Employee/employee/useremployee'),
);
const PersonalLeave = React.lazy(() => import('../pages/PersonalLeave'));
const LeaveHoliday = React.lazy(() => import('../pages/PersonalLeave/leave'));
const Approve = React.lazy(() => import('../pages/PersonalLeave/approve'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const Comfirm = React.lazy(() => import('../pages/Confirm'));
const Overview = React.lazy(() => import('../pages/Overview'));
const MainCompany = React.lazy(() => import('../pages/Company'));
const ManageRights = React.lazy(() => import('../pages/ManageRights'));
const Rights = React.lazy(() => import('../pages/ManageRights/rights'));
const UserRights = React.lazy(() => import('../pages/ManageRights/usergroups'));
const Company = React.lazy(() => import('../pages/Company/company'));
const ManageCompanyData = React.lazy(
  () => import('../pages/Company/company/newCompany'),
);
const Error500 = React.lazy(() => import('../pages/500'));
const ResetPassword = React.lazy(() => import('../pages/ResetPassword'));
/**
 * ?Profile setting
 */
const Mewrapper = React.lazy(() => import('../pages/Me'));
const Profile = React.lazy(() => import('../pages/Me/profile'));
const Activity = React.lazy(() => import('../pages/Me/activity'));
const Usersetting = React.lazy(() => import('../pages/Me/setting'));

/**
 * ?Error
 */
const BaseError = React.lazy(() => import('../Error/BaseError'));

/**
 * ?Import icons
 */
import {
  RiHotelLine,
  RiHome2Line,
  RiUserLine,
  RiMoneyDollarCircleLine,
  RiHistoryLine,
  RiSlideshow3Line,
  RiBarChartBoxLine,
  RiLineChartLine,
  RiFile3Line,
  RiTeamLine,
  RiHandCoinLine,
  RiFileCopy2Line,
  RiCalendarCheckLine,
  RiSuitcaseLine,
  RiProfileLine,
  RiTimeLine,
} from 'react-icons/ri';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';
import { TbCalendarTime } from 'react-icons/tb';

export type RoutingType = {
  path: string;
  element: JSX.Element;
  icon?: JSX.Element;
  label?: string;
  key?: string | number;
  hideInmenu?: boolean;
  forcerendermenu?: boolean;
  shouldrevalidate?: any;
  requireRole?: { action: string; subject: string };
  children?: RoutingType[];
  errorElement?: JSX.Element;
  loader?: (v: LoaderFunctionArgs) => any;
};

export const routing: RoutingType[] = [
  {
    path: '/',
    element: <BaseLayout />,
    errorElement: <BaseError />,
    children: [
      {
        path: ':companycode/',
        label: 'Home',
        icon: <RiHome2Line size={'18'} />,
        element: <Home />,
      },
      {
        path: '/:companycode/profile',
        label: 'ข้อมูลของฉัน',
        icon: <RiProfileLine size={'18'} />,
        element: <ProfileUser />,
        children: [
          {
            label: 'ข้อมูลของฉัน',
            path: '/:companycode/profile/profile',
            element: (
              <ProfileEmployee
                role={{
                  add: { action: 'add', subject: 'manageSelfDetail' },
                  edit: { action: 'edit', subject: 'manageSelfDetail' },
                  delete: { action: 'delete', subject: 'manageSelfDetail' },
                  read: { action: 'read', subject: 'manageSelfDetail' },
                }}
              />
            ),
            requireRole: { action: 'read', subject: 'manageSelfDetail' },
          },
          {
            label: 'ตำแหน่งงานของฉัน',
            path: '/:companycode/profile/position',
            element: (
              <ProfilePosition
                role={{
                  add: { action: 'add', subject: 'manageSelfPosition' },
                  edit: { action: 'edit', subject: 'manageSelfPosition' },
                  delete: { action: 'delete', subject: 'manageSelfPosition' },
                  read: { action: 'read', subject: 'manageSelfPosition' },
                }}
              />
            ),
            requireRole: { action: 'read', subject: 'manageSelfPosition' },
          },
          // {
          //   label: 'ช้อมูลบริษัทของฉัน',
          //   path: '/:companycode/profile/company',
          //   element: <ProfileCompany />,
          //   requireRole: { action: 'read', subject: 'manageSelfPosition' },
          // },
          {
            label: 'การลา',
            path: '/:companycode/profile/approve',
            element: (
              <ProfileApprove
                role={{
                  add: { action: 'add', subject: 'manageSelfLeave' },
                  edit: { action: 'edit', subject: 'manageSelfLeave' },
                  delete: { action: 'delete', subject: 'manageSelfLeave' },
                  read: { action: 'read', subject: 'manageSelfLeave' },
                }}
              />
            ),
            requireRole: { action: 'read', subject: 'manageSelfLeave' },
          },
          {
            label: 'เงินเดือน',
            path: '/:companycode/profile/salary',
            element: <CompensationProfile />,
          },
          {
            label: 'ข้อมูลฐานเงินเดือน',
            path: '/:companycode/profile/remuneration',
            element: <ProfileRemuneration />,
          },
        ],
      },
      {
        path: '/:companycode/company',
        label: 'บริษัท',
        icon: <RiHotelLine size={'18'} />,
        forcerendermenu: true,
        element: <MainCompany />,
        children: [
          {
            path: '/:companycode/company',
            element: (
              <Company
                role={{
                  add: { action: 'add', subject: 'manageCompany' },
                  edit: { action: 'edit', subject: 'manageCompany' },
                  delete: { action: 'delete', subject: 'manageCompany' },
                  read: { action: 'read', subject: 'manageCompany' },
                }}
              />
            ),
            hideInmenu: true,
            requireRole: { action: 'read', subject: 'manageCompany' },
          },
          {
            path: '/:companycode/company/newCompany',
            element: (
              <ManageCompanyData
                role={{
                  add: { action: 'add', subject: 'manageCompanydetail' },
                  edit: { action: 'edit', subject: 'manageCompanydetail' },
                  delete: { action: 'delete', subject: 'manageCompanydetail' },
                  read: { action: 'read', subject: 'manageCompanydetail' },
                }}
              />
            ),
            hideInmenu: true,
            requireRole: { action: 'read', subject: 'manageCompanydetail' },
          },
          {
            path: '/:companycode/company/CompanyStructure',
            element: <CompanyStructure />,
            hideInmenu: true,
            requireRole: { action: 'read', subject: 'manageCompanystructure' },
          },
        ],
      },
      // {
      //   path: '/:companycode/company/manage/:method/:id',
      //   hideInmenu: true,
      //   icon: <RiHotelLine size={'18'} />,
      //   element: <ManageCompanyData />,
      // },
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
          {
            path: '/:companycode/employee/positionemployee',
            element: <PositionEmployee />,
            hideInmenu: true,
          },
        ],
      },
      {
        path: '/:companycode/clockinclockout',
        label: 'การลงเวลางาน',
        icon: <RiTimeLine size={'18'} />,
        forcerendermenu: true,
        element: <Clock />,
        children: [
          {
            path: '/:companycode/clockinclockout',
            element: <ClockInClockOut />,
            hideInmenu: true,
          },
          {
            path: '/:companycode/clockinclockout/clocklog',
            element: <ClockInClockOutLog />,
            hideInmenu: true,
          },
        ],
      },
      {
        path: '/:companycode/summary',
        label: 'เงินเดือน',
        icon: <RiMoneyDollarCircleLine size={'18'} />,
        element: <Summaryroot />,
        children: [
          {
            label: 'จัดการข้อมูลเงินเดือน',
            path: '/:companycode/summary/',
            element: <Compensation />,
          },
          {
            path: '/:companycode/summary/profileCompensation',
            element: <ProfileCompensation />,
            hideInmenu: true,
          },
          {
            label: 'จัดการข้อมูลฐานเงินเดือน',
            path: '/:companycode/summary/compensationbase',
            element: <Compensationbase />,
          },
          {
            path: '/:companycode/summary/compensationbase/remuneration',
            element: <Remuneration />,
            hideInmenu: true,
          },
          {
            path: '/:companycode/summary/profileCompensation/payslip',
            element: <Payslip />,
            hideInmenu: true,
          },
        ],
      },
      {
        path: '/:companycode/vacation',
        label: 'วันหยุด',
        forcerendermenu: true,
        icon: <TbCalendarTime size={'18'} />,
        element: <Holidays />,
        children: [
          {
            path: '/:companycode/vacation',
            element: <HolidayCalendar />,
          },
          {
            path: '/:companycode/vacation/Leave',
            element: <Leave />,
          },
        ],
      },
      {
        path: '/:companycode/personalleave',
        label: 'การลา',
        forcerendermenu: true,
        icon: <RiSuitcaseLine size={'18'} />,
        element: <PersonalLeave />,
        children: [
          {
            path: '/:companycode/personalleave',
            element: <LeaveHoliday />,
          },
          {
            path: '/:companycode/personalleave/approve',
            element: <Approve />,
          },
        ],
      },
      {
        path: '/:companycode/approveleave',
        label: 'การอนุมัติใบลา',
        forcerendermenu: true,
        icon: <RiCalendarCheckLine size={'18'} />,
        element: <Approveroot />,
        children: [
          {
            path: '/:companycode/approveleave',
            element: <ApproveLeave />,
          },
        ],
      },
      {
        path: '/:companycode/training',
        label: 'การฝึกอบรม',
        icon: <RiSlideshow3Line size={'18'} />,
        element: <CompanyLocation />,
      },

      {
        path: '/:companycode/assessment',
        label: 'การประเมิน',
        icon: <HiOutlineClipboardDocumentCheck size={'20'} />,
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
      {
        path: '/:companycode/roles',
        element: <ManageRights />,
        hideInmenu: true,
        children: [
          {
            path: '/:companycode/roles',
            element: <Rights />,
          },
          {
            path: '/:companycode/roles/usergroups',
            element: <UserRights />,
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
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/confirm',
    element: <Comfirm />,
  },
  {
    path: '/500',
    element: <Error500 />,
  },
];

const router = createBrowserRouter(routing);
export default router;

//createBrowserRouter([{ loader: ({}) => {} }]);
