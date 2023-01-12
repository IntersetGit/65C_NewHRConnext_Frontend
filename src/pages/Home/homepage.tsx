import React from 'react';
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Row,
    Space,
    Table,
    theme,
    Image,
} from 'antd';

const { useToken } = theme;

const HomePage: React.FC = () => {
    const token = useToken();

    return (
        <>
            <Card className="shadow-xl">
                <div className="text-2xl text-center" style={{ color: token.token.colorPrimary }}>
                    กิจกรรมที่กำลังจะเกิดขึ้น
                </div>
            </Card>


            <Form>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={9} xl={9}>
                        <Card
                            className="shadow-xl"
                            title="ข้อมูล 001 (Data)"
                            type="inner"
                            style={{ marginTop: 16, height: '100%', borderRadius: '10px' }}
                            extra={<a href="#">Read More</a>}
                        >
                            <Col>
                                <Form.Item>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor delectus ad voluptas totam maiores
                                    laboriosam ipsa,doloribus officia iste quae ex molestias? Quod architecto eius esse, nisi deserunt
                                    sint mollitia.
                                </Form.Item>
                                <Form.Item>
                                    <Image
                                        width={200}
                                        height={200}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        preview={false}
                                    />
                                </Form.Item>
                            </Col>
                        </Card>
                        <br />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={9} xl={9}>
                        <Card
                            className="shadow-xl"
                            title="ข้อมูล 002 (Data)"
                            type="inner"
                            style={{ marginTop: 16, height: '100%', borderRadius: '10px' }}
                            extra={<a href="#">Read More</a>}
                        >
                            <Col>
                                <Form.Item>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor delectus ad voluptas totam maiores
                                    laboriosam ipsa,doloribus officia iste quae ex molestias? Quod architecto eius esse, nisi deserunt
                                    sint mollitia.
                                </Form.Item>
                                <Form.Item>
                                    <Image
                                        width={200}
                                        height={200}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        preview={false}
                                    />
                                </Form.Item>
                            </Col>
                        </Card>
                        <br />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                        <Card
                            className="shadow-xl"
                            title="Manager Director"
                            type="inner"
                            style={{ marginTop: 16, height: '100%', borderRadius: '10px' }}
                        >
                            <Row gutter={24}>
                                <Col className='py-2' xs={24} sm={6} md={6} lg={6} xl={6}>
                                    ลากิจ
                                </Col>
                                <Col className='py-2' xs={24} sm={6} md={6} lg={6} xl={6}>
                                    ลาป่วย
                                </Col>
                                <Col className='py-2' xs={24} sm={6} md={6} lg={6} xl={6}>
                                    ลาพักร้อน
                                </Col>
                                <Col className='py-2' xs={24} sm={6} md={6} lg={6} xl={6}>
                                    ลาอื่น ๆ
                                </Col>
                            </Row>
                            <Col className="pb-4 flex justify-end">
                                <Button
                                    type="primary"
                                    htmlType='button'
                                    style={{
                                        marginBottom: '10px',
                                        backgroundColor: token.token.colorPrimary,
                                    }}
                                >
                                    ยื่นการลา
                                </Button>
                            </Col>
                        </Card>
                        <br />
                    </Col>
                </Row>
                <br />
                <Divider style={{ backgroundColor: token.token.colorPrimary }} />
                <Card className="shadow-xl">
                    <div className="text-2xl text-center" style={{ color: token.token.colorPrimary }}>
                        แคมเปญ จากสถาบันการเงิน
                    </div>
                </Card>

                <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={9} xl={9}>
                        <Card
                            className="shadow-xl"
                            title="ข้อมูล 003 (Data)"
                            type="inner"
                            style={{ marginTop: 16, height: '100%', borderRadius: '10px' }}
                            extra={<a href="#">Read More</a>}
                        >
                            <Col>
                                <Form.Item>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor delectus ad voluptas totam maiores
                                    laboriosam ipsa,doloribus officia iste quae ex molestias? Quod architecto eius esse, nisi deserunt
                                    sint mollitia.
                                </Form.Item>
                                <Form.Item>
                                    <Image
                                        width={200}
                                        height={200}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        preview={false}
                                    />
                                </Form.Item>
                            </Col>
                        </Card>
                        <br />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={9} xl={9}>
                        <Card
                            className="shadow-xl"
                            title="ข้อมูล 004 (Data)"
                            type="inner"
                            style={{ marginTop: 16, height: '100%', borderRadius: '10px' }}
                            extra={<a href="#">Read More</a>}
                        >
                            <Col>
                                <Form.Item>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor delectus ad voluptas totam maiores
                                    laboriosam ipsa,doloribus officia iste quae ex molestias? Quod architecto eius esse, nisi deserunt
                                    sint mollitia.
                                </Form.Item>
                                <Form.Item>
                                    <Image
                                        width={200}
                                        height={200}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        preview={false}
                                    />
                                </Form.Item>
                            </Col>
                        </Card>
                        <br />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                        <Card
                            className="shadow-xl text-center"
                            title="ร้านค้าแนะนำ"
                            type="inner"
                            style={{ marginTop: 16, height: '100%', borderRadius: '10px', background: '#b5d0f572' }}
                        >
                            Card content
                        </Card>
                        <br />
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default HomePage;
