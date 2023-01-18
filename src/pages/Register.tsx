import { UserOutlined } from '@ant-design/icons';
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
} from 'antd';
import { ChangeEvent, useRef, useState } from 'react';
import { RiHotelLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import marklight from '../assets/auth-v2-login-mask-light.png';
import Swal from 'sweetalert2';
import human from '../assets/500.png';
import logo from '../assets/HR logo.png';
import { gql } from '../__generated__/gql';
import { GET_PROVINCE } from '../service/graphql/Province';

const { useToken } = theme;

const CREATE_ACCOUNT = gql(`
  mutation CreateAccount($data: CreateAccountInput!) {
    createAccount(data: $data) {
      status
      message
  }
}`);

const VALIDATE_COMPANYCODE = gql(`
  query Query($companyname: String!) {
  verifyCompanycode(companyname: $companyname)
}
`);

type RegisterFormType = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  tel: string;
  dob: string;
  userlimit: string;
  company_name: string;
  company_address: string;
  company_city: string;
  company_state: string;
  company_zip: string;
  company_country: string;
  company_phone: string;
  company_icon: string;
};

const Register: React.FC = () => {
  /**
   * ? React state and hook
   */
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [district, setDistrict] = useState<
    { value?: string | null; label?: string | null }[] | undefined
  >(undefined);
  const [amphoe, setAmphoe] = useState<
    { value?: string | null; label?: string | null }[] | undefined
  >(undefined);
  const [registerdata, setRegisterdata] = useState<RegisterFormType>();
  const navigate = useNavigate();

  /**\
   * ? Ref
   */
  const abortRef = useRef(new AbortController());

  /**
   * ? Graphql
   */
  const { loading: isValidateloading, data: province_data } =
    useQuery(GET_PROVINCE);
  /**
   * ?Example of request aborter
   */
  const { refetch: validateCompanycode } = useQuery(VALIDATE_COMPANYCODE, {
    fetchPolicy: 'network-only',
    context: {
      fetchOptions: {
        signal: abortRef.current.signal,
        queryDeduplication: false,
      },
    },
    notifyOnNetworkStatusChange: true,
  });
  const [createAccount] = useMutation(CREATE_ACCOUNT);

  const token = useToken();
  const next = () => {
    form.validateFields().then((value) => {
      setRegisterdata((e) => {
        return {
          ...e,
          ...value,
        };
      });
      setCurrent(current + 1);
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  /**
   * ? Comapny register
   */
  const province = province_data?.getProvince?.map((e) => {
    return {
      label: e?.name,
      value: e?.id,
    };
  });

  const onProvinceChange = (value: string) => {
    form.setFieldValue('company_state', null);
    form.setFieldValue('company_city', null);
    form.setFieldValue('company_zip', null);
    const district = province_data?.getProvince
      ?.find((e) => e?.id === value)
      ?.district?.map((e) => {
        return {
          label: e?.name,
          value: e?.id,
        };
      });
    setDistrict(district ? district : []);
  };

  const onDistrictChange = (value: string) => {
    form.setFieldValue('company_city', null);
    form.setFieldValue('company_zip', null);
    const amphoe = province_data?.getProvince
      ?.find((e) => e?.district?.find((_e) => _e?.id === value))
      ?.district?.find((e) => e?.id === value)
      ?.amphoe?.map((e) => {
        return {
          label: e?.name,
          value: e?.id,
        };
      });
    setAmphoe(amphoe ? amphoe : []);
  };

  const onAmphoeChange = (value: string) => {
    console.log(value);
    const zipCode = province_data?.getProvince
      ?.find((e) =>
        e?.district?.find((_e) => _e?.amphoe?.find((__e) => __e?.id === value)),
      )
      ?.district?.find((e) => e?.amphoe?.find((_e) => _e?.id === value))
      ?.amphoe?.find((e) => e?.id === value)?.zipcode;

    form.setFieldValue('company_zip', zipCode);
  };

  /**
   * ?Companycode Validate
   * ?THis action perform aborter
   */

  const validateCompanyCode = async (
    event: ChangeEvent<HTMLInputElement> | undefined,
  ) => {
    if (!event) return;
    console.log(event.target.value);
    /**
     * ?Here
     */
    if (isValidateloading) {
      console.log(isValidateloading);
      abortRef.current.abort();
    }

    /**
     * ?Validate
     */
    validateCompanycode({ companyname: event.target.value }).then(
      async (res) => {
        const validate = await form.validateFields(['companyCode']);
        const form_error = validate.errorFields?.errors
          ? [...validate.errorFields?.errors]
          : [];
        form.setFields([
          {
            name: 'companyCode',
            validating: res.loading,
            errors: res.data.verifyCompanycode
              ? form_error
              : [...form_error, 'มีผู้ใช้รหัสบริษัทนี้ในระบบแล้ว'],
          },
        ]);
      },
    );
    abortRef.current = new AbortController();
  };

  const onFinish = () => {
    form.validateFields().then((value) => {
      Swal.fire({
        title: 'ยืนยันการสร้างบัญชีผู้ใช้',
        // text: 'ยืนยันการลบรูป',
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: token.token.colorPrimary,
        denyButtonColor: '#efefef',
        confirmButtonText: 'ตกลง',
        denyButtonText: `ยกเลิก`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (!registerdata) return;
          createAccount({ variables: { data: { ...registerdata, ...value } } })
            .then((val) => {
              console.log(val);
              if (val.data?.createAccount?.status) {
                Swal.fire('สร้างบัญชีผู้ใช้สำเร็จ!', '', 'success');
                navigate('/auth');
              }
            })
            .catch((err) => {
              Swal.fire('สร้างบัญชีผู้ใช้ไม่สำเร็จ!', '', 'error');
              console.error(err);
            });
        }
      });
      console.log(registerdata);
    });
  };

  const Stepone = (
    <>
      <Row>
        <Col span={12}>
          <Form.Item
            preserve
            label={'อีเมล'}
            name={'email'}
            rules={[
              {
                required: true,
                message: 'กรุณากรอกอีเมล',
              },
              {
                required: true,
                pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
                message: 'คุณกรอก อีเมล ไม่ตรงตามรูปแบบ',
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
                {' '}
                <p>1. รหัสผ่านต้องมี A-Z อย่างน้อย 1 ตัว</p>
                <p>2. รหัสผ่านต้องมี a-z อย่างน้อย 1 ตัว</p>
                <p>3. รหัสผ่านต้องมี 0-9 อย่างน้อย 1 ตัว</p>
                <p>
                  4. รหัสผ่านต้องมีอักขระพิเศษ (~@#$&*+-._%) อย่างน้อย 1 ตัว
                </p>
                <p>5. รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษรขึ้นไป</p>
              </>
            }
            preserve
            label={'รหัสผ่าน'}
            name={'password'}
            rules={[
              {
                required: true,
                message: 'กรุณากรอกรหัสผ่าน',
              },
              {
                required: true,
                pattern: new RegExp(
                  /^(?=.*[A-Z])(?=.*[!~@#$&*+-._%])(?=.*[0-9])(?=.*[a-z]).{6,}$/,
                ),
                message: 'คุณกรอก รหัสผ่าน ไม่ตรงตามรูปแบบ',
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
            label={'ชื่อจริง (ภาษาไทย)'}
            name={'firstname'}
            preserve
            tooltip={'ต้องเป็นตัวอักษรเท่านั้น'}
            rules={[
              {
                required: true,
                message: 'กรุณากรอกชื่อจริง',
              },
              {
                required: true,
                pattern: new RegExp(/^[a-zA-Zก-์ ]*$/),
                message: 'คุณกรอก ชื่อจริง ไม่ตรงตามรูปแบบ',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={'นามสกุล (ภาษาไทย)'}
            preserve
            name={'lastname'}
            tooltip={'ต้องเป็นตัวอักษรเท่านั้น'}
            rules={[
              {
                required: true,
                message: 'กรุณากรอกนามสกุล',
              },
              {
                required: true,
                pattern: new RegExp(/^[a-zA-Zก-์ ]*$/),
                message: 'คุณกรอก นามสกุล ไม่ตรงตามรูปแบบ',
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
            label={'วันเกิด'}
            preserve
            name={'dob'}
            rules={[
              {
                required: true,
                message: 'กรุณากรอกวันเกิด',
              },
            ]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={'เบอร์โทรศัพท์'}
            preserve
            tooltip={'ต้องเป็นตัวเลข 10 หลักเท่านั้น'}
            name={'tel'}
            rules={[
              {
                required: true,
                message: 'กรุณากรอกเบอร์โทรศัพท์',
              },
              {
                required: true,
                pattern: new RegExp(/^[0-9]{10}$/),
                message: 'คุณกรอก เบอร์โทรศัพท์ ไม่ตรงตามรูปแบบ',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  );

  const Steptwo = (
    <>
      <Row>
        <Col span={12}>
          <Form.Item
            label={'ชื่อบริษัท'}
            name={'company_name'}
            rules={[{ required: true, message: 'กรุณากรอกชื่อบริษัท' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={'เบอร์โทรติดต่อของบริษัท'}
            name={'company_phone'}
            rules={[
              { required: true, message: 'กรุณากรอกเบอร์โทรติดต่อของบริษัท' },
              {
                required: true,
                pattern: new RegExp(/^[0-9]{9,10}$/),
                message: 'คุณกรอก เบอร์โทรติดต่อของบริษัท ไม่ตรงตามรูปแบบ',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label={'จังหวัด/ตำบล/อำเภอ/รหัสไปรษณีย์'}>
            <Input.Group compact>
              <Form.Item
                noStyle
                name={'company_country'}
                rules={[{ required: true, message: 'กรุถณาเลือกจังหวัด' }]}
              >
                <Select
                  placeholder="เลือกจังหวัด"
                  style={{ width: '25%' }}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={province ? province : []}
                  onChange={onProvinceChange}
                />
              </Form.Item>
              <Form.Item
                name={'company_state'}
                noStyle
                rules={[{ required: true, message: 'กรุถณาเลือกตำบล' }]}
              >
                <Select
                  style={{ width: '25%' }}
                  placeholder="เลือกตำบล"
                  onChange={onDistrictChange}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={district ? district : []}
                />
              </Form.Item>
              <Form.Item
                name={'company_city'}
                noStyle
                rules={[{ required: true, message: 'กรุถณาเลือกอำเภอ' }]}
              >
                <Select
                  style={{ width: '25%' }}
                  placeholder="เลือกอำเภอ"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  onChange={onAmphoeChange}
                  options={amphoe ? amphoe : []}
                />
              </Form.Item>
              <Form.Item
                name={'company_zip'}
                noStyle
                rules={[{ required: true, message: 'กรุถณาเลือกรหัสไปรษณีย์' }]}
              >
                <Input
                  style={{ width: '25%' }}
                  disabled
                  placeholder={'รหัสไปรษณีย์'}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={'ที่อยู่บริษัท'}
            name={'company_address'}
            rules={[{ required: true, message: 'กรุณากรอกที่อยู่บริษัท' }]}
          >
            <Input.TextArea style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label={'รหัสบริษัท หรือ ชื่อย่อของบริษัท'}
            name={'companyCode'}
            tooltip={
              'กรุณากรอกรหัสบริษัท หรือ ชื่อย่อของบริษัท อย่างน้อย 2 ตัว และไม่เกิน 10 ตัว และต้องเป็น ภาษาอังกฤษและตัวเลขเท่านั้น'
            }
            rules={[
              {
                required: true,
                message: 'กรุณากรอก รหัสบริษัท ไม่ตรงตามรูปแบบ',
              },
              {
                required: true,
                pattern: new RegExp(/^[a-zA-Z0-9]{2,10}$/),
                message: 'คุณกรอก รหัสบริษัท ไม่ตรงตามรูปแบบ',
              },
            ]}
          >
            <Input onChange={validateCompanyCode} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={'ขนาดของบริษัท'}
            name={'userlimit'}
            tooltip={'ขนาดของบริษัท คือ จำนวนพนักงานภายในบริษัท ทั้งหมด'}
            rules={[
              {
                required: true,
                message: 'กรุณาเลือกขนาดบริษัท',
              },
            ]}
          >
            <Select
              options={[
                {
                  label: '1-10',
                  value: 10,
                },
                {
                  label: '1-50',
                  value: 50,
                },
                {
                  label: '1-100',
                  value: 100,
                },
                {
                  label: '1-1000',
                  value: 1000,
                },
              ]}
            />
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
      sm: { span: 22 },
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
      title: 'กรอกข้อมูลของผู้สร้าง',
      icon: <UserOutlined />,
      content: Stepone,
    },
    {
      title: 'กรอกข้อมูลบริษัท',
      icon: <RiHotelLine />,
      content: Steptwo,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

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
          <Steps current={current} items={items} />
          <div className="steps-content">
            <Form
              layout="vertical"
              form={form}
              {...formItemLayout}
              size="large"
            >
              {steps[current].content}
            </Form>
          </div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button size="large" onClick={() => next()}>
                ถัดไป
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                size="large"
                style={{
                  backgroundColor: token.token.colorPrimary,
                }}
                type="primary"
                onClick={onFinish}
              >
                สร้างบัญชีผู้ใช้
              </Button>
            )}
            {current > 0 && (
              <Button
                size="large"
                style={{ margin: '0 8px' }}
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
