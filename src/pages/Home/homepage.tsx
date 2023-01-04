import React from 'react';
import {
    Button,
    Col,
    Form,
    Row,
    theme,
} from 'antd';
import { RiCommunityLine } from 'react-icons/ri';

const { useToken } = theme;

const HomePage: React.FC = () => {
    const token = useToken();

    return (
        <>
            <Row>
                <Col>
                    <Form.Item>
                        <div className="relative flex flex-row items-center">
                            <div className="flex flex-row items-center text-4xl">
                                <span style={{ position: 'absolute', height: '10px' }}>
                                    test
                                </span>
                            </div>
                        </div>
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}

export default HomePage;
