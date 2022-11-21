import { Tabs, Typography } from "antd";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Companyroot: React.FC = () => {
  const navigate = useNavigate();

  const onChange = (key: string) => {
    navigate(key);
  };

  return (
    <>
      <Typography.Title level={3}>ข้อมูลบริษัท</Typography.Title>
      <Tabs
        defaultActiveKey="/company/location"
        onChange={onChange}
        items={[
          {
            label: `ที่ตัังบริษัท`,
            key: "/company/location",
            children: <Outlet />,
          },
          {
            label: `โครงสร้างบริษัท`,
            key: "/company/structure",
            children: <Outlet />,
          },
          {
            label: `ตำแหน่งบริษัท`,
            key: "/company/holiday",
            children: <Outlet />,
          },
        ]}
      />
    </>
  );
};

export default Companyroot;
