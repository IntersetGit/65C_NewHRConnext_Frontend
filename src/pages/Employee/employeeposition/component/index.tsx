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
import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';
import edit from '../../../../assets/Edit.png';
import Del from '../../../../assets/DEL.png';
import View from '../../../../assets/View.png';
import { gql } from '../../../../__generated__';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { getFilePath } from '../../../../util';
import {
  FETCH_BYID_POSITION,
  POSITION,
  CRETE_POSITION_USER,
} from '../../../../service/graphql/Position';
import { FETCH_GETALLUSER } from '../../../../service/graphql/Users';
import Swal from 'sweetalert2';

const { useToken } = theme;

interface DataType {
  key: string;
  date: Date;
  position: string;
  role: string;
  boss: string;
}

const GET_ME = gql(`
query Me {
  me {
    Role_Company {
      access
      id
      name
      __typename
    }
    companyBranch {
      companyId
      company {
        companyCode
        icon
        id
        name
        __typename
      }
      createdAt
      id
      name
      __typename
    }
    email
    id
    isOwner
    profile {
      id
      bio
      firstname_th
      lastname_th
      firstname_en
      lastname_en
      avatar
      dob
      age
      relationship
      shirt_size
      prefix_th
      prefix_en
      citizen_id
      social_id
      staff_status
      tel
      address
      gender
      staff_code
      religion
      userId
      citizen_addressnumber
      citizen_address
      citizen_country
      citizen_province
      citizen_district
      citizen_state
      citizen_zipcode
      citizen_tel
      contract_sameCitizen
      contract_addressnumber
      contract_address
      contract_country
      contract_province
      contract_district
      contract_state
      contract_zipcode
      contract_email
      contract_companyemail
      social_facebook
      social_likedin
      social_line
      social_telegram
      nickname
      blood_type
      employee_status
      start_date_work
      __typename
    }
  }
}`);

const ProfilePosition: React.FC = (props) => {
  const [form] = Form.useForm();
  const token = useToken();
  const [drawerType, setDrawerType] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedrow, setselectedrow] = useState<any>();
  const { data: user } = useQuery(GET_ME);
  const { data: position_data, refetch } = useQuery<any>(FETCH_BYID_POSITION);
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
    setMasPostionLevel2(maspositionlevel2 ? maspositionlevel2 : []);
  };

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
                  user_id: user?.me?.profile?.userId,
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
                  // user_id: user?.me?.profile?.userId,
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
      onChangeMasLevel1(record?.mas_positionlevel1.id);
      onChangeMasLevel2(record?.mas_positionlevel2.id);
      form.setFieldsValue({
        ...record,
        date: record.date ? moment(record.date) : undefined,
        headderId: record?.header?.id,
      });
    } else if (key === 'view') {
      showDrawer(3);
      onChangeMasLevel1(record?.mas_positionlevel1.id);
      onChangeMasLevel2(record?.mas_positionlevel2.id);
      form.setFieldsValue({
        ...record,
        date: record.date ? moment(record.date) : undefined,
        headderId: record?.header?.id,
      });
    } else if (key === 'delete') {
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'วันที่มีผล',
      key: 'date',
      dataIndex: 'date',
      align: 'center',
      render: (record: any) => moment(record).format('YYYY/MM/DD') as any,
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
      render: (txt: any) => {
        return txt?.profile?.firstname_th + ' ' + txt?.profile?.lastname_th;
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
                src={getFilePath() + user?.me?.profile?.avatar}
              ></Avatar>
            </div>
          </Col>

          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div className="text-lg font-bold">
              <u className="text-blue-800">
                {user?.me?.profile?.prefix_th} {user?.me?.profile?.firstname_th}{' '}
                {user?.me?.profile?.lastname_th}
              </u>
              <div className="mt-4">
                {position_data?.getpositionMe?.[
                  position_data?.getpositionMe?.length - 1
                ]?.mas_positionlevel3?.name ?? 'ไม่มีตำแหน่งงาน'}
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
              defaultValue={
                user?.me?.profile?.start_date_work
                  ? moment(user?.me?.profile?.start_date_work)
                  : (undefined as any)
              }
              disabled
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <div className="py-3">หมายเลขประจำตัวผู้เสียภาษี</div>
            <Input
              defaultValue={user?.me?.profile?.citizen_id as any}
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
          dataSource={position_data?.getpositionMe as any}
        ></Table>
      </Card>

      <Drawer
        title={'เพิ่มตำแหน่งงาน'}
        size="large"
        open={open}
        onClose={onClose}
      >
        <Form form={form} layout={'vertical'} size="middle" onFinish={onFinish}>
          <Row>
            <Col span={12}>
              <Form.Item name={'date'} label={'วันที่มีผล'}>
                <DatePicker style={{ width: '100%' }}></DatePicker>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name={'position1_id'} label={'ฝ่าย'}>
                <Select
                  options={selectposition ? selectposition : []}
                  onChange={onChangeMasLevel1}
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name={'position2_id'} label={'แผนก'}>
                <Select
                  options={maspositionlevel1 ? maspositionlevel1 : []}
                  onChange={onChangeMasLevel2}
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name={'position3_id'} label={'ตำแหน่ง'}>
                <Select options={maspositionlevel2 ? maspositionlevel2 : []} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name={'role'} label={'หน้าที่'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item name={'headderId'} label={'หัวหน้างาน'}>
                <Select options={header_data} allowClear />
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

export default ProfilePosition;
