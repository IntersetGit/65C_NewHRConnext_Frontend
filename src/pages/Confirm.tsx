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
import { useNavigate, useSearchParams } from 'react-router-dom';
import marklight from '../assets/auth-v2-login-mask-light.png';
import Swal from 'sweetalert2';
import human from '../assets/500.png';
import logo from '../assets/HR logo.png';
import { useMutation } from '@apollo/client';
import { CONFIRM_EMAIL } from '../service/graphql/Confirm';
import { MdOutlineMarkEmailRead } from 'react-icons/md';

const { useToken } = theme;

const Confirm: React.FC = () => {
  const navigate = useNavigate();
  const token = useToken();
  const [confirm] = useMutation(CONFIRM_EMAIL);
  const [searchParam, setSearchParam] = useSearchParams();
  const aceesid = searchParam.get('aceesid');

  const onFinish = () => {
    Swal.fire({
      title: 'ยืนยันอีเมลในการสมัครข้อมูลบริษัท',
      // text: 'ยืนยันการลบรูป',
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonColor: token.token.colorPrimary,
      denyButtonColor: '#efefef',
      confirmButtonText: 'ตกลง',
      denyButtonText: `ยกเลิก`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        confirm({
          variables: {
            editActiveId: aceesid,
          },
        })
          .then((val) => {
            console.log(val);
            if (val.data?.editActive?.status) {
              Swal.fire(
                `ยืนยันอีเมลในการสมัครข้อมูลบริษัทสำเร็จ!`,
                '',
                'success',
              );
            }
            navigate('/auth');
          })
          .catch((err) => {
            Swal.fire(
              `ยืนยันอีเมลในการสมัครข้อมูลบริษัทไม่สำเร็จ!`,
              '',
              'error',
            );
            console.error(err);
          });
      }
    });
  };
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
          <Row className="flex justify-center font-bold text-base">
            <div>ยืนยันอีเมลในการสมัครข้อมูลบริษัท</div>
          </Row>

          <Row className="flex justify-center font-bold text-base">
            <MdOutlineMarkEmailRead size={100} />
          </Row>

          <Row className="flex justify-center mt-4">
            <Space>
              <Button
                onClick={() => {
                  onFinish();
                }}
              >
                ตกลง
              </Button>
              <Button
                onClick={() => {
                  navigate('/auth');
                }}
              >
                ยกเลิก
              </Button>
            </Space>
          </Row>
        </Card>
      </Col>
    </div>
  );
};

export default Confirm;
