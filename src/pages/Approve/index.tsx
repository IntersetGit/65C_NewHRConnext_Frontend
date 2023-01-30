import {
    Button,
    Card,
    Col,
    Divider,
    Drawer,
    DatePicker,
    Upload,
    Dropdown,
    Form,
    Input,
    Row,
    Select,
    Space,
    Table,
    theme,
    Radio,
} from "antd";
import { useState } from 'react';
import { RiCalendarCheckLine } from "react-icons/ri";
import type { ColumnsType } from 'antd/es/table';
import type { RadioChangeEvent } from 'antd';
import { MoreOutlined, UploadOutlined } from "@ant-design/icons";
import edit from '../../assets/Edit.png';
import Del from '../../assets/DEL.png';
import View from '../../assets/View.png';

const { useToken } = theme;
const { TextArea } = Input;

interface DataType {
    key: number;
    name: string;
    number: number;
    typeofleave: string;
    fromdate: string;
    uptodate: string;
    numberofdays: number;
    leavestatus: string;
}

const Approveleave: React.FC = () => {
    const token = useToken();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [selectedrow, setselectedrow] = useState<any>([]);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
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
            },
            {
                key: 'delete',
                label: 'ลบข้อมูล',
                icon: <img style={{ width: '20px', height: '20px' }} src={Del} />,
            },
        ];
    };

    const onMenuClick = (event: any, record: any) => {
        const { key } = event;

        if (key === 'edit') {
            showDrawer();
            setselectedrow(record)
            form.setFieldsValue(record)
        } else if (key === 'view') {
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
            title: 'ชื่อ',
            key: 'name',
            dataIndex: 'name',
            align: 'center',
        },
        {
            title: 'ประเภทการลา',
            key: 'typeofleave',
            dataIndex: 'typeofleave',
            align: 'center',
        },
        {
            title: 'จากวันที่',
            key: 'fromdate',
            dataIndex: 'fromdate',
            align: 'center',
        },
        {
            title: 'ถึงวันที่',
            key: 'uptodate',
            dataIndex: 'uptodate',
            align: 'center',
        },
        {
            title: 'จำนวนวัน',
            key: 'numberofdays',
            dataIndex: 'numberofdays',
            align: 'center',
        },
        {
            title: 'สถานะการลา',
            key: 'leavestatus',
            dataIndex: 'leavestatus',
            align: 'center',
        },
        {
            title: 'Action',
            key: 'Action',
            align: 'center',
            render: (_: any, record: any) => (
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
            number: 1,
            name: 'นาย ใจจริง จริงใจไมจิงโจ้',
            typeofleave: 'ลาป่วย',
            fromdate: '20-9-2021',
            uptodate: '25-5-2021',
            numberofdays: 5,
            leavestatus: 'รออนุมัติ',
        },
        {
            key: 2,
            number: 2,
            name: 'นาย มิตร มิตรแท้ประกันใคร',
            typeofleave: 'ลากิจ',
            fromdate: '29-9-2021',
            uptodate: '30-5-2021',
            numberofdays: 1,
            leavestatus: 'รออนุมัติ',
        },
    ];

    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <>
            <div className="flex text-2xl ml-2 pt-4">
                <RiCalendarCheckLine size={30} />
                <div className="ml-2 text-lg" >การอนุมัติใบลา</div>
            </div>
            <Divider style={{ backgroundColor: token.token.colorPrimary }} />

            <Card className="shadow-md mb-5">
                <Form>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                            <Form.Item label={<b>ชื่อ</b>}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                            <Form.Item label={<b>แผนก</b>}>
                                <Select
                                    options={[
                                        {
                                            value: '1',
                                            label: 'การเงิน',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                            <Form.Item label={<b>ตำแหน่ง</b>}>
                                <Select
                                    options={[
                                        {
                                            value: '1',
                                            label: 'การขาย',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                            <div className="ml-2 items-center flex justify-end">
                                <Space>
                                    <Button
                                        type="primary"
                                        style={{ backgroundColor: token.token.colorPrimary }}
                                    >
                                        Search
                                    </Button>
                                    <Button>Reset</Button>
                                </Space>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Card>

            <Card className="shadow-md mb-3">
                <Table columns={columns} dataSource={data}></Table>
            </Card>

            <Drawer
                title="รายละเอียดการอนุมัติใบลา"
                headerStyle={{ textAlign: 'center' }}
                onClose={onClose}
                open={open}
                width="40%"
            >
                <Form form={form} layout="vertical">
                    <Row>
                        <Col span={12}>
                            <Form.Item className='mb-3' label={'การอนุมัติใบลา'}>
                                <div className="text-lg font-bold">
                                    <u style={{ color: token.token.colorPrimary }}>
                                        {selectedrow?.name}
                                    </u>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item name={'typeofleave'} label={'ประเภทการลา'}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name={''} label={'จากวันที่'}>
                                <DatePicker style={{ width: '100%' }} format={'YYYY-MM-DD'} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={''} label={'ถึงวันที่'}>
                                <DatePicker style={{ width: '100%' }} format={'YYYY-MM-DD'} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name={'numberofdays'} label={'จำนวนวัน'}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name={'leavestatus'} label={'สถานะการลา'}>
                                <Input disabled style={{ color: token.token.colorPrimary }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Form.Item label={'เหตุผลการลา'}>
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Form.Item label={'ไฟล์เอกสาร'}>
                                <Upload>
                                    <Button style={{ width: '100%' }} icon={<UploadOutlined />}>
                                        ไฟล์เอกสาร PDF
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row className="mb-10"
                        style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <Col>
                            <Radio.Group onChange={onChange} value={value}>
                                <Radio value={1}>อนุมัติ</Radio>
                                <Radio value={2}>ไม่อนุมัติ</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>

                    <Row gutter={16} style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <Form.Item>
                            <Space>
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    style={{ backgroundColor: token.token.colorPrimary, }}
                                >
                                    บันทึก
                                </Button>
                                <Button
                                    onClick={onClose}
                                >
                                    ยกเลิก
                                </Button>
                            </Space>
                        </Form.Item>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default Approveleave;