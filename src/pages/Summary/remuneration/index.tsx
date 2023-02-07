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
import { AntDesignOutlined, MoreOutlined } from '@ant-design/icons';
import type { DatePickerProps } from 'antd';

import { gql } from '../../../__generated__/gql';
import { useQuery, useMutation, from } from '@apollo/client';
import { FETCH_SELECT_BOOK_BANK } from '../../../service/graphql/Summary';

import { GiReceiveMoney } from 'react-icons/gi';
import type { ColumnsType } from 'antd/es/table';

import edit from '../../../assets/Edit.png';
import Del from '../../../assets/Del.png';
import View from '../../../assets/View.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const { useToken } = theme;

type UpdateSummaryType = {
  id: string;
  name: string;
  date: any;
  base_salary: any;
  mas_bankId: any;
  bank_number: any;
  provident_com: any;
  provident_emp: any;

};

interface DataType {
  date: any;
  base_salary: any;
  bank: any;
  bank_number: string;
  provident_collect_employee: number;
  provident_collect_company: number;

}


const Remuneration: React.FC = () => {
  const token = useToken();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<UpdateSummaryType>();
  const [drawerType, setDrawerType] = useState(1);

  const { data: BookBank } = useQuery(FETCH_SELECT_BOOK_BANK);

  const selectBookBank = BookBank?.mas_bank?.map((e: any) => {
    return {
      label: e?.name,
      value: e?.id,
    };
  });

  const showDrawer = (type: any) => {
    setOpen(true);
    setDrawerType(type)
  };

  const onClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const genarateMenu = (record: any) => {
    return [
      {
        key: 'view',
        label: 'ดูข้อมูล',
        icon: <img style={{ width: '17px', height: '17px' }} src={View} />,
        onClick: (e: any) => onMenuClick(e, record),
      },
      {
        key: 'edit',
        label: 'แก้ไข',
        icon: <img style={{ width: '17px', height: '17px' }} src={edit} />,
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

  const onSubmitForm = (value: any) => {
    console.log('Update', value)
  }

  const onMenuClick = (event: any, record: any) => {
    const { key } = event;
    if (key === 'edit') {
      showDrawer(2)
    } else if (key === 'view') {
      showDrawer(3)
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
      title: 'ฐานเงินเดือน',
      key: 'base_salary',
      dataIndex: 'base_salary',
      align: 'center',
    },
    {
      title: 'ธนาคาร',
      key: 'bank',
      dataIndex: 'bank',
      align: 'center',
    },
    {
      title: 'เลขบัญชี',
      key: 'bank_number',
      dataIndex: 'bank_number',
      align: 'center',
    },
    {
      title: 'กองทุนสำรองสะสม (พนักงาน (%))',
      key: 'provident_collect_employee',
      dataIndex: 'provident_collect_employee',
      align: 'center',
    },
    {
      title: 'กองทุนสำรองสะสม (บริษัท (%))',
      key: 'provident_collect_company',
      dataIndex: 'provident_collect_company',
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
      date: '01/01/2555',
      base_salary: 22000.00,
      bank: 'ทหารไทย',
      bank_number: '1003524896',
      provident_collect_employee: 3,
      provident_collect_company: 3,
    },
    {
      date: '01/08/2555',
      base_salary: 23000.00,
      bank: 'กสิกรไทย',
      bank_number: '1002480836',
      provident_collect_employee: 3,
      provident_collect_company: 3,
    },
    {
      date: '01/01/2559',
      base_salary: 25000.00,
      bank: 'กสิกรไทย',
      bank_number: '1002480836',
      provident_collect_employee: 3,
      provident_collect_company: 3,
    },
  ];
  return (
    <>
      <div className="flex text-3xl ml-2 pt-4">
        <GiReceiveMoney />
        <div className="ml-2 text-xl">
          ข้อมูลฐานเงินเดือน
        </div>
      </div>

      <Divider />

      <Card className="shadow-xl">
        <Row className="py-6" gutter={16}>
          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div>

              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={<AntDesignOutlined />}
              // src={propsstate.avatar}
              ></Avatar>
            </div>
          </Col>
          <Col
            className="flex justify-center items-center"
            xs={24}
            sm={24}
            md={4}
            lg={4}
            xl={6}
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
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item name="base_salary" colon={false} label={'ฐานเงินเดือน'} >
                <Input disabled allowClear></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item name="bank_number" colon={false} label={'เลชบัญชี'} style={{ marginLeft: "24px", }}>
                <Input disabled allowClear></Input>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item name="bank" colon={false} label={'ธนาคาร'} style={{ marginLeft: "32px", }}>
                <Input disabled allowClear></Input>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6} xl={12}>
              <Form.Item>
                <Space style={{ display: 'flex', justifyContent: 'right', }}>
                  <Button
                    type="primary"
                    style={{ backgroundColor: token.token.colorPrimary }}
                    htmlType="submit"
                    onClick={() => showDrawer(1)}
                  >
                    + Update ข้อมูลฐานเงินเดือน
                  </Button>
                </Space>

              </Form.Item>
            </Col>
          </Row>

        </Form>
      </Card>
      <Card className="shadow-xl mt-4"><Table columns={columns} dataSource={data} /></Card>

      <Drawer
        title={`${drawerType === 1 ? "Update ข้อมูลฐานเงินเดือน"
          : drawerType === 2 ? "แก้ไขข้อมูลฐานเงินเดือน"
            : "ข้อมูลฐานเงินเดือน"}`}
        onClose={onClose}
        open={open}
        width={400}
      >
        <Form layout="vertical" form={form} onFinish={onSubmitForm} >
          <Row>
            <Col span={24}>
              <Form.Item name="date" label={'วันที่มีผล'} >
                <DatePicker onChange={onChangeDate} format={'DD/MM/YYYY'} disabled={drawerType === 3 ? true : false} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name="base_salary" label={"ฐานเงินเดือน"} >
                <Input disabled={drawerType === 3 ? true : false} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name="bank" label={"ธนาคาร"} >
                {/* <Select allowClear disabled={drawerType === 3 ? true : false} ></Select> */}
                <Select allowClear options={selectBookBank} disabled={drawerType === 3 ? true : false} ></Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name="bank_number" label={"เลขบัญชี"} >
                <Input disabled={drawerType === 3 ? true : false} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name="provident_collect_employee" label={"กองทุนสำรองเลี้ยงชีพสะสม ( พนักงาน (%))"} >
                <Input disabled={drawerType === 3 ? true : false} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name="provident_collect_company" label={"กองทุนสำรองเลี้ยงชีพสะสม ( บริษัท (%))"} >
                <Input disabled={drawerType === 3 ? true : false} />
              </Form.Item>
            </Col>
          </Row>

          {drawerType === 1 && (
            <Row >
              <Col span={24}>
                <Form.Item>
                  <Space style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: token.token.colorPrimary, marginRight: "20px", width: "100px", }}
                      htmlType="submit"
                      size='large'
                    >
                      ยืนยัน
                    </Button>
                    <Button onClick={onClose}
                      style={{ width: "100px", }}
                      size='large'
                    >ยกเลิก</Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          )}

          {drawerType === 2 && (
            <Row >
              <Col span={24}>
                <Form.Item>
                  <Space style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: token.token.colorPrimary, marginRight: "20px", width: "100px", }}
                      htmlType="submit"
                      size='large'
                    >
                      ยืนยัน
                    </Button>
                    <Button onClick={onClose}
                      style={{ width: "100px", }}
                      size='large'
                    >ยกเลิก</Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form>
      </Drawer>
    </>
  );
};

export default Remuneration;
