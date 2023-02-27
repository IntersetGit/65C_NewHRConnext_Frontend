import { MoreOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Divider,
  theme,
  Card,
  Form,
  Row,
  Col,
  Input,
  Button,
  Table,
  Dropdown,
  Avatar,
  Drawer,
  DatePicker,
  Upload,
  Select,
  Space,
  InputNumber,
} from 'antd';
import { RiCalendar2Line, RiBriefcase5Line } from 'react-icons/ri';
import {
  MdOutlineLocalHospital,
  MdAirplanemodeActive,
  MdDragIndicator,
} from 'react-icons/md';
import edit from '../../../assets/Edit.png';
import Del from '../../../assets/DEL.png';
import View from '../../../assets/View.png';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useMutation, useQuery } from '@apollo/client';
import {
  FETCH_ALL_LEAVE,
  LEAVE_TYPE_DATA,
  CREATE_LEAVE,
  DELETE_LEAVE,
} from '../../../service/graphql/Leave';
import { getFilePath } from '../../../util';
import { DateCalculateLeave } from 'aunwalibrary-toolkit';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
const { useToken } = theme;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const Approve: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [drawertype, setdrawertype] = useState(1);
  const [selectedrow, setselectedrow] = useState<any>();
  const token = useToken();
  const location = useLocation();
  let propsstate = location.state as any;
  const {
    data: dataleaveme,
    loading,
    refetch,
  } = useQuery(FETCH_ALL_LEAVE, { variables: { userId: propsstate?.id } });
  const { data: leave_type_data } = useQuery(LEAVE_TYPE_DATA);
  const [createLeaveData] = useMutation(CREATE_LEAVE);
  const [deleteLeave] = useMutation(DELETE_LEAVE);

  const showDrawer = (type) => {
    setOpen(true);
    setdrawertype(type);
  };

  const onClose = () => {
    setOpen(false);
  };

  const selectleavetype = leave_type_data?.getleavetypedata?.map((e) => {
    return {
      label: e?.name,
      value: e?.id,
    };
  });

  const onChangeCountDate = (date, dateString) => {
    if (date?.length >= 2) {
      const resultdate = DateCalculateLeave(
        dayjs(date[0]),
        dayjs(date[1]),
        '9',
      );
      form.setFieldsValue({
        quantity_day: resultdate?.dayleave,
        quantity_hours: resultdate?.hoursleave,
      });
    }
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
      showDrawer(1);
      setselectedrow(record);
      form.setFieldsValue({
        ...record,
        start_date: dayjs(record.start_date),
        end_date: dayjs(record.end_date),
      });
    } else if (key === 'view') {
      showDrawer(2);
      form.setFieldsValue({
        ...record,
        start_date: dayjs(record.start_date),
        end_date: dayjs(record.end_date),
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
      align: 'center',
      render: (_: any, record: any, index: any) => {
        return index + 1;
      },
    },
    {
      title: 'ประเภทการลา',
      key: 'mas_leave_type',
      dataIndex: 'mas_leave_type',
      align: 'center',
      render: (record) => {
        return record.name;
      },
    },
    {
      title: 'จากวันที่',
      key: 'start_date',
      dataIndex: 'start_date',
      align: 'center',
      render: (record) => {
        return dayjs(new Date(record)).format('DD/MM/YYYY');
      },
    },
    {
      title: 'ถึงวันที่',
      key: 'end_date',
      dataIndex: 'end_date',
      align: 'center',
      render: (record) => {
        return dayjs(new Date(record)).format('DD/MM/YYYY');
      },
    },
    {
      title: 'จำนวนวัน',
      key: 'quantity_day',
      dataIndex: 'quantity_day',
      align: 'center',
    },
    {
      title: 'จำนวนชั่วโมง',
      key: 'quantity_hours',
      dataIndex: 'quantity_hours',
      align: 'center',
    },
    {
      title: 'สถานะการลา',
      key: 'Status',
      dataIndex: 'Status',
      align: 'center',
      render: (record) => {
        return (
          <div>
            {record === 1
              ? 'รออนุมัติ'
              : record === 2
              ? 'อนุมัติ'
              : 'ไม่อนุมัติ'}
          </div>
        );
      },
    },
    {
      title: 'Action',
      key: 'Action',
      align: 'center',
      render: (record: any) => (
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

  const onFinish = (value) => {
    drawertype === 1;
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
              start_date: value?.start_date[0],
              end_date: value?.start_date[1],
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
        <RiCalendar2Line />
        <div className="ml-2 text-lg">การลา</div>
      </div>

      <Divider style={{ backgroundColor: token.token.colorPrimary }} />

      <Card className="shadow-xl">
        <Row className="py-6" gutter={16}>
          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div>
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                style={{ width: 150, height: 150 }}
                src={getFilePath() + propsstate?.profile?.avatar}
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
                {propsstate?.profile?.firstname_th}{' '}
                {propsstate?.profile?.lastname_th}
              </u>
              <div className="my-4">
                {propsstate?.Position_user?.[0]?.mas_positionlevel3?.name}
              </div>
            </div>
          </Col>
        </Row>

        <Row className="my-4" gutter={[16, 8]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={6}>
            <Card className="shadow-lg border-4 border-[#8cb369] bg-[#8cb369]">
              <div className="flex text-lg font-bold justify-center items-center mx-12">
                <MdAirplanemodeActive className="text-green-900" size={'38'} />{' '}
                ลาพักร้อน {dataleaveme?.getAllleave?.data_count?.count1}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6}>
            <Card className="shadow-lg border-4 border-[#fddd5c] bg-[#fddd5c]">
              <div className="flex text-lg font-bold justify-center items-center">
                <RiBriefcase5Line className="text-[#b48a4d]" size={'38'} />{' '}
                ลากิจ {dataleaveme?.getAllleave?.data_count?.count2}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6}>
            <Card className="shadow-lg border-4 border-[#f4a259] bg-[#f4a259]">
              <div className="flex text-lg font-bold justify-center items-center">
                <MdOutlineLocalHospital
                  className="text-[#e2711d]"
                  size={'38'}
                />{' '}
                ลาป่วย {dataleaveme?.getAllleave?.data_count?.count3}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6}>
            <Card className="shadow-lg border-4 border-[#b491c8] bg-[#b491c8]">
              <div className="flex text-lg font-bold justify-center items-center">
                <MdDragIndicator className="text-[#7c5295]" size={'38'} />{' '}
                ลาอื่น ๆ {dataleaveme?.getAllleave?.data_count?.count4}
              </div>
            </Card>
          </Col>
        </Row>

        {/* <Row style={{ float: 'right' }}>
          <Col className="my-2" span={24}>
            <Button
              type="primary"
              size="middle"
              style={{
                marginBottom: '10px',
                backgroundColor: token.token.colorPrimary,
              }}
            >
              + สร้างใบลาใหม่
            </Button>
          </Col>
        </Row> */}

        <Table
          columns={columns}
          rowKey={'id'}
          scroll={{ x: 1500 }}
          dataSource={
            dataleaveme?.getAllleave?.data_all?.[0]?.data_leave as any
          }
        ></Table>
      </Card>

      <Drawer
        title={`${
          drawertype == 1 ? 'แก้ไขรายละเอียดการลา' : 'ดูรายละเอียดการลา'
        }`}
        size="large"
        onClose={onClose}
        open={open}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ quantity_day: 0, quantity_hours: 0 }}
        >
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
            <Col span={24}>
              <Form.Item
                name={'start_date'}
                label={'จากวันที่ - ถึงวันที่'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกวันที่จะลา',
                  },
                ]}
              >
                {drawertype == 2 ? (
                  <RangePicker
                    style={{
                      width: '100%',
                    }}
                    className="button-range"
                    showTime={{ format: 'HH:mm' }}
                    format="DD-MM-YYYY HH:mm"
                    onChange={onChangeCountDate}
                    disabled
                    allowClear
                  />
                ) : (
                  <RangePicker
                    className="button-range"
                    style={{ width: '100%' }}
                    showTime={{ format: 'HH:mm' }}
                    format="DD-MM-YYYY HH:mm"
                    onChange={onChangeCountDate}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>

            {/* <Col span={12}>
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
            </Col> */}
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={'quantity_day'} label={'จำนวนวัน'}>
                {drawertype == 2 ? (
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    max={31}
                    disabled
                  />
                ) : (
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    max={31}
                    disabled
                  />
                )}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name={'quantity_hours'} label={'จำนวนชั่วโมง'}>
                {drawertype == 2 ? (
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    max={31}
                    disabled
                  />
                ) : (
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    max={31}
                    disabled
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                name={'detail_leave'}
                label={'เหตุผลการลา'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณาใส่เหตุผลการลา',
                  },
                ]}
              >
                {drawertype == 2 ? (
                  <TextArea rows={6} disabled />
                ) : (
                  <TextArea rows={6} />
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
                      เปิดเอกสาร PDF
                    </Button>
                  </Upload>
                ) : (
                  <Upload>
                    <Button style={{ width: '100%' }} icon={<UploadOutlined />}>
                      เปิดเอกสาร PDF
                    </Button>
                  </Upload>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item name={'Status'} label={'สถานะการลา'}>
                {drawertype == 2 ? (
                  <Select
                    options={[
                      { value: 1, label: 'รออนุมัติ' },
                      { value: 2, label: 'อนุมัติ' },
                      { value: 3, label: 'ไม่อนุมัติ' },
                    ]}
                    disabled
                  />
                ) : (
                  <Select
                    options={[
                      { value: 1, label: 'รออนุมัติ' },
                      { value: 2, label: 'อนุมัติ' },
                      { value: 3, label: 'ไม่อนุมัติ' },
                    ]}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} style={{ float: 'right' }}>
            <Form.Item>
              <Space>
                {drawertype !== 2 && (
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
                )}
                <Button
                  style={{
                    marginBottom: '10px',
                  }}
                  onClick={onClose}
                >
                  ยกเลิก
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default Approve;
