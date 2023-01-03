import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  theme,
  Dropdown,
  Menu,
} from 'antd';
import { GiReceiveMoney } from 'react-icons/gi';
import type { ColumnsType } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { useToken } = theme;

interface DataType {
  key: number;
  name: string;
  number: number;
  position: string;
  department: string;
  tel: string;
  email: string;
}

const Compensation: React.FC = () => {
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
      title: 'ลำดับ',
      key: 'number',
      dataIndex: 'number',
      align: 'center',
    },
    {
      title: 'ชื่อ-สกุล',
      key: 'name',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: 'ตำแหน่ง',
      key: 'position',
      dataIndex: 'position',
      align: 'center',
    },
    {
      title: 'แผนก/ฝ่าย',
      key: 'department',
      dataIndex: 'department',
      align: 'center',
    },
    {
      title: 'เบอร์โทร',
      key: 'tel',
      dataIndex: 'tel',
      align: 'center',
    },
    {
      title: 'e-mail',
      key: 'email',
      dataIndex: 'email',
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
      number: 1,
      name: 'นาย สมใจ พิมพ์สวย',
      position: 'โปรแกรมเมอร์',
      department: 'พัฒนาซอฟต์แวร์',
      tel: '086 555 4444',
      email: 'utai.p@gmail.com',
    },
    {
      key: 2,
      number: 2,
      name: 'นางสาว สมพร บัวชมพู',
      position: 'เจ้าหน้าที่การเงิน',
      department: 'บัญชี',
      tel: '084 222 1456',
      email: 'umaporn.b@gmail.com',
    },
    {
      key: 3,
      number: 3,
      name: 'นาย สุรพงษ์ พิมพ์สวย',
      position: 'โปรแกรมเมอร์',
      department: 'พัฒนาซอฟต์แวร์',
      tel: '065 555 4444',
      email: 'utai.p@gmail.com',
    },
    {
      key: 4,
      number: 4,
      name: 'นาย สมศักดิ์ พิมพ์สวย',
      position: 'นักวิเคราห์และออกแบบระบบ',
      department: 'พัฒนาซอฟต์แวร์',
      tel: '065 555 4444',
      email: 'utai.p@gmail.com',
    },
    {
      key: 5,
      number: 5,
      name: 'นาย สมบูรณ์ พิมพ์สวย',
      position: 'โปรแกรมเมอร์',
      department: 'พัฒนาซอฟต์แวร์',
      tel: '065 555 4444',
      email: 'utai.p@gmail.com',
    },
  ];

  return (
    <>
      <div className="flex text-3xl ml-2 pt-4">
        <GiReceiveMoney />
        <div className="ml-2 text-xl">
          ค่าตอบแทน ( เงินเดือน ค่าล่วงเวลา ค่าบริหาร เบี้ยขยัน และ อื่น ๆ )
        </div>
      </div>

      <Divider />
      <Card className="shadow-xl">
        <Form size="middle">
          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name="search" colon={false} label={'ชื่อพนักงาน'}>
                <Input allowClear></Input>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name="search" colon={false} label={'แผนก/ฝ่าย'}>
                <Select allowClear></Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item name="search" colon={false} label={'ตำแหน่ง'}>
                <Select allowClear></Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Space style={{ float: 'right' }}>
                <Form.Item>
                  <Button>Reset</Button>
                </Form.Item>

                <Form.Item>
                  <Button htmlType="submit">Search</Button>
                </Form.Item>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card className="shadow-xl mt-4">
        <Col>
          <Space>
            <Button
              type="primary"
              size="middle"
              style={{
                marginBottom: '10px',
                backgroundColor: token.token.colorPrimary,
              }}
              onClick={() => {}}
            >
              + จัดการข้อมูล
            </Button>
          </Space>
        </Col>
        <Table columns={columns} dataSource={data}></Table>
      </Card>
    </>
  );
};

export default Compensation;
