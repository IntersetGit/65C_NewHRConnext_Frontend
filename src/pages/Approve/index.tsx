import {
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  DatePicker,
  Upload,
  Dropdown,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  theme,
  Radio,
} from 'antd';
import { useState } from 'react';
import { RiCalendarCheckLine } from 'react-icons/ri';
import type { ColumnsType } from 'antd/es/table';
import type { RadioChangeEvent } from 'antd';
import { MoreOutlined, UploadOutlined } from '@ant-design/icons';
import edit from '../../assets/Edit.png';
import Del from '../../assets/DEL.png';
import View from '../../assets/View.png';
import { FETCH_ALL_APPROVE } from '../../service/graphql/Approve';
import { POSITION } from '../../service/graphql/Position';
import {
  LEAVE_TYPE_DATA,
  CREATE_LEAVE,
  DELETE_LEAVE,
} from '../../service/graphql/Leave';
import { useMutation, useQuery } from '@apollo/client';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

const { useToken } = theme;
const { TextArea } = Input;

const Approveleave: React.FC = () => {
  const token = useToken();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [formSearch] = Form.useForm();
  const [drawertype, setdrawertype] = useState(1);
  const [selectedrow, setselectedrow] = useState<any>([]);
  const { data: data_approve, refetch } = useQuery(FETCH_ALL_APPROVE);
  const { data: leavetypedata } = useQuery(LEAVE_TYPE_DATA);
  const [createLeaveData] = useMutation(CREATE_LEAVE);
  const { data: position } = useQuery(POSITION);
  const [deleteLeave] = useMutation(DELETE_LEAVE);
  const [maspositionlevel3, setMasPositionlevel3] = useState<
    { value?: string | null; label?: string | null }[] | undefined
  >(undefined);

  const onChangePosition = (value) => {
    formSearch.setFieldValue('mas_positionlevel3', null);
    const maspositionlevel3 = position?.getMasPositon?.[0]?.mas_positionlevel2
      ?.find((e) => e?.id === value)
      ?.mas_positionlevel3?.map((e) => {
        return {
          label: e?.name,
          value: e?.id,
        };
      });

    setMasPositionlevel3(maspositionlevel3 ? maspositionlevel3 : []);
  };

  const mas_positionlevel2 =
    position?.getMasPositon?.[0]?.mas_positionlevel2?.map((e) => {
      return {
        label: e?.name,
        value: e?.id,
      };
    });

  const selectleavetype = leavetypedata?.getleavetypedata?.map((e) => {
    return {
      label: e?.name,
      value: e?.id,
    };
  });

  const showDrawer = (type) => {
    setOpen(true);
    setdrawertype(type);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
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
      console.log(record);
      showDrawer(1);
      setselectedrow(record);
      form.setFieldsValue({
        ...record,
        start_date: record.start_date ? dayjs(record.start_date) : undefined,
        end_date: record.end_date ? dayjs(record.end_date) : undefined,
      });
    } else if (key === 'view') {
      showDrawer(2);
      form.setFieldsValue({
        ...record,
        start_date: record.start_date ? dayjs(record.start_date) : undefined,
        end_date: record.end_date ? dayjs(record.end_date) : undefined,
      });
    } else if (key === 'delete') {
      Swal.fire({
        title: `ยืนยันการลบข้อมูลการลา`,
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: token.token.colorPrimary,
        denyButtonColor: '#ea4e4e',
        confirmButtonText: 'ตกลง',
        denyButtonText: `ยกเลิก`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          deleteLeave({
            variables: {
              deleteLeveId: record?.id,
            },
          })
            .then((val) => {
              if (val.data?.delete_leve?.status) {
                Swal.fire(`ลบข้อมูลการลาสำเร็จ!`, '', 'success');
                refetch();
              }
            })
            .catch((err) => {
              Swal.fire(`ลบข้อมูลการลาไม่สำเร็จ!`, '', 'error');
              console.error(err);
            });
        }
      });
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: 'ลำดับ',
      key: 'number',
      dataIndex: 'number',
      align: 'center',
      render: (_: any, record: any, index: any) => {
        return index + 1;
      },
    },
    {
      title: 'ชื่อ',
      key: 'user',
      dataIndex: 'user',
      align: 'center',
      render: (txt) =>
        txt?.profile?.firstname_th + ' ' + txt?.profile?.lastname_th,
    },
    {
      title: 'ประเภทการลา',
      key: 'mas_leave_type',
      dataIndex: 'mas_leave_type',
      align: 'center',
      render: (record) => {
        return <div>{record?.name}</div>;
      },
    },
    {
      title: 'จากวันที่',
      key: 'start_date',
      dataIndex: 'start_date',
      align: 'center',
      render: (record) => {
        return record
          ? dayjs(new Date(record)).format('DD/MM/YYYY')
          : undefined;
      },
    },
    {
      title: 'ถึงวันที่',
      key: 'end_date',
      dataIndex: 'end_date',
      align: 'center',
      render: (record) => {
        return record
          ? dayjs(new Date(record)).format('DD/MM/YYYY')
          : undefined;
      },
    },
    {
      title: 'จำนวนวัน',
      key: 'quantity_day',
      dataIndex: 'quantity_day',
      align: 'center',
    },
    {
      title: 'สถานะการลา',
      key: 'quantity_hours',
      dataIndex: 'quantity_hours',
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

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const onFinish = (value) => {
    drawertype === 1 &&
      Swal.fire({
        title: `ยืนยันการแก้ไขข้อมูลการลา`,
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: token.token.colorPrimary,
        denyButtonColor: '#ea4e4e',
        confirmButtonText: 'ตกลง',
        denyButtonText: `ยกเลิก`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          createLeaveData({
            variables: {
              data: {
                ...value,
                id: selectedrow?.id,
              },
            },
          })
            .then((val) => {
              console.log(val);
              if (val.data?.createddata_leave?.status) {
                Swal.fire(`แก้ไขข้อมูลการลาสำเร็จ!`, '', 'success');
                refetch();
                form.resetFields();
                setOpen(false);
              }
            })
            .catch((err) => {
              Swal.fire(`แก้ไขข้อมูลการลาไม่สำเร็จ!`, '', 'error');
              console.error(err);
            });
        }
      });
  };

  return (
    <>
      <div className="flex text-2xl ml-2 pt-4">
        <RiCalendarCheckLine size={30} />
        <div className="ml-2 text-lg">การอนุมัติใบลา</div>
      </div>
      <Divider style={{ backgroundColor: token.token.colorPrimary }} />

      <Card className="shadow-md mb-5">
        <Form form={formSearch}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item name={'name'} colon={false} label={'ชื่อ'}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item name={'position2Id'} colon={false} label={'แผนก'}>
                <Select
                  onChange={onChangePosition}
                  options={mas_positionlevel2}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item name={'position3Id'} colon={false} label={'ตำแหน่ง'}>
                <Select
                  options={maspositionlevel3 ? maspositionlevel3 : []}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <div className="ml-2 items-center flex justify-end">
                <Space>
                  <Button
                    type="primary"
                    style={{ backgroundColor: token.token.colorPrimary }}
                    onClick={() => {
                      refetch(formSearch.getFieldsValue());
                    }}
                  >
                    Search
                  </Button>
                  <Button
                    onClick={() => {
                      formSearch.resetFields();
                      refetch(formSearch.getFieldsValue());
                    }}
                  >
                    Reset
                  </Button>
                </Space>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card className="shadow-md mb-3">
        <Table
          columns={columns}
          rowKey={'id'}
          dataSource={data_approve?.getleava_alldata as any}
        ></Table>
      </Card>

      <Drawer
        title={`${
          drawertype == 1
            ? 'แก้ไขรายละเอียดการอนุมัติใบลา'
            : 'ดูรายละเอียดการอนุมัติใบลา'
        }`}
        onClose={onClose}
        open={open}
        width="40%"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row>
            <Col span={12}>
              <Form.Item className="mb-3" label={'การอนุมัติใบลา'}>
                <div className="text-lg font-bold">
                  <u style={{ color: token.token.colorPrimary }}>
                    {selectedrow?.user?.profile.firstname_th}{' '}
                    {selectedrow?.user?.profile?.lastname_th}
                  </u>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item name={'leavetype_id'} label={'ประเภทการลา'}>
                {drawertype == 2 ? (
                  <Select options={selectleavetype} allowClear disabled />
                ) : (
                  <Select options={selectleavetype} allowClear />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={'start_date'} label={'จากวันที่'}>
                {drawertype == 2 ? (
                  <DatePicker
                    style={{ width: '100%' }}
                    format={'DD-MM-YYYY'}
                    disabled
                  />
                ) : (
                  <DatePicker style={{ width: '100%' }} format={'DD-MM-YYYY'} />
                )}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name={'end_date'} label={'ถึงวันที่'}>
                {drawertype == 2 ? (
                  <DatePicker
                    style={{ width: '100%' }}
                    format={'DD-MM-YYYY'}
                    disabled
                  />
                ) : (
                  <DatePicker style={{ width: '100%' }} format={'DD-MM-YYYY'} />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={'quantity_day'} label={'จำนวนวัน'}>
                {drawertype == 2 ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={'quantity_hours'} label={'จำนวนชั่วโมง'}>
                {drawertype == 2 ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name={'detail_leave'} label={'เหตุผลการลา'}>
                {drawertype == 2 ? (
                  <TextArea rows={4} disabled />
                ) : (
                  <TextArea rows={4} />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item label={'ไฟล์เอกสาร'}>
                {drawertype == 2 ? (
                  <Upload disabled>
                    <Button
                      style={{ width: '100%' }}
                      icon={<UploadOutlined />}
                      disabled
                    >
                      ไฟล์เอกสาร PDF
                    </Button>
                  </Upload>
                ) : (
                  <Upload>
                    <Button style={{ width: '100%' }} icon={<UploadOutlined />}>
                      ไฟล์เอกสาร PDF
                    </Button>
                  </Upload>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row
            className="mb-10"
            style={{
              display: 'flex',
              justifyItems: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Col>
              <Form.Item name={'Status'}>
                {drawertype == 2 ? (
                  <Radio.Group onChange={onChange} value={value} disabled>
                    <Radio value={2}>อนุมัติ</Radio>
                    <Radio value={3}>ไม่อนุมัติ</Radio>
                  </Radio.Group>
                ) : (
                  <Radio.Group onChange={onChange} value={value}>
                    <Radio value={2}>อนุมัติ</Radio>
                    <Radio value={3}>ไม่อนุมัติ</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row
            gutter={16}
            style={{
              display: 'flex',
              justifyItems: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Form.Item>
              <Space>
                {drawertype !== 2 && (
                  <Button
                    htmlType="submit"
                    type="primary"
                    style={{ backgroundColor: token.token.colorPrimary }}
                  >
                    บันทึก
                  </Button>
                )}
                <Button onClick={onClose}>ยกเลิก</Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default Approveleave;
