import { useQuery } from "@tanstack/react-query";
import { Avatar, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { UserOutlined } from "@ant-design/icons";
import { getCompanylocation } from "../../../service/faker/Company/location";
import type { getCompanylocationType } from "../../../service/faker/Company/location";


const columns: ColumnsType<getCompanylocationType> = [
  {
    title: "โลโก้บริษัท",
    dataIndex: "company_logo",
    key : 'company_logo',
    width : '100px',
    align : 'center',
    render : (url : string) => {
        return <Avatar shape="square" size="default" src={url} icon={<UserOutlined />} />
    }
  },
  {
    title: "รหัสบริษัท",
    dataIndex: "company_code",
    key : 'company_code',
    defaultSortOrder: "descend",
    // sorter: (a, b) => a.company_code - b.company_code,
    width : '200px'
  },
  {
    title: "ชื่อบริษัท",
    key : 'company_name',
    dataIndex: "company_name",
  },
  {
    title: "ที่อยู่",
    key : 'company_saddress',
    dataIndex: "company_saddress",
  },
  {
    title: "สถานะ",
    key : 'company_status',
    dataIndex: "company_status",
  },
];


const onChange: TableProps<getCompanylocationType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const CompanyLocation: React.FC = () => {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['getCompanyLocation'],
        queryFn: getCompanylocation,
      })
  return (
    <>
      <Table<getCompanylocationType> loading={isLoading} columns={columns} dataSource={data} onChange={onChange} />
    </>
  );
};

export default CompanyLocation;
