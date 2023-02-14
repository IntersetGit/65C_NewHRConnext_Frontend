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
import moment from 'moment';
import { useMutation, useQuery } from '@apollo/client';
import {
  FETCH_ALL_LEAVE,
  LEAVE_TYPE_DATA,
  CREATE_LEAVE,
} from '../../../service/graphql/Leave';
import { getFilePath } from '../../../util';
const { useToken } = theme;
const { TextArea } = Input;

const Approve: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const token = useToken();
  const location = useLocation();
  const { ability } = useAuth();
  let propsstate = location.state as any;
  console.log(propsstate);
  const {
    data: dataleaveme,
    loading,
    refetch,
  } = useQuery(FETCH_ALL_LEAVE, { variables: { userId: propsstate?.id } });
  const { data: leave_type_data } = useQuery(LEAVE_TYPE_DATA);
  const [createLeaveData] = useMutation(CREATE_LEAVE);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const genarateMenu = (record: any) => {
    return [
      // {
      //   key: 'edit',
      //   label: 'แก้ไข',
      //   icon: <img style={{ width: '17px', height: '17px' }} src={edit} />,
      //   onClick: (e: any) => onMenuClick(e, record),
      // },
      {
        key: 'view',
        label: 'ดูข้อมูล',
        icon: <img style={{ width: '17px', height: '17px' }} src={View} />,
        onClick: (e: any) => onMenuClick(e, record),
      },
      // {
      //   key: 'delete',
      //   label: 'ลบข้อมูล',
      //   icon: <img style={{ width: '20px', height: '20px' }} src={Del} />,
      //   onClick: (e: any) => onMenuClick(e, record),
      // },
    ];
  };

  const onMenuClick = (event: any, record: any) => {
    const { key } = event;
    if (key === 'edit') {
    } else if (key === 'view') {
      showDrawer();
      form.setFieldsValue({
        ...record,
        from_date: moment(record.from_date) as any,
        to_date: moment(record.to_date) as any,
      });
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
        return moment(new Date(record)).format('DD/MM/YYYY');
      },
    },
    {
      title: 'ถึงวันที่',
      key: 'end_date',
      dataIndex: 'end_date',
      align: 'center',
      render: (record) => {
        return moment(new Date(record)).format('DD/MM/YYYY');
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
              ? 'อนุมัติ'
              : record === 2
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
                ลาพักร้อน {propsstate?.leave_vacation}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6}>
            <Card className="shadow-lg border-4 border-[#fddd5c] bg-[#fddd5c]">
              <div className="flex text-lg font-bold justify-center items-center">
                <RiBriefcase5Line className="text-[#b48a4d]" size={'38'} />{' '}
                ลากิจ {propsstate?.leave_bussiness}
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
                ลาป่วย {propsstate?.leave_sick}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6}>
            <Card className="shadow-lg border-4 border-[#b491c8] bg-[#b491c8]">
              <div className="flex text-lg font-bold justify-center items-center">
                <MdDragIndicator className="text-[#7c5295]" size={'38'} />{' '}
                ลาอื่น ๆ {propsstate?.leave_other}
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
          dataSource={
            dataleaveme?.getAllleave?.data_all?.[0]?.data_leave as any
          }
        ></Table>
      </Card>

      <Drawer
        title="รายละเอียดการลา"
        size="large"
        onClose={onClose}
        open={open}
      >
        <Form form={form} layout="vertical">
          <Row>
            <Col span={12}>
              <Form.Item name={'leave_type'} label={'ประเภทการลา'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={'start_date'} label={'จากวันที่'}>
                <DatePicker style={{ width: '100%' }} format={'YYYY-MM-DD'} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name={'end_date'} label={'ถึงวันที่'}>
                <DatePicker style={{ width: '100%' }} format={'YYYY-MM-DD'} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={'quantity_day'} label={'จำนวนวัน'}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name={'quantity_hours'} label={'จำนวนชั่วโมง'}>
                <Input />
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

          <Row>
            <Col span={12}>
              <Form.Item name={'Status'} label={'สถานะการลา'}>
                <Select
                  options={[
                    { value: '1', label: 'อนุมัติ' },
                    { value: '2', label: 'รออนุมัติ' },
                    { value: '3', label: 'ไม่อนุมัติ' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

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

export default Approve;
