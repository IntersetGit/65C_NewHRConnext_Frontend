import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Steps,
  theme,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import marklight from '../assets/auth-v2-login-mask-light.png';
import Swal from 'sweetalert2';
import human from '../assets/500.png';
import logo from '../assets/HR logo.png';

const { useToken } = theme;

const Confirm: React.FC = () => {
  const navigate = useNavigate();
  const token = useToken();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <img
        src={logo}
        style={{ position: 'absolute', left: 10, width: 50, top: 10 }}
      />
      <img
        src={marklight}
        style={{ position: 'absolute', bottom: 40, width: 1200, right: 0 }}
      />
      <img
        src={human}
        style={{ position: 'absolute', bottom: 40, width: 250, right: 10 }}
      />
      <Col xs={22} sm={22} md={22} lg={15} xl={14}>
        <Card
          bordered
          style={{
            borderColor: token.token.colorPrimary,
            borderWidth: '0.5px',
          }}
        >
          <div className="flex justify-center font-bold text-base">
            ยืนยันอีเมลในการสมัครข้อมูลบริษัท
          </div>

          <Row className="flex justify-center mt-4">
            <Space>
              <Button>ตกลง</Button>
              <Button>ยกเลิก</Button>
            </Space>
          </Row>
        </Card>
      </Col>
    </div>
  );
};

export default Confirm;
