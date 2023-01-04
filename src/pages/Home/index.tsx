import React from 'react';
import {
    Card,
    Col,
    Form,
    Row,
    theme,
} from 'antd';
import HomePage from './homepage';

const { useToken } = theme;

const Home: React.FC = () => {
    const token = useToken();

    return (
        <>
            <Card className="shadow-xl">
                <Form>
                    <Row gutter={16}>
                        <Col className="flex flex-row items-center text-lg "
                            style={{ color: token.token.colorPrimary }}
                        >
                            กิจกรรมที่กำลังจะเกิดขึ้น
                        </Col>
                    </Row>
                </Form>
            </Card>
            <br />
            <Card className="shadow-xl">
                <Form>
                    <Row>
                        <Col>
                            <HomePage />
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    )
}

export default Home;