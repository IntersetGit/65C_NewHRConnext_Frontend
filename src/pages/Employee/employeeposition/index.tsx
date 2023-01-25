import { AntDesignOutlined, MoreOutlined } from '@ant-design/icons';
import {
  Avatar,
  Tabs,
  Divider,
  theme,
  Row,
  Col,
  DatePicker,
  Card,
  Input,
  Table,
  Dropdown,
  Drawer,
  Button,
  Form,
  Select,
  Space,
} from 'antd';
import { ImProfile } from 'react-icons/im';
import {
  generatePath,
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';
import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';
import edit from '../../../assets/Edit.png';
import Del from '../../../assets/DEL.png';
import View from '../../../assets/View.png';
import { useState } from 'react';

const { useToken } = theme;

interface DataType {
  key: string;
  date: Date;
  position: string;
  role: string;
  boss: string;
}

const PositionEmployee: React.FC = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  let { companycode } = useParams();
  const location = useLocation();
  let propsstate = location.state as any;
  const token = useToken();
  const [drawerType, setDrawerType] = useState(1);

  console.log(propsstate);

  const onChange = (key: string) => {
    navigate(generatePath(key, { companycode }), { state: propsstate });
  };

  const [open, setOpen] = useState(false);

  const showDrawer = (type: any) => {
    setOpen(true);
    setDrawerType(type);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (value: any) => {
    console.log(value);
    setOpen(false);
  };

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
      showDrawer(2);
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
      dataIndex: 'positon',
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
      key: 'boss',
      dataIndex: 'boss',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'Action',
      align: 'center',
      render: (record) => (
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

  return (
    <>
      <Tabs
        defaultActiveKey={`/:companycode/employee/positionemployee`}
        className="right-tab"
        onChange={onChange}
        items={[
          {
            label: `ข้อมูลพนักงาน`,
            key: `/:companycode/employee/useremployee?id=${propsstate?.id}`,
          },
          {
            label: `ตำแหน่งงาน`,
            key: '/:companycode/employee/positionemployee',
          },
        ]}
      />

      <div className="flex text-3xl ml-2 pt-4">
        <ImProfile />
        <div className="ml-2 text-lg">ตำแหน่งงาน</div>
      </div>
      <Divider style={{ backgroundColor: token.token.colorPrimary }} />

      <Card className="shadow-xl">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div>
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={<AntDesignOutlined />}
              ></Avatar>
            </div>
          </Col>

          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div className="text-lg font-bold">
              <u className="text-blue-800">
                {propsstate?.prefix_th} {propsstate?.firstname_th}{' '}
                {propsstate?.lastname_th}
              </u>
              <div className="mt-4">{propsstate?.firstname_en}</div>
            </div>
          </Col>
        </Row>

        <Row gutter={16} className="py-10">
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <div className="py-3">วันเดือนปีที่ทำงาน</div>
            <DatePicker
              style={{ width: '100%' }}
              size="large"
              defaultValue={moment(propsstate?.dob) as any}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <div className="py-3">หมายเลขประจำตัวผู้เสียภาษี</div>
            <Input defaultValue={propsstate?.citizen_id} size="large" />
          </Col>
        </Row>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          ตำแหน่ง / หน้าที่
          <Button
            type="primary"
            style={{
              backgroundColor: token.token.colorPrimary,
            }}
            onClick={() => {
              showDrawer(1);
            }}
          >
            + Update ตำแหน่งงานปัจจุบัน
          </Button>
        </div>

        <Table className="py-4" columns={columns}></Table>
      </Card>

      <Drawer
        title={'เพิ่มตำแหน่งงาน'}
        size="large"
        open={open}
        onClose={onClose}
      >
        <Form form={form} layout={'vertical'} size="large" onFinish={onFinish}>
          <Row>
            <Col span={12}>
              <Form.Item label={'วันที่มีผล'}>
                <DatePicker style={{ width: '100%' }}></DatePicker>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label={'ฝ่าย'}>
                <Select />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label={'แผนก'}>
                <Select />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label={'ตำแหน่ง'}>
                <Select />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label={'หน้าที่'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label={'หัวหน้างาน'}>
                <Select />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ float: 'right', paddingBottom: '20px' }}>
            <Col>
              <Space>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: token.token.colorPrimary,
                  }}
                  htmlType="submit"
                >
                  ตกลง
                </Button>
                <Button onClick={onClose}>ยกเลิก</Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default PositionEmployee;
