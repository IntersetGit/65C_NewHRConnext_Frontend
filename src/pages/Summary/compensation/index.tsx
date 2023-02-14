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
import Swal from 'sweetalert2';
import moment from 'moment';
import { useAuth } from '../../../hooks/useAuth';

import { useQuery, useMutation, from } from '@apollo/client';
import { FETCH_SELECT_BOOK_BANK, FETCH_AllSALARY_BASE, CREATE_ExpenseCom } from '../../../service/graphql/Summary';

const { useToken } = theme;

const Compensation: React.FC = () => {
  const token = useToken();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const { company } = useAuth();
  console.log('aaa', company)

  let propsstate = location.state as any;
  const [selectedRow, setSelectedRow] = useState<any>();

  const { data: BookBank } = useQuery(FETCH_SELECT_BOOK_BANK);
  const { data: TableData, refetch } = useQuery(FETCH_AllSALARY_BASE);
  const [creteExpenseCom] = useMutation(CREATE_ExpenseCom);

  console.log("table", TableData)

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
      setSelectedRow(record);
      navigate(`profileCompensation?id=${record.profile.userId}`, {
        state: { ...record, userId: record?.profile?.userId, },
      });

      console.log("State", record)
    }
  };

  const onSubmitForm = (value: any) => {
    console.log("onSubmit", value)
    Swal.fire({
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
              date: new Date(),
              vat_per: parseFloat(value.vat_per),
              ss_per: parseFloat(value.ss_per),
              companyBranchId: company?.branchId as any,
            },
          },
        })
          .then((val) => {
            console.log(val);
            if (val.data?.CreateAndUpdateExpenseCom?.status) {
              Swal.fire(`ตั้งค่าการคำนวณเงินเดือนสำเร็จ!`, '', 'success');
              refetch();
              form.resetFields();
            }
          })
          .catch((err) => {
            Swal.fire(`ตั้งค่าการคำนวณเงินเดือนไม่สำเร็จ!`, '', 'error');
            console.error(err);
          });
      }
    });

    setOpen(false);
  }

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
        return record?.bookbank_log[0]?.base_salary?.toFixed(2);
      },
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
        <Table rowKey={'id'} columns={columns} dataSource={TableData?.data_salary as any}></Table>
      </Card>
      {/* position_data?.getposition_user as any */}
      <Drawer
        title={'ตั้งค่าการคำนวณเงินเดือน'}
        onClose={onClose}
        open={open}
        size="large"
      >
        <Form layout="horizontal" form={form} labelCol={{ span: 8 }} onFinish={onSubmitForm}>
          <Row>
            <Col span={16}>
              <Form.Item name="bankId" label={'ธนาคาร (บริษัท)'}>
                <Select allowClear options={selectBookBank} ></Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={16}>
              <Form.Item name="vat_per" label={'หักภาษี (%)'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={16}>
              <Form.Item name="ss_per" label={'หักประกันสังคม (%)'}>
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
                    htmlType="submit"
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
