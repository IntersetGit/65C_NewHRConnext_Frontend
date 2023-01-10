import React from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Row,
  Space,
  Table,
  TableColumnsType,
  Tabs,
  theme,
} from 'antd';
import { RiCommunityLine } from 'react-icons/ri';

interface DataType {
  key: React.Key;
  menu: string;
  permissions: string;
}

interface ExpandedDataType {
  key: React.Key;
  name: string;
  view: string;
  add: string;
  edit: string;
  delete: string;
}

const { useToken } = theme;

const Simpledata = [
  {
    id: '1',
    name: 'CompanyAdmin',
    acess: [
      { action: ['add', 'edit', 'delete', 'read'], subject: 'company' },
      { action: ['add', 'edit', 'delete', 'read'], subject: 'myprofile' },
      { action: ['add', 'edit', 'delete', 'read'], subject: 'employee' },
      { action: ['add', 'edit', 'delete', 'read'], subject: 'salary' },
      { action: ['add', 'edit', 'delete', 'read'], subject: 'vacation' },
      { action: ['add', 'edit', 'delete', 'read'], subject: 'training' },
      { action: ['add', 'edit', 'delete', 'read'], subject: 'assessment' },
      { action: ['add', 'edit', 'delete', 'read'], subject: 'project' },
      { action: ['add', 'edit', 'delete', 'read'], subject: 'dashboard' },
      { action: ['add', 'edit', 'delete', 'read'], subject: 'file' },
      { action: ['add', 'edit', 'delete', 'read'], subject: 'activity' },
      { action: ['add', 'edit', 'delete', 'read'], subject: 'campaign' },
    ],
  },
];

const Rights: React.FC = () => {
  const token = useToken();

  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'Roles', dataIndex: 'name', key: 'name' },
      { title: 'View', dataIndex: 'view', key: 'view' },
      { title: 'Add', dataIndex: 'add', key: 'add' },
      { title: 'Edit', dataIndex: 'edit', key: 'edit' },
      { title: 'Delete', dataIndex: 'delete', key: 'delete' },
    ];
    const data = [];
    for (let i = 0; i < 1; ++i) {
      data.push(
        {
          key: i.toString(),
          name: 'Company Admin',
          view: 'View',
          add: 'Add',
          edit: 'Edit',
          delete: 'Delete',
        },
        {
          key: i.toString(),
          name: 'Finance',
          view: 'View',
          add: 'Add',
          edit: 'Edit',
          delete: 'Delete',
        },
        {
          key: i.toString(),
          name: 'Employee',
          view: 'View',
          add: 'Add',
          edit: 'Edit',
          delete: 'Delete',
        },
      );
    }
    return (
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'เมนู',
      dataIndex: 'menu',
      key: 'menu',
      align: 'center',
      render: (record: any) => <p style={{ textAlign: 'left' }}>{record}</p>,
    },
    Table.EXPAND_COLUMN,

    Table.SELECTION_COLUMN,
    {
      title: 'สิทธิ์การเข้าถึงระบบ',
      dataIndex: 'permissions',
      key: 'permissions',
      align: 'center',
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 1; ++i) {
    data.push(
      {
        key: '1',
        menu: 'บริษัท',
        permissions: '',
      },
      {
        key: '2',
        menu: 'ข้อมูลของฉัน',
        permissions: '',
      },
      {
        key: '3',
        menu: 'พนักงาน',
        permissions: '',
      },
      {
        key: '4',
        menu: 'เงินเดือน',
        permissions: '',
      },
      {
        key: '5',
        menu: 'การลา',
        permissions: '',
      },
      {
        key: '6',
        menu: 'การฝึกอบรม',
        permissions: '',
      },
      {
        key: '7',
        menu: 'การประเมิน',
        permissions: '',
      },
      {
        key: '8',
        menu: 'โครงการ',
        permissions: '',
      },
      {
        key: '9',
        menu: 'Dash Board',
        permissions: '',
      },
      {
        key: '10',
        menu: 'ไฟล์',
        permissions: '',
      },
      {
        key: '11',
        menu: 'กิจกรรม',
        permissions: '',
      },
      {
        key: '12',
        menu: 'แคมเปญการเงิน',
        permissions: '',
      },
    );
  }

  return (
    <>
      <div className="px-2 py-2">
        {/* <div>
                    <Tabs
                        className='right-tab'
                        items={[
                            {
                                label: `จัดการสิทธิ์การใช้งาน`,
                                key: '/:companycode/userprofile',
                            },
                            {
                                label: `จัดการกลุ่มผู้ใช้งาน`,
                                key: '/:companycode/userprofile/work',
                            },
                        ]}
                    />
                </div> */}
        <div className="flex text-2xl ml-2 pt-4">
          <RiCommunityLine size={30} />
          <div className="ml-2 text-lg">จัดการสิทธิ์การใช้งาน</div>
        </div>
      </div>
      <Divider style={{ backgroundColor: token.token.colorPrimary }} />

      <Card className="shadow-md">
        <Form layout="vertical">
          <Row gutter={16}>
            <Col>
              <Form.Item label={'กลุ่มผู้ใช้งาน'}>
                <Space>
                  <Button
                    style={{
                      marginBottom: '10px',
                    }}
                  >
                    Company Admin
                  </Button>
                  <Button
                    style={{
                      marginBottom: '10px',
                    }}
                  >
                    Finance
                  </Button>
                  <Button
                    style={{
                      marginBottom: '10px',
                    }}
                  >
                    Employee
                  </Button>
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
            >
              บันทึกการเปลี่ยนแปลง
            </Button>
          </Col>
          <Table
            columns={columns}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
            dataSource={data}
            pagination={false}
          />
        </Form>
      </Card>
    </>
  );
};

export default Rights;
