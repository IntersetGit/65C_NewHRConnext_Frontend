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
      <div
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
      </div>
      <Tabs
        defaultActiveKey="/:companycode/company/location"
        onChange={onChange}
        items={[
          {
            label: `ที่ตัังบริษัท`,
            key: '/:companycode/company/location',
            children: <Outlet />,
          },
          {
            label: `โครงสร้างบริษัท`,
            key: '/:companycode/company/structure',
            children: <Outlet />,
          },
          {
            label: `ตำแหน่งบริษัท`,
            key: '/:companycode/company/position',
            children: <Outlet />,
          },
        ]}
      />
    </>
  );
};

export default Companyroot;
