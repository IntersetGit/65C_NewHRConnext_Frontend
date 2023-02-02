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
  Avatar,
  Drawer,
  DatePicker,
} from 'antd';
import type { DatePickerProps } from 'antd';

import { GiReceiveMoney } from 'react-icons/gi';
import type { ColumnsType } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';

import edit from '../../../assets/Edit.png';
import Slip from '../../../assets/Slip.png';
import View from '../../../assets/View.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const { useToken } = theme;


const Remuneration: React.FC = () => {
  const token = useToken();
  const [open, setOpen] = useState(false);
  // const [form] = Form.useForm<SummaryType>();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return <>
    <div className="flex text-3xl ml-2 pt-4">
      <GiReceiveMoney />
      <div className="ml-2 text-xl">
        ข้อมูลค่าตอบแทน
      </div>
    </div>

    <Divider />

    <Card className="shadow-xl">
      <Row className="py-6" gutter={16}>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <div>
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              style={{ width: 150, height: 150 }}
            ></Avatar>
          </div>
        </Col>
        <Col
          className="flex justify-center items-center"
          xs={24}
          sm={24}
          md={4}
          lg={4}
          xl={4}
        >
          <div className="text-lg font-bold">
            <u style={{ color: token.token.colorPrimary }}>
              Firstname  Lastname
            </u>
            <div className="my-4">position</div>
          </div>
          {/* <div className="text-lg font-bold">
                            <u style={{ color: token.token.colorPrimary }}>
                                {propsstate?.firstname_th} {propsstate?.lastname_th}
                            </u>
                            <div className="my-4">{propsstate?.position}</div>
                        </div> */}
        </Col>
      </Row>

      <Form size="middle">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <Form.Item name="search" colon={false} label={'ฐานเงินเดือน'}>
              <Input allowClear></Input>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={6} xl={6}>
            <Form.Item name="search" colon={false} label={'เลชบัญชี'}>
              <Input allowClear></Input>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={6} xl={6}>
            <Form.Item name="search" colon={false} label={'ธนาคาร'}>
              <Input allowClear></Input>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={6} xl={6}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  style={{ backgroundColor: token.token.colorPrimary }}
                  htmlType="submit"
                  onClick={showDrawer}
                >
                  + Update ข้อมูลฐานเงินเดือน
                </Button>
              </Space>

            </Form.Item>
          </Col>
        </Row>

      </Form>
    </Card>
  </>;
};

export default Remuneration;
