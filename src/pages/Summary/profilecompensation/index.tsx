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
    InputNumber,
} from 'antd';
import type { DatePickerProps } from 'antd';
import { AntDesignOutlined, MoreOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { GiReceiveMoney } from 'react-icons/gi';
import type { ColumnsType } from 'antd/es/table';
import type { RangePickerProps } from 'antd/es/date-picker';
import edit from '../../../assets/Edit.png';
import Slip from '../../../assets/Slip.png';
import View from '../../../assets/View.png';
import Cal1 from '../../../assets/Cal1.png';

import * as dayjs from 'dayjs'
import th from 'antd/locale/th_TH'
import { generatePath, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import {
    FETCH_AllSALARY_USER,
    CREATE_SALARY_USER,
    FETCH_ExpenseCompany,
} from '../../../service/graphql/Summary';

import {
    FETCH_GETALL_POSITION,
    CRETE_POSITION_USER,
    POSITION,
} from '../../../service/graphql/Position';
import { getFilePath } from '../../../util';

const { useToken } = theme;


const Compensation: React.FC = () => {
    const token = useToken();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [formshow] = Form.useForm();
    const navigate = useNavigate();
    const [drawerType, setDrawerType] = useState(1);
    const [selectedRow, setselectedRow] = useState<any>();

    const location = useLocation();
    let propsstate = location.state as any;
    console.log(propsstate);

    // const { data: header } = useQuery(FETCH_GETALLUSER);
    const { data: position_data } = useQuery(FETCH_GETALL_POSITION);
    const { data: TableDataSalary, refetch } = useQuery(FETCH_AllSALARY_USER, {
        variables: { userId: propsstate?.userId },
    });
    const { data: ExpenseComData, refetch: refetch2 } = useQuery(FETCH_ExpenseCompany);
    console.log("DataT", TableDataSalary)
    const [creteSalaryUser] = useMutation(CREATE_SALARY_USER);

    // const onFilterData = async (userId: any) => {
    //     let data = [] as any;
    //     if (userId == propsstate?.profile.user_Id) { TableDataSalary?.salary?.push(data) }
    //     console.log("++", data)
    // }
    const setPer: any = () => {
        form.setFieldsValue({
            vat_per: ExpenseComData?.expense_company?.[0]?.vat_per,
            ss_per: ExpenseComData?.expense_company?.[0]?.ss_per,
        })
    }

    useEffect(() => {
        refetch2();
        const salary: any = TableDataSalary
            ? TableDataSalary?.salary?.bookbank_log?.[0]?.base_salary?.toFixed(2)
            : '0.00';
        const banknumber: any = TableDataSalary
            ? TableDataSalary?.salary?.bookbank_log?.[0]?.bank_number
            : '0.00';
        const bankname: any = TableDataSalary
            ? TableDataSalary?.salary?.bookbank_log?.[0]?.mas_bank?.name
            : '';

        formshow.setFieldsValue({
            base_salary: salary,
            bank_number: banknumber,
            mas_bankId: bankname,
        });
    }, [TableDataSalary]);

    const showDrawer = (type: any) => {
        setOpen(true);
        setDrawerType(type);
    };

    const onClose = () => {
        form.resetFields();
        setOpen(false);
    };

    // useEffect(() => {
    //     form.setFieldsValue({ base_salary: propsstate?.bookbank_log[0]?.base_salary })
    // }, [])

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
            setselectedRow(record)
            form.setFieldsValue({ date: record?.date?.format('MM/YYYY') })
        }
    };

    // const onSubmitForm = (value: any) => {
    //     console.log('คำนวณ', value)
    // }

    const onSubmitForm = (value: any) => {
        console.log("คำนวณ", value)
        // drawerType === 1
        //     ? Swal.fire({
        //         title: `ยืนยันการคำนวณเงินเดือน`,
        //         icon: 'warning',
        //         showDenyButton: true,
        //         showCancelButton: false,
        //         confirmButtonColor: token.token.colorPrimary,
        //         denyButtonColor: '#ea4e4e',
        //         confirmButtonText: 'ตกลง',
        //         denyButtonText: `ยกเลิก`,
        //     }).then(async (result) => {
        //         if (result.isConfirmed) {
        //             creteSalaryUser({
        //                 variables: {
        //                     data: {
        //                         ...value,
        //                         user_id: propsstate?.userId,
        //                     },
        //                 },
        //             })
        //                 .then((val) => {
        //                     console.log(val);
        //                     if (val.data?.Createsalary?.status) {
        //                         Swal.fire(`คำนวณเงินเดือนสำเร็จ!`, '', 'success');
        //                         refetch();
        //                         form.resetFields();
        //                     }
        //                 })
        //                 .catch((err) => {
        //                     Swal.fire(`คำนวณเงินเดือนไม่สำเร็จ!`, '', 'error');
        //                     console.error(err);
        //                 });
        //         }
        //     })
        //     : Swal.fire({
        //         title: `ยืนยันการแก้ไขคำนวณเงินเดือน`,
        //         icon: 'warning',
        //         showDenyButton: true,
        //         showCancelButton: false,
        //         confirmButtonColor: token.token.colorPrimary,
        //         denyButtonColor: '#ea4e4e',
        //         confirmButtonText: 'ตกลง',
        //         denyButtonText: `ยกเลิก`,
        //     }).then(async (result) => {
        //         if (result.isConfirmed) {
        //             creteSalaryUser({
        //                 variables: {
        //                     data: {
        //                         ...value,
        //                         user_id: propsstate?.userId,
        //                         id: selectedRow?.id,
        //                     },
        //                 },
        //             })
        //                 .then((val) => {
        //                     console.log(val);
        //                     if (val.data?.Createsalary?.status) {
        //                         Swal.fire(`แก้ไขข้อมูลคำนวณเงินเดือนสำเร็จ!`, '', 'success');
        //                         refetch();
        //                         form.resetFields();
        //                     }
        //                 })
        //                 .catch((err) => {
        //                     Swal.fire(`แก้ไขข้อมูลคำนวณเงินเดือนไม่สำเร็จ!`, '', 'error');
        //                     console.error(err);
        //                     form.resetFields();
        //                 });
        //         }
        //     });
        // setOpen(false);
    };

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const columns: ColumnsType<any> = [
        {
            title: 'เดือน/ปี',
            key: 'date',
            align: 'center',
            render: (text: any, record: any) => text ? dayjs(`${record.month}/${record.years}`, 'MM/YYYY').format('MMMM' + ' ' + 'YYYY') as any : '',
        },
        {
            title: 'รายได้รวม',
            key: 'total_income',
            dataIndex: 'total_income',
            align: 'center',
            render: (record) => {
                return record?.salary?.salary?.total_income ?? '-';
            },
        },
        {
            title: 'รายหักรวม',
            key: 'total_expense',
            dataIndex: 'total_expense',
            align: 'center',
            render: (record) => {
                return record?.salary?.salary?.total_expense ?? '-';
            },
        },
        {
            title: 'รายได้สุทธิ',
            key: 'net',
            dataIndex: 'net',
            align: 'center',
            render: (record) => {
                return <div>{record.toFixed(2)}</div>;
            },
        },
        {
            title: 'สถานะ',
            key: 'mas_salary_statusId',
            dataIndex: 'mas_salary_statusId',
            align: 'center',
            render: (record) => {
                if (record == '765d31b6-ab63-11ed-afa1-0242ac120002') {
                    return "คำนวณสำเร็จ"
                }

            },

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

    const disabledDate: RangePickerProps['disabledDate'] = current => {
        const getmount = TableDataSalary?.salary;
        // console.log('getmount', getmount)
        // console.log('current && current ', current)
        return current && current < dayjs().endOf('day');
    };

    // const onChangeCalculate: any = salary: any, value: any) => {
    //     const num = value?.base_salary + value?.commission;

    // }
    // console.log(onChangeCalculate)
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
                                {propsstate?.profile?.prefix_th} {propsstate?.profile?.firstname_th}{' '}
                                {propsstate?.profile?.lastname_th}
                            </u>
                            <div className="mt-4">
                                {propsstate?.Position_user?.[0]?.mas_positionlevel3?.name ?? 'ไม่มีตำแหน่งงาน'}
                            </div>
                        </div>
                    </Col>
                </Row>

                <Form form={formshow} size="middle">
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={9} xl={6}>
                            <Form.Item name="base_salary" colon={false} label={'ฐานเงินเดือน'}>
                                <Input allowClear
                                    disabled
                                    defaultValue={propsstate?.bookbank_log[0]?.base_salary}>
                                </Input>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={9} xl={6}>
                            <Form.Item name="bank_number" colon={false} label={'เลชบัญชี'} style={{ marginLeft: "24px", }}>
                                <Input allowClear
                                    disabled
                                    defaultValue={propsstate?.bookbank_log[0]?.bank_number}>
                                </Input>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={9} xl={6}>
                            <Form.Item name="bank" colon={false} label={'ธนาคาร'} style={{ marginLeft: "32px", }}>
                                <Input allowClear
                                    disabled
                                    defaultValue={propsstate?.bookbank_log[0]?.mas_bank?.name}>
                                </Input>
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
                                        onClick={() => {
                                            showDrawer(1)
                                            form.setFieldsValue({
                                                base_salary: propsstate?.bookbank_log[0]?.base_salary,
                                            })
                                        }}
                                    >
                                        คำนวณเงินเดือน
                                    </Button>
                                </Form.Item>
                            </Space>

                        </Col>
                    </Row>


                </Form>

            </Card>
            <Card className="shadow-xl mt-4">
                <Table columns={columns} dataSource={TableDataSalary?.salary?.salary as any} /></Card>

            <Drawer
                title={`${drawerType === 1 ? "คำนวณเงินเดือน"
                    : drawerType === 2 ? "แก้ไขคำนวณเงินเดือน"
                        : "เงินเดือน"}`}
                onClose={onClose}
                open={open}
                afterOpenChange={setPer}
                width={500}
            >
                <div className="text-lg font-bold">
                    <u style={{ color: token.token.colorPrimary }}>
                        {propsstate?.profile?.prefix_th} {propsstate?.profile?.firstname_th}{' '}
                        {propsstate?.profile?.lastname_th}
                    </u>
                    <div className="mt-4">
                        {position_data?.getposition_user?.[
                            position_data?.getposition_user?.length - 1
                        ]?.mas_positionlevel3?.name ?? 'no'}
                    </div>
                </div>

                <Form layout="horizontal" onValuesChange={(column, all) => {
                    console.log(column, all)
                    // console.log((Object.keys(column)[0]) in { commission: '', wa: '' })
                    const finish = () => {
                        if (all.total_income !== undefined && all.total_expense !== undefined) {
                            console.log('calculater', all.total_income, all.total_expense)
                            let netval = parseFloat(all.total_income ? all.total_income : 0)
                                - parseFloat(all.total_expense ? all.total_expense : 0);
                            const sumNets = (netval: any) => {
                                form.setFieldValue('net', (netval).toString())
                            }
                            sumNets(netval)
                        }
                    }
                    const sum = () => {
                        let sumval = parseFloat(all.base_salary ? all.base_salary : 0)
                            + parseFloat(all.commission ? all.commission : 0)
                            + parseFloat(all.position_income ? all.position_income : 0)
                            + parseFloat(all.special_income ? all.special_income : 0)
                            + parseFloat(all.ot ? all.ot : 0)
                            + parseFloat(all.other_income ? all.other_income : 0)
                            + parseFloat(all.travel_income ? all.travel_income : 0)
                            + parseFloat(all.bursary ? all.bursary : 0)
                            + parseFloat(all.welfare_money ? all.welfare_money : 0)
                            + parseFloat(all.bonus ? all.bonus : 0);
                        console.log(sumval);
                        form.setFieldValue('total_income', (sumval).toString())
                        finish()
                    }
                    const minus = () => {
                        let vatCal = (parseFloat(all.base_salary ? all.base_salary : 0)
                            + parseFloat(all.commission ? all.commission : 0)
                            + parseFloat(all.position_income ? all.position_income : 0)
                            + parseFloat(all.special_income ? all.special_income : 0)
                            + parseFloat(all.ot ? all.ot : 0)
                            + parseFloat(all.other_income ? all.other_income : 0)
                            + parseFloat(all.travel_income ? all.travel_income : 0)
                            + parseFloat(all.bursary ? all.bursary : 0)
                            + parseFloat(all.welfare_money ? all.welfare_money : 0)
                            + parseFloat(all.bonus ? all.bonus : 0));
                        let minusval = parseFloat(all.vat ? all.vat : 0)
                            + parseFloat(all.social_security ? all.social_security : 0)
                            + parseFloat(all.miss ? all.miss : 0)
                            + parseFloat(all.ra ? all.ra : 0)
                            + parseFloat(all.late ? all.late : 0)
                            + parseFloat(all.other ? all.other : 0);
                        console.log(minusval);
                        form.setFieldValue('total_expense', (minusval).toString())
                        finish()
                    }
                    if ((Object.keys(column)[0]) in {
                        base_salary: '',
                        commission: '',
                        position_income: '',
                        special_income: '',
                        ot: '',
                        other_income: '',
                        travel_income: '',
                        bursary: '',
                        welfare_money: '',
                        bonus: '',
                    }) {
                        sum();
                    }
                    if ((Object.keys(column)[0]) in {
                        vat: '',
                        social_security: '',
                        miss: '',
                        ra: '',
                        late: '',
                        other_income: '',
                        other: '',
                    }) {
                        minus();
                    }


                }} form={form} onFinish={onSubmitForm} >
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="date" label={'เดือน/ปี'} className='ml-[82px]'>
                                <DatePicker onChange={onChangeDate} picker="month" format={'MM/YYYY'}
                                    disabled={drawerType === 3 ? true : false}
                                    disabledDate={disabledDate}
                                />
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
                                <InputNumber
                                    disabled
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="commission" label={'ค่าคอมมิชชั่น'} className='ml-[52px]'>
                                <InputNumber style={{ width: "100%" }} disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="position_income" label={'ค่าตำแหน่ง'} className='ml-[63px]'>
                                <InputNumber style={{ width: "100%" }} disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="special_income" label={'เงินพิเศษ'} className='ml-[72px]'>
                                <InputNumber style={{ width: "100%" }} disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="ot" label={'ค่าล่วงเวลา'} className='ml-[59px]'>
                                <InputNumber style={{ width: "100%" }} disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="other_income" label={'รายได้อื่น'} className='ml-[72px]'>
                                <InputNumber style={{ width: "100%" }} disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="travel_income" label={'ค่าเดินทาง'} className='ml-[64px]'>
                                <InputNumber style={{ width: "100%" }} disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="bursary" label={'เงินอุดหนุน'} className='ml-[60px]'>
                                <InputNumber style={{ width: "100%" }} disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="welfare_money" label={'เงินสวัสดิการ'} className='ml-[47px]'>
                                <InputNumber style={{ width: "100%" }} disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="bonus" label={'เงินโบนัส'} className='ml-[73px]'>
                                <InputNumber style={{ width: "100%" }} disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="total_income" label={'รายได้รวม'} className='ml-[73px]'>
                                <InputNumber style={{ width: "100%" }} disabled />
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
                                    <InputNumber className='w-16' disabled />
                                </Form.Item>


                                <Form.Item name="vat" className='ml-[1px]'>
                                    <InputNumber style={{ width: "100%" }} disabled={drawerType === 3 ? true : false}
                                        className='w-[222px]'
                                    />
                                </Form.Item>
                            </Space>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className='ml-[53px]'>
                            <Space>
                                <Form.Item name="ss_per" label={'ประกันสังคม'}>
                                    <InputNumber className='w-16' disabled />
                                </Form.Item>

                                <Form.Item name="social_security" className='ml-[0.5px]'>
                                    <InputNumber style={{ width: "100%" }} disabled={drawerType === 3 ? true : false} className='w-[222px]' />
                                </Form.Item>
                            </Space>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="miss" label={'ขาด'} className='ml-[102px]'>
                                <InputNumber style={{ width: "100%" }} disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="ra" label={'ลา'} className='ml-[111px]'>
                                <InputNumber style={{ width: "100%" }} disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="late" label={'มาสาย'} className='ml-[86px]'>
                                <InputNumber style={{ width: "100%" }} disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="other" label={'อื่น ๆ'} className='ml-[95px]'>
                                <InputNumber style={{ width: "100%" }} disabled={drawerType === 3 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="total_expense" label={'รายหักรวม'} className='ml-[73px]'>
                                <InputNumber style={{ width: "100%" }} disabled />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="net" label={'รวมรายรับสุทธิ'} className='font-bold ml-[37px]'>
                                <InputNumber disabled style={{ background: "#CCFFFF", width: "100%" }} />
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