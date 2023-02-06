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
import edit from '../../../../assets/Edit.png';
import Del from '../../../../assets/DEL.png';
import View from '../../../../assets/View.png';
import { gql } from '../../../../__generated__';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

const { useToken } = theme;

interface DataType {
  key: string;
  date: Date;
  position: string;
  role: string;
  boss: string;
}

const GET_ME = gql(`
query Me {
  me {
    Role_Company {
      access
      id
      name
      __typename
    }
    companyBranch {
      companyId
      company {
        companyCode
        icon
        id
        name
        __typename
      }
      createdAt
      id
      name
      __typename
    }
    email
    id
    isOwner
    profile {
      id
      bio
      firstname_th
      lastname_th
      firstname_en
      lastname_en
      avatar
      dob
      age
      relationship
      shirt_size
      prefix_th
      prefix_en
      citizen_id
      social_id
      staff_status
      tel
      address
      gender
      staff_code
      religion
      userId
      citizen_addressnumber
      citizen_address
      citizen_country
      citizen_province
      citizen_district
      citizen_state
      citizen_zipcode
      citizen_tel
      contract_sameCitizen
      contract_addressnumber
      contract_address
      contract_country
      contract_province
      contract_district
      contract_state
      contract_zipcode
      contract_email
      contract_companyemail
      social_facebook
      social_likedin
      social_line
      social_telegram
      nickname
      blood_type
      employee_status
      start_date_work
      __typename
    }
  }
}`);

const ProfilePosition: React.FC = (props) => {
  const [form] = Form.useForm();
  const token = useToken();
  const [drawerType, setDrawerType] = useState(1);
  const [open, setOpen] = useState(false);
  const { data: user, refetch } = useQuery<any>(GET_ME);
  console.log(user);

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
                src={user?.me?.profile?.avatar}
              ></Avatar>
            </div>
          </Col>

          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div className="text-lg font-bold">
              <u className="text-blue-800">
                {user?.me?.profile?.prefix_th} {user?.me?.profile?.firstname_th}{' '}
                {user?.me?.profile?.lastname_th}
              </u>
              <div className="mt-4">{user?.me?.profile?.firstname_en}</div>
            </div>
          </Col>
        </Row>

        <Row gutter={16} className="py-10">
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <div className="py-3">วันเดือนปีที่เริ่มงาน</div>
            <DatePicker
              style={{ width: '100%' }}
              size="large"
              defaultValue={moment(user?.me?.profile?.dob) as any}
              disabled
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <div className="py-3">หมายเลขประจำตัวผู้เสียภาษี</div>
            <Input
              defaultValue={user?.me?.profile?.citizen_id}
              size="large"
              disabled
            />
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
        <Form form={form} layout={'vertical'} size="middle" onFinish={onFinish}>
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

export default ProfilePosition;
