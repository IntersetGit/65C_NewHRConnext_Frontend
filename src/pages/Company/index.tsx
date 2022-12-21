import { Button, Card, Tabs, Tooltip, Typography } from 'antd';
import { generatePath, Outlet, useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';

const Companyroot: React.FC = () => {
  const navigate = useNavigate();
  let { companycode } = useParams();

  const onChange = (key: string) => {
    navigate(generatePath(key, { companycode }));
  };

  return (
    <>
      {/* <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography.Title level={3}>ข้อมูลบริษัท</Typography.Title>
        <Tooltip placement="leftTop" title={'Tour'}>
          <Button icon={<InfoCircleOutlined />} />
        </Tooltip>
      </div> */}
      <Tabs
        defaultActiveKey="/:companycode/company/location"
        className='right-tab'
        onChange={onChange}
        items={[
          {
            label: `ข้อมูลของฉัน`,
            key: '/:companycode/userprofile',
          },
          {
            label: `งาน`,
            key: '/:companycode/userprofile/work',
          },
          {
            label: `เงินเดือน`,
            key: '/:companycode/userprofile/salary',
          },
          {
            label: `การลา`,
            key: '/:companycode/userprofile/vacation',
          },
          {
            label: `ฝึกอบรม`,
            key: '/:companycode/userprofile/training',
          },
          {
            label: `Asset`,
            key: '/:companycode/userprofile/asset',
          },
          {
            label: `ไฟล์`,
            key: '/:companycode/userprofile/file',
           
          },
          {
            label: `สมัครสินเชื่อ`,
            key: '/:companycode/userprofile/credit',       
          },
        ]}
      />
       <Outlet />
    </>
  );
};

export default Companyroot;
