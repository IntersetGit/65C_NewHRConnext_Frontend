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
  Drawer,
  Checkbox,
} from 'antd';
import { GiReceiveMoney } from 'react-icons/gi';
import type { ColumnsType } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import edit from '../../../assets/Edit.png';
import Del from '../../../assets/DEL.png';
import View from '../../../assets/View.png';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useState } from 'react';

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
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
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
                  <Button>Reset</Button>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    style={{ backgroundColor: token.token.colorPrimary }}
                    htmlType="submit"
                  >
                    Search
                  </Button>
                </Form.Item>
              </Space>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item name="search" colon={false} label={'สถานะ'}>
                <Select allowClear></Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item name="search" colon={false} label={'เดือน'}>
                <Select allowClear></Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item name="search" colon={false} label={'ปี'}>
                <Select allowClear></Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card className="shadow-xl mt-4">
        <Col>
          <Row style={{ float: 'right' }}>
            <Space>
              <Button
                type="primary"
                size="middle"
                style={{
                  marginBottom: '10px',
                  backgroundColor: token.token.colorPrimary,
                }}
                onClick={showDrawer}
              >
                ตั้งค่าการคำนวณเงินเดือน
              </Button>
            </Space>
          </Row>
        </Col>
        <Table columns={columns} dataSource={data}></Table>
      </Card>

      <Drawer
        title={'ตั้งค่าการคำนวณเงินเดือน'}
        onClose={onClose}
        open={open}
        size="large"
      >
        <Form layout="horizontal" labelCol={{ span: 8 }}>
          <Row>
            <Col span={16}>
              <Form.Item label={'ธนาคาร (บริษัท)'}>
                <Select allowClear></Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={16}>
              <Form.Item label={'หักภาษี (%)'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={16}>
              <Form.Item label={'หักประกันงสังคม (%)'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={16}>
              <Form.Item label={'หักภาษีจากรายรับประเภท'}>
                <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                  <Row>
                    <Col span={8}>
                      <Checkbox value={'เงินเดือน'}>เงินเดือน</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value={'ค่าคอม'}>ค่าคอม</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value={'ค่าล่วงเวลา'}>ค่าล่วงเวลา</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value={'โบนัส'}>โบนัส</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value={'เงินพิเศษ'}>เงินพิเศษ</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value={'รายได้อื่น'}>รายได้อื่น</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button
                    type="primary"
                    style={{ backgroundColor: token.token.colorPrimary }}
                  >
                    บันทึก
                  </Button>
                  <Button onClick={onClose}>ยกเลิก</Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default Compensation;
