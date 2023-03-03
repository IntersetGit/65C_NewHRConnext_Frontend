import { MoreOutlined } from '@ant-design/icons';
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
  Segmented,
  Descriptions,
  Avatar,
  List,
} from 'antd';
import { RiTimer2Fill } from 'react-icons/ri';
import edit from '../../../assets/Edit.png';
import Del from '../../../assets/DEL.png';
import View from '../../../assets/View.png';
import { useNavigate } from 'react-router-dom';

const { useToken } = theme;

const ClockInClockOut = () => {
  const token = useToken();
  const [formSearch] = Form.useForm();
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
      navigate(`clocklog`, {
        state: record,
      });
    } else if (key === 'view') {
    } else if (key === 'delete') {
    }
  };

  const columns: any = [
    {
      title: 'ลำดับ',
      align: 'center',
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      title: 'ชื่อ-สกุล',
      key: 'profile',
      dataIndex: 'profile',
      align: 'center',
      render: (txt) => txt.firstname_th + ' ' + txt.lastname_th,
    },
    {
      title: 'ตำแหน่ง',
      key: 'Positon_user',
      align: 'center',
      render: (record) => {
        return record?.Position_user.mas_positionlevel3;
      },
    },
    {
      title: 'แผนก',
      key: 'Positon_user',
      align: 'center',
      render: (record) => {
        return record?.Position_user?.mas_positionlevel2;
      },
    },
    {
      title: 'เบอร์โทร',
      key: 'profile',
      dataIndex: 'profile',
      align: 'center',
      render: (record) => record.tel,
    },
    {
      title: 'หัวหน้างาน',
      key: 'header',
      dataIndex: 'header',
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

  const data = [
    {
      key: '1',
      date: '02/2023',
      profile: {
        firstname_th: 'นาย สมใจ',
        lastname_th: 'พิมพ์สวย',
        tel: '084 222 1477',
      },
      Position_user: {
        mas_positionlevel3: 'โปรแกรมเมอร์',
        mas_positionlevel2: 'พัฒนาซอฟต์แวร์',
      },
      header: 'นาย สมชาย ใจดี',
    },
    {
      key: '2',
      date: '02/2023',
      profile: {
        firstname_th: 'นางสาว สมพร',
        lastname_th: 'บัวชมพู',
        tel: '084 222 1456',
      },
      Position_user: {
        mas_positionlevel3: 'เจ้าหน้าที่การเงิน',
        mas_positionlevel2: 'บัญชี',
      },
      header: 'นาย สมชาย ใจดี',
    },
    {
      key: '3',
      date: '02/2023',
      profile: {
        firstname_th: 'นาย สมศักดิ์',
        lastname_th: 'พิมพ์สวย',
        tel: '086 555 4444',
      },
      Position_user: {
        mas_positionlevel3: 'นักวิเคราะห์และออกแบบระบบ',
        mas_positionlevel2: 'พัฒนาซอฟต์แวร์',
      },
      header: 'นาย สมชาย ใจดี',
    },
  ];

  return (
    <>
      <div className="flex text-2xl ml-2 pt-4">
        <RiTimer2Fill />
        <div className="ml-2 text-lg">การลงเวลางาน</div>
      </div>

      <Divider style={{ backgroundColor: token.token.colorPrimary }} />
      <Card className="shadow-xl">
        <Form form={formSearch} size="middle">
          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name="name" colon={false} label={'ชื่อพนักงาน'}>
                <Input allowClear></Input>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name="position2Id" colon={false} label={'แผนก'}>
                <Select
                  //   options={mas_positionlevel2}
                  //   onChange={onChange}
                  allowClear
                ></Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item name="position3Id" colon={false} label={'ตำแหน่ง'}>
                <Select
                  //   options={maspositionlevel3 ? maspositionlevel3 : []}
                  allowClear
                ></Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Space style={{ float: 'right' }}>
                <Form.Item>
                  <Button
                    onClick={() => {
                      //   formSearch.resetFields();
                      //   refetch(formSearch.getFieldsValue());
                    }}
                  >
                    Reset
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    style={{ backgroundColor: token.token.colorPrimary }}
                    // loading={loading}
                    htmlType="submit"
                    onClick={() => {
                      //   refetch(formSearch.getFieldsValue());
                    }}
                  >
                    Search
                  </Button>
                </Form.Item>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card className="shadow-xl mt-4">
        <Row>
          <Col span={24}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Table
                columns={columns}
                dataSource={data}
                scroll={{ x: 1500 }}
              ></Table>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ClockInClockOut;