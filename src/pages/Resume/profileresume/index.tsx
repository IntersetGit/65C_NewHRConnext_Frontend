import {
  Card,
  Divider,
  Form,
  Row,
  Col,
  DatePicker,
  Input,
  Button,
  Table,
  Dropdown,
  Menu,
  theme,
} from 'antd';
import { RxBackpack } from 'react-icons/rx';
import type { ColumnsType } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';

const { useToken } = theme;
interface DataType {
  key: number;
  date: string;
  position: string;
  role: string;
  manager: string;
}

interface DataTypeProject {
  key: number;
  date: string;
  project: string;
  role: string;
  manager: string;
}

const ProfileResume: React.FC = () => {
  const token = useToken();
  const menuItems = [
    {
      key: 'edit',
      label: 'แก้ไข',
    },
    {
      key: 'view',
      label: 'ดูข้อมูล',
    },
    {
      key: 'delete',
      label: 'ลบข้อมูล',
    },
  ];

  const onMenuClick = (event: any, record: any) => {
    const { key } = event;
    if (key === 'edit') {
    } else if (key === 'view') {
    } else if (key === 'delete') {
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'วันที่มีผล',
      key: 'date',
      dataIndex: 'date',
      align: 'center',
    },
    {
      title: 'ตำแหน่ง',
      key: 'position',
      dataIndex: 'position',
      align: 'center',
    },
    {
      title: 'หน้าที่',
      key: 'role',
      dataIndex: 'role',
      align: 'center',
    },
    {
      title: 'หัวหน้างาน',
      key: 'manager',
      dataIndex: 'manager',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'Action',
      align: 'center',
      render: (_: any, record: any) => (
        <Dropdown.Button
          icon={<MoreOutlined />}
          type="text"
          overlay={
            <Menu
              items={menuItems}
              onClick={(e: any) => onMenuClick(e, record)}
            />
          }
        ></Dropdown.Button>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: 1,
      date: '01/ม.ค./2555',
      position: 'System Analyst',
      role: 'System analysis and design',
      manager: 'นายธีวินทร์ นิ่มนวล',
    },
    {
      key: 2,
      date: '01/ส.ค./2555',
      position: 'System Analyst',
      role: 'System analysis and design',
      manager: 'นายสำราญ รอดอยู่',
    },
    {
      key: 3,
      date: '01/ม.ค./2559',
      position: 'Project Manager',
      role: 'Project Manager and Control',
      manager: 'นายสำราญ รอดอยู่',
    },
  ];

  const columnsProject: ColumnsType<DataTypeProject> = [
    {
      title: 'วันที่มีผล',
      key: 'date',
      dataIndex: 'date',
      align: 'center',
    },
    {
      title: 'โครงการ',
      key: 'project',
      dataIndex: 'project',
      align: 'center',
    },
    {
      title: 'หน้าที่',
      key: 'role',
      dataIndex: 'role',
      align: 'center',
    },
    {
      title: 'หัวหน้างาน',
      key: 'manager',
      dataIndex: 'manager',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'Action',
      align: 'center',
      render: (_: any, record: any) => (
        <Dropdown.Button
          icon={<MoreOutlined />}
          type="text"
          overlay={
            <Menu
              items={menuItems}
              onClick={(e: any) => onMenuClick(e, record)}
            />
          }
        ></Dropdown.Button>
      ),
    },
  ];

  const dataProject: DataTypeProject[] = [
    {
      key: 1,
      date: '01/ม.ค./2555',
      project: '60M-PPT2',
      role: 'SA',
      manager: 'นายธีวินทร์ นิ่มนวล',
    },
    {
      key: 2,
      date: '01/ส.ค./2555',
      project: '61A-DGA1',
      role: 'SA',
      manager: 'นายสำราญ รอดอยู่',
    },
    {
      key: 3,
      date: '01/ม.ค./2559',
      project: '61S-RTA2',
      role: 'PM',
      manager: 'นายสำราญ รอดอยู่',
    },
  ];
  return (
    <>
      <div className="flex text-3xl ml-2 pt-4">
        <RxBackpack />
        <div className="ml-2 text-xl">ประวัติการทำงาน</div>
      </div>
      <Divider style={{ backgroundColor: token.token.colorPrimary }} />

      <Card className="shadow-xl">
        <div
          className="font-bold text-lg mb-4"
          style={{ color: token.token.colorPrimary }}
        >
          สภานภาพพนักงาน
        </div>
        <Form>
          <Row gutter={16}>
            <Col>
              <Form.Item label={'วันเดือนปี ที่เริ่มงาน'}>
                <DatePicker />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item label={'หมายเลขประจำตัวผู้เสียภาษี'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card className="shadow-xl mt-4">
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div
            className="font-bold text-lg mb-4"
            style={{ color: token.token.colorPrimary }}
          >
            ตำแหน่ง / หน้าที่
          </div>
          <Button>+ เพิ่มตำแหน่ง/หน้าที่</Button>
        </div>

        <Table columns={columns} dataSource={data}></Table>
      </Card>

      <Card className="shadow-xl mt-4">
        <div
          className="font-bold text-lg mb-4"
          style={{ color: token.token.colorPrimary }}
        >
          Project
        </div>
        <Table columns={columnsProject} dataSource={dataProject}></Table>
      </Card>
    </>
  );
};

export default ProfileResume;
