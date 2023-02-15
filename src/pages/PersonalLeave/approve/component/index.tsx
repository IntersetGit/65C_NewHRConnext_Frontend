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
import edit from '../../../../assets/Edit.png';
import Del from '../../../../assets/DEL.png';
import View from '../../../../assets/View.png';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
const { useToken } = theme;
const { TextArea } = Input;
import {
  FETCH_BYID_LEAVE,
  LEAVE_TYPE_DATA,
  CREATE_LEAVE,
} from '../../../../service/graphql/Leave';
import { useQuery, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { PageRoleAndPermissionType } from '../../../../context/AuthContext';
import { getFilePath } from '../../../../util';
import dayjs from 'dayjs';

type ProfileApprovePropsType = {
  role?: PageRoleAndPermissionType;
};

const ProfileApprove: React.FC<ProfileApprovePropsType> = ({ role }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const token = useToken();
  const [drawertype, setDrawertype] = useState(1);
  const [selectedrow, setselectedrow] = useState<any>();
  const { data: dataleaveme, loading, refetch } = useQuery(FETCH_BYID_LEAVE);
  const { data: leave_type_data } = useQuery(LEAVE_TYPE_DATA);
  const [createLeaveData] = useMutation(CREATE_LEAVE);

  const selectleavetype = leave_type_data?.getleavetypedata?.map((e) => {
    return {
      label: e?.name,
      value: e?.id,
    };
  });

  const showDrawer = (type: any) => {
    setDrawertype(type);
    setOpen(true);
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
      showDrawer(2);
      setselectedrow(record);
      form.setFieldsValue({
        ...record,
        start_date: record.start_date ? dayjs(record.start_date) : undefined,
        end_date: record.end_date ? dayjs(record.end_date) : undefined,
      });
    } else if (key === 'view') {
      showDrawer(3);
    } else if (key === 'delete') {
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
      align: 'center',
      render: (record: any) => {
        return record.mas_leave_type.name;
      },
    },
    {
      title: 'จากวันที่',
      key: 'mas_leave_type',
      align: 'center',
      render: (record) => {
        return record.start_date
          ? dayjs(new Date(record.start_date)).format('DD/MM/YYYY')
          : undefined;
      },
    },
    {
      title: 'ถึงวันที่',
      key: 'to_date',
      align: 'center',
      render: (record) => {
        return record.end_date
          ? dayjs(new Date(record.end_date)).format('DD/MM/YYYY')
          : undefined;
      },
    },
    {
      title: 'จำนวนวัน',
      key: 'count_date',
      align: 'center',
      render: (record) => {
        return record.quantity_day;
      },
    },
    {
      title: 'จำนวนวัน',
      key: 'count_hour',
      align: 'center',
      render: (record) => {
        return record.quantity_hours;
      },
    },
    {
      title: 'สถานะการลา',
      key: 'Status',
      align: 'center',
      render: (record) => {
        return (
          <div>
            {record.Status === 1
              ? 'อนุมัติ'
              : record.Status === 2
              ? 'รออนุมัติ'
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
    drawertype === 1
      ? Swal.fire({
          title: `ยืนยันการสร้างข้อมูลการลา`,
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
                  user_id: dataleaveme?.getleava_datame?.data_all?.[0]?.id,
                },
              },
            })
              .then((val) => {
                console.log(val);
                if (val.data?.createddata_leave?.status) {
                  Swal.fire(`สร้างข้อมูลการลาสำเร็จ!`, '', 'success');
                  refetch();
                  form.resetFields();
                  setOpen(false);
                }
              })
              .catch((err) => {
                Swal.fire(`สร้างข้อมูลการลาไม่สำเร็จ!`, '', 'error');
                console.error(err);
              });
          }
        })
      : Swal.fire({
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
                src={
                  getFilePath() +
                  dataleaveme?.getleava_datame?.data_all?.[0]?.profile?.avatar
                }
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
                {
                  dataleaveme?.getleava_datame?.data_all?.[0]?.profile
                    ?.firstname_th
                }{' '}
                {
                  dataleaveme?.getleava_datame?.data_all?.[0]?.profile
                    ?.lastname_th
                }
              </u>
              <div className="my-4">
                {dataleaveme?.getleava_datame?.data_all?.[0]?.Position_user?.[0]
                  ?.mas_positionlevel3?.name
                  ? dataleaveme?.getleava_datame?.data_all[0]?.Position_user[0]
                      ?.mas_positionlevel3?.name
                  : 'ไม่มีตำแหน่งงาน'}
              </div>
            </div>
          </Col>
        </Row>

        <Row className="my-4" gutter={[16, 8]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={6}>
            <Card className="shadow-lg border-4 border-[#8cb369] bg-[#8cb369]">
              <div className="flex text-lg font-bold justify-center items-center mx-12">
                <MdAirplanemodeActive className="text-green-900" size={'38'} />{' '}
                ลาพักร้อน {dataleaveme?.getleava_datame?.data_count?.count1}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6}>
            <Card className="shadow-lg border-4 border-[#fddd5c] bg-[#fddd5c]">
              <div className="flex text-lg font-bold justify-center items-center">
                <RiBriefcase5Line className="text-[#b48a4d]" size={'38'} />{' '}
                ลาป่วย {dataleaveme?.getleava_datame?.data_count?.count3}
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
                ลากิจ {dataleaveme?.getleava_datame?.data_count?.count2}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6}>
            <Card className="shadow-lg border-4 border-[#b491c8] bg-[#b491c8]">
              <div className="flex text-lg font-bold justify-center items-center">
                <MdDragIndicator className="text-[#7c5295]" size={'38'} />{' '}
                ลาอื่น ๆ {dataleaveme?.getleava_datame?.data_count?.count4}
              </div>
            </Card>
          </Col>
        </Row>

        <Row
          gutter={16}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Col span={3}>
            <Select
              style={{ width: '100%' }}
              options={[
                { value: '2023', label: '2023' },
                { value: '2022', label: '2022' },
                { value: '2021', label: '2021' },
              ]}
              allowClear
            ></Select>
          </Col>
          <Col>
            <Button
              type="primary"
              style={{ backgroundColor: token.token.colorPrimary }}
              onClick={() => {
                showDrawer(1);
              }}
            >
              + สร้างใบลา
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={
            dataleaveme?.getleava_datame?.data_all &&
            dataleaveme?.getleava_datame?.data_all?.length > 0
              ? (dataleaveme?.getleava_datame?.data_all?.[0]?.data_leave as any)
              : []
          }
        ></Table>
      </Card>

      <Drawer title="สร้างใบลา" size="large" onClose={onClose} open={open}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row>
            <Col span={12}>
              <Form.Item name={'leavetype_id'} label={'ประเภทการลา'}>
                <Select options={selectleavetype} allowClear />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={'start_date'} label={'จากวันที่'}>
                <DatePicker style={{ width: '100%' }} format={'DD-MM-YYYY'} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name={'end_date'} label={'ถึงวันที่'}>
                <DatePicker style={{ width: '100%' }} format={'DD-MM-YYYY'} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={'quantity_day'} label={'จำนวนวัน'}>
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  max={31}
                  defaultValue={0}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name={'quantity_hours'} label={'จำนวนชั่วโมง'}>
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  max={24}
                  defaultValue={0}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name={'detail_leave'} label={'เหตุผลการลา'}>
                <TextArea rows={6} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item label={'ไฟล์เอกสาร'}>
                <Upload>
                  <Button style={{ width: '100%' }} icon={<UploadOutlined />}>
                    เปิดเอกสาร PDF
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          {/* <Row>
            <Col span={12}>
              <Form.Item name={'leave_approve'} label={'สถานะการลา'}>
                <Select
                  options={[
                    { value: '1', label: 'อนุมัติ' },
                    { value: '2', label: 'รออนุมัติ' },
                    { value: '3', label: 'ไม่อนุมัติ' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row> */}

          <Row gutter={16} style={{ float: 'right' }}>
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

export default ProfileApprove;
