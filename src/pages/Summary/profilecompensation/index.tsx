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

import { GiReceiveMoney } from 'react-icons/gi';
import type { ColumnsType } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';

import edit from '../../../assets/Edit.png';
import Slip from '../../../assets/Slip.png';
import View from '../../../assets/View.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const { useToken } = theme;

type SummaryType = {
    date: any;
    base_salary: any;
    commission: any;
    position_income: any;
    ot: any;
    bonus: any;
    special_income: any;
    other_income: any;
    travel_income: any;
    bursary: any;
    welfare_money: any;
    vat: any;
    vat_per: any;
    social_security: any;
    ss_per: any;
    miss: any;
    ra: any;
    late: any;
    other: any;
    total_income: any;
    total_expense: any;


};

const Compensation: React.FC = () => {
    const token = useToken();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm<SummaryType>();

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
                onClick: (e: any) => onMenuClick(e, record),
            },
            {
                key: 'view_slip',
                label: 'ดูสลิปเงินเดือน',
                icon: <img style={{ width: '18px', height: '18px' }} src={Slip} />,
                onClick: (e: any) => onMenuClick(e, record),
            },
        ];
    };

    const onMenuClick = (event: any, record: any) => {
        const { key } = event;
        if (key === 'edit') {
        } else if (key === 'view') {
        } else if (key === 'view_slip') {
        }
    };

    const onSubmitForm = (value: SummaryType) => {
        console.log('คำนวณ', value)

    }

    interface DataType {
        date: any;
        total_income: number;
        total_expense: number;
        net: number;
        status: string;
    }

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const columns: ColumnsType<DataType> = [
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
                    ค่าตอบแทน ( เงินเดือน ค่าล่วงเวลา ค่าบริหาร เบี้ยขยัน และ อื่น ๆ )
                </div>
            </div>

            <Divider />

            <Card className="shadow-xl">
                <Row className="py-6" gutter={16}>
                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                        <div>
                            <Avatar
                                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                style={{ width: 150, height: 150 }}
                            ></Avatar>
                        </div>
                    </Col>
                    <Col
                        className="flex justify-center items-center"
                        xs={24}
                        sm={24}
                        md={4}
                        lg={4}
                        xl={4}
                    >
                        <div className="text-lg font-bold">
                            <u style={{ color: token.token.colorPrimary }}>
                                Firstname  Lastname
                            </u>
                            <div className="my-4">position</div>
                        </div>
                        {/* <div className="text-lg font-bold">
                            <u style={{ color: token.token.colorPrimary }}>
                                {propsstate?.firstname_th} {propsstate?.lastname_th}
                            </u>
                            <div className="my-4">{propsstate?.position}</div>
                        </div> */}
                    </Col>
                </Row>

                <Form size="middle">
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                            <Form.Item name="search" colon={false} label={'ฐานเงินเดือน'}>
                                <Input allowClear></Input>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                            <Form.Item name="search" colon={false} label={'เลชบัญชี'}>
                                <Input allowClear></Input>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                            <Form.Item name="search" colon={false} label={'ธนาคาร'}>
                                <Input allowClear></Input>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                            <Form.Item name="search" colon={false} label={'ปี'}>
                                <Select allowClear></Select>
                            </Form.Item>
                        </Col>


                        <Col>

                            <Space>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        style={{ backgroundColor: token.token.colorPrimary }}
                                        onClick={showDrawer}
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
                title={'คำนวณเงินเดือน'}
                onClose={onClose}
                open={open}
                width={700}
            >
                <div className="text-lg font-bold">
                    <u style={{ color: token.token.colorPrimary }}>
                        Firstname  Lastname
                    </u>
                    <div className="my-4">position</div>
                </div>
                {/* <div className="text-lg font-bold">
                            <u style={{ color: token.token.colorPrimary }}>
                                {propsstate?.firstname_th} {propsstate?.lastname_th}
                            </u>
                            <div className="my-4">{propsstate?.position}</div>
                        </div> */}
                <Form layout="horizontal" form={form} onFinish={onSubmitForm} >
                    <Row>
                        <Col span={16}>
                            <Form.Item name="date" label={'เดือน/ปี'} className='ml-[88px]'>
                                <DatePicker onChange={onChangeDate} picker="month" format={'MM/YYYY'} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={16}>
                            <div className="text-[18px] ">
                                <u>รายรับ</u>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={16}>
                            <Form.Item name="base_salary" label={'ฐานเงินเดือน'} className='ml-[52px]'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={16}>
                            <Form.Item name="commission" label={'ค่าคอมมิชชั่น'} className='ml-[52px]'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={16}>
                            <Form.Item name="position_income" label={'ค่าตำแหน่ง'} className='ml-[63px]'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={16}>
                            <Form.Item name="special_income" label={'เงินพิเศษ'} className='ml-[72px]'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={16}>
                            <Form.Item name="ot" label={'ค่าล่วงเวลา'} className='ml-[59px]'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={16}>
                            <Form.Item name="other_income" label={'รายได้อื่น'} className='ml-[72px]'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={16}>
                            <Form.Item name="travel_income" label={'ค่าเดินทาง'} className='ml-[64px]'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={16}>
                            <Form.Item name="bursary" label={'เงินอุดหนุน'} className='ml-[60px]'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={16}>
                            <Form.Item name="welfare_money" label={'เงินสวัสดิการ'} className='ml-[47px]'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={16}>
                            <Form.Item name="bonus" label={'เงินโบนัส'} className='ml-[73px]'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={16}>
                            <div className="text-[18px] ">
                                <u>รายหัก</u>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={8} className='ml-12'>

                            <Space>
                                <Form.Item name="vat_per" label={'ภาษี'} className='ml-[54px]'>
                                    <Input className='w-16' disabled />
                                </Form.Item>


                                <Form.Item name="vat" className='ml-10'>
                                    <Input className='w-[208px]' />
                                </Form.Item>
                            </Space>
                        </Col>

                    </Row>

                    <Row>
                        <Col span={16} className='ml-[53px]'>
                            <Space>
                                <Form.Item name="ss_per" label={'ประกันสังคม'}>
                                    <Input className='w-16' disabled />
                                </Form.Item>

                                <Form.Item name="social_security" className='ml-[0.5px]'>
                                    <Input className='w-[208px]' />
                                </Form.Item>
                            </Space>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={16}>
                            <Form.Item name="miss" label={'ขาด'} className='ml-[102px]'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={16}>
                            <Form.Item name="ra" label={'ลา'} className='ml-[111px]'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={16}>
                            <Form.Item name="late" label={'มาสาย'} className='ml-[86px]'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={16}>
                            <Form.Item name="other" label={'อื่น ๆ'} className='ml-[95px]'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row >
                        <Col span={24}>

                            <Form.Item>
                                <Space style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        type="primary"
                                        style={{ backgroundColor: token.token.colorPrimary }}
                                        htmlType="submit"
                                    >
                                        คำนวณ
                                    </Button>
                                    <Button onClick={onClose}>กลับ</Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>

        </>
    );
};

export default Compensation;