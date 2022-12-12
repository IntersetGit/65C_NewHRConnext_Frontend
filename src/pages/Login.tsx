import { Button, Col, Form, Input, Row, Typography, theme } from 'antd';
import '../styles/components/login.css';
import { useMutation } from '@apollo/client';
import lightcartoon from '../assets/auth-v2-forgot-password-illustration-bordered-light.png';
import mark from '../assets/misc-mask-light.png';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import Swal from 'sweetalert2';
import { gql } from 'graphql-tag';

const { useToken } = theme;
const cookie = new Cookies();

const LOGIN_ACCOUNT = gql/* GraphQL */ `
  mutation Login($data: LoginaInput!) {
    login(data: $data) {
      access_token
      refresh_token
      status
    }
  }
`;

const Login: React.FC = () => {
  const [login] = useMutation(LOGIN_ACCOUNT);
  const [form] = Form.useForm();
  const token = useToken();
  const navigate = useNavigate();

  const onFinish = (value: any) => {
    login({ variables: { data: value } })
      .then((v) => {
        cookie.set('access', v.data.login.access_token, {
          path: '/',
          sameSite: 'lax',
        });
        cookie.set('refresh_token', v.data.login.refresh_token, {
          path: '/',
          sameSite: 'lax',
        });
        navigate('/');
      })
      .catch((error) =>
        Swal.fire('เข้าสู่ระบบไม่สำเร็จ', error.message, 'error'),
      );
  };
  return (
    <div>
      <Row className="login-container">
        <Col xs={0} sm={0} md={12} lg={15} xl={17}>
          <div
            className="login-gradient login-right-shadow"
            style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
          >
            <img
              src={mark}
              width={600}
              style={{
                position: 'absolute',
                bottom: '0',
                width: '100%',
                objectFit: 'cover',
              }}
            />
            <img
              src={lightcartoon}
              width={600}
              style={{ position: 'absolute', bottom: '10em', right: '5em' }}
            />
          </div>
        </Col>
        <Col
          xl={7}
          lg={9}
          md={12}
          sm={24}
          xs={24}
          style={{
            display: 'flex',
            justifyContent: 'center',
            justifyItems: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'column',
            paddingLeft: '40px',
            paddingRight: '40px',
          }}
        >
          <img src={logo} width={210} height={60} />
          <Typography.Title level={4}>เข้าสู่ระบบ</Typography.Title>
          <Form
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 5, offset: 5 }}
            style={{ width: '100%' }}
            layout="vertical"
            size="large"
          >
            <Form.Item
              label={'อีเมล'}
              name={'email'}
              style={{ marginBottom: 4 }}
              rules={[
                {
                  required: true,
                  message: 'กรุณาป้อนอีเมล',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={'รหัสผ่าน'}
              name={'password'}
              rules={[
                {
                  required: true,
                  message: 'กรุณาป้อนรหัสผ่าน',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                style={{
                  marginRight: '3px',
                  backgroundColor: token.token.colorPrimary,
                }}
                size="large"
                type="primary"
                htmlType="submit"
              >
                เข้าสู่ระบบ
              </Button>
              หรือ{' '}
              <Link
                style={{ color: token.token.colorPrimary }}
                to={'/register'}
              >
                สมัครสมาชิกตอนนี้
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
