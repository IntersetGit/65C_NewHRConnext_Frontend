import { useState, useEffect } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { BsFillTelephoneFill, BsFacebook } from 'react-icons/bs';
import { AiTwotoneMail, AiOutlineMobile } from 'react-icons/ai';
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
  Segmented,
  Descriptions,
  Avatar,
  List,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import {
  MenuOutlined,
  MoreOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client';
import { FETCH_GETALLUSER } from '../../../service/graphql/Users';
import edit from '../../../assets/Edit.png';
import Del from '../../../assets/DEL.png';
import View from '../../../assets/View.png';
import { User } from '../../../__generated__/graphql';
import { gql } from '../../../__generated__';
import Swal from 'sweetalert2';
import { getFilePath, getUploadUrl } from '../../../util';

const { useToken } = theme;

const DELETE_EMPLOYEE_ACCOUNT = gql(`
mutation DeleteAccountUser($deleteAccountUserId: ID!) {
  deleteAccountUser(id: $deleteAccountUserId) {
    message
    status
  }
}`);

const Employee: React.FC = () => {
  const token = useToken();
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const { data: userData, loading, refetch } = useQuery(FETCH_GETALLUSER);
  const [deleteEmployeeAccount] = useMutation(DELETE_EMPLOYEE_ACCOUNT);
  const [isDisplayfield, setDisplayfield] = useState(1);
  const [pagecurrent, setPageCurrent] = useState<number>(2);

  useEffect(() => {
    refetch();
  }, []);

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

  const apiGetUsers = () => {
    refetch();
  };
  const onMenuClick = (event: any, record: any) => {
    const { key } = event;
    if (key === 'edit') {
      console.log(record.Position_user[0]);
      console.log(record);
      navigate(`useremployee?id=${record.profile.id}`, {
        state: {
          ...record?.profile,
          mode: 'edit',
          userId: record?.id,
          loading: loading,
          role_company: record?.Role_Company?.id,
        },
      });
    } else if (key === 'view') {
      navigate(`useremployee?id=${record.profile.id}`, {
        state: {
          ...record?.profile,
          mode: 'view',
          userId: record?.id,
          role_company: record?.Role_Company?.name,
        },
      });
    } else if (key === 'delete') {
      Swal.fire({
        title: `ยืนยันการลบข้อมูลพนักงาน`,
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: token.token.colorPrimary,
        denyButtonColor: '#ea4e4e',
        confirmButtonText: 'ตกลง',
        denyButtonText: `ยกเลิก`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          deleteEmployeeAccount({
            variables: {
              deleteAccountUserId: record.id,
            },
          })
            .then((val) => {
              if (val.data?.deleteAccountUser?.status) {
                Swal.fire(`ลบข้อมูลพนักงานสำเร็จ!`, '', 'success');
                refetch();
              }
            })
            .catch((err) => {
              Swal.fire(`ลบข้อมูลพนักงานไม่สำเร็จ!`, '', 'error');
              console.error(err);
            });
        }
      });
    }
  };

  const columns: ColumnsType<User> = [
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
      render: (txt) => txt.firstname_th + ' ' + txt.lastname_th,
    },
    {
      title: 'ตำแหน่ง',
      key: 'Positon_user',
      align: 'center',
      render: (record) => {
        return record?.Position_user[0]?.mas_positionlevel3?.name;
      },
    },
    {
      title: 'แผนก',
      key: 'profile',
      align: 'center',
      render: (record) => {
        return record?.Position_user[0]?.mas_positionlevel2?.name;
      },
    },
    {
      title: 'เบอร์โทร',
      key: 'profile',
      dataIndex: 'profile',
      align: 'center',
      render: (record) => record.tel,
    },
    {
      title: 'e-mail',
      key: 'email',
      dataIndex: 'email',
      align: 'center',
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
      <div className="flex text-2xl ml-2 pt-4">
        <FaUserAlt />
        <div className="ml-2 text-lg">พนักงาน</div>
      </div>

      <Divider style={{ backgroundColor: token.token.colorPrimary }} />
      <Card className="shadow-xl">
        <Form size="middle">
          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name="search" colon={false} label={'ชื่อพนักงาน'}>
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
                  <Button
                    type="primary"
                    style={{ backgroundColor: token.token.colorPrimary }}
                  >
                    Reset
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button loading={loading} htmlType="submit">
                    Search
                  </Button>
                </Form.Item>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card className="shadow-xl mt-4">
        <Row>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Space>
              <Col>
                <Button
                  type="primary"
                  size="middle"
                  style={{
                    marginBottom: '10px',
                    backgroundColor: token.token.colorPrimary,
                  }}
                  onClick={() => {
                    navigate('useremployee');
                  }}
                >
                  + เพิ่มพนักงาน
                </Button>
              </Col>

              <Col>
                <Button
                  type="primary"
                  size="middle"
                  style={{
                    marginBottom: '10px',
                    backgroundColor: token.token.colorPrimary,
                  }}
                  onClick={apiGetUsers}
                >
                  Upload Excel
                </Button>
              </Col>
            </Space>

            <Segmented
              className="custom-segmented"
              onChange={(e) => {
                if (e === 'Table') {
                  setDisplayfield(1);
                } else {
                  setDisplayfield(2);
                }
              }}
              options={[
                {
                  value: 'Table',
                  icon: <BarsOutlined />,
                },
                {
                  value: 'List',
                  icon: <AppstoreOutlined />,
                },
              ]}
            />
          </div>
        </Row>

        {isDisplayfield === 1 ? (
          <Table
            columns={columns}
            dataSource={userData?.users as any}
            rowKey={'id'}
            pagination={{
              onChange: (page) => {
                setPageCurrent(page);
              },
              current: pagecurrent,
              pageSize: 10,
            }}
            loading={loading}
          ></Table>
        ) : (
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                setPageCurrent(page);
              },
              current: pagecurrent,
              pageSize: 10,
            }}
            dataSource={userData?.users as any}
            loading={loading}
            renderItem={(item: User, index: any) => (
              <List.Item key={index}>
                <CardItem item={item} genarateMenu={genarateMenu} />
              </List.Item>
            )}
          ></List>
        )}
      </Card>
    </>
  );
};
type Props = {
  item: User;
  genarateMenu(record: any): any[];
};
const CardItem = ({ item, genarateMenu }: Props) => {
  return (
    <Row>
      <Col span={4}>
        <Avatar
          style={{ width: 100, height: 100 }}
          src={getFilePath() + item.profile?.avatar}
        />
      </Col>
      <Col span={9}>
        <a style={{ color: 'blue', fontSize: '16px', fontWeight: 'bold' }}>
          <u>
            {item.profile?.prefix_th} {item.profile?.firstname_th}{' '}
            {item.profile?.lastname_th}
          </u>
        </a>
        <Row>
          <div>{item.profile?.citizen_address}</div>
        </Row>
        <Row>
          <div>{item.profile?.citizen_zipcode}</div>
        </Row>
      </Col>
      <Col span={9}>
        <div>
          <Row>
            <AiTwotoneMail size={'20'} />
            <div className="px-2">{item.email}</div>
          </Row>
          <Row>
            <BsFillTelephoneFill size={'20'} />
            <div className="px-2">{item.profile?.citizen_tel}</div>
          </Row>
          <Row>
            <AiOutlineMobile size={'20'} />
            <div className="px-2">{item.profile?.tel}</div>
          </Row>
          <Row>
            <BsFacebook size={'20'} />
            <div className="px-2">{item.profile?.social_facebook}</div>
          </Row>
        </div>
      </Col>

      <Col span={2}>
        <Dropdown
          className="flex h-full justify-items-center"
          menu={{ items: genarateMenu(item) }}
          arrow
        >
          <MoreOutlined />
        </Dropdown>
      </Col>
    </Row>
  );
};

export default Employee;
