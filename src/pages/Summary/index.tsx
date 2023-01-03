import { Tabs } from 'antd';
import { generatePath, Outlet, useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Summaryroot: React.FC = () => {
  const navigate = useNavigate();
  let { companycode } = useParams();

  const onChange = (key: string) => {
    navigate(generatePath(key, { companycode }));
  };

  return (
    <>
      <Tabs
        defaultActiveKey="/:companycode/summary"
        className="right-tab"
        onChange={onChange}
        items={[
          {
            label: `จัดการค่าตอบแทน`,
            key: '/:companycode/summary',
          },
          {
            label: `ข้อมูลค่าตอบแทน`,
            key: '/:companycode/summary/remuneration',
          },
        ]}
      />
      <Outlet />
    </>
  );
};

export default Summaryroot;
