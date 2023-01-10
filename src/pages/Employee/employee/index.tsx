import { useState, useEffect } from 'react';
import { FaUserAlt } from 'react-icons/fa';
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
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined, MoreOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { FETCH_GETALLUSER } from '../../../service/graphql/Users';

const { useToken } = theme;

interface DataType {
  key: number;
  name: string;
  number: number;
  position: string;
  department: string;
  tel: string;
  email: string;
}

const Employee: React.FC = () => {
  const token = useToken();
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const { data: userData, refetch } = useQuery(FETCH_GETALLUSER);

  const genarateMenu = (record: any) => {
    return [
      {
        key: 'edit',
        label: 'แก้ไข',
        onClick: (e: any) => onMenuClick(e, record),
      },
      {
        key: 'view',
        label: 'ดู',
        onClick: (e: any) => onMenuClick(e, record),
      },
      {
        key: 'delete',
        label: 'ลบข้อมูล',
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
      navigate(`useremployee?id=${record.profile.id}`, {
        state: { ...record?.profile, mode: 'edit', userId: record?.id },
      });
    } else if (key === 'view') {
      navigate(`useremployee?id=${record.profile.id}`, {
        state: { ...record?.profile, mode: 'view', userId: record?.id },
      });
    } else if (key === 'delete') {
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'ลำดับ',
      key: 'number',
      dataIndex: 'number',
      align: 'center',
    },
    {
      title: 'ชื่อ-สกุล',
      key: 'name',
      dataIndex: 'profile',
      align: 'center',
      render: (txt) => txt.firstname_th + ' ' + txt.lastname_th,
    },
    {
      title: 'ตำแหน่ง',
      key: 'position',
      dataIndex: 'position',
      align: 'center',
    },
    {
      title: 'แผนก/ฝ่าย',
      key: 'department',
      dataIndex: 'department',
      align: 'center',
    },
    {
      title: 'เบอร์โทร',
      key: 'tel',
      dataIndex: 'tel',
      align: 'center',
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
              <Form.Item name="search" colon={false} label={'แผนก/ฝ่าย'}>
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
                  <Button htmlType="submit">Search</Button>
                </Form.Item>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card className="shadow-xl mt-4">
        <Col>
          <Space>
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
          </Space>
        </Col>
        <Table
          columns={columns}
          dataSource={userData?.users as any}
          rowKey={(i: any) => i.toString()}
        ></Table>
      </Card>
    </>
  );
};

export default Employee;
