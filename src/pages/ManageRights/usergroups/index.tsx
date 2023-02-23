import React, { useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import {
  Card,
  Col,
  Divider,
  Row,
  theme,
  Form,
  Space,
  Button,
  Table,
  Dropdown,
  Menu,
  Drawer,
  Input,
  Switch,
  Avatar,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { RiCommunityLine } from 'react-icons/ri';
import edit from '../../../assets/Edit.png';
import Del from '../../../assets/DEL.png';
import view from '../../../assets/View.png';
import { useNavigate } from 'react-router-dom';
import { FETCH_GETALLROLE } from '../../../service/graphql/Role';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '../../../__generated__/gql';
import Swal from 'sweetalert2';
import { Role_Company } from '../../../__generated__/graphql';

const { useToken } = theme;
interface DataType {
  key: React.Key;
  name: string;
  status: string;
}

const CREATE_ROLE = gql(`
mutation Mutation($data: createRoleCompanyGroup!) {
    createRoleCompany(data: $data) {
      message
      status
    }
  }
`);

const DELETE_ROLE = gql(`
mutation DeleteRoleCompany($deleteRoleCompanyId: ID!) {
  deleteRoleCompany(id: $deleteRoleCompanyId) {
    message
    status
  }
}`);

const Manageuser: React.FC = () => {
  const [open, setOpen] = useState(false);
  const token = useToken();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { data: userData, refetch } = useQuery(FETCH_GETALLROLE);
  const [deleteRole] = useMutation(DELETE_ROLE);
  const [createRole] = useMutation(CREATE_ROLE);
  const [drawerType, setdrawerType] = useState(1);
  const [selectedrow, setselectedrow] = useState<Role_Company>();

  const showDrawer = (type: any) => {
    setdrawerType(type);
    setOpen(true);
  };

  const onClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const onChange = (checked: boolean) => {
    console.log(`Switch to ${checked}`);
  };

  const genarateMenu = (record: any) => {
    return [
      {
        key: 'edit',
        label: 'แก้ไข',
        onClick: (e: any) => onMenuClick(e, record),
        icon: <img style={{ width: '17px', height: '17px' }} src={edit} />,
      },
      {
        key: 'view',
        label: 'ดู',
        onClick: (e: any) => onMenuClick(e, record),
        icon: <img style={{ width: '17px', height: '17px' }} src={view} />,
      },
      {
        key: 'delete',
        label: 'ลบข้อมูล',
        onClick: (e: any) => onMenuClick(e, record),
        icon: <img style={{ width: '20px', height: '20px' }} src={Del} />,
      },
    ];
  };

  const columns: ColumnsType<DataType> = [
    { title: 'สิทธิ์ผู้ใช้งาน', dataIndex: 'name', key: 'name' },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (record) => {
        return <p>{record === 1 ? `เปิดการใช้งาน` : `ปิดการใช้งาน`}</p>;
      },
    },
    {
      title: 'จัดการ',
      dataIndex: '',
      align: 'center',
      key: 'x',
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

  const onMenuClick = (event: any, record: any) => {
    const { key } = event;
    console.log(key);
    if (key === 'edit') {
      showDrawer(2);
      setselectedrow(record);
      form.setFieldsValue({
        ...record,
        status: record?.status == true ? 1 : 0,
      });
    } else if (key === 'view') {
      showDrawer(3);
      form.setFieldsValue({
        ...record,
        status: record?.status == true ? 1 : 0,
      });
    } else if (key === 'delete') {
      Swal.fire({
        title: `ยืนยันการลบข้อมูล Role`,
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: token.token.colorPrimary,
        denyButtonColor: '#ea4e4e',
        confirmButtonText: 'ตกลง',
        denyButtonText: `ยกเลิก`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          deleteRole({
            variables: {
              deleteRoleCompanyId: record.id,
            },
          })
            .then((val) => {
              if (val.data?.deleteRoleCompany?.status) {
                Swal.fire(`ลบข้อมูล Role สำเร็จ!`, '', 'success');
                refetch();
              }
            })
            .catch((err) => {
              Swal.fire(`ลบข้อมูล Role ไม่สำเร็จ!`, '', 'error');
              console.error(err);
            });
        }
      });
    }
  };

  const onFinish = (value: any) => {
    console.log(value);
    drawerType === 1
      ? Swal.fire({
          title: 'บันทึกข้อมูล',
          text: 'ยืนยันการบันทึกข้อมูล',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
        }).then(async (result) => {
          if (result.isConfirmed) {
            createRole({
              variables: {
                data: { ...value, status: value.status == true ? 1 : 0 },
              },
            })
              .then((val) => {
                console.log(val);
                if (val.data?.createRoleCompany?.status) {
                  Swal.fire(`เพิ่มข้อมูล Role สำเร็จ!`, '', 'success');
                  form.resetFields();
                  setOpen(false);
                  refetch();
                }
              })
              .catch((err) => {
                Swal.fire(`เพิ่มข้อมูล Role ไม่สำเร็จ!`, '', 'error');
                console.error(err);
              });
          }
        })
      : Swal.fire({
          title: 'แก้ไขข้อมูล',
          text: 'ยืนยันการแก้ไขข้อมูล',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
        }).then(async (result) => {
          if (result.isConfirmed) {
            createRole({
              variables: {
                data: {
                  ...value,
                  id: selectedrow?.id,
                  status: value.status == true ? 1 : 0,
                },
              },
            })
              .then((val) => {
                console.log(val);
                if (val.data?.createRoleCompany?.status) {
                  Swal.fire(`แก้ไขข้อมูล Role สำเร็จ!`, '', 'success');
                  form.resetFields();
                  setOpen(false);
                  refetch();
                }
              })
              .catch((err) => {
                Swal.fire(`แก้ไขข้อมูล Role ไม่สำเร็จ!`, '', 'error');
                console.error(err);
              });
          }
        });
  };
  return (
    <>
      <div className="px-2 py-2">
        <div className="flex text-2xl ml-2 pt-4">
          <RiCommunityLine size={30} />
          <div className="ml-2 text-lg">จัดการกลุ่มผู้ใช้งาน</div>
        </div>
      </div>
      <Divider style={{ backgroundColor: token.token.colorPrimary }} />

      <Card className="shadow-md">
        <Row gutter={16}>
          <Col>
            <Form.Item label={'กลุ่มผู้ใช้งาน'}>
              <Space>
                {userData?.getcompanyRole?.map((e: any) => {
                  return (
                    <div className="rounded-md py-1 px-4 border-solid border-2 border-blue-900 bg-blue-500 text-white text-xs">
                      {e.name}
                    </div>
                  );
                })}
              </Space>
            </Form.Item>
          </Col>
        </Row>
        <Col className="flex justify-end">
          <Button
            type="primary"
            style={{
              marginBottom: '10px',
              backgroundColor: token.token.colorPrimary,
            }}
            onClick={() => {
              showDrawer(1);
            }}
          >
            + เพิ่มกลุ่มผู้ใช้งาน
          </Button>
          <Drawer
            title={`${
              drawerType == 1
                ? 'เพิ่มสิทธ์ผู้ใช้งาน'
                : drawerType == 2
                ? 'แก้ไขสิทธ์ผู้ใช้งาน'
                : 'ดูสิทธ์ผู้ใช้งาน'
            }`}
            headerStyle={{ textAlign: 'center' }}
            placement="right"
            width="40%"
            onClose={onClose}
            open={open}
          >
            <Form
              layout="vertical"
              form={form}
              // size="large"
              onFinish={onFinish}
            >
              {/* <div className="relative flex flex-row items-center py-2">
                <span className="ml-4 text-lg tracking-wide truncate">
                  เพิ่มสิทธิ์ผู้ใช้งาน
                </span>
              </div> */}
              <Card>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  {drawerType == 3 ? (
                    <Form.Item name={'name'} label={'สิทธิ์ผู้ใช้งาน'}>
                      <Input disabled />
                    </Form.Item>
                  ) : (
                    <Form.Item name={'name'} label={'สิทธิ์ผู้ใช้งาน'}>
                      <Input />
                    </Form.Item>
                  )}
                </Col>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    name={'status'}
                    label={'สถานะ'}
                    valuePropName="checked"
                  >
                    {drawerType == 3 ? (
                      <Switch
                        className="bg-gray-600"
                        onChange={onChange}
                        // defaultChecked
                        disabled
                      />
                    ) : (
                      <Switch
                        className="bg-gray-600"
                        onChange={onChange}
                        // defaultChecked
                      />
                    )}
                  </Form.Item>
                </Col>
              </Card>

              <Row
                className="py-6"
                gutter={16}
                style={{ position: 'absolute', right: '35px', height: '10px' }}
              >
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
        </Col>
        <Table
          rowKey={'id'}
          columns={columns}
          dataSource={userData?.getcompanyRole as any}
        />
      </Card>
    </>
  );
};

export default Manageuser;
