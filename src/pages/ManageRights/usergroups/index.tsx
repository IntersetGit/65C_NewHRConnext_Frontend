import React, { useState } from 'react';
import { MoreOutlined } from "@ant-design/icons";
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
    Drawer,
    Input,
    Switch,
} from "antd";
import { ColumnsType } from "antd/es/table";
import {
    RiCommunityLine,
} from "react-icons/ri"
import edit from '../../../assets/Edit.png'
import Del from '../../../assets/DEL.png'
import { useNavigate } from 'react-router-dom';
import { FETCH_GETALLROLE } from '../../../service/graphql/Role';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '../../../__generated__/gql';

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
`)

const genarateMenu = (record: any) => {
    return [
        {
            key: 'edit',
            label: 'แก้ไข',
            onClick: (e: any) => onMenuClick(e, record),
            icon: <img style={{ width: '17px', height: '17px' }} src={edit} />,
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
    { title: 'สิทธิ์ผู้ใช้งาน', dataIndex: 'name', key: 'name', },
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

const data: DataType[] = [
    {
        key: 1,
        name: 'Company Admin',
        status: 'เปิดใช้งาน',
    },
    {
        key: 2,
        name: 'Finance',
        status: 'ปิดใช้งาน',
    },
    {
        key: 3,
        name: 'Employee',
        status: 'เปิดใช้งาน',
    },
];

const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
};

const Manageuser: React.FC = () => {
    const [open, setOpen] = useState(false);
    const token = useToken();
    const navigate = useNavigate();
    const { data: userData, refetch } = useQuery(FETCH_GETALLROLE);
    const [createRole] = useMutation(CREATE_ROLE);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
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
                            onClick={showDrawer}
                        >
                            + เพิ่มกลุ่มผู้ใช้งาน
                        </Button>
                        <Drawer
                            // title="เพิ่มกลุ่มผู้ใช้งาน"
                            headerStyle={{ textAlign: 'center' }}
                            placement="right"
                            width="40%"
                            onClose={onClose}
                            open={open}
                        >
                            <div className="relative flex flex-row items-center py-2">
                                <span className="ml-4 text-lg tracking-wide truncate">
                                    เพิ่มสิทธิ์ผู้ใช้งาน
                                </span>
                            </div>
                            <Card >
                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                    <Form.Item label={'สิทธิ์ผู้ใช้งาน'}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                    <div>
                                        <div className="py-4">สถานะ</div>
                                        <div>
                                            <Switch defaultChecked onChange={onChange} />
                                        </div>
                                    </div>
                                </Col>
                            </Card>

                            <Row className='py-6' gutter={16} style={{ position: 'absolute', right: '35px', height: '10px' }} >
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
                                            onClick={() => {
                                                setOpen(false)
                                            }}
                                        >
                                            ยกเลิก
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Row>
                        </Drawer>
                    </Col>
                    <Table
                        columns={columns}
                        dataSource={userData?.getcompanyRole as any}
                    />
                </Form>
            </Card>
        </>
    )
};

export default Manageuser;
function onMenuClick(e: any, record: unknown): void {
    throw new Error("Function not implemented.");
}

