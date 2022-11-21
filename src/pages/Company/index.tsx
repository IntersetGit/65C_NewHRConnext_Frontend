import { Button, Card, Tabs, Tooltip, Typography } from "antd";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";

const Companyroot: React.FC = () => {
  const navigate = useNavigate();

  const onChange = (key: string) => {
    navigate(key);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography.Title level={3}>ข้อมูลบริษัท</Typography.Title>
        <Tooltip placement="leftTop" title={"Tour"}>
          <Button icon={<InfoCircleOutlined />} />
        </Tooltip>
      </div>
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
            key: "/company/position",
            children: <Outlet />,
          },
        ]}
      />
    </>
  );
};

export default Companyroot;
