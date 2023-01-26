import { MoreOutlined } from '@ant-design/icons';
import {
  Divider,
  theme,
  Card,
  Form,
  Row,
  Col,
  Input,
  Select,
  Button,
  Space,
  Table,
  Dropdown,
} from 'antd';
import { RiCalendar2Line } from 'react-icons/ri';
import edit from '../../../assets/Edit.png';
import Del from '../../../assets/DEL.png';
import View from '../../../assets/View.png';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

const { useToken } = theme;

const Leave: React.FC = () => {
  const token = useToken();
  const navigate = useNavigate();

  const genarateMenu = (record: any) => {
    return [
      {
        key: 'edit',
        label: 'แก้ไข',
        icon: <img style={{ width: '17px', height: '17px' }} src={edit} />,
        onClick: (e: any) => onMenuClick(e, record),
      },
      {
        key: 'view',
        label: 'ดูข้อมูล',
        icon: <img style={{ width: '17px', height: '17px' }} src={View} />,
        onClick: (e: any) => onMenuClick(e, record),
      },
      {
        key: 'delete',
        label: 'ลบข้อมูล',
        icon: <img style={{ width: '20px', height: '20px' }} src={Del} />,
        onClick: (e: any) => onMenuClick(e, record),
      },
    ];
  };

  const onMenuClick = (event: any, record: any) => {
    const { key } = event;
    if (key === 'edit') {
      navigate(`approve?id=${record.profile.id}`, {
        state: { ...record?.profile, mode: 'edit' },
      });
    } else if (key === 'view') {
    } else if (key === 'delete') {
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: 'ลำดับ',
      align: 'center',
      render: (_: any, record: any, index: any) => {
        return index + 1;
      },
    },
    {
      title: 'ชื่อ-สกุล',
      key: 'profile',
      dataIndex: 'profile',
      align: 'center',
      render: (txt: any) => txt.firstname_th + ' ' + txt.lastname_th,
    },
    {
      title: 'ตำแหน่ง',
      key: 'profile',
      dataIndex: 'profile',
      align: 'center',
      render: (record: any) => record.position,
    },
    {
      title: 'แผนก',
      key: 'profile',
      dataIndex: 'profile',
      align: 'center',
      render: (record: any) => record.department,
    },
    {
      title: 'เบอร์โทร',
      key: 'profile',
      dataIndex: 'profile',
      align: 'center',
      render: (record: any) => record.tel,
    },
    {
      title: 'หัวหน้างาน',
      key: 'profile',
      dataIndex: 'profile',
      align: 'center',
      render: (txt: any) => txt.boss_firstname_th + ' ' + txt.boss_lastname_th,
    },
    {
      title: 'Action',
      key: 'Action',
      align: 'center',
      render: (record: any) => (
        <Dropdown
          menu={{
            items: genarateMenu(record),
          }}
          arrow
        >
          <MoreOutlined />
        </Dropdown>
      ),
    },
  ];

  const data: any = [
    {
      profile: {
        id: '55b36639-fd5c-4a76-a3ed-019f76f7b559',
        firstname_th: 'ธีรดล',
        lastname_th: 'บุญมาก',
        position: 'Developer',
        department: 'IT',
        tel: '02-586-7623',
        boss_firstname_th: 'สุนิษา',
        boss_lastname_th: 'เปี่ยมจันทร์',
        leave_bussiness: '4',
        leave_vacation: '3',
        leave_sick: '5',
        leave_other: '1',
      },
    },
  ];
  return (
    <>
      <div className="flex text-2xl ml-2 pt-4">
        <RiCalendar2Line />
        <div className="ml-2 text-lg">การลา</div>
      </div>

      <Divider style={{ backgroundColor: token.token.colorPrimary }} />

      <Card className="shadow-xl">
        <Form size="middle">
          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name="search" colon={false} label={'ชื่อ'}>
                <Input allowClear></Input>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name="search" colon={false} label={'แผนก'}>
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
                  <Button
                    type="primary"
                    style={{ backgroundColor: token.token.colorPrimary }}
                  >
                    Reset
                  </Button>
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
        <Row>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Space>
              <Col>
                <Button
                  type="primary"
                  size="middle"
                  style={{
                    marginBottom: '10px',
                    backgroundColor: token.token.colorPrimary,
                  }}
                  // onClick={() => {
                  //   navigate('useremployee');
                  // }}
                >
                  + ตั้งค่าการลา
                </Button>
              </Col>
            </Space>
          </div>
        </Row>

        <Table columns={columns} dataSource={data}></Table>
      </Card>
    </>
  );
};

export default Leave;