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
  DatePicker,
  Tabs,
} from 'antd';
import dayjs from 'dayjs';
import { GiReceiveMoney } from 'react-icons/gi';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { ColumnsType } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import edit from '../../../assets/Edit.png';
import View from '../../../assets/View.png';
import Del from '../../../assets/Del.png';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useAuth } from '../../../hooks/useAuth';

import { useQuery, useMutation } from '@apollo/client';
import {
  FETCH_SELECT_BOOK_BANK,
  FETCH_AllSALARY_BASE,
  CREATE_ExpenseCom,
  FETCH_ExpenseCompany,
  Delete_Expense_Com,
} from '../../../service/graphql/Summary';

const { useToken } = theme;

const Compensation: React.FC = () => {
  const token = useToken();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const { company } = useAuth();
  // console.log('aaa', company);
  const [drawerType, setDrawerType] = useState(1);
  let propsstate = location.state as any;
  const [selectedRow, setSelectedRow] = useState<any>();

  const { data: BookBank } = useQuery(FETCH_SELECT_BOOK_BANK);
  const { data: TableData, refetch } = useQuery(FETCH_AllSALARY_BASE);
  const { data: ExpenseComData, refetch: refetch2 } =
    useQuery(FETCH_ExpenseCompany);
  const [creteExpenseCom] = useMutation(CREATE_ExpenseCom);
  const [deleteExpense_Com] = useMutation(Delete_Expense_Com);
  // console.log('table1', ExpenseComData);
  // console.log('table2', TableData);

  useEffect(() => {
    refetch();
    refetch2();
  }, []);

  const showDrawer = (type: any) => {
    setOpen(true);
    setDrawerType(type);
  };

  const onClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const onChange = (checkedValues: CheckboxValueType[]) => {
    // console.log('checked = ', checkedValues);
  };

  const selectBookBank = BookBank?.mas_bank?.map((e: any) => {
    return {
      label: e?.name,
      value: e?.id,
    };
  });

  const genarateMenu = (record: any) => {
    let year_s = dayjs(record.date).format('YYYY');
    let cal_year_s = dayjs(record.cal_date_salary).format('YYYY');
    return [
      {
        key: 'view1',
        label: 'ดูข้อมูล',
        icon: <img style={{ width: '17px', height: '17px' }} src={View} />,
        onClick: (e: any) => onMenuClick(e, record),
      },
      {
        key: 'edit',
        label: 'แก้ไข',
        disabled: dayjs().unix() > dayjs(record.cal_date_salary).unix() && year_s <= cal_year_s,
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

  const onMenuClick = (event: any, record: any) => {
    const { key } = event;
    if (key === 'view2') {
      setSelectedRow(record);
      navigate(`profileCompensation?id=${record.profile.userId}`, {
        state: { ...record, userId: record?.profile?.userId },
      });
    } else if (key === 'view1') {
      setSelectedRow(record);
      showDrawer(3);
      form.setFieldsValue({
        date: dayjs(record?.date),
        cal_date_salary: dayjs(record?.cal_date_salary),
        bankId: record?.mas_bank?.name,
        vat_per: record?.vat_per,
        ss_per: record?.ss_per,
        check_vat: record?.check_vat,
      });
    } else if (key === 'edit') {
      setSelectedRow(record);
      form.setFieldsValue({
        date: dayjs(record?.date),
        cal_date_salary: dayjs(record?.cal_date_salary),
        bankId: record?.mas_bank?.id,
        vat_per: record?.vat_per,
        ss_per: record?.ss_per,
        check_vat: record?.check_vat,
      });
      showDrawer(2);
      // console.log('EDittttt', record);
    } else if (key === 'delete') {
      Swal.fire({
        title: `ยืนยันการลบข้อมูลตั้งค่าคำนวณเงินเดือน`,
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: token.token.colorPrimary,
        denyButtonColor: '#ea4e4e',
        confirmButtonText: 'ตกลง',
        denyButtonText: `ยกเลิก`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          deleteExpense_Com({
            variables: {
              deleteExpensecomId: record.id,
            },
          })
            .then((val) => {
              if (val.data?.DeleteExpensecom?.status) {
                Swal.fire(`ลบข้อมูลตั้งค่าคำนวณเงินเดือนสำเร็จ!`, '', 'success');
                refetch();
                refetch2();
              }
            })
            .catch((err) => {
              Swal.fire(`ลบข้อมูลตั้งค่าคำนวณเงินเดือนไม่สำเร็จ!`, '', 'error');
              console.error(err);
            });
        }
      });
    }
  };

  const onSubmitForm = (value: any) => {
    // console.log('onSubmit', value);
    drawerType === 1
      ? Swal.fire({
        title: `ยืนยันการตั้งค่าการคำนวณเงินเดือน`,
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: token.token.colorPrimary,
        denyButtonColor: '#ea4e4e',
        confirmButtonText: 'ตกลง',
        denyButtonText: `ยกเลิก`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          creteExpenseCom({
            variables: {
              data: {
                ...value,
                date: dayjs(value.date).format('YYYY-MM'),
                vat_per: parseFloat(value.vat_per),
                ss_per: parseFloat(value.ss_per),
                companyBranchId: company?.branchId as any,
              },
            },
          })
            .then((val) => {
              // console.log(val);
              if (val.data?.CreateAndUpdateExpenseCom?.status) {
                Swal.fire(`ตั้งค่าการคำนวณเงินเดือนสำเร็จ!`, '', 'success');
                refetch();
                refetch2();
                form.resetFields();
              }
            })
            .catch((err) => {
              Swal.fire(`ตั้งค่าการคำนวณเงินเดือนไม่สำเร็จ!`, '', 'error');
              console.error(err);
            });
        }
      })
      : Swal.fire({
        title: `ยืนยันการแก้ไขตั้งค่าการคำนวณเงินเดือน`,
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: token.token.colorPrimary,
        denyButtonColor: '#ea4e4e',
        confirmButtonText: 'ตกลง',
        denyButtonText: `ยกเลิก`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          creteExpenseCom({
            variables: {
              data: {
                ...value,
                id: selectedRow?.id,
                date: value.date,
                vat_per: parseFloat(value.vat_per),
                ss_per: parseFloat(value.ss_per),
                companyBranchId: company?.branchId as any,
              },
            },
          })
            .then((val) => {
              // console.log(val);
              if (val.data?.CreateAndUpdateExpenseCom?.status) {
                Swal.fire(
                  `แก้ไขตั้งค่าการคำนวณเงินเดือนสำเร็จ!`,
                  '',
                  'success',
                );
                refetch();
                refetch2();
                form.resetFields();
              }
            })
            .catch((err) => {
              Swal.fire(
                `แก้ไขตั้งค่าการคำนวณเงินเดือนไม่สำเร็จ!`,
                '',
                'error',
              );
              console.error(err);
              form.resetFields();
            });
        }
      });
    setOpen(false);
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    const date: any = ExpenseComData?.expense_company?.[0]?.date;
    let getAllMonth: any = ExpenseComData?.expense_company && ExpenseComData?.expense_company.map((item) => dayjs(new Date(item?.date)));
    var yesday = false;
    getAllMonth.forEach((day) => current.isSame(day, 'month') && (yesday = true))
    // console.log(current.format("MM/YYYY"), dayjs(new Date(date)).format("MM/YYYY"), current.isSame(dayjs(new Date(date)), 'month'));
    return yesday;
  };
  // const disabledDate1: RangePickerProps['disabledDate'] = (current) => {
  //   let date: any = ExpenseComData?.expense_company?.[0]?.date;
  //   //console.log(dayjs(date), current);
  //   return current && current < dayjs(new Date(date)).add(1, 'month');
  // };

  const columnsCom: ColumnsType<any> = [
    {
      title: 'เดือน/ปี',
      key: 'date',
      dataIndex: 'date',
      align: 'center',
      render: (text, record) => {
        return dayjs(text).format('MM/YYYY');
      },
      sorter: (a, b) => a.date - b.date
    },
    {
      title: 'วันที่จ่ายเงิน',
      key: 'cal_date_salary',
      dataIndex: 'cal_date_salary',
      align: 'center',
      render: (text, record) => {
        return dayjs(new Date(text)).format('DD/MM/YYYY');
      },
    },
    {
      title: 'ธนาคาร',
      key: 'mas_bank',
      align: 'center',
      render: (record) => {
        return record?.mas_bank?.name;
      },
    },
    {
      title: 'เปอร์เซ็นต์ภาษี',
      key: 'vat_per',
      dataIndex: 'vat_per',
      align: 'center',
      render: (text, record) => {
        return parseFloat(text).toFixed(2);
      },
    },
    {
      title: 'เปอร์เซ็นต์ประกันสังคม',
      key: 'ss_per',
      dataIndex: 'ss_per',
      align: 'center',
      render: (text, record) => {
        return parseFloat(text).toFixed(2);
      },
    },
    {
      title: 'Action',
      key: 'ss_per',
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
          ตั้งค่าคำนวณเงินเดือน ( ตั้งค่าภาษี และค่าประกันสังคม )
        </div>
      </div>

      <Divider />
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
                onClick={() => showDrawer(1)}
              >
                ตั้งค่าการคำนวณเงินเดือน
              </Button>
            </Space>
          </Row>
        </Col>
        <Table
          rowKey={'id'}
          columns={columnsCom}
          scroll={{ x: 700 }}
          dataSource={ExpenseComData?.expense_company as any}
        ></Table>
      </Card>

      <Drawer
        title={`${drawerType === 1
          ? 'ตั้งค่าการคำนวณเงินเดือน'
          : drawerType === 2
            ? 'แก้ไขตั้งค่าการคำนวณเงินเดือน'
            : 'ข้อมูลตั้งค่าคำนวณเงินเดือน'
          }`}
        onClose={onClose}
        width={550}
        open={open}
        size="large"
      // afterOpenChange={() => {
      //   setDataEC();
      // }}
      >
        <Form
          layout="horizontal"
          form={form}
          labelCol={{ span: 8 }}
          onFinish={onSubmitForm}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="date"
                label={'เดือน/ปี'}
                className="ml-[82px]"
                rules={[
                  {
                    required: true,
                    message: 'โปรดเลือกเดือน/ปี !',
                  },
                ]}
              >
                {drawerType == 1 ? (
                  <DatePicker
                    picker="month"
                    format={'MM/YYYY'}
                    disabledDate={disabledDate}
                  />
                ) : (
                  <DatePicker
                    picker="month"
                    format={'MM/YYYY'}
                    disabledDate={disabledDate}
                    disabled={drawerType === 3 ? true : false}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="cal_date_salary"
                label={'วันที่จ่ายเงิน'}
                className="ml-[82px]"
                rules={[
                  {
                    required: true,
                    message: 'โปรดเลือกวันที่จ่ายเงิน !',
                  },
                ]}
              >
                <DatePicker
                  picker="date"
                  format={'DD/MM/YYYY'}
                  // disabledDate={disabledDate1}
                  disabled={drawerType === 3 ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="bankId"
                label={'ธนาคาร (บริษัท)'}
                rules={[
                  {
                    required: true,
                    message: 'โปรดเลือกธนาคาร !',
                  },
                ]}
              >
                <Select
                  allowClear
                  options={selectBookBank}
                  disabled={drawerType === 3 ? true : false}
                ></Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name="vat_per" label={'หักภาษี (%)'}>
                <Input disabled={drawerType === 3 ? true : false} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name="ss_per" label={'หักประกันสังคม (%)'}>
                <Input disabled={drawerType === 3 ? true : false} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name="check_vat" label={'หักภาษีจากรายรับประเภท'}>
                <Checkbox.Group
                  disabled={drawerType === 3 ? true : false}
                  style={{ width: '100%' }}
                  onChange={onChange}
                >
                  <Row>
                    <Col span={12}>
                      <Checkbox value={'base_salary'}>เงินเดือน</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value={'commission'}>ค่าคอมมิชชั่น</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value={'position_income'}>ค่าตำแหน่ง</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value={'special_income'}>เงินพิเศษ</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value={'ot'}>ค่าล่วงเวลา</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value={'other_income'}>รายได้อื่น</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value={'travel_income'}>ค่าเดินทาง</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value={'bursary'}>เงินอุดหนุน</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value={'welfare_money'}>เงินสวัสดิการ</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value={'bonus'}>โบนัส</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>
              {drawerType === 1 && (
                <Form.Item>
                  <Space style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: token.token.colorPrimary }}
                      htmlType="submit"
                      className="mr-8"
                    >
                      บันทึก
                    </Button>
                    <Button onClick={onClose}>ยกเลิก</Button>
                  </Space>
                </Form.Item>
              )}

              {drawerType === 2 && (
                <Form.Item>
                  <Space style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: token.token.colorPrimary }}
                      htmlType="submit"
                      className="mr-8"
                    >
                      บันทึก
                    </Button>
                    <Button onClick={onClose}>ยกเลิก</Button>
                  </Space>
                </Form.Item>
              )}
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

const Compensation2: React.FC = () => {
  const token = useToken();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const { company } = useAuth();
  // console.log('aaa', company);
  const [drawerType, setDrawerType] = useState(1);
  let propsstate = location.state as any;
  const [selectedRow, setSelectedRow] = useState<any>();

  const { data: BookBank } = useQuery(FETCH_SELECT_BOOK_BANK);
  const { data: TableData, refetch } = useQuery(FETCH_AllSALARY_BASE);
  const { data: ExpenseComData, refetch: refetch2 } =
    useQuery(FETCH_ExpenseCompany);
  const [creteExpenseCom] = useMutation(CREATE_ExpenseCom);
  // console.log('table1', ExpenseComData);
  // console.log('table2', TableData);

  useEffect(() => {
    refetch();
    refetch2();
  }, []);

  const genarateMenu2 = (record: any) => {
    return [
      {
        key: 'view2',
        label: 'ดูข้อมูล',
        icon: <img style={{ width: '17px', height: '17px' }} src={View} />,
        onClick: (e: any) => onMenuClick(e, record),
      },
    ];
  };

  const onMenuClick = (event: any, record: any) => {
    const { key } = event;
    if (key === 'view2') {
      setSelectedRow(record);
      navigate(`profileCompensation?id=${record.profile.userId}`, {
        state: { ...record, userId: record?.profile?.userId },
      });
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: 'รหัสพนักงาน',
      key: 'profile',
      dataIndex: 'profile',
      align: 'center',
      render: (record) => record.staff_code,
    },
    {
      title: 'ชื่อ-สกุล',
      key: 'profile',
      dataIndex: 'profile',
      align: 'center',
      render: (txt: any) =>
        txt.prefix_th + ' ' + txt.firstname_th + ' ' + txt.lastname_th,
    },
    {
      title: 'แผนก',
      key: 'Position_user',
      align: 'center',
      render: (record) => {
        return record?.Position_user[0]?.mas_positionlevel2?.name;
      },
    },
    {
      title: 'ตำแหน่ง',
      key: 'Position_user',
      align: 'center',
      render: (record) => {
        return record?.Position_user[0]?.mas_positionlevel3?.name;
      },
    },
    {
      title: 'ฐานเงินเดือน',
      key: 'bookbank_log',
      align: 'center',
      render: (record) => {
        return record?.bookbank_log[0]?.base_salary?.toLocaleString(undefined, { minimumFractionDigits: 2 }) ?? '-';
      },
    },
    {
      title: 'Action',
      key: 'Action',
      align: 'center',
      render: (_: any, record: any) => (
        <Dropdown
          menu={{
            items: genarateMenu2(record),
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
        </Form>
      </Card>
      <Card className="shadow-md mt-6">
        <Table
          rowKey={'id'}
          scroll={{ x: 700 }}
          columns={columns}
          dataSource={TableData?.data_salary as any}
        ></Table>
      </Card>
    </>
  );
};

const Main = () => {
  return (
    <Tabs
      className="right-tab"
      defaultActiveKey="1"
      items={[
        {
          label: `ตั้งค่าการคำนวณเงินเดือน`,
          key: '1',
          children: <Compensation />,
        },
        {
          label: `ข้อมูลเงินเดือน`,
          key: `2`,
          children: <Compensation2 />,
        },
      ]}
    ></Tabs>
  );
};
export default Main;
