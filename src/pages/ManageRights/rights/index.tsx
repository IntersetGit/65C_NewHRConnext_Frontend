import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
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
import _ from 'lodash';

interface DataType {
  key: React.Key;
  menu: string;
  subject: string;
  permissions: string;
}

interface ExpandedDataType {
  id: React.Key;
  name: string;
  idxOf?: string;
  read: boolean | undefined;
  add: boolean | undefined;
  edit: boolean | undefined;
  delete: boolean | undefined;
}

const { useToken } = theme;

const Simpledata = [
  {
    id: '1',
    name: 'CompanyAdmin',
    acess: [
      { action: ['add', 'edit', 'delete'], subject: 'company' },
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
  {
    id: '1',
    name: 'Finance',
    acess: [
      { action: ['add', 'edit', 'delete', 'read'], subject: 'company' },
      { action: ['read'], subject: 'myprofile' },
      { action: ['add'], subject: 'employee' },
      { action: ['read'], subject: 'salary' },
      { action: ['read'], subject: 'vacation' },
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
  const [datas, setData] = useState<ExpandedDataType[]>([]);
  useEffect(() => {
    const module = [
      'company',
      'myprofile',
      'employee',
      'salary',
      'vacation',
      'training',
      'assessment',
      'project',
      'dashboard',
      'file',
      'activity',
      'campaign',
    ];
    const query_data = Simpledata;
    module.forEach(async (e) => {
      const data: ExpandedDataType[] = query_data.map((_e) => {
        const access = _e.acess.find((__e) => __e.subject === e);
        return {
          id: _e.id,
          name: _e.name,
          idxOf: e,
          read: access?.action.includes('read'),
          add: access?.action.includes('add'),
          edit: access?.action.includes('edit'),
          delete: access?.action.includes('delete'),
        };
      });
      const paired_value = [...datas, ...data];
      setData(paired_value);
      console.log(datas);
    });
  }, []);
  const expandedRowRender = (record: DataType, index: number | string) => {
    console.log(record, index);
    const columns: TableColumnsType<ExpandedDataType> = [
      {
        title: 'Roles',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Read',
        dataIndex: 'read',
        key: 'read',
        render(value, rec) {
          return <Checkbox value="read" checked={rec.read} />;
        },
      },
      {
        title: 'Add',
        dataIndex: 'add',
        key: 'add',
        render(value, rec) {
          return <Checkbox value="add" checked={rec.add} />;
        },
      },
      {
        title: 'Edit',
        dataIndex: 'edit',
        key: 'edit',
        render(value, rec) {
          value = 'read';
          return <Checkbox value="edit" checked={rec.edit} />;
        },
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        key: 'delete',
        render(value, rec) {
          return <Checkbox value="delete" checked={rec.delete} />;
        },
      },
    ];
    // const query_data = Simpledata;

    // const data = query_data.map((e) => {
    //   const access = e.acess.find((e) => e.subject === record.subject);
    //   return {
    //     id: e.id,
    //     idxOf: record.subject,
    //     name: e.name,
    //     read: access?.action.includes('read'),
    //     add: access?.action.includes('add'),
    //     edit: access?.action.includes('edit'),
    //     delete: access?.action.includes('delete'),
    //   };
    // });

    // console.log(data);
    return (
      <Table
        size="small"
        rowKey="id"
        columns={columns}
        dataSource={datas.filter((e) => e.idxOf === record.subject)}
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

    // Table.SELECTION_COLUMN,
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
        subject: 'company',
        permissions: '',
      },
      {
        key: '2',
        menu: 'ข้อมูลของฉัน',
        subject: 'myprofile',
        permissions: '',
      },
      {
        key: '3',
        menu: 'พนักงาน',
        subject: 'employee',
        permissions: '',
      },
      {
        key: '4',
        menu: 'เงินเดือน',
        subject: 'salary',
        permissions: '',
      },
      {
        key: '5',
        menu: 'การลา',
        subject: 'vacation',
        permissions: '',
      },
      {
        key: '6',
        menu: 'การฝึกอบรม',
        subject: 'training',
        permissions: '',
      },
      {
        key: '7',
        menu: 'การประเมิน',
        subject: 'assessment',
        permissions: '',
      },
      {
        key: '8',
        menu: 'โครงการ',
        subject: 'project',
        permissions: '',
      },
      {
        key: '9',
        menu: 'Dash Board',
        subject: 'dashboard',
        permissions: '',
      },
      {
        key: '10',
        menu: 'ไฟล์',
        subject: 'file',
        permissions: '',
      },
      {
        key: '11',
        menu: 'กิจกรรม',
        subject: 'activity',
        permissions: '',
      },
      {
        key: '12',
        menu: 'แคมเปญการเงิน',
        subject: 'campaign',
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
