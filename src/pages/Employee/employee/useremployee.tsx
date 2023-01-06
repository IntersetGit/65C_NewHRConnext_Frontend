import { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import {
  HomeOutlined,
  FolderFilled,
  FacebookFilled,
  LinkedinFilled,
  AntDesignOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { BsTelegram } from 'react-icons/bs';
import { FaLine } from 'react-icons/fa';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  theme,
  Card,
  Upload,
  Modal,
  Avatar,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const { useToken } = theme;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });



const UserEmployee: React.FC = () => {
  const navigate = useNavigate();
  const token = useToken();

  const onSubmitForm = (value: any) => {
    console.log('value', value);
  }

  return (
    <>
      <div className="relative flex flex-row items-center">
        <div className="flex flex-row items-center h-5 w-5 text-4xl">
          <FolderFilled />
        </div>
        <span className="ml-8 text-lg tracking-wide truncate">
          ข้อมูลพนักงาน
        </span>
      </div>
      <Divider style={{ backgroundColor: token.token.colorPrimary }} />
      <Card className="shadow-xl">
        <div className="text-base" style={{ color: token.token.colorPrimary }}>ข้อมูลพื้นฐาน</div>
        <Form layout={'vertical'} onFinish={onSubmitForm} size={'large'}>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={4} xl={4}>
              <Form.Item name={"staff_code"} label={'รหัสพนักงาน'}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={4} xl={4}>
              <Form.Item name={"staff_status"} label={'Status'}>
                <Select
                  options={[
                    {
                      value: 'ใช้งาน',
                      label: 'ใช้งาน',
                    },
                    {
                      value: 'ไม่ใช้งาน',
                      label: 'ไม่ใช้งาน',
                    },
                  ]}
                ></Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              <Form.Item name="citizen_id" label={'เลขประจำตัวประชาชน'}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              <Form.Item name={"contract_sameCitizen"} label={'หมายเลขประกันสังคม'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={4} xl={4}>
              <Form.Item name={"prefix_th"} label={'คำนำหน้า'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'นาย',
                    },
                    {
                      value: '2',
                      label: 'นาง',
                    },
                    {
                      value: '3',
                      label: 'นางสาว',
                    },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={10} xl={10}>
              <Form.Item name={"firstname_th"} label={'ชื่อ-สกุล'}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8} md={8} lg={4} xl={4}>
              <Form.Item label={'ชื่อเล่น'}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8} md={8} lg={3} xl={3}>
              <Form.Item name={"gender"} label={'เพศ'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'ชาย',
                    },
                    {
                      value: '2',
                      label: 'หญิง',
                    },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8} md={8} lg={3} xl={3}>
              <Form.Item name={"bio"} label={'กรุ๊ปเลือด'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'A',
                    },
                    {
                      value: '2',
                      label: 'B',
                    },
                    {
                      value: '3',
                      label: 'O',
                    },
                    {
                      value: '4',
                      label: 'AB',
                    },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={4} xl={4}>
              <Form.Item name={"prefix_en"} label={'Prename'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'Mr.',
                    },
                    {
                      value: '2',
                      label: 'Mrs.',
                    },
                    {
                      value: '3',
                      label: 'Ms.',
                    },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={10} xl={10}>
              <Form.Item name={"firstname_en"} label={'Name-Surname'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={4} xl={4}>
              <Form.Item name={"dob"} label={'วัน/เดือน/ปี'}>
                <DatePicker style={{ width: '195px' }} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={4} xl={4}>
              <Form.Item name={"age"} label={'อายุ'}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8} md={8} lg={6} xl={6}>
              <Form.Item  label={'สถานภาพสมรส'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'โสด',
                    },
                    {
                      value: '2',
                      label: 'สมรส',
                    },
                    {
                      value: '3',
                      label: 'หย่าร้าง',
                    },
                    {
                      value: '4',
                      label: 'แยกกันอยู่',
                    },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8} md={12} lg={4} xl={4}>
              <Form.Item name={"shirt_size"} label={'T-Shirt Size'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'S',
                    },
                    {
                      value: '2',
                      label: 'M',
                    },
                    {
                      value: '3',
                      label: 'L',
                    },
                    {
                      value: '4',
                      label: 'XL',
                    },
                    {
                      value: '5',
                      label: 'XXL',
                    },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8} md={12} lg={6} xl={6}>
              <Form.Item name={""} label={'สถานภาพพนักงาน'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'Full Time',
                    },
                    {
                      value: '2',
                      label: 'Part Time',
                    },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider style={{ backgroundColor: token.token.colorPrimary }} />

          <div className="text-base" style={{ color: token.token.colorPrimary }} >
            ที่อยู่ ตามบัตรประจำตัวประชาชน
          </div>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={"citizen_addressnumber"} label={'เลขที่บ้าน'}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={18} xl={18}>
              <Form.Item name={"citizen_address"} label={'หมู่บ้าน/คอนโด ซอย ถนน'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={"citizen_country"} label={'ประเทศ'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'Thailand',
                    },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={"citizen_province"} label={'จังหวัด'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'กรุงเทพมหานคร',
                    },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={"citizen_district"} label={'เขต/อำเภอ'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'จตุจักร',
                    },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={"citizen_state"} label={'แขวง/ตำบล'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'จอมพล',
                    },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={"citizen_zipcode"} label={'รหัสไปรษณีย์'}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={"citizen_tel"} label={'โทรศัพท์บ้าน'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Divider style={{ backgroundColor: token.token.colorPrimary }} />

          <span className="text-base" style={{ color: token.token.colorPrimary }} >
            ที่อยู่ ที่สามารถติดต่อได้
            <Checkbox className="ml-2">
              ที่อยู่ที่เดียวกับ ที่อยู่ตามบัตรประจำตัวประชาชน
            </Checkbox>
          </span>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={"contract_addressnumber"} label={'เลขที่บ้าน'}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={18} xl={18}>
              <Form.Item name={"contract_address"} label={'หมู่บ้าน/คอนโด ซอย'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={"contract_province"} label={'จังหวัด'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'กรุงเทพมหานคร',
                    },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={"contract_district"} label={'เขต/อำเภอ'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'จตุจักร',
                    },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={"contract_state"} label={'แขวง/ตำบล'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'จอมพล',
                    },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={"contract_zipcode"} label={'รหัสไปรษณีย์'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
              <Form.Item name={"tel"} label={'Mobile Phone'}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
              <Form.Item label={'E-Mail'}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
              <Form.Item label={'E-Mail Company'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Divider style={{ backgroundColor: token.token.colorPrimary }} />

          <div className="text-base" style={{ color: token.token.colorPrimary }} >Social Link</div>

          {/*---------------- Facebook ----------------*/}
          <Row gutter={16}>
            <div className="relative flex flex-row items-center">
              <div className="flex flex-row ml-2 tems-center text-4xl">
                {/* <FacebookFilled /> */}
                <img
                  src={`/public/Facebook-logo.png`}
                  alt="Facebook-logo"
                  style={{ width: '40px' }}
                />
              </div>
              <div className="flex items-center ml-8 mt-6">
                <Col span={24}>
                  <Form.Item>
                    <Input />
                  </Form.Item>
                </Col>
              </div>

              {/*------------------- in ------------------*/}
              <div className="flex flex-row items-center ml-6 text-4xl">
                {/* <LinkedinFilled /> */}
                <img
                  src={`/public/initials-logo.png`}
                  alt="Facebook-logo"
                  style={{ width: '40px' }}
                />
              </div>
              <div className="flex items-center ml-8 mt-6">
                <Col span={24}>
                  <Form.Item>
                    <Input />
                  </Form.Item>
                </Col>
              </div>
            </div>
          </Row>

          {/*------------------ Line ------------------*/}
          <Row gutter={16}>
            <div className="relative flex flex-row items-center">
              <div className="flex flex-row ml-2 items-center text-4xl">
                {/* <FaLine /> */}
                <img
                  src={`/public/Line-logo.png`}
                  alt="Facebook-logo"
                  style={{ width: '40px' }}
                />
              </div>
              <div className="flex items-center ml-8 mt-6">
                <Col span={24}>
                  <Form.Item>
                    <Input />
                  </Form.Item>
                </Col>
              </div>

              {/*---------------- Telegram ----------------*/}
              <div className="flex flex-row items-center ml-6 text-4xl">
                {/* <BsTelegram /> */}
                <img
                  src={`/public/Telegram-logo.png`}
                  alt="Facebook-logo"
                  style={{ width: '40px' }}
                />
              </div>
              <div className="flex items-center ml-8 mt-6">
                <Col span={24}>
                  <Form.Item>
                    <Input />
                  </Form.Item>
                </Col>
              </div>
            </div>
          </Row>

          <Row gutter={16}>
            <Form.Item>
              <Space>
                <Button
                  htmlType="submit"
                   type="primary"
                  style={{
                    marginBottom: '10px',
                    backgroundColor: token.token.colorPrimary,
                  }}
                >
                  บันทึก
                </Button>
                <Button
                  style={{
                    marginBottom: '10px',
                  }}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  ยกเลิก
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default UserEmployee;
