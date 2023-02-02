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
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useMutation, useQuery } from '@apollo/client';
import {
  FETCH_GETALLROLE_MANAGEMENT,
  SAVE_COMPANY_ROLE,
} from '../../../service/graphql/Role';
import Swal from 'sweetalert2';

interface DataType {
  key: React.Key;
  menu: string;
  subject: string;
  permissions: string;
}

interface ExpandedDataType {
  [key: string]: any;
  id: string | undefined;
  sort: number;
  key: React.Key;
  name: string | null | undefined;
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
    access: [
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
    id: '2',
    name: 'Finance',
    access: [
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
  {
    id: '3',
    name: 'Employee',
    acess: [],
  },
];
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

const method = ['read', 'add', 'edit', 'delete'];
const Rights: React.FC = () => {
  const token = useToken();
  const {
    data: rawdata,
    loading,
    refetch,
  } = useQuery(FETCH_GETALLROLE_MANAGEMENT);
  const [saveRolemanage] = useMutation(SAVE_COMPANY_ROLE);
  const [datas, setData] = useState<ExpandedDataType[]>([]);
  const onChange = (e: CheckboxChangeEvent, rec: ExpandedDataType) => {
    //console.log(e, rec);
    console.time('Change checkbox time');
    const rowData = datas.find((e) => e.key === rec.key);
    const popData = datas.filter((e) => e.key !== rec.key);
    /**
     * PreventDefault Function
     * ! no need this function
     */
    //e.preventDefault();
    /**
     * check if rowdata not undefined
     */
    if (!rowData) return;
    /**
     * check if method is undefinded then return
     */
    if (rowData[e.target.value] === undefined) return;
    rowData[e.target.value] = e.target.checked;

    const newData = [...popData, rowData];
    setData(newData);
    console.timeEnd('Change checkbox time');
  };
  useEffect(() => {
    const query_data = rawdata;
    const arr: ExpandedDataType[] = [];
    module.forEach(async (e) => {
      const data: ExpandedDataType[] | undefined =
        query_data?.getcompanyRole?.map((_e, i) => {
          const access: { action: string[] } = _e?.access?.find(
            (__e: { subject: string }) => __e.subject === e,
          );
          return {
            id: _e?.id,
            sort: i + 1,
            key: `${_e?.name}-${e}-${i + 1}`,
            name: _e?.name,
            idxOf: e,
            read: access ? access.action.includes('read') : false,
            add: access ? access.action.includes('add') : false,
            edit: access ? access.action.includes('edit') : false,
            delete: access ? access.action.includes('delete') : false,
          };
        });
      const saveData = data ? data : [];
      arr.push(...saveData);
    });
    setData(arr);
  }, [loading]);
  const moduleRowRender = (record: any, index: string | number) => {
    console.log(record);
    const columns: TableColumnsType<any> = [
      Table.EXPAND_COLUMN,
      {
        title: 'ชื่อโมดูล',
        //align: 'center',
        key: 'module_name',
      },
    ];
    return (
      <div className="m-0 w-full h-full">
        {' '}
        <Table size="middle" columns={columns} />
      </div>
    );
  };
  const expandedRowRender = (record: DataType, index: number | string) => {
    //console.log(record, index);
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
          return (
            <Checkbox
              onChange={(e: CheckboxChangeEvent) => onChange(e, rec)}
              value="read"
              checked={rec.read}
            />
          );
        },
      },
      {
        title: 'Add',
        dataIndex: 'add',
        key: 'add',
        render(value, rec) {
          return (
            <Checkbox
              onChange={(e: CheckboxChangeEvent) => onChange(e, rec)}
              value="add"
              checked={rec.add}
            />
          );
        },
      },
      {
        title: 'Edit',
        dataIndex: 'edit',
        key: 'edit',
        render(value, rec) {
          value = 'read';
          return (
            <Checkbox
              onChange={(e: CheckboxChangeEvent) => onChange(e, rec)}
              value="edit"
              checked={rec.edit}
            />
          );
        },
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        key: 'delete',
        render(value, rec) {
          return (
            <Checkbox
              onChange={(e: CheckboxChangeEvent) => onChange(e, rec)}
              value="delete"
              checked={rec.delete}
            />
          );
        },
      },
    ];

    return (
      <Table
        size="small"
        columns={columns}
        dataSource={datas
          .filter((e) => e.idxOf === record.subject)
          .sort((a, b) => a.sort - b.sort)}
        pagination={false}
      />
    );
  };

  const onClicksave = () => {
    /** Merge to original object */
    console.time('Merge save time');
    const original = rawdata?.getcompanyRole?.map((e) => {
      return {
        id: e?.id as string,
        //name: e?.name,
        access: [
          ...datas
            .filter((_e) => _e.id === e?.id)
            .map((e) => {
              const accessControl: string[] = [];
              method.forEach((_e) => {
                if (e[_e]) accessControl.push(_e);
              });

              return {
                subject: e.idxOf as string,
                action: accessControl,
              };
            }),
        ],
      };
    });
    console.timeEnd('Merge save time');

    if (!original) return;

    Swal.fire({
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
        saveRolemanage({
          variables: {
            data: original,
          },
        })
          .then((val) => {
            if (val.data?.updateRoleCompanyMangement?.status) {
              Swal.fire(`เพิ่มข้อมูลสำเร็จ!`, '', 'success');
              refetch();
            }
          })
          .catch((err) => {
            Swal.fire(`เพิ่มข้อมูลไม่สำเร็จ!`, '', 'error');
            console.error(err);
          });
      }
    });
  };

  const columns: TableColumnsType<DataType> = [
    Table.EXPAND_COLUMN,
    {
      title: 'เมนู',
      dataIndex: 'menu',
      key: 'menu',
      align: 'center',
      render: (record: any) => (
        <p style={{ textAlign: 'left', fontWeight: 'bold' }}>{record}</p>
      ),
    },

    // Table.SELECTION_COLUMN,
    // {
    //   title: 'สิทธิ์การเข้าถึงระบบ',
    //   dataIndex: 'permissions',
    //   key: 'permissions',
    //   align: 'center',
    // },
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
                  {rawdata?.getcompanyRole?.map((e) => {
                    return (
                      <Button
                        key={e?.id}
                        style={{
                          marginBottom: '10px',
                        }}
                      >
                        {e?.name}
                      </Button>
                    );
                  })}
                </Space>
              </Form.Item>
            </Col>
          </Row>

          <Col className="flex justify-end">
            <Button
              type="primary"
              onClick={onClicksave}
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
            expandable={{
              expandedRowRender: moduleRowRender,
              defaultExpandedRowKeys: ['0'],
            }}
            dataSource={data}
            pagination={false}
          />
        </Form>
      </Card>
    </>
  );
};

export default Rights;
