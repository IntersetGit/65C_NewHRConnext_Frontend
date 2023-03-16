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
import { useState } from 'react';
import { CHANGE_PASSWORD } from '../service/graphql/Password';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

type type = {
  visible: boolean;
  onClose: () => void;
};

const { useToken } = theme;

const PasswordChanger: React.FC<type> = (props) => {
  const [form] = Form.useForm();
  const token = useToken();
  const [changepassword] = useMutation(CHANGE_PASSWORD);

  const onCancel = () => {
    props.onClose();
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
        changepassword({
          variables: {
            data: value,
          },
        })
          .then((val) => {
            console.log(val);
            if (val.data?.Changeselfpassword?.status) {
              Swal.fire(`เปลื่ยนรหัสผ่านสำเร็จ!`, '', 'success');
            }
          })
          .catch((err) => {
            Swal.fire(`เปลื่ยนรหัสผ่านไม่สำเร็จ!`, '', 'error');
            console.error(err);
          });
      }
      props.onClose();
      form.resetFields();
    });
  };

  return (
    <>
      <Modal
        title="เปลื่ยนรหัสผ่าน"
        open={props.visible}
        onCancel={onCancel}
        width={600}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        centered
      >
        <Form form={form} size="middle" onFinish={onFinish}>
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
                <Button onClick={() => onCancel()}>ยกเลิก</Button>
              </Space>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PasswordChanger;
