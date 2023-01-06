import React from 'react';
import { Button, Col, Divider, Form, Input, Row, Space, Tabs, theme, Typography } from 'antd';
import { RiCommunityLine } from 'react-icons/ri';

const { useToken } = theme;

const Managerights: React.FC = () => {
    const token = useToken();


    return (
        <>
            <div className="px-2 py-2">
                <div>
                    <Tabs
                        className='right-tab'
                        items={[
                            {
                                label: `จัดการสิทธิ์การใช้งาน`,
                                key: '/:companycode/userprofile',
                            },
                            {
                                label: `จัดการกลุ่มผู้ใช้งาน`,
                                key: '/:companycode/userprofile/work',
                            },
                        ]}
                    />
                </div>
                <div className="relative flex flex-row items-center">
                    <div className="flex">
                        <RiCommunityLine style={{ color: token.token.colorText }} size={30} />
                        <Typography.Title level={3}>จัดการสิทธิ์การใช้งาน</Typography.Title>
                    </div>
                </div>
                <br />
                <Form layout="vertical">
                    <Row>
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
                    <Row>
                        <Col className="pb-4 flex justify-end">
                            <Button
                                type="primary"
                                style={{
                                    marginBottom: '10px',
                                    backgroundColor: token.token.colorPrimary,
                                }}

                            >
                                บันทึกการเปลี่ยนแปลง
                            </Button>
                        </Col>
                    </Row>
                </Form>

            </div>

        </>
    )
};

export default Managerights;
