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
    Avatar,
    Drawer,
    DatePicker,
} from 'antd';
import type { DatePickerProps } from 'antd';
import { AntDesignOutlined, MoreOutlined } from '@ant-design/icons';

import { GiReceiveMoney } from 'react-icons/gi';
import type { ColumnsType } from 'antd/es/table';

import edit from '../../../assets/Edit.png';
import Slip from '../../../assets/Slip.png';
import View from '../../../assets/View.png';
import Cal1 from '../../../assets/Cal1.png';

import moment from 'moment';
import { generatePath, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { FETCH_DATA_SUMMARY } from '../../../service/graphql/Summary';
import { FETCH_GETALLUSER } from '../../../service/graphql/Users';
import {
    FETCH_GETALL_POSITION,
    CRETE_POSITION_USER,
    POSITION,
} from '../../../service/graphql/Position';
import { getFilePath } from '../../../util';

const { useToken } = theme;

interface DataType {
    date: any;
    total_income: number;
    total_expense: number;
    net: number;
    status: string;
}

const Compensation: React.FC = () => {
    const token = useToken();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [drawerType, setDrawerType] = useState(1);
    const [selectedRow, setSelectedRow] = useState(null);

    const location = useLocation();
    let propsstate = location.state as any;
    console.log(propsstate);

    const { data: header } = useQuery(FETCH_GETALLUSER);
    const { data: position_data, refetch } = useQuery(FETCH_GETALL_POSITION);

    const showDrawer = (type: any) => {
        setOpen(true);
        setDrawerType(type);
    };

    const onClose = () => {
        form.resetFields();
        setOpen(false);
    };

    const genarateMenu = (record: any) => {
        return [
            {
                key: 'view',
                label: 'ดูข้อมูล',
                icon: <img style={{ width: '17px', height: '17px' }} src={View} />,
                onClick: (e: any) => onMenuClick(e, record),
            },
            {
                key: 'edit',
                label: 'แก้ไข',
                icon: <img style={{ width: '17px', height: '17px' }} src={edit} />,
                onClick: (e: any) => onMenuClick(e, record),
            },
            {
                key: 'view_slip',
                label: 'ดูสลิปเงินเดือน',
                icon: <img style={{ width: '18px', height: '18px' }} src={Slip} />,
                onClick: (e: any) => onMenuClick(e, record),
            },
            {
                key: 'calculate',
                label: 'คำนวณเงินเดือน',
                icon: <img style={{ width: '17px', height: '17px' }} src={Cal1} />,
                onClick: (e: any) => onMenuClick(e, record),
            },
        ];
    };

    const onMenuClick = (event: any, record: any) => {
        const { key } = event;
        if (key === 'edit') {
            showDrawer(2);
        } else if (key === 'view') {
            showDrawer(3);
        } else if (key === 'view_slip') {
            navigate(`payslip`);
        } else if (key === 'calculate') {
            showDrawer(1);
            setSelectedRow(record)
            form.setFieldsValue({ date: record?.date?.format('MM/YYYY') })
        }
    };

    const onSubmitForm = (value: any) => {
        console.log('คำนวณ', value)

    }

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const columns: ColumnsType<any> = [
        {
            title: 'เดือน/ปี',
            key: 'date',
            dataIndex: 'date',
            align: 'center',
        },
        {
            title: 'รายได้รวม',
            key: 'total_income',
            dataIndex: 'total_income',
            align: 'center',
        },
        {
            title: 'รายหักรวม',
            key: 'total_expense',
            dataIndex: 'total_expense',
            align: 'center',
        },
        {
            title: 'รายได้สุทธิ',
            key: 'net',
            dataIndex: 'net',
            align: 'center',
        },
        {
            title: 'สถานะ',
            key: 'status',
            dataIndex: 'status',
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
            date: 'มกราคม 2023',
            total_income: 25000,
            total_expense: 500,
            net: 24500,
            status: 'คำนวณสำเร็จ',
        },
        {
            date: 'กุมภาพันธ์ 2023',
            total_income: 25000,
            total_expense: 500,
            net: 24500,
            status: 'คำนวณสำเร็จ',
        },
        {
            date: 'มีนาคม 2023',
            total_income: 25000,
            total_expense: 500,
            net: 24500,
            status: 'คำนวณสำเร็จ',
        },

    ];

    return (
        <>
            <div className="flex text-3xl ml-2 pt-4">
                <GiReceiveMoney />
                <div className="ml-2 text-xl">
                    ข้อมูลเงินเดือน ( ค่าล่วงเวลา ค่าบริหาร เบี้ยขยัน และ อื่น ๆ )
                </div>
            </div>

            <Divider />

            <Card className="shadow-xl">
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                        <div>
                            <Avatar
                                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                icon={<AntDesignOutlined />}
                                src={getFilePath() + propsstate?.avatar}
                            ></Avatar>
                        </div>
                    </Col>

                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                        <div className="text-lg font-bold">
                            <u className="text-blue-800">
                                {propsstate?.prefix_th} {propsstate?.firstname_th}{' '}
                                {propsstate?.lastname_th}
                            </u>
                            <div className="mt-4">
                                {position_data?.getposition_user?.[
                                    position_data?.getposition_user?.length - 1
                                ]?.mas_positionlevel2?.name ?? 'ไม่มีตำแหน่งงาน'}
                            </div>
                        </div>
                    </Col>
                </Row>

                <Form size="middle">
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={9} xl={6}>
                            <Form.Item name="base_salary" colon={false} label={'ฐานเงินเดือน'}>
                                <Input allowClear disabled></Input>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={9} xl={6}>
                            <Form.Item name="bank_number" colon={false} label={'เลชบัญชี'} style={{ marginLeft: "24px", }}>
                                <Input allowClear disabled></Input>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={9} xl={6}>
                            <Form.Item name="bank" colon={false} label={'ธนาคาร'} style={{ marginLeft: "32px", }}>
                                <Input allowClear disabled></Input>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Col xs={24} sm={24} md={24} lg={9} xl={6}>
                            <Form.Item name="year" colon={false} label={'ปี'} style={{ marginLeft: "66px", }}>
                                <Select allowClear></Select>
                            </Form.Item>
                        </Col>


                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>

                            <Space>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        style={{ backgroundColor: token.token.colorPrimary }}
                                        onClick={() => showDrawer(1)}
                                    >
                                        คำนวณเงินเดือน
                                    </Button>
                                </Form.Item>
                            </Space>

                        </Col>
                    </Row>


                </Form>

            </Card>
            <Card className="shadow-xl mt-4"><Table columns={columns} dataSource={data} /></Card>

            <Drawer
                title={`${drawerType === 1 ? "คำนวณเงินเดือน"
                    : drawerType === 2 ? "แก้ไขคำนวณเงินเดือน"
                        : "เงินเดือน"}`}
                onClose={onClose}
                open={open}
                width={500}
            >
                <div className="text-lg font-bold">
                    <u style={{ color: token.token.colorPrimary }}>
                        {propsstate?.prefix_th} {propsstate?.firstname_th}{' '}
                        {propsstate?.lastname_th}
                    </u>
                    <div className="mt-4">
                        {position_data?.getposition_user?.[
                            position_data?.getposition_user?.length - 1
                        ]?.mas_positionlevel2?.name ?? 'no'}
                    </div>
                </div>

                <Form layout="horizontal" form={form} onFinish={onSubmitForm} >
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="date" label={'เดือน/ปี'} className='ml-[82px]'>
                                <DatePicker onChange={onChangeDate} picker="month" format={'MM/YYYY'}
                                    disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className="text-[18px] ">
                                <u>รายรับ</u>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="base_salary" label={'ฐานเงินเดือน'} className='ml-[52px]'>
                                <Input disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="commission" label={'ค่าคอมมิชชั่น'} className='ml-[52px]'>
                                <Input disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="position_income" label={'ค่าตำแหน่ง'} className='ml-[63px]'>
                                <Input disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="special_income" label={'เงินพิเศษ'} className='ml-[72px]'>
                                <Input disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="ot" label={'ค่าล่วงเวลา'} className='ml-[59px]'>
                                <Input disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="other_income" label={'รายได้อื่น'} className='ml-[72px]'>
                                <Input disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="travel_income" label={'ค่าเดินทาง'} className='ml-[64px]'>
                                <Input disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="bursary" label={'เงินอุดหนุน'} className='ml-[60px]'>
                                <Input disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="welfare_money" label={'เงินสวัสดิการ'} className='ml-[47px]'>
                                <Input disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="bonus" label={'เงินโบนัส'} className='ml-[73px]'>
                                <Input disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className="text-[18px] ">
                                <u>รายหัก</u>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className='ml-12'>

                            <Space>
                                <Form.Item name="vat_per" label={'ภาษี'} className='ml-[54px]'>
                                    <Input className='w-16' disabled />
                                </Form.Item>


                                <Form.Item name="vat" className='ml-[1px]'>
                                    <Input disabled={drawerType === 3 ? true : false} className='w-[222px]' />
                                </Form.Item>
                            </Space>
                        </Col>

                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className='ml-[53px]'>
                            <Space>
                                <Form.Item name="ss_per" label={'ประกันสังคม'}>
                                    <Input className='w-16' disabled />
                                </Form.Item>

                                <Form.Item name="social_security" className='ml-[0.5px]'>
                                    <Input disabled={drawerType === 3 ? true : false} className='w-[222px]' />
                                </Form.Item>
                            </Space>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="miss" label={'ขาด'} className='ml-[102px]'>
                                <Input disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="ra" label={'ลา'} className='ml-[111px]'>
                                <Input disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="late" label={'มาสาย'} className='ml-[86px]'>
                                <Input disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="other" label={'อื่น ๆ'} className='ml-[95px]'>
                                <Input disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="other" label={'รวมรายรับสุทธิ'} className='font-bold ml-[37px]'>
                                <Input disabled style={{ background: "#CCFFFF", }} />
                            </Form.Item>
                        </Col>
                    </Row>


                    {drawerType === 1 && (<Row >
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item>
                                <Space style={{ display: 'flex', justifyContent: 'right', marginTop: '10px', }}>
                                    <Button
                                        type="primary"
                                        style={{ backgroundColor: token.token.colorPrimary, width: '100px', }}
                                        htmlType="submit"
                                        size='large'
                                    >
                                        คำนวณ
                                    </Button>
                                    <Button size='large' style={{ width: '100px', }} onClick={onClose}>กลับ</Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                    )}

                    {drawerType === 2 && (<Row >
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item>
                                <Space style={{ display: 'flex', justifyContent: 'right', marginTop: '10px', }}>
                                    <Button
                                        type="primary"
                                        style={{ backgroundColor: token.token.colorPrimary, width: '100px', }}
                                        htmlType="submit"
                                        size='large'
                                    >
                                        คำนวณ
                                    </Button>
                                    <Button size='large' style={{ width: '100px', }} onClick={onClose}>กลับ</Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                    )}
                </Form>
            </Drawer>

        </>
    );
};

export default Compensation;