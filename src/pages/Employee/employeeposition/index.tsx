import { AntDesignOutlined, MoreOutlined } from '@ant-design/icons';
import {
  Avatar,
  Tabs,
  Divider,
  theme,
  Row,
  Col,
  DatePicker,
  Card,
  Input,
  Table,
  Dropdown,
  Drawer,
  Button,
  Form,
  Select,
  Space,
} from 'antd';
import { ImProfile } from 'react-icons/im';
import {
  generatePath,
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import edit from '../../../assets/Edit.png';
import Del from '../../../assets/DEL.png';
import View from '../../../assets/View.png';
import { useEffect, useState } from 'react';
import {
  FETCH_GETALL_POSITION,
  CRETE_POSITION_USER,
  POSITION,
} from '../../../service/graphql/Position';
import { FETCH_GETALLUSER } from '../../../service/graphql/Users';
import { useMutation, useQuery } from '@apollo/client';
import { Getposition_UserQuery } from '../../../__generated__/graphql';
import { getFilePath } from '../../../util';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

const { useToken } = theme;

// interface DataType {
//   key: string;
//   date: Date;
//   position: string;
//   role: string;
//   boss: string;
// }

const PositionEmployee: React.FC = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  let { companycode } = useParams();
  const location = useLocation();
  let propsstate = location.state as any;
  console.log(propsstate);
  const token = useToken();
  const [drawerType, setDrawerType] = useState(1);
  const [selectedrow, setselectedrow] = useState<any>();
  const { data: position_data, refetch } = useQuery(FETCH_GETALL_POSITION, {
    variables: { getpositionUserId: propsstate?.userId },
  });
  console.log('position_data', position_data);
  const { data: positionlevel1 } = useQuery(POSITION);
  const { data: header } = useQuery(FETCH_GETALLUSER);
  const [cretePositonUser] = useMutation(CRETE_POSITION_USER);
  const [maspositionlevel1, setMasPostionLevel1] = useState<
    { value?: string | null; label?: string | null }[] | undefined
  >(undefined);
  const [maspositionlevel2, setMasPostionLevel2] = useState<
    { value?: string | null; label?: string | null }[] | undefined
  >(undefined);

  const header_data = header?.users?.map((e) => {
    return {
      label: (
        <div>
          {e?.profile?.firstname_th} {e?.profile?.lastname_th}
        </div>
      ),
      value: e?.profile?.userId,
    };
  });

  const selectposition = positionlevel1?.getMasPositon?.map((e) => {
    return {
      label: e?.name,
      value: e?.id,
    };
  });

  const onChangeMasLevel1 = (value: any) => {
    if (!value) {
      setMasPostionLevel1([]);
      setMasPostionLevel2([]);
    }
    form.setFieldValue('position2_id', null);
    form.setFieldValue('position3_id', null);
    const maspositionlevel1 = positionlevel1?.getMasPositon
      ?.find((e) => e?.id === value)
      ?.mas_positionlevel2?.map((e) => {
        return {
          label: e?.name,
          value: e?.id,
        };
      });
    console.log(value);
    setMasPostionLevel1(maspositionlevel1 ? maspositionlevel1 : []);
  };

  const onChangeMasLevel2 = (value: any) => {
    form.setFieldValue('position3_id', null);
    const maspositionlevel2 = positionlevel1?.getMasPositon
      ?.find((e) => e?.mas_positionlevel2?.find((_e) => _e?.id === value))
      ?.mas_positionlevel2?.find((e) => e?.id === value)
      ?.mas_positionlevel3?.map((e) => {
        return {
          label: e?.name,
          value: e?.id,
        };
      });
    console.log(value);
    setMasPostionLevel2(maspositionlevel2 ? maspositionlevel2 : []);
  };

  const onChange = (key: string) => {
    navigate(generatePath(key, { companycode }), { state: propsstate });
  };

  const [open, setOpen] = useState(false);

  const showDrawer = (type: any) => {
    setOpen(true);
    setDrawerType(type);
  };

  const onClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const onFinish = (value: any) => {
    drawerType === 1
      ? Swal.fire({
          title: `ยืนยันการเพิ่มข้อมูลตำแหน่งงาน`,
          icon: 'warning',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonColor: token.token.colorPrimary,
          denyButtonColor: '#ea4e4e',
          confirmButtonText: 'ตกลง',
          denyButtonText: `ยกเลิก`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            cretePositonUser({
              variables: {
                data: {
                  ...value,
                  user_id: propsstate?.userId,
                },
              },
            })
              .then((val) => {
                console.log(val);
                if (val.data?.createdposition_user?.status) {
                  Swal.fire(`เพิ่มข้อมูลตำแหน่งงานสำเร็จ!`, '', 'success');
                  refetch();
                  form.resetFields();
                }
              })
              .catch((err) => {
                Swal.fire(`เพิ่มข้อมูลตำแหน่งงานไม่สำเร็จ!`, '', 'error');
                console.error(err);
              });
          }
        })
      : Swal.fire({
          title: `ยืนยันการแก้ไขข้อมูลตำแหน่งงาน`,
          icon: 'warning',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonColor: token.token.colorPrimary,
          denyButtonColor: '#ea4e4e',
          confirmButtonText: 'ตกลง',
          denyButtonText: `ยกเลิก`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            cretePositonUser({
              variables: {
                data: {
                  ...value,
                  user_id: propsstate?.userId,
                  id: selectedrow?.id,
                },
              },
            })
              .then((val) => {
                console.log(val);
                if (val.data?.createdposition_user?.status) {
                  Swal.fire(`แก้ไขข้อมูลตำแหน่งงานสำเร็จ!`, '', 'success');
                  refetch();
                  form.resetFields();
                }
              })
              .catch((err) => {
                Swal.fire(`แก้ไขข้อมูลตำแหน่งงานไม่สำเร็จ!`, '', 'error');
                console.error(err);
                form.resetFields();
              });
          }
        });
    setOpen(false);
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
      showDrawer(2);
      setselectedrow(record);
      console.log(record);
      onChangeMasLevel1(record?.mas_positionlevel1?.id);
      onChangeMasLevel2(record?.mas_positionlevel2?.id);
      form.setFieldsValue({
        ...record,
        date: record?.date ? dayjs(record?.date) : undefined,
        headderId: record?.header?.id,
        role_company: propsstate?.Role_company?.name,
      });
    } else if (key === 'view') {
      showDrawer(3);
      onChangeMasLevel1(record?.mas_positionlevel1?.id);
      onChangeMasLevel2(record?.mas_positionlevel2?.id);
      form.setFieldsValue({
        ...record,
        date: record?.date ? dayjs(record?.date) : undefined,
      });
    } else if (key === 'delete') {
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: 'วันที่มีผล',
      key: 'date',
      dataIndex: 'date',
      align: 'center',
      render: (record: any) => dayjs(record).format('DD-MM-YYYY') as any,
    },
    {
      title: 'ตำแหน่ง',
      key: 'mas_positionlevel3',
      dataIndex: 'mas_positionlevel3',
      align: 'center',
      render: (record: any) => {
        return <div>{record?.name}</div>;
      },
    },
    {
      title: 'หน้าที่',
      key: 'role',
      dataIndex: 'role',
      align: 'center',
    },
    {
      title: 'หัวหน้างาน',
      key: 'header',
      dataIndex: 'header',
      align: 'center',
      render: (record) => {
        return (
          <div>
            {record?.profile?.firstname_th} {record?.profile?.lastname_th}
          </div>
        );
      },
    },
    {
      title: 'Action',
      key: 'Action',
      align: 'center',
      render: (record) => (
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
      <Tabs
        defaultActiveKey={`/:companycode/employee/positionemployee`}
        className="right-tab"
        onChange={onChange}
        items={[
          {
            label: `ข้อมูลพนักงาน`,
            key: `/:companycode/employee/useremployee?id=${propsstate?.id}`,
          },
          {
            label: `ตำแหน่งงาน`,
            key: '/:companycode/employee/positionemployee',
          },
        ]}
      />

      <div className="flex text-3xl ml-2 pt-4">
        <ImProfile />
        <div className="ml-2 text-lg">ตำแหน่งงาน</div>
      </div>
      <Divider style={{ backgroundColor: token.token.colorPrimary }} />

      <Card className="shadow-xl">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div>
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={<AntDesignOutlined />}
                src={getFilePath() + propsstate?.avatar}
              ></Avatar>
            </div>
          </Col>

          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div className="text-lg font-bold">
              <u className="text-blue-800">
                {propsstate?.prefix_th} {propsstate?.firstname_th}{' '}
                {propsstate?.lastname_th}
              </u>
              <div className="mt-4">
                {position_data?.getposition_user?.[0]?.mas_positionlevel3?.name
                  ? position_data?.getposition_user?.[0]?.mas_positionlevel3
                      ?.name
                  : 'ไม่มีตำแหน่งงาน'}
                {/* {position_data?.getposition_user?.[
                  position_data?.getposition_user?.length - 1
                ]?.mas_positionlevel3?.name ?? 'ไม่มีตำแหน่งงาน'} */}
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={16} className="py-10">
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <div className="py-3">วันเดือนปีที่เริ่มงาน</div>
            <DatePicker
              style={{ width: '100%' }}
              size="large"
              format={'DD-MM-YYYY'}
              defaultValue={dayjs(propsstate?.start_date_work) as any}
              disabled
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <div className="py-3">หมายเลขประจำตัวผู้เสียภาษี</div>
            <Input
              defaultValue={propsstate?.citizen_id}
              size="large"
              disabled
            />
          </Col>
        </Row>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          ตำแหน่ง / หน้าที่
          <Button
            type="primary"
            style={{
              backgroundColor: token.token.colorPrimary,
            }}
            onClick={() => {
              showDrawer(1);
            }}
          >
            + Update ตำแหน่งงานปัจจุบัน
          </Button>
        </div>

        <Table
          className="py-4"
          columns={columns}
          rowKey={'id'}
          dataSource={position_data?.getposition_user as any}
        ></Table>
      </Card>

      <Drawer
        title={`${
          drawerType === 1
            ? 'เพิ่มตำแหน่งงาน'
            : drawerType === 2
            ? 'แก้ไขตำแหน่งงาน'
            : 'ดูตำแหน่งงาน'
        }`}
        size="large"
        open={open}
        onClose={onClose}
      >
        <Form form={form} layout={'vertical'} size="large" onFinish={onFinish}>
          <Row>
            <Col span={12}>
              <Form.Item name={'date'} label={'วันที่มีผล'}>
                {drawerType === 3 || propsstate?.mode == 'view' ? (
                  <DatePicker
                    style={{ width: '100%' }}
                    format={'DD-MM-YYYY'}
                    disabled
                  ></DatePicker>
                ) : (
                  <DatePicker
                    style={{ width: '100%' }}
                    format={'DD-MM-YYYY'}
                  ></DatePicker>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name={'position1_id'} label={'ฝ่าย'}>
                {drawerType === 3 || propsstate?.mode == 'view' ? (
                  <Select
                    options={selectposition ? selectposition : []}
                    onChange={onChangeMasLevel1}
                    allowClear
                    disabled
                  />
                ) : (
                  <Select
                    options={selectposition ? selectposition : []}
                    onChange={onChangeMasLevel1}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name={'position2_id'} label={'แผนก'}>
                {drawerType === 3 || propsstate?.mode == 'view' ? (
                  <Select
                    options={maspositionlevel1 ? maspositionlevel1 : []}
                    onChange={onChangeMasLevel2}
                    allowClear
                    disabled
                  />
                ) : (
                  <Select
                    options={maspositionlevel1 ? maspositionlevel1 : []}
                    onChange={onChangeMasLevel2}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name={'position3_id'} label={'ตำแหน่ง'}>
                {drawerType === 3 || propsstate?.mode == 'view' ? (
                  <Select
                    options={maspositionlevel2 ? maspositionlevel2 : []}
                    allowClear
                    disabled
                  />
                ) : (
                  <Select
                    options={maspositionlevel2 ? maspositionlevel2 : []}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name={'role'} label={'หน้าที่'}>
                {drawerType === 3 || propsstate?.mode == 'view' ? (
                  <Input disabled />
                ) : (
                  <Input />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name={'headderId'} label={'หัวหน้างาน'}>
                {drawerType === 3 || propsstate?.mode == 'view' ? (
                  <Select options={header_data} allowClear disabled />
                ) : (
                  <Select options={header_data} allowClear />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ float: 'right', paddingBottom: '20px' }}>
            <Col>
              <Space>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: token.token.colorPrimary,
                  }}
                  htmlType="submit"
                >
                  ตกลง
                </Button>
                <Button onClick={onClose}>ยกเลิก</Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default PositionEmployee;
