import React, { useState } from 'react';
import { Button, Col, Divider, Form, Input, Row, Select, Space } from 'antd';

import { RiCommunityLine, RiCloseFill } from "react-icons/ri";
import { FaFacebookSquare, FaLinkedin, FaInstagramSquare, FaLine } from "react-icons/fa";

const onChange = (value: string) => {
    console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
    console.log('search:', value);
};

const Companyniti: React.FC = () => {

    return (
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
                            <Button>
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
    );
};

export default Companyniti;