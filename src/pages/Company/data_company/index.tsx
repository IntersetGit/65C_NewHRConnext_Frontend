import React, { useState } from 'react';
import { Col, Divider, Form, Input, Row, Select } from 'antd';

import { RiCommunityLine } from "react-icons/ri";

const onChange = (value: string) => {
    console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
    console.log('search:', value);
};

const Companyniti: React.FC = () => {

    return (
        <>
            <div className='relative flex flex-row items-center mt-2'>
                <div className='flex flex-row items-center text-4xl'>
                    <RiCommunityLine />
                </div>
                <div className='ml-2 text-sm tracking-wide '>
                    ข้อมูลบริษัท / นิติบุคคล
                </div>
            </div>
            <Divider className='decoration-[#Fc6634]' />

            <Form>
                <Row gutter={12}>
                    <Col span={8}>
                        <Form.Item label={'ชื่อบริษัท'}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณากรอกชื่อบริษัท',
                                },
                            ]}
                        >
                            <Input placeholder="กรุณากรอกชื่อบริษัท" />
                        </Form.Item>
                        <Col span={8}>
                            <Form.Item label={'เลขจดทะเบียนบริษัท'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณากรอกเลขจดทะเบียนบริษัท',
                                    },
                                ]}
                            >
                                <Input placeholder="กรุณากรอกเลขจดทะเบียนบริษัท" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={'เลขทะเบียนภาษีมูลค่าเพิ่ม'} >
                                <Input placeholder="กรุณากรอกเลขทะเบียนภาษีมูลค่าเพิ่ม" />
                            </Form.Item>
                        </Col>
                    </Col>

                    <Row>
                        <Col span={12}>
                            <Form.Item label={' ที่อยู่ 1 '}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={' ที่อยู่ 2 '}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Item>
                                <Select
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    style={{ width: 120 }}
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={[
                                        {
                                            value: 'jack',
                                            label: 'Jack',
                                        },
                                        {
                                            value: 'lucy',
                                            label: 'Lucy',
                                        },
                                        {
                                            value: 'tom',
                                            label: 'Tom',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                </Row>
            </Form>
        </>
    );
};

export default Companyniti;