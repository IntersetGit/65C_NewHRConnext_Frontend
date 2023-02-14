import { useEffect, useState } from 'react';
import {
  FolderFilled,
  AntDesignOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { BsTelegram } from 'react-icons/bs';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  theme,
  Card,
  Upload,
  Avatar,
  Tabs,
  UploadFile,
  message,
} from 'antd';
import {
  useNavigate,
  useLocation,
  generatePath,
  useParams,
} from 'react-router-dom';
import facebook from '../../../assets/Facebook-logo.png';
import inittial from '../../../assets/initials-logo.png';
import line from '../../../assets/Line-logo.png';
import telegram from '../../../assets/Telegram-logo.png';
import type { UploadProps } from 'antd';
import { gql } from '../../../__generated__/gql';
import { useQuery, useMutation, from } from '@apollo/client';
import { FETCH_GETALLUSER } from '../../../service/graphql/Users';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import { GET_PROVINCE } from '../../../service/graphql/Province';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAuth } from '../../../hooks/useAuth';
import { User, UsersQuery } from '../../../__generated__/graphql';
import { FETCH_GETALLROLE } from '../../../service/graphql/Role';
import { getFilePath, getUploadUrl } from '../../../util';
import { RcFile } from 'antd/es/upload';

const { useToken } = theme;

type RegisterEmployeeType = {
  email: string;
  password: string;
  tel: string;
  dob: string;
  address: string;
  age: string;
  citizen_address: string;
  citizen_addressnumber: string;
  citizen_country: string;
  citizen_district: string;
  citizen_id: string;
  citizen_province: string;
  citizen_state: string;
  citizen_tel: string;
  citizen_zipcode: string;
  contract_address: string;
  contract_addressnumber: string;
  contract_companyemail: string;
  contract_country: string;
  contract_district: string;
  contract_email: string;
  contract_province: string;
  contract_sameCitizen: boolean;
  contract_state: string;
  contract_zipcode: string;
  firstname_en: string;
  firstname_th: string;
  gender: string;
  id: string;
  lastname_en: string;
  lastname_th: string;
  prefix_en: string;
  prefix_th: string;
  relationship: string;
  religion: string;
  shirt_size: string;
  social_facebook: string;
  social_id: string;
  social_likedin: string;
  social_line: string;
  socail_telegram: string;
  staff_code: string;
  staff_status: string;
};

const CREATE_EMPLOYEE_ACCOUNT = gql(`
mutation CreateAccountUser($data: CreateAccountUserInput!) {
  createAccountUser(data: $data) {
    message
    status
  }
}`);

