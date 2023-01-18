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
    Select,
} from "antd";
import TableHoliday from '../HolidayCalendar/tableholiday'
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
    const [openyear, setOpenyear] = useState(false);
    const [openday, setOpenday] = useState(false);
    const [form] = Form.useForm();

    const showDraweryear = () => {
        setOpenyear(true);
    };

    const onCloseyear = () => {
        setOpenyear(false);
    };

    const showDrawerday = () => {
        setOpenday(true);
    };

    const onCloseday = () => {
        setOpenday(false);
    };

    return (
        <>
            <div className="flex text-2xl ml-2 pt-4">
                <TbCalendarTime size={30} />
                <div className="ml-2 text-lg">ปฏิทินวันหยุด</div>
            </div>
            <Divider style={{ backgroundColor: token.token.colorPrimary }} />

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
                <Row gutter={8}>
                    <Col>
                        <Button
                            type="primary"
                            size="middle"
                            style={{
                                marginBottom: '10px',
                                backgroundColor: token.token.colorPrimary,
                            }}
                            onClick={showDraweryear}
                        >
                            + เพิ่มวันหยุดรายปี
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
                            onClick={showDrawerday}
                        >
                            + เพิ่มวันหยุดรายวัน
                        </Button>
                    </Col>
                </Row>
                <Table<DataSourceType> dataSource={dataSources} columns={columns} />
            </Card>

            <Drawer
                title="เพิ่มวันหยุดรายปี"
                headerStyle={{ textAlign: 'center' }}
                placement="right"
                onClose={onCloseyear}
                open={openyear}
                width="40%"
            >
                <Form>
                    <div className="flex text-2xl" style={{ color: token.token.colorPrimary }}>
                        <TbCalendarTime size={30} />
                        <div
                            className="ml-2 text-lg"
                            style={{ color: token.token.colorPrimary }}
                        > รายละเอียดปฏิทิน
                        </div>
                    </div>
                    <Divider style={{ backgroundColor: token.token.colorPrimary }} />

                    <Row >
                        <Col xs={24} sm={6} md={12} lg={12} xl={5}>
                            <Form.Item
                                name={''}
                                label={'เลือกปี'}
                            >
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={18} md={12} lg={12} xl={10}>
                            <DatePicker
                                style={{ width: '100%' }}
                                onChange={onChange}
                                picker="year"
                            />
                        </Col>
                    </Row>
                    <Row >
                        <Col xs={24} sm={10} md={12} lg={12} xl={5}>
                            <Form.Item
                                name={''}
                                label={'จำนวนวันหยุด'}
                            >
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={14} md={12} lg={12} xl={10}>
                            <Input />
                        </Col>
                    </Row>

                    <TableHoliday />

                    <Row gutter={16} style={{ position: 'relative', display: 'flex', top: '20px' }}>
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
                                        setOpenyear(false);
                                    }}
                                >
                                    ยกเลิก
                                </Button>
                            </Space>
                        </Form.Item>
                    </Row>
                </Form>
            </Drawer>

            <Drawer
                title="เพิ่มวันหยุดรายวัน"
                headerStyle={{ textAlign: 'center' }}
                placement="right"
                onClose={onCloseday}
                open={openday}
                width="40%"
            >
                <Form>
                    <div className="flex text-2xl" style={{ color: token.token.colorPrimary }}>
                        <TbCalendarTime size={30} />
                        <div
                            className="ml-2 text-lg"
                            style={{ color: token.token.colorPrimary }}
                        > รายละเอียดปฏิทิน
                        </div>
                    </div>
                    <Divider style={{ backgroundColor: token.token.colorPrimary }} />
                    <Row>
                        <Col>
                            <Form.Item
                                name={''}
                                label={'เลือก วัน/เดือน/ปี'}
                            >
                            </Form.Item>
                        </Col>
                        <Col >
                            <DatePicker onChange={onChange} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item
                                name={''}
                                label={'ชื่อวันหยุด'}
                            >
                            </Form.Item>
                        </Col>
                        <Col>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="กรุณาเลือกวันที่จะหยุด"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={[
                                    {
                                        value: '1',
                                        label: 'วันจักรี',
                                    },
                                    {
                                        value: '2',
                                        label: 'วันสงกรานต์',
                                    },
                                    {
                                        value: '3',
                                        label: 'วันแรงงานแห่งชาติ',
                                    },
                                    {
                                        value: '4',
                                        label: 'วันฉัตรมงคล',
                                    },
                                    {
                                        value: '5',
                                        label: 'วันวิสาขบูชา',
                                    },
                                    {
                                        value: '6',
                                        label: 'วันอาสาฬหบูชา',
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row
                        className="py-6"
                        gutter={16}
                        style={{ position: 'relative' }}
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
                                    onClick={() => {
                                        setOpenday(false);
                                    }}
                                >
                                    ยกเลิก
                                </Button>
                            </Space>
                        </Form.Item>
                    </Row>
                </Form>
            </Drawer>

        </>
    )
};

export default Holidaypage;
