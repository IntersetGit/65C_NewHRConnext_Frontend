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
import Swal from 'sweetalert2';

import { useQuery, useMutation, from } from '@apollo/client';
import {
  FETCH_SELECT_BOOK_BANK,
  UPDATE_SALARY_BASE,
  FETCH_GETALLBOOKBANK_LOG,
  CREATE_BOOKBANK,
} from '../../../service/graphql/Summary';

import {
  FETCH_GETALL_POSITION,
  CRETE_POSITION_USER,
  POSITION,
} from '../../../service/graphql/Position';

import { GiReceiveMoney } from 'react-icons/gi';
import type { ColumnsType } from 'antd/es/table';

import edit from '../../../assets/Edit.png';
import Del from '../../../assets/DEL.png';
import View from '../../../assets/View.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';

const { useToken } = theme;

const Remuneration: React.FC = () => {
  const token = useToken();
  const location = useLocation();
  const propsstate = location.state as any;

  useEffect(() => {
    refetch();
  }, []);

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<any>();
  const [formshow] = Form.useForm<any>();
  const [drawerType, setDrawerType] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);

  const { data: BookBank } = useQuery(FETCH_SELECT_BOOK_BANK);
  const { data: position_data } = useQuery(FETCH_GETALL_POSITION);
  const { data: book_bank_data, refetch } = useQuery(FETCH_GETALLBOOKBANK_LOG, { variables: { userId: propsstate?.userId } });
  const [creteBookBank] = useMutation(CREATE_BOOKBANK);

  useEffect(() => {
    const salary: any = book_bank_data ? book_bank_data?.bookbank_log_admin[0]?.base_salary : '0.00';
    const banknumber: any = book_bank_data ? book_bank_data?.bookbank_log_admin[0]?.bank_number : '0.00';
    const bankname: any = book_bank_data ? book_bank_data?.bookbank_log_admin[0]?.mas_bank?.name : '';


    formshow.setFieldsValue({ base_salary: salary, bank_number: banknumber, mas_bankId: bankname })
  }, [book_bank_data]);
  const selectBookBank = BookBank?.mas_bank?.map((e: any) => {
    return {
      label: e?.name,
      value: e?.id,
    };
  });

  const showDrawer = (type: any) => {
    setOpen(true);
    setDrawerType(type);
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
    console.log("Update", value)
    drawerType === 1
      ? Swal.fire({
        title: `ยืนยันการ Update ฐานเงินเดือน`,
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: token.token.colorPrimary,
        denyButtonColor: '#ea4e4e',
        confirmButtonText: 'ตกลง',
        denyButtonText: `ยกเลิก`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          creteBookBank({
            variables: {
              data: {
                ...value,
                userId: propsstate?.userId,
                base_salary: parseFloat(value.base_salary),
                provident_emp: parseFloat(value.provident_emp),
                provident_com: parseFloat(value.provident_com),
              },
            },
          })
            .then((val) => {
              console.log(val);
              if (val.data?.Createbookbank?.status) {
                Swal.fire(`Update ฐานเงินเดือนสำเร็จ!`, '', 'success');
                refetch();
                form.resetFields();
              }
            })
            .catch((err) => {
              Swal.fire(`Update ฐานเงินเดือนไม่สำเร็จ!`, '', 'error');
              console.error(err);
            });
        }
      })
      : Swal.fire({
        title: `ยืนยันการแก้ไขฐานเงินเดือน`,
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: token.token.colorPrimary,
        denyButtonColor: '#ea4e4e',
        confirmButtonText: 'ตกลง',
        denyButtonText: `ยกเลิก`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          creteBookBank({
            variables: {
              data: {
                ...value,
                userId: propsstate?.userId,
                date: moment(value),
              },
            },
          })
            .then((val) => {
              console.log(val);
              if (val.data?.Createbookbank?.status) {
                Swal.fire(`แก้ไขข้อมูลฐานเงินเดือนสำเร็จ!`, '', 'success');
                refetch();
                form.resetFields();
              }
            })
            .catch((err) => {
              Swal.fire(`แก้ไขข้อมูลฐานเงินเดือนไม่สำเร็จ!`, '', 'error');
              console.error(err);
              form.resetFields();
            });
        }
      });
    setOpen(false);
  };

  const onMenuClick = (event: any, record: any) => {
    const { key } = event;
    if (key === 'edit') {
      showDrawer(2);
    } else if (key === 'view') {
      showDrawer(3);
    } else if (key === 'delete') {
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: 'วันที่มีผล',
      key: 'date',
      dataIndex: 'date',
      align: 'center',
      render: (record: any) => moment(record).format('DD/MM/YYYY') as any,
    },
    {
      title: 'ฐานเงินเดือน',
      key: 'base_salary',
      dataIndex: 'base_salary',
      align: 'center',
      // render: (record) => {
      //   return record?.Position_user[0]?.mas_positionlevel2?.name;
      // },
    },
    {
      title: 'ธนาคาร',
      key: 'mas_bank',
      dataIndex: 'mas_bank',
      align: 'center',
      render: (record) => {
        return record?.name;
      },
    },
    {
      title: 'เลขบัญชี',
      key: 'bank_number',
      dataIndex: 'bank_number',
      align: 'center',
    },
    {
      title: 'กองทุนสำรองสะสม (พนักงาน (%))',
      key: 'provident_emp',
      dataIndex: 'provident_emp',
      align: 'center',
    },
    {
      title: 'กองทุนสำรองสะสม (บริษัท (%))',
      key: 'provident_com',
      dataIndex: 'provident_com',
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
        <div className="ml-2 text-xl">ข้อมูลฐานเงินเดือน</div>
      </div>

      <Divider />

      <Card className="shadow-xl">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div>
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={<AntDesignOutlined />}
              // src={getFilePath() + propsstate?.avatar}
              ></Avatar>
            </div>
          </Col>

          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div className="text-lg font-bold">
              <u className="text-blue-800">
                {propsstate?.profile?.prefix_th} {propsstate?.profile?.firstname_th}{' '}
                {propsstate?.profile?.lastname_th}
              </u>
              <div className="mt-4">
                {position_data?.getposition_user?.[
                  position_data?.getposition_user?.length - 1
                ]?.mas_positionlevel3?.name ?? 'ไม่มีตำแหน่งงาน'}
              </div>
            </div>
          </Col>
        </Row>

        <Form form={formshow} initialValues={
          { base_salary: '0000' }
        } size="middle">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item
                name="base_salary"
                colon={false}
                label={'ฐานเงินเดือน'}
              >
                <Input disabled
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item
                name="bank_number"
                colon={false}
                label={'เลชบัญชี'}
                style={{ marginLeft: '24px' }}
              >
                <Input disabled
                  allowClear
                  defaultValue={propsstate?.bookbank_log[0]?.bank_number}></Input>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item
                name="mas_bankId"
                colon={false}
                label={'ธนาคาร'}
                style={{ marginLeft: '32px' }}
              >
                <Input disabled
                  allowClear
                  defaultValue={propsstate?.bookbank_log[0]?.mas_bank?.name}></Input>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6} xl={12}>
              <Form.Item>
                <Space style={{ display: 'flex', justifyContent: 'right' }}>
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
      <Card className="shadow-xl mt-4">
        <Table columns={columns} dataSource={book_bank_data?.bookbank_log_admin as any} />
      </Card>

      <Drawer
        title={`${drawerType === 1
          ? 'Update ข้อมูลฐานเงินเดือน'
          : drawerType === 2
            ? 'แก้ไขข้อมูลฐานเงินเดือน'
            : 'ข้อมูลฐานเงินเดือน'
          }`}
        onClose={onClose}
        open={open}
        width={400}
      >
        <Form layout="vertical" form={form} onFinish={onSubmitForm}>
          <Row>
            <Col span={24}>
              <Form.Item name="date" label={'วันที่มีผล'}>
                <DatePicker
                  onChange={onChangeDate}
                  format={'DD/MM/YYYY'}
                  disabled={drawerType === 3 ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name="base_salary" label={'ฐานเงินเดือน'}>
                <Input disabled={drawerType === 3 ? true : false} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name="mas_bankId" label={'ธนาคาร'}>
                {/* <Select allowClear disabled={drawerType === 3 ? true : false} ></Select> */}
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
              <Form.Item name="bank_number" label={'เลขบัญชี'}>
                <Input disabled={drawerType === 3 ? true : false} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                name="provident_emp"
                label={'กองทุนสำรองเลี้ยงชีพสะสม ( พนักงาน (%))'}
              >
                <Input disabled={drawerType === 3 ? true : false} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                name="provident_com"
                label={'กองทุนสำรองเลี้ยงชีพสะสม ( บริษัท (%))'}
              >
                <Input disabled={drawerType === 3 ? true : false} />
              </Form.Item>
            </Col>
          </Row>

          {drawerType === 1 && (
            <Row>
              <Col span={24}>
                <Form.Item>
                  <Space
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '20px',
                    }}
                  >
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: token.token.colorPrimary,
                        marginRight: '20px',
                        width: '100px',
                      }}
                      htmlType="submit"
                      size="large"
                    >
                      ยืนยัน
                    </Button>
                    <Button
                      onClick={onClose}
                      style={{ width: '100px' }}
                      size="large"
                    >
                      ยกเลิก
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          )}

          {drawerType === 2 && (
            <Row>
              <Col span={24}>
                <Form.Item>
                  <Space
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '20px',
                    }}
                  >
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: token.token.colorPrimary,
                        marginRight: '20px',
                        width: '100px',
                      }}
                      htmlType="submit"
                      size="large"
                    >
                      ยืนยัน
                    </Button>
                    <Button
                      onClick={onClose}
                      style={{ width: '100px' }}
                      size="large"
                    >
                      ยกเลิก
                    </Button>
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
