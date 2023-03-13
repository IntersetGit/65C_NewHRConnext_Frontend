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
} from 'antd';
import { useState } from 'react';

type type = {
  visible: boolean;
  onClose: () => void;
};

const PasswordChanger: React.FC<type> = (props) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 6 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  };
  return (
    <>
      <Modal
        title="เปลื่ยนรหัสผ่าน"
        open={props.visible}
        onCancel={props.onClose}
        width={600}
        okType="default"
        centered
      >
        <Form {...formItemLayout} size="middle">
          <Form.Item label={'รหัสผ่านเดิม'}>
            <Input />
          </Form.Item>
          <Form.Item label={'รหัสผ่านใหม่'}>
            <Input />
          </Form.Item>
          <Form.Item label={'ยืนยันรหัสผ่านใหม่'}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PasswordChanger;