const UserEmployee: React.FC = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useToken();
  const [form] = Form.useForm<RegisterEmployeeType>();
  const [picture, setPicture] = useState<string>();
  const [country, setCounrty] = useState([]);
  const [imagePath, setImagepath] = useState('');
  const [district, setDistrict] = useState<
    { value?: string | null; label?: string | null }[] | undefined
  >(undefined);
  const [amphoe, setAmphoe] = useState<
    { value?: string | null; label?: string | null }[] | undefined
  >(undefined);

  const [districtcontract, setDistrictContract] = useState<
    { value?: string | null; label?: string | null }[] | undefined
  >(undefined);
  const [amphoecontract, setAmphoeContract] = useState<
    { value?: string | null; label?: string | null }[] | undefined
  >(undefined);
  const [role, setRole] = useState<
    { value?: string | null; label?: string | null }[] | undefined
  >(undefined);
  const [fileAvatar, setFileavatar] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const { data: province_data, refetch } = useQuery(GET_PROVINCE);
  const { data: role_data } = useQuery(FETCH_GETALLROLE);
  const { data: role_company } = useQuery(FETCH_GETALLUSER);
  const [createEmployeeAccount] = useMutation(CREATE_EMPLOYEE_ACCOUNT);
  let propsstate = location.state as any;
  let { companycode } = useParams();
  const { companyNavigate } = useAuth();

  useEffect(() => {
    AllCounrty();
    if (propsstate?.mode) {
      getUserData();
    }
  }, [province_data]);

  const getUserData = () => {
    onProvinceChangeCitizen(propsstate?.citizen_province);
    onDistrictChangeCitizen(propsstate?.citizen_district);
    onAmphoeChangeCitizen(propsstate?.citizen_state);
    onProvinceChangeContract(propsstate?.contract_province);
    onDistrictChangeContract(propsstate?.contract_district);
    onAmphoeChangeContract(propsstate?.contract_state);
    setImagepath(propsstate?.avatar);
    form.setFieldsValue({
      ...propsstate,
      ...propsstate?.user,
      email: propsstate.contract_email,
      dob: propsstate?.dob ? moment(propsstate?.dob) : undefined,
      start_date_work: propsstate?.start_date_work
        ? moment(propsstate?.start_date_work)
        : undefined,
    });
  };

  const AllCounrty = () => {
    axios.get('https://restcountries.com/v2/all').then((data) => {
      const items = data.data.map((e: any) => {
        return {
          label: e?.name,
          value: e?.name,
        };
      });
      setCounrty(items);
    });
  };

  const onChange = (key: string) => {
    navigate(generatePath(key, { companycode }), {
      state: propsstate,
    });
  };

  const selectrole = role_data?.getcompanyRole?.map((e) => {
    return {
      label: e?.name,
      value: e?.id,
    };
  });

  const province = province_data?.getProvince?.map((e) => {
    return {
      label: e?.name,
      value: e?.id,
    };
  });

  const onProvinceChangeCitizen = (value: string) => {
    if (!value) {
      setDistrict([]);
      setAmphoe([]);
    }
    form.setFieldValue('citizen_district', null);
    form.setFieldValue('citizen_state', null);
    form.setFieldValue('citizen_zipcode', null);
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

  const onDistrictChangeCitizen = (value: string) => {
    form.setFieldValue('citizen_state', null);
    form.setFieldValue('citizen_zipcode', null);
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

  const onAmphoeChangeCitizen = (value: string) => {
    const zipCode = province_data?.getProvince
      ?.find((e) =>
        e?.district?.find((_e) => _e?.amphoe?.find((__e) => __e?.id === value)),
      )
      ?.district?.find((e) => e?.amphoe?.find((_e) => _e?.id === value))
      ?.amphoe?.find((e) => e?.id === value)?.zipcode;

    form.setFieldValue('citizen_zipcode', zipCode);
  };

  const onProvinceChangeContract = (value: string) => {
    if (!value) {
      setDistrict([]);
      setAmphoe([]);
    }
    form.setFieldValue('contract_district', null);
    form.setFieldValue('contract_state', null);
    form.setFieldValue('contract_zipcode', null);
    const district = province_data?.getProvince
      ?.find((e) => e?.id === value)
      ?.district?.map((e) => {
        return {
          label: e?.name,
          value: e?.id,
        };
      });
    setDistrictContract(district ? district : []);
  };

  const onDistrictChangeContract = (value: string) => {
    form.setFieldValue('contract_state', null);
    form.setFieldValue('contract_zipcode', null);
    const amphoe = province_data?.getProvince
      ?.find((e) => e?.district?.find((_e) => _e?.id === value))
      ?.district?.find((e) => e?.id === value)
      ?.amphoe?.map((e) => {
        return {
          label: e?.name,
          value: e?.id,
        };
      });
    setAmphoeContract(amphoe ? amphoe : []);
  };

  const onAmphoeChangeContract = (value: string) => {
    const zipCode = province_data?.getProvince
      ?.find((e) =>
        e?.district?.find((_e) => _e?.amphoe?.find((__e) => __e?.id === value)),
      )
      ?.district?.find((e) => e?.amphoe?.find((_e) => _e?.id === value))
      ?.amphoe?.find((e) => e?.id === value)?.zipcode;

    form.setFieldValue('contract_zipcode', zipCode);
  };

  const checkBoxOnChange = (e: CheckboxChangeEvent) => {
    const value = form.getFieldsValue();
    if (e.target.checked == true) {
      onProvinceChangeContract(value.citizen_province);
      onDistrictChangeContract(value.citizen_district);
      onAmphoeChangeContract(value.citizen_state);
      form.setFieldsValue({
        contract_addressnumber: value.citizen_addressnumber,
        contract_address: value.citizen_address,
        contract_province: value.citizen_province,
        contract_district: value.citizen_district,
        contract_state: value.citizen_state,
        contract_zipcode: value.citizen_zipcode,
      });
    } else {
      form.setFieldsValue({
        contract_addressnumber: '',
        contract_address: '',
        contract_province: '',
        contract_district: '',
        contract_state: '',
        contract_zipcode: '',
      });
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    fileAvatar.forEach((e) => {
      formData.append('avatar', e as RcFile);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch(getUploadUrl() + 'avatar', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setFileavatar([]);
        form.setFieldValue('avatar', res.destination + '/' + res.filename);
        setImagepath(res.destination + '/' + res.filename);
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };
  ``;
  const propsupload: UploadProps = {
    fileList: fileAvatar,
    onRemove: (file) => {
      const index = fileAvatar.indexOf(file);
      const newFileList = fileAvatar.slice();
      newFileList.splice(index, 1);
      setFileavatar(newFileList);
    },
    customRequest: handleUpload,
    beforeUpload(file) {
      setFileavatar([...fileAvatar, file]);
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement('img');
          img.src = reader.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = 'red';
            ctx.textBaseline = 'middle';
            ctx.font = '33px Arial';
            ctx.fillText('Ant Design', 20, 20);
            canvas.toBlob((result) => resolve(result as any));
            setPicture(canvas.toDataURL());
          };
        };
      });
    },
  };

  const onSubmitForm = (value: RegisterEmployeeType) => {
    Swal.fire({
      title: `ยืนยันการ${propsstate?.id ? 'แก้ไข' : 'สร้าง'}ข้อมูลพนักงาน`,
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonColor: token.token.colorPrimary,
      denyButtonColor: '#ea4e4e',
      confirmButtonText: 'ตกลง',
      denyButtonText: `ยกเลิก`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        createEmployeeAccount({
          variables: {
            data: {
              ...value,
              id: propsstate?.userId ? propsstate?.userId : undefined,
            },
          },
        })
          .then((val) => {
            console.log(val);
            if (val.data?.createAccountUser?.status) {
              Swal.fire(
                `${propsstate?.id ? 'แก้ไข' : 'สร้าง'}ข้อมูลพนักงานสำเร็จ!`,
                '',
                'success',
              );
              companyNavigate('/:companycode/employee');
              refetch();
            }
          })
          .catch((err) => {
            Swal.fire(
              `${propsstate?.id ? 'แก้ไข' : 'สร้าง'}ข้อมูลพนักงานไม่สำเร็จ!`,
              '',
              'error',
            );
            console.error(err);
          });
      }
    });
  };

  return (
    <>
      {!propsstate?.mode || (
        <>
          <Tabs
            defaultActiveKey="/:companycode/employee/useremployee"
            className="right-tab"
            onChange={onChange}
            items={[
              {
                label: `ข้อมูลพนักงาน`,
                key: '/:companycode/employee/useremployee',
              },
              {
                label: `ตำแหน่งงาน`,
                key: '/:companycode/employee/positionemployee',
              },
            ]}
          />
        </>
      )}
      <div className="flex text-3xl ml-2 pt-4">
        <FolderFilled />
        <div className="ml-2 text-lg">ข้อมูลพนักงาน</div>
      </div>
      <Divider style={{ backgroundColor: token.token.colorPrimary }} />
      <Card className="shadow-xl">
        <div className="text-base" style={{ color: token.token.colorPrimary }}>
          ข้อมูลพื้นฐาน
        </div>
        <Form
          layout={'vertical'}
          form={form}
          onFinish={onSubmitForm}
          size={'large'}
        >
          <Row>
            <div className="flex w-screen mt-4 mb-4 justify-center">
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={<AntDesignOutlined />}
                src={getFilePath() + imagePath}
              />
            </div>
          </Row>

          <Row>
            <div className="flex w-screen mt-4 mb-4 justify-center">
              <Form.Item name={'avatar'}>
                <Upload
                  maxCount={1}
                  {...propsupload}
                  action={getUploadUrl() + 'avatar'}
                >
                  <Button loading={uploading} icon={<UploadOutlined />}>
                    อัพโหลดรูปภาพ
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={4} xl={4}>
              <Form.Item name={'staff_code'} label={'รหัสพนักงาน'}>
                {propsstate?.mode == 'view' ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={4} xl={4}>
              <Form.Item name={'staff_status'} label={'Status'}>
                {propsstate?.mode == 'view' ? (
                  <Select
                    disabled
                    options={[
                      {
                        value: 'ใช้งาน',
                        label: 'ใช้งาน',
                      },
                      {
                        value: 'ไม่ใช้งาน',
                        label: 'ไม่ใช้งาน',
                      },
                    ]}
                  ></Select>
                ) : (
                  <Select
                    options={[
                      {
                        value: 'ใช้งาน',
                        label: 'ใช้งาน',
                      },
                      {
                        value: 'ไม่ใช้งาน',
                        label: 'ไม่ใช้งาน',
                      },
                    ]}
                  ></Select>
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              <Form.Item name={'citizen_id'} label={'เลขประจำตัวประชาชน'}>
                {propsstate?.mode == 'view' ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              <Form.Item name={'social_id'} label={'หมายเลขประกันสังคม'}>
                {propsstate?.mode == 'view' ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={4} xl={4}>
              <Form.Item name={'prefix_th'} label={'คำนำหน้า'}>
                {propsstate?.mode == 'view' ? (
                  <Select
                    disabled
                    options={[
                      {
                        value: 'นาย',
                        label: 'นาย',
                      },
                      {
                        value: 'นาง',
                        label: 'นาง',
                      },
                      {
                        value: 'นางสาว',
                        label: 'นางสาว',
                      },
                    ]}
                    allowClear
                  />
                ) : (
                  <Select
                    options={[
                      {
                        value: 'นาย',
                        label: 'นาย',
                      },
                      {
                        value: 'นาง',
                        label: 'นาง',
                      },
                      {
                        value: 'นางสาว',
                        label: 'นางสาว',
                      },
                    ]}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={5} xl={5}>
              <Form.Item name={'firstname_th'} label={'ชื่อ'}>
                {propsstate?.mode == 'view' ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={5} xl={5}>
              <Form.Item name={'lastname_th'} label={'นามสกุล'}>
                {propsstate?.mode == 'view' ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={4} xl={4}>
              <Form.Item name={'nickname'} label={'ชื่อเล่น'}>
                {propsstate?.mode == 'view' ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={3} xl={3}>
              <Form.Item name={'gender'} label={'เพศ'}>
                {propsstate?.mode == 'view' ? (
                  <Select
                    disabled
                    options={[
                      {
                        value: 'ชาย',
                        label: 'ชาย',
                      },
                      {
                        value: 'หญิง',
                        label: 'หญิง',
                      },
                    ]}
                    allowClear
                  />
                ) : (
                  <Select
                    options={[
                      {
                        value: 'ชาย',
                        label: 'ชาย',
                      },
                      {
                        value: 'หญิง',
                        label: 'หญิง',
                      },
                    ]}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={3} xl={3}>
              <Form.Item name={'blood_type'} label={'กรุ๊ปเลือด'}>
                {propsstate?.mode == 'view' ? (
                  <Select
                    disabled
                    options={[
                      {
                        value: 'A',
                        label: 'A',
                      },
                      {
                        value: 'B',
                        label: 'B',
                      },
                      {
                        value: 'O',
                        label: 'O',
                      },
                      {
                        value: 'AB',
                        label: 'AB',
                      },
                    ]}
                    allowClear
                  />
                ) : (
                  <Select
                    options={[
                      {
                        value: 'A',
                        label: 'A',
                      },
                      {
                        value: 'B',
                        label: 'B',
                      },
                      {
                        value: 'O',
                        label: 'O',
                      },
                      {
                        value: 'AB',
                        label: 'AB',
                      },
                    ]}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={4} xl={4}>
              <Form.Item name={'prefix_en'} label={'Prename'}>
                {propsstate?.mode == 'view' ? (
                  <Select
                    disabled
                    options={[
                      {
                        value: 'Mr.',
                        label: 'Mr.',
                      },
                      {
                        value: 'Mrs.',
                        label: 'Mrs.',
                      },
                      {
                        value: 'Ms.',
                        label: 'Ms.',
                      },
                    ]}
                    allowClear
                  />
                ) : (
                  <Select
                    options={[
                      {
                        value: 'Mr.',
                        label: 'Mr.',
                      },
                      {
                        value: 'Mrs.',
                        label: 'Mrs.',
                      },
                      {
                        value: 'Ms.',
                        label: 'Ms.',
                      },
                    ]}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={10} xl={10}>
              <Form.Item name={'firstname_en'} label={'Name'}>
                {propsstate?.mode == 'view' ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={10} xl={10}>
              <Form.Item name={'lastname_en'} label={'Surname'}>
                {propsstate?.mode == 'view' ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={4} xl={4}>
              <Form.Item name={'dob'} label={'วัน/เดือน/ปี'}>
                {propsstate?.mode == 'view' ? (
                  <DatePicker
                    format={'YYYY/MM/DD'}
                    style={{ width: '100%' }}
                    disabled
                  />
                ) : (
                  <DatePicker format={'YYYY/MM/DD'} style={{ width: '100%' }} />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={4} xl={4}>
              <Form.Item name={'age'} label={'อายุ'}>
                {propsstate?.mode == 'view' ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>

            <Col xs={24} sm={8} md={8} lg={6} xl={6}>
              <Form.Item name={'relationship'} label={'สถานภาพสมรส'}>
                {propsstate?.mode == 'view' ? (
                  <Select
                    disabled
                    options={[
                      {
                        value: 'โสด',
                        label: 'โสด',
                      },
                      {
                        value: 'สมรส',
                        label: 'สมรส',
                      },
                      {
                        value: 'หย่าร้าง',
                        label: 'หย่าร้าง',
                      },
                      {
                        value: 'แยกกันอยู่',
                        label: 'แยกกันอยู่',
                      },
                    ]}
                    allowClear
                  />
                ) : (
                  <Select
                    options={[
                      {
                        value: 'โสด',
                        label: 'โสด',
                      },
                      {
                        value: 'สมรส',
                        label: 'สมรส',
                      },
                      {
                        value: 'หย่าร้าง',
                        label: 'หย่าร้าง',
                      },
                      {
                        value: 'แยกกันอยู่',
                        label: 'แยกกันอยู่',
                      },
                    ]}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={8} md={12} lg={4} xl={4}>
              <Form.Item name={'shirt_size'} label={'T-Shirt Size'}>
                {propsstate?.mode == 'view' ? (
                  <Select
                    disabled
                    options={[
                      {
                        value: 'S',
                        label: 'S',
                      },
                      {
                        value: 'M',
                        label: 'M',
                      },
                      {
                        value: 'L',
                        label: 'L',
                      },
                      {
                        value: 'XL',
                        label: 'XL',
                      },
                      {
                        value: 'XXL',
                        label: 'XXL',
                      },
                    ]}
                    allowClear
                  />
                ) : (
                  <Select
                    options={[
                      {
                        value: 'S',
                        label: 'S',
                      },
                      {
                        value: 'M',
                        label: 'M',
                      },
                      {
                        value: 'L',
                        label: 'L',
                      },
                      {
                        value: 'XL',
                        label: 'XL',
                      },
                      {
                        value: 'XXL',
                        label: 'XXL',
                      },
                    ]}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={8} md={12} lg={6} xl={6}>
              <Form.Item name={'employee_status'} label={'สถานภาพพนักงาน'}>
                {propsstate?.mode == 'view' ? (
                  <Select
                    disabled
                    options={[
                      {
                        value: 'พนักงานประจำ',
                        label: 'พนักงานประจำ',
                      },
                      {
                        value: 'พนักงานชั่วคราว',
                        label: 'พนักงานชั่วคราว',
                      },
                    ]}
                    allowClear
                  />
                ) : (
                  <Select
                    options={[
                      {
                        value: 'พนักงานประจำ',
                        label: 'พนักงานประจำ',
                      },
                      {
                        value: 'พนักงานชั่วคราว',
                        label: 'พนักงานชั่วคราว',
                      },
                    ]}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={4} xl={4}>
              <Form.Item name={'start_date_work'} label={'วันที่เริ่มงาน'}>
                {propsstate?.mode == 'view' ? (
                  <DatePicker
                    format={'YYYY/MM/DD'}
                    style={{ width: '100%' }}
                    disabled
                  />
                ) : (
                  <DatePicker format={'YYYY/MM/DD'} style={{ width: '100%' }} />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item
                name={'email'}
                label={'E-Mail'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกเขตอีเมล',
                  },
                ]}
              >
                {propsstate?.mode == 'view' ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item
                name={'password'}
                label={'Password'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกพาสเวิร์ด',
                  },
                ]}
              >
                {propsstate?.mode == 'view' ? (
                  <Input.Password disabled />
                ) : (
                  <Input.Password />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              <Form.Item name={'role_company'} label={'Role'}>
                {propsstate?.mode == 'view' ? (
                  <Select options={selectrole} allowClear disabled />
                ) : (
                  <Select options={selectrole} allowClear />
                )}
              </Form.Item>
            </Col>

            {/* <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'rolecompany'} label={'ROLE'}>
                <Select options={arrcompay} allowClear />
              </Form.Item>
            </Col> */}
          </Row>

          <Divider style={{ backgroundColor: token.token.colorPrimary }} />

          <div
            className="text-base"
            style={{ color: token.token.colorPrimary }}
          >
            ที่อยู่ ตามบัตรประจำตัวประชาชน
          </div>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'citizen_addressnumber'} label={'เลขที่บ้าน'}>
                {propsstate?.mode == 'view' ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={18} xl={18}>
              <Form.Item
                name={'citizen_address'}
                label={'หมู่บ้าน/คอนโด ซอย ถนน'}
              >
                {propsstate?.mode == 'view' ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'citizen_country'} label={'ประเทศ'}>
                {propsstate?.mode == 'view' ? (
                  <Select options={country} showSearch allowClear disabled />
                ) : (
                  <Select options={country} showSearch allowClear />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'citizen_province'} label={'จังหวัด'}>
                {propsstate?.mode == 'view' ? (
                  <Select
                    showSearch
                    options={province ? province : []}
                    onChange={onProvinceChangeCitizen}
                    allowClear
                    disabled
                  />
                ) : (
                  <Select
                    showSearch
                    options={province ? province : []}
                    onChange={onProvinceChangeCitizen}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'citizen_district'} label={'เขต/อำเภอ'}>
                {propsstate?.mode == 'view' ? (
                  <Select
                    onChange={onDistrictChangeCitizen}
                    showSearch
                    options={district ? district : []}
                    allowClear
                    disabled
                  />
                ) : (
                  <Select
                    onChange={onDistrictChangeCitizen}
                    showSearch
                    options={district ? district : []}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'citizen_state'} label={'แขวง/ตำบล'}>
                {propsstate?.mode == 'view' ? (
                  <Select
                    showSearch
                    onChange={onAmphoeChangeCitizen}
                    options={amphoe ? amphoe : []}
                    allowClear
                    disabled
                  />
                ) : (
                  <Select
                    showSearch
                    onChange={onAmphoeChangeCitizen}
                    options={amphoe ? amphoe : []}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'citizen_zipcode'} label={'รหัสไปรษณีย์'}>
                <Input disabled />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'citizen_tel'} label={'โทรศัพท์บ้าน'}>
                {propsstate?.mode == 'view' ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>
          </Row>

          <Divider style={{ backgroundColor: token.token.colorPrimary }} />

          <span
            className="flex text-base items-baseline"
            style={{ color: token.token.colorPrimary }}
          >
            <div>ที่อยู่ ที่สามารถติดต่อได้</div>

            <Form.Item name={'contract_sameCitizen'} valuePropName="checked">
              <Checkbox onChange={checkBoxOnChange} className="ml-2">
                ที่อยู่ที่เดียวกับ ที่อยู่ตามบัตรประจำตัวประชาชน
              </Checkbox>
            </Form.Item>
          </span>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'contract_addressnumber'} label={'เลขที่บ้าน'}>
                {propsstate?.mode == 'view' ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={18} xl={18}>
              <Form.Item name={'contract_address'} label={'หมู่บ้าน/คอนโด ซอย'}>
                {propsstate?.mode == 'view' ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'contract_province'} label={'จังหวัด'}>
                {propsstate?.mode == 'view' ? (
                  <Select
                    showSearch
                    options={province ? province : []}
                    onChange={onProvinceChangeContract}
                    allowClear
                    disabled
                  />
                ) : (
                  <Select
                    showSearch
                    options={province ? province : []}
                    onChange={onProvinceChangeContract}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'contract_district'} label={'เขต/อำเภอ'}>
                {propsstate?.mode == 'view' ? (
                  <Select
                    onChange={onDistrictChangeContract}
                    showSearch
                    options={districtcontract ? districtcontract : []}
                    allowClear
                    disabled
                  />
                ) : (
                  <Select
                    onChange={onDistrictChangeContract}
                    showSearch
                    options={districtcontract ? districtcontract : []}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'contract_state'} label={'แขวง/ตำบล'}>
                {propsstate?.mode == 'view' ? (
                  <Select
                    showSearch
                    onChange={onAmphoeChangeContract}
                    options={amphoecontract ? amphoecontract : []}
                    allowClear
                    disabled
                  />
                ) : (
                  <Select
                    showSearch
                    onChange={onAmphoeChangeContract}
                    options={amphoecontract ? amphoecontract : []}
                    allowClear
                  />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'contract_zipcode'} label={'รหัสไปรษณีย์'}>
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'tel'} label={'Mobile Phone'}>
                {propsstate?.mode == 'view' ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item label={'E-Mail Company'}>
                {propsstate?.mode == 'view' ? <Input disabled /> : <Input />}
              </Form.Item>
            </Col>
          </Row>

          <Divider style={{ backgroundColor: token.token.colorPrimary }} />

          <div
            className="text-base"
            style={{ color: token.token.colorPrimary }}
          >
            Social Link
          </div>

          {/*---------------- Facebook ----------------*/}
          <Row gutter={16}>
            <div className="relative flex flex-row items-center">
              <div className="flex flex-row ml-2 tems-center text-4xl">
                {/* <FacebookFilled /> */}
                <img
                  src={facebook}
                  alt="Facebook-logo"
                  style={{ width: '40px' }}
                />
              </div>
              <div className="flex items-center ml-8 mt-6">
                <Col span={24}>
                  <Form.Item name={'social_facebook'}>
                    {propsstate?.mode == 'view' ? (
                      <Input disabled />
                    ) : (
                      <Input />
                    )}
                  </Form.Item>
                </Col>
              </div>

              {/*------------------- in ------------------*/}
              <div className="flex flex-row items-center ml-6 text-4xl">
                {/* <LinkedinFilled /> */}
                <img
                  src={inittial}
                  alt="inittia-logo"
                  style={{ width: '40px' }}
                />
              </div>
              <div className="flex items-center ml-8 mt-6">
                <Col span={24}>
                  <Form.Item name={'social_likedin'}>
                    {propsstate?.mode == 'view' ? (
                      <Input disabled />
                    ) : (
                      <Input />
                    )}
                  </Form.Item>
                </Col>
              </div>
            </div>
          </Row>

          {/*------------------ Line ------------------*/}
          <Row gutter={16}>
            <div className="relative flex flex-row items-center">
              <div className="flex flex-row ml-2 items-center text-4xl">
                {/* <FaLine /> */}
                <img src={line} alt="Line-logo" style={{ width: '40px' }} />
              </div>
              <div className="flex items-center ml-8 mt-6">
                <Col span={24}>
                  <Form.Item name={'social_line'}>
                    {propsstate?.mode == 'view' ? (
                      <Input disabled />
                    ) : (
                      <Input />
                    )}
                  </Form.Item>
                </Col>
              </div>

              {/*---------------- Telegram ----------------*/}
              <div className="flex flex-row items-center ml-6 text-4xl">
                {/* <BsTelegram /> */}
                <img
                  src={telegram}
                  alt="Telegram-logo"
                  style={{ width: '40px' }}
                />
              </div>
              <div className="flex items-center ml-8 mt-6">
                <Col span={24}>
                  <Form.Item name={'social_telegram'}>
                    {propsstate?.mode == 'view' ? (
                      <Input disabled />
                    ) : (
                      <Input />
                    )}
                  </Form.Item>
                </Col>
              </div>
            </div>
          </Row>

          {propsstate?.mode !== 'view' && (
            <Row gutter={16}>
              <Form.Item>
                <Space>
                  <Button
                    htmlType="submit"
                    type="primary"
                    style={{
                      marginBottom: '10px',
                      backgroundColor: token.token.colorPrimary,
                    }}
                  >
                    บันทึก
                  </Button>
                  <Button
                    style={{
                      marginBottom: '10px',
                    }}
                    onClick={() => {
                      companyNavigate('/:companycode/employee');
                    }}
                  >
                    ยกเลิก
                  </Button>
                </Space>
              </Form.Item>
            </Row>
          )}
        </Form>
      </Card>
    </>
  );
};

export default UserEmployee;
