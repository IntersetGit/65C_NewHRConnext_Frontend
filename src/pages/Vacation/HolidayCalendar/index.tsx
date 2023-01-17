import React, { useState } from 'react';
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Row,
    theme,
    DatePicker,
    Space,
    Table,
    Dropdown,
    Drawer,
    Input,
} from "antd";
import edit from '../../../assets/Edit.png';
import Del from '../../../assets/DEL.png';
import View from '../../../assets/View.png';
import { TbCalendarTime } from "react-icons/tb";
import type { DatePickerProps } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

const genarateMenu = (record: any) => {
    return [
        {
            key: 'edit',
            label: 'แก้ไข',
            icon: <img style={{ width: '17px', height: '17px' }} src={edit} />,
        },
        {
            key: 'view',
            label: 'ดูข้อมูล',
            icon: <img style={{ width: '17px', height: '17px' }} src={View} />,
        },
        {
            key: 'delete',
            label: 'ลบข้อมูล',
            icon: <img style={{ width: '20px', height: '20px' }} src={Del} />,
        },
    ];
};

const dataSources = [
    {
        key: '1',
        year: '2022',
        total_holiday: 5,
    },
    {
        key: '2',
        year: '2023',
        total_holiday: 10,
    },
];

interface DataSourceType {
    key: string
    year: string
    total_holiday: number
}

const columns: ColumnsType<DataSourceType> = [
    {
        title: 'ปี',
        dataIndex: 'year',
        key: 'year',
        align: 'center',
    },
    {
        title: 'จำนวนวันหยุด',
        dataIndex: 'total_holiday',
        key: 'total_holiday',
        align: 'center',
    },
    {
        title: 'Actions',
        key: 'option',
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

const { useToken } = theme;
const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};

const Holidaypage: React.FC = () => {
    const token = useToken();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="flex text-2xl ml-2 pt-4">
                <TbCalendarTime size={30} />
                <div className="ml-2 text-lg">ปฏิทินวันหยุด</div>
            </div>
            <Divider style={{ backgroundColor: token.token.colorPrimary }} />

            <Form>
                <Card className="shadow-md mb-3">
                    <Row gutter={5}>
                        <Col xs={24} sm={24} md={16} lg={16} xl={8} >
                            <Form.Item label={<b> เลือกปี </b>}>
                                <DatePicker
                                    style={{ width: '100%' }}
                                    onChange={onChange}
                                    picker="year"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={16}>
                            <div className="flex items-center justify-end justify-items-center">
                                <Button
                                    type="primary"
                                    style={{ backgroundColor: token.token.colorPrimary }}
                                >
                                    Search
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card>

                <Card className="shadow-md mb-3">
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
                                        onClick={showDrawer}
                                    >
                                        + เพิ่มวันหยุดรายปี
                                    </Button>
                                    <Drawer
                                        title="เพิ่มวันหยุดรายปี"
                                        headerStyle={{ textAlign: 'center' }}
                                        placement="right"
                                        onClose={onClose}
                                        open={open}
                                        width="40%"
                                    // closable={true}
                                    // maskClosable={false}
                                    // keyboard={false}
                                    >
                                        <div className="flex text-2xl" style={{ color: token.token.colorPrimary }}>
                                            <TbCalendarTime size={30} />
                                            <div
                                                className="ml-2 text-lg"
                                                style={{ color: token.token.colorPrimary }}
                                            > รายละเอียดปฏิทินวันหยุด
                                            </div>
                                        </div>
                                        <Divider style={{ backgroundColor: token.token.colorPrimary }} />

                                        <Form>
                                            <Row>
                                                <Col >
                                                    <Form.Item
                                                        name={''}
                                                        label={'เลือกปี'}
                                                    >
                                                    </Form.Item>
                                                </Col>
                                                <Col >
                                                    <DatePicker
                                                        style={{ width: '100%' }}
                                                        onChange={onChange}
                                                        picker="year"
                                                    />
                                                </Col>
                                                <Col className='ml-5'>
                                                    <Button
                                                        type="primary"
                                                        style={{ backgroundColor: token.token.colorPrimary }}
                                                    >
                                                        Search
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col >
                                                    <Form.Item
                                                        name={''}
                                                        label={'จำนวนวันหยุด'}
                                                    >
                                                    </Form.Item>
                                                </Col>
                                                <Col >
                                                    <Input />
                                                </Col>
                                            </Row>
                                            <Table<DataSourceType> dataSource={dataSources} columns={columns} />
                                            <Space className='flex justify-center'>
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
                                                        setOpen(false);
                                                    }}
                                                >
                                                    ยกเลิก
                                                </Button>
                                            </Space>
                                        </Form>
                                    </Drawer>
                                </Col>

                                <Col>
                                    <Button
                                        type="primary"
                                        size="middle"
                                        style={{
                                            marginBottom: '10px',
                                            backgroundColor: token.token.colorPrimary,
                                        }}
                                    >
                                        + เพิ่มวันหยุดรายวัน+
                                    </Button>
                                </Col>
                            </Space>

                        </div>
                    </Row>
                    <Table<DataSourceType> dataSource={dataSources} columns={columns} />
                </Card>
            </Form>
        </>
    )
};

export default Holidaypage;
