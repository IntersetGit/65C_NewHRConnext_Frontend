import {
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
    Steps,
    theme,
    Modal,
    Space,
} from 'antd';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import logo from '../assets/HR logo.png';
import '../styles/components/login.css';
import { CHANGE_PW_fORGOT } from '../service/graphql/ForgotPW';
import { gql } from 'graphql-tag';
import { useState } from 'react';

const { useToken } = theme;
const ResetPassword: React.FC = () => {
    const [form] = Form.useForm();
    const token = useToken();
    const [open, setOpen] = useState(false);

    const [CHANGE_PW] = useMutation(CHANGE_PW_fORGOT);

    const onClose = () => {
        setOpen(false);
        form.resetFields();
    };

    const onFinish = (value) => {
        Swal.fire({
            title: `ยืนยันการเปลื่ยนรหัสผ่าน`,
            icon: 'warning',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonColor: token.token.colorPrimary,
            denyButtonColor: '#ea4e4e',
            confirmButtonText: 'ตกลง',
            denyButtonText: `ยกเลิก`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                CHANGE_PW({
                    variables: {
                        data: value,
                    },
                })
                    .then((val) => {
                        console.log(val);
                        if (val.data?.Changesepasswordinforgot?.status) {
                            Swal.fire(`เปลื่ยนรหัสผ่านสำเร็จ!`, '', 'success');
                        }
                    })
                    .catch((err) => {
                        Swal.fire(`เปลื่ยนรหัสผ่านไม่สำเร็จ!`, '', 'error');
                        console.error(err);
                    });
            }
            onClose();
            form.resetFields();
        });
    };

    return (
        <>
            <img
                src={logo}
                style={{ left: 10, width: 50, top: 10 }}
            />

            <div
                className="login-gradient login-right-shadow"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '94vh',
                    width: '100%',
                    objectFit: 'cover',
                }}
            >
                <Card title={'รีเซตรหัสผ่าน'} style={{ width: '40%', minWidth: '300px' }} >
                    <Row className=''>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form form={form} size="large" >
                                <Form.Item name={'password'} label={'รหัสผ่านเดิม'}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name={'newpassword'} label={'รหัสผ่านใหม่'}>
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Row className="flex justify-end">
                                        <Space>
                                            <Button htmlType="submit">ตกลง</Button>
                                            <Button onClick={() => onClose()}>ยกเลิก</Button>
                                        </Space>
                                    </Row>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Card>


            </div>
        </>

    )
}
export default ResetPassword;