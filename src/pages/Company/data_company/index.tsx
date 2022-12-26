import React, { useState } from 'react';
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    Popconfirm,
    Row,
    Select,
    Space,
    Table,
} from 'antd';
import { RiCommunityLine, RiCloseFill } from "react-icons/ri";
import { FaFacebookSquare, FaLinkedin, FaInstagramSquare, FaLine, FaSearch } from "react-icons/fa";


const Companyniti: React.FC<{ products: { name: string }[]; onDelete: (id: string) => void }> = ({
    onDelete,
    products,
}) => {

    const [isTablefield, setTablefield] = useState(true);

    const columns = [
        {
            title: 'ลำดับ',
            dataIndex: 'number',
        },
        {
            title: 'ประเภท',
            dataIndex: 'type',
        },
        {
            title: 'ชื่อบริษัท/สาขา',
            dataIndex: 'name_company',
        },
        {
            title: 'ที่อยู่',
            dataIndex: 'address',
        },
        {
            title: 'หมายเลขโทรศัพท์',
            dataIndex: 'phone_number',
        },
        {
            title: 'Web Site',
            dataIndex: 'web_site',
        },
        {
            title: 'Actions',
            render: (text: any, record: { id: string; }) => {
                return (
                    <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
                        <Button>Delete</Button>
                    </Popconfirm>
                );
            },
        },
    ];

    const dataSource = [
        {
            key: '1',
            number: '1',
            type: 'สำนักงานใหญ่',
            name_company: 'บริษัท GIS',
            address: '123/456 ถ.นางลิ้นจี่ ประเทศไทย',
            phone_number: '085-451-4874',
            web_site: 'www.company/GIS.com'
        },
        {
            key: '2',
            number: '2',
            type: 'สาขา',
            name_company: 'บริษัท PPT',
            address: '123/456 ถ.วิภาวดีรังสิต ประเทศไทย',
            phone_number: '094-548-1215',
            web_site: 'www.company/PPT.com'
        },
        {
            key: '3',
            number: '3',
            type: 'สาขา',
            name_company: 'ห้างหุ่นส่วนจำกัด วิกรมเภสัช',
            address: '78 ซ.รามคำแหง15 ถ.รามคำแหง กรุงเทพ',
            phone_number: '081-358-1543',
            web_site: 'www.company/ghost.com'
        },
    ];

    return (
        <>
            {isTablefield ? (

                <Form>
                    <div className="relative flex flex-row items-center">
                        <div className="flex flex-row items-center text-4xl">
                            <RiCommunityLine />
                        </div>
                        <span className="ml-4 text-lg tracking-wide truncate">
                            จัดการบริษัท
                        </span>
                    </div>
                    <Divider />

                    <Row gutter={16}>
                        <Col>
                            <Form.Item>
                                <span className="tracking-wide truncate">
                                    ชื่อบริษัท / สาขา
                                </span>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Input />
                        </Col>
                        <Col>
                            <Button>
                                <FaSearch />
                            </Button>
                        </Col>
                    </Row>

                    <Col>
                        <Form.Item>
                            <span className="tracking-wide truncate text-[#FC6634]">
                                บริษัท / นิติบุคคล
                            </span>
                            <span style={{ position: 'absolute', right: '10px', height: '10px' }}>
                                <Button
                                    style={{ height: '35px' }}
                                    onClick={() => {
                                        setTablefield(false);
                                    }}
                                >
                                    + เพิ่มสาขา
                                </Button>
                            </span>
                        </Form.Item>
                    </Col>
                    <Table dataSource={dataSource} columns={columns} />
                </Form>
            ) : (
                <>
                    <div className="relative flex flex-row items-center">
                        <div className="flex flex-row items-center text-4xl">
                            <RiCommunityLine />
                        </div>
                        <span className="ml-4 text-lg tracking-wide truncate">
                            ข้อมูลบริษัท / นิติบุคคล
                        </span>
                        <span style={{ position: 'absolute', right: '10px', height: '10px' }}>
                            <Button style={{ height: '35px' }}>
                                จัดการโครงสร้างบริษัท
                            </Button>
                        </span>
                    </div>
                    <Divider />

                    <Form>
                        <Row gutter={12}>
                            <Col span={8}>
                                <Form.Item label={'ชื่อบริษัท'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณากรอกชื่อบริษัท',
                                        },
                                    ]}>
                                    <Input placeholder="กรุณากรอกชื่อบริษัท" />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label={'เลขจดทะเบียนบริษัท'}>
                                    <Input placeholder="กรุณากรอกเลขจดทะเบียนบริษัท" />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label={'เลขทะเบียนภาษีมูลค่าเพิ่ม'}>
                                    <Input placeholder="กรุณากรอกเลขทะเบียนภาษีมูลค่าเพิ่ม" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={12}>
                            <Col span={12}>
                                <Form.Item label={'ที่อยู่ 1'}>
                                    <Input placeholder="กรุณากรอกที่อยู่" />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label={'ที่อยู่ 2'}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label={'จังหวัด'}>
                                    <Select
                                        options={[
                                            {
                                                value: '1',
                                                label: 'กรุงเทพฯ',
                                            },
                                            {
                                                value: '2',
                                                label: 'ชลบุรี',
                                            },
                                            {
                                                value: '3',
                                                label: 'เชียงใหม่',
                                            },
                                            {
                                                value: '4',
                                                label: 'ขอนแก่น',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={'เขต/อำเภอ'}>
                                    <Select
                                        options={[
                                            {
                                                value: '1',
                                                label: 'ลาดพร้าว',
                                            },
                                            {
                                                value: '2',
                                                label: 'จอมพล',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={'รหัสไปรษรีย์'}>
                                    <Input placeholder="กรุณากรอกรหัสไปรษรีย์" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label={'เบอร์โทรศัพท์'}>
                                    <Input placeholder="กรุณากรอกเบอร์โทรศัพท์" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={'โทรสาร (Fax)'}>
                                    <Input placeholder="กรุณากรอกโทรสาร (Fax)" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label={'Web Site'}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={'แผนที่'}>
                                    <Button color='#Fc6634'>
                                        เปิดแผนที่
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={'พิกัด'}>
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label={'อีเมล์ #1'}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={'อีเมล์ #2'}>
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label={'ประเภทของธุรกิจ หลัก'}>
                                    <Select
                                        options={[
                                            {
                                                value: '1',
                                                label: 'ขายอสังหาทรัพย์',
                                            },
                                            {
                                                value: '2',
                                                label: 'ร้านอาหาร',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={'ประเภทของธุรกิจ ย่อย'}>
                                    <Select
                                        options={[
                                            {
                                                value: '1',
                                                label: 'ปุ๋ย',
                                            },
                                            {
                                                value: '2',
                                                label: 'ทอดมัน',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={'ทุนจดทะเบียน ( บาท )'}>
                                    <Input placeholder="( บาท )" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Divider />


                        <Row gutter={16} className='px-2'>
                            <div className="text-[#FC6634] text-base">โลโก้บริษัท</div>
                            <Col>
                                <Button>
                                    เลือกรูป
                                </Button>
                            </Col>
                            <Col span={12}>
                                <Input />
                            </Col>
                            <Col>
                                <Button className='flex flex-row items-center text-2xl'>
                                    <RiCloseFill />
                                </Button>
                            </Col>
                            <Divider />
                        </Row>

                        <div className="text-[#FC6634] text-base">Social Link</div>

                        <Row gutter={16}>
                            {/*---------------- Facebook ----------------*/}
                            <div className="relative flex flex-row items-center">
                                <div className="flex flex-row ml-2 tems-center text-4xl">
                                    <FaFacebookSquare />
                                </div>
                                <div className='flex items-center ml-8 mt-6'>
                                    <Col span={24}>
                                        <Form.Item>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </div>
                                {/*---------------- in ----------------*/}
                                <div className="flex flex-row items-center ml-6 text-4xl">
                                    <FaLinkedin />
                                </div>
                                <div className='flex items-center ml-8 mt-6'>
                                    <Col span={24}>
                                        <Form.Item>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </div>
                            </div>
                        </Row>

                        <Row gutter={16}>
                            {/*---------------- instagram ----------------*/}
                            <div className="relative flex flex-row items-center">
                                <div className="flex flex-row ml-2 items-center text-4xl">
                                    <FaInstagramSquare />
                                </div>
                                <div className="flex items-center ml-8 mt-6">
                                    <Col span={24}>
                                        <Form.Item>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </div>
                                {/*---------------- Line ----------------*/}
                                <div className="flex flex-row items-center ml-6 text-4xl">
                                    <FaLine />
                                </div>
                                <div className="flex items-center ml-8 mt-6">
                                    <Col span={24}>
                                        <Form.Item>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </div>
                            </div>
                        </Row>

                        <Divider />

                        <div className="text-[#FC6634] text-base">ไฟล์เอกสารการเป็นนิติบุคคล ***</div><br />

                        <Row gutter={16}>
                            <Col>
                                <Form.Item label='หนังสือรับรอง'>
                                    <Button>
                                        เลือกไฟล์เอกสาร
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Button className='flex flex-row items-center text-2xl'>
                                    <RiCloseFill />
                                </Button>
                            </Col>
                            <Col>
                                <Form.Item label='ก.พ. 20'>
                                    <Button>
                                        เลือกไฟล์เอกสาร
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Button className='flex flex-row items-center text-2xl'>
                                    <RiCloseFill />
                                </Button>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Form.Item>
                                <Space>
                                    <Button htmlType="submit">
                                        บันทึก
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setTablefield(true)
                                        }}
                                    >
                                        ยกเลิก
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Row>

                        <div className="text-[#FC6634] text-base">
                            *** กรอกข้อมูล และ Upload เอกสารที่ถูกต้อง เพื่อรับสิทธิ์ การใช้ระบบ Report/Dash Bard สำหรับผู้บริหาร/หรือฝ่ายบุคคล ของบริษัทฯ ฟรีตลอดอายุการใช้งาน
                        </div>
                    </Form>
                </>
            )}
        </>
    );
};

export default Companyniti;