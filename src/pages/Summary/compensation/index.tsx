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
import { useNavigate, useLocation } from 'react-router-dom';
import edit from '../../../assets/Edit.png';
import Del from '../../../assets/DEL.png';
import View from '../../../assets/View.png';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useState } from 'react';



import { gql } from '../../../__generated__';
import { useQuery, useMutation, from } from '@apollo/client';
import { FETCH_SELECT_BOOK_BANK } from '../../../service/graphql/Summary';

const { useToken } = theme;

type SettingSummaryType = {
  id: string;
  name: string;
};

interface DataType {
  key: number;
  name: string;
  number: number;
  position: string;
  department: string;
  tel: string;
  email: string;
  base_income: number;
}

const Compensation: React.FC = () => {
  const token = useToken();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<SettingSummaryType>();
  const navigate = useNavigate();
  const location = useLocation();
  let propsstate = location.state as any;

  const { data: BookBank } = useQuery(FETCH_SELECT_BOOK_BANK);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };

  const selectBookBank = BookBank?.mas_bank?.map((e: any) => {
    return {
      label: e?.name,
      value: e?.id,
    };
  });

  const genarateMenu = (record: any) => {
    return [
      {
        key: 'view',
        label: 'ดูข้อมูล',
        icon: <img style={{ width: '17px', height: '17px' }} src={View} />,
        onClick: (e: any) => onMenuClick(e, record),
      },
    ];
  };

  const onMenuClick = (event: any, record: any) => {
    const { key } = event;
    if (key === 'view') {
      navigate(`profileCompensation`);
      // navigate(`profileCompensation?id=${record.profile.id}`, {
      //   state: { ...record?.profile, mode: 'view' },
      // });
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: 'รหัสพนักงาน',
      key: 'staff_code',
      dataIndex: 'staff_code',
      align: 'center',
    },
    {
      title: 'ชื่อ-สกุล',
      key: 'name',
      dataIndex: 'name',
      align: 'center',
      render: (txt: any) =>
        txt.profile?.firstname_th + ' ' + txt.profile?.lastname_th,
    },
    {
      title: 'แผนก',
      key: 'department',
      dataIndex: 'department',
      align: 'center',
    },
    {
      title: 'ตำแหน่ง',
      key: 'mas_positionlevel2',
      dataIndex: 'mas_positionlevel2',
      align: 'center',
      render: (record: any) => {
        return <div>{record?.name}</div>;
      },
    },
    {
      title: 'ฐานเงินเดือน',
      key: 'base_income',
      dataIndex: 'base_income',
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

  return (
    <>
      <div className="flex text-3xl ml-2 pt-4">
        <GiReceiveMoney />
        <div className="ml-2 text-xl">
          ข้อมูลเงินเดือน ( ค่าล่วงเวลา ค่าบริหาร เบี้ยขยัน และ อื่น ๆ )
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

          {/* <Row gutter={16}>
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

          </Row> */}
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
        <Table rowKey={'id'} columns={columns}></Table>
      </Card>

      <Drawer
        title={'ตั้งค่าการคำนวณเงินเดือน'}
        onClose={onClose}
        open={open}
        size="large"
      >
        <Form layout="horizontal" form={form} labelCol={{ span: 8 }}>
          <Row>
            <Col span={16}>
              <Form.Item name="name" label={'ธนาคาร (บริษัท)'}>
                <Select allowClear options={selectBookBank} ></Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={16}>
              <Form.Item name="vat" label={'หักภาษี (%)'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={16}>
              <Form.Item name="social_security" label={'หักประกันงสังคม (%)'}>
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
                <Space style={{ display: 'flex', justifyContent: 'center' }}>
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
