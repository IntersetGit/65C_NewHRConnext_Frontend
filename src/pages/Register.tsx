import { UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Steps,
  theme,
} from "antd";
import { useState } from "react";
import { RiHotelLine } from "react-icons/ri";
import marklight from "../assets/auth-v2-login-mask-light.png";
import human from "../assets/500.png";
import logo from "../assets/icon.png";

const { useToken } = theme;

const Register: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const token = useToken();
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const Stepone = (
    <>
      <Row>
        <Col span={12}>
          <Form.Item
            label={"อีเมล"}
            name={"email"}
            rules={[
              {
                required: true,
                message: "กรุณากรอกอีเมล",
              },
              {
                required: true,
                pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
                message: "คุณกรอก อีเมล ไม่ตรงตามรูปแบบ",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            tooltip={
              <>
                {" "}
                <p>1. รหัสผ่านต้องมี A-Z อย่างน้อย 1 ตัว</p>
                <p>2. รหัสผ่านต้องมี a-z อย่างน้อย 1 ตัว</p>
                <p>3. รหัสผ่านต้องมี 0-9 อย่างน้อย 1 ตัว</p>
                <p>
                  4. รหัสผ่านต้องมีอักขระพิเศษ (~@#$&*+-._%) อย่างน้อย 1 ตัว
                </p>
                <p>5. รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษรขึ้นไป</p>
              </>
            }
            label={"รหัสผ่าน"}
            name={"password"}
            rules={[
              {
                required: true,
                message: "กรุณากรอกรหัสผ่าน",
              },
              {
                required: true,
                pattern: new RegExp(
                  /^(?=.*[A-Z])(?=.*[!~@#$&*+-._%])(?=.*[0-9])(?=.*[a-z]).{6,}$/
                ),
                message: "คุณกรอก รหัสผ่าน ไม่ตรงตามรูปแบบ",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label={"ชื่อจริง"}
            name={"firstname"}
            tooltip={"ต้องเป็นตัวอักษรเท่านั้น"}
            rules={[
              {
                required: true,
                message: "กรุณากรอกชื่อจริง",
              },
              {
                required: true,
                pattern: new RegExp(/^[a-zA-Zก-์ ]*$/),
                message: "คุณกรอก ชื่อจริง ไม่ตรงตามรูปแบบ",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={"นามสกุล"}
            name={"lastname"}
            tooltip={"ต้องเป็นตัวอักษรเท่านั้น"}
            rules={[
              {
                required: true,
                message: "กรุณากรอกนามสกุล",
              },
              {
                required: true,
                pattern: new RegExp(/^[a-zA-Zก-์ ]*$/),
                message: "คุณกรอก นามสกุล ไม่ตรงตามรูปแบบ",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label={"วันเกิด"}
            name={"dob"}
            rules={[
              {
                required: true,
                message: "กรุณากรอกวันเกิด",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={"เบอร์โทรศัพท์"}
            tooltip={"ต้องเป็นตัวเลข 10 หลักเท่านั้น"}
            name={"tel"}
            rules={[
              {
                required: true,
                message: "กรุณากรอกเบอร์โทรศัพท์",
              },
              {
                required: true,
                pattern: new RegExp(/^[0-9]{10}$/),
                message: "คุณกรอก เบอร์โทรศัพท์ ไม่ตรงตามรูปแบบ",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  );

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 18,
        offset: 2,
      },
    },
  };

  const steps = [
    {
      title: "กรอกข้อมูลของผู้สร้าง",
      icon: <UserOutlined />,
      content: Stepone,
    },
    {
      title: "กรอกข้อมูลบริษัท",
      icon: <RiHotelLine />,
      content: "Second-content",
    },
    //   {
    //     title: "Last",
    //     content: "Last-content",
    //   },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img
        src={logo}
        style={{ position: "absolute", left: 10, width: 50, top: 10 }}
      />
      <img
        src={marklight}
        style={{ position: "absolute", bottom: 40, width: 1200, right: 0 }}
      />
      <img
        src={human}
        style={{ position: "absolute", bottom: 40, width: 250, right: 10 }}
      />
      <Col xs={22} sm={22} md={22} lg={15} xl={14}>
        <Card
          bordered
          style={{
            borderColor: token.token.colorPrimary,
            borderWidth: "0.5px",
          }}
        >
          <Steps current={current} items={items} />
          <div className="steps-content">
            <Form layout="vertical" {...formItemLayout} size="large">
              {steps[current].content}
            </Form>
          </div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button size="large" type="primary" onClick={() => next()}>
                ถัดไป
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                size="large"
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                สร้างบัญชีผู้ใช้
              </Button>
            )}
            {current > 0 && (
              <Button
                size="large"
                style={{ margin: "0 8px" }}
                onClick={() => prev()}
              >
                ย่อนกลับ
              </Button>
            )}
          </div>
        </Card>
      </Col>
    </div>
  );
};

export default Register;
