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
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
const { useToken } = theme;



const ResetPassword: React.FC = () => {
    const [form] = Form.useForm();
    const token = useToken();
    const [open, setOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [CHANGE_PW] = useMutation(CHANGE_PW_fORGOT);
    const acessId = searchParams.get('aceesid');
    const tokenId = searchParams.get('tokenid');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate()
    const onClose = () => {
        setOpen(false);
    };
    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }


    useEffect(() => {
        if (token) {
            let paramJWT = parseJwt(tokenId)
            let expTime = paramJWT.exp
            let day = dayjs(new Date()).unix()
            let sumday = expTime - day
            console.log('sumday', sumday)
            if (sumday <= 0) {
                navigate('500')
            }
        } else {
            navigate('500')
        }
    }, []);



    const onFinish = (value) => {
        password == confirmPassword
            ? Swal.fire({
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
                            data: { ...value, id: acessId },
                        },
                    })
                        .then((val) => {
                            console.log(val);
                            if (val.data?.Changesepasswordinforgot?.status) {
                                Swal.fire(`เปลื่ยนรหัสผ่านสำเร็จ!`, '', 'success');
                                form.resetFields()
                                navigate('/auth');
                            }

                        })
                        .catch((err) => {
                            Swal.fire(`เปลื่ยนรหัสผ่านไม่สำเร็จ!`, '', 'error');
                            console.error(err);
                        });
                }

            })
            : Swal.fire({
                title: 'เปลี่ยนรหัสผ่านไม่สำเร็จ',
                text: 'Password ไม่ตรงกัน',
                icon: 'error',
            })
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
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form form={form} size="large" onFinish={onFinish}>
                                <Form.Item name={'password1'} label={'รหัสผ่านใหม่'}
                                    rules={[
                                        {
                                            required: true,
                                            message: "โปรดกรอกรหัสผ่านใหม่",

                                        },
                                    ]}
                                >
                                    <Input.Password
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="New Password"
                                    />
                                </Form.Item>
                                <Form.Item name={'password2'} label={'รหัสผ่านใหม่ (Confirm)'}
                                    rules={[
                                        {
                                            required: true,
                                            message: "โปรดกรอกรหัสผ่าน (Confirm) ใหม่",

                                        },
                                    ]}
                                >
                                    <Input.Password
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm Password"
                                    />
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