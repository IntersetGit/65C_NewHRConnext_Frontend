import { useEffect, useState } from 'react';
import {
  FolderFilled,
  AntDesignOutlined,
  UploadOutlined,
} from '@ant-design/icons';
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
  UploadFile,
  message,
} from 'antd';
import type { UploadProps } from 'antd';
import { gql } from '../../../../__generated__/gql';
import { useQuery, useMutation, NetworkStatus } from '@apollo/client';
import axios from 'axios';
import Swal from 'sweetalert2';
import { GET_PROVINCE } from '../../../../service/graphql/Province';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import facebook from '../../../../assets/Facebook-logo.png';
import inittial from '../../../../assets/initials-logo.png';
import line from '../../../../assets/Line-logo.png';
import telegram from '../../../../assets/Telegram-logo.png';
import { getFilePath, getUploadUrl } from '../../../../util';
import { RcFile } from 'antd/es/upload';

import { FETCH_GETALLROLE } from '../../../../service/graphql/Role';
import { useAuth } from '../../../../hooks/useAuth';
import { PageRoleAndPermissionType } from '../../../../context/AuthContext';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';

type ProfileEmployeePropsType = {
  role?: PageRoleAndPermissionType;
};
const { useToken } = theme;

const GET_ME = gql(`
query Me {
  me {
    Role_Company {
      access
      id
      name
      __typename
    }
    companyBranch {
      companyId
      company {
        companyCode
        icon
        id
        name
        __typename
      }
      createdAt
      id
      name
      __typename
    }
    email
    id
    isOwner
    profile {
      id
      bio
      firstname_th
      lastname_th
      firstname_en
      lastname_en
      avatar
      dob
      age
      relationship
      shirt_size
      prefix_th
      prefix_en
      citizen_id
      social_id
      staff_status
      tel
      address
      gender
      staff_code
      religion
      userId
      citizen_addressnumber
      citizen_address
      citizen_country
      citizen_province
      citizen_district
      citizen_state
      citizen_zipcode
      citizen_tel
      contract_sameCitizen
      contract_addressnumber
      contract_address
      contract_country
      contract_province
      contract_district
      contract_state
      contract_zipcode
      contract_email
      contract_companyemail
      social_facebook
      social_likedin
      social_line
      social_telegram
      nickname
      blood_type
      employee_status
      start_date_work
      __typename
    }
  }
}`);

const CREATE_EMPLOYEE_ACCOUNT = gql(`
mutation CreateAccountUser($data: CreateAccountUserInput!) {
  createAccountUser(data: $data) {
    message
    status
  }
}`);

const ProfileEmployee: React.FC<ProfileEmployeePropsType> = ({ role }) => {
  /** Declare ability */
  const { ability, loading } = useAuth();
  /** End Declare */
  const token = useToken();
  const [form] = Form.useForm<any>();
  const [picture, setPicture] = useState<string>();
  const [country, setCounrty] = useState([]);
  const {
    data: user,
    loading: isUserload,
    networkStatus,
  } = useQuery<any>(GET_ME, {
    notifyOnNetworkStatusChange: true,
  });
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
  const [fileAvatar, setFileavatar] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [imagePath, setImagepath] = useState('');

  const {
    data: province_data,
    loading: isProvinceload,
    refetch,
  } = useQuery(GET_PROVINCE);
  const { data: role_data } = useQuery(FETCH_GETALLROLE);
  const [createEmployeeAccount] = useMutation(CREATE_EMPLOYEE_ACCOUNT);

  useEffect(() => {
    AllCounrty();
    getUserData();
  }, [isProvinceload]);

  const getUserData = async () => {
    await onProvinceChangeCitizen(
      user?.me?.profile?.citizen_province as string,
    );
    await onDistrictChangeCitizen(
      user?.me?.profile?.citizen_district as string,
    );
    await onAmphoeChangeCitizen(user?.me?.profile?.citizen_state as string);
    await onProvinceChangeContract(
      user?.me?.profile?.contract_province as string,
    );
    await onDistrictChangeContract(
      user?.me?.profile?.contract_district as string,
    );
    await onAmphoeChangeContract(user?.me?.profile?.contract_state as string);
    setImagepath(user?.me?.profile?.avatar);
    form.setFieldsValue({
      ...user?.me?.profile,
      email: user?.me?.profile?.contract_email,
      dob: user?.me?.profile?.dob ? dayjs(user?.me?.profile?.dob) : undefined,
      start_date_work: user?.me?.profile?.start_date_work
        ? dayjs(user?.me?.profile?.start_date_work)
        : undefined,
      role_company: user?.me?.Role_Company?.id,
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

  const onChangeAge: DatePickerProps['onChange'] = (date, dateString) => {
    const newdate = dayjs().diff(date, 'year')
      ? dayjs().diff(date, 'year')
      : null;
    form.setFieldValue('age', newdate);
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

  const onSubmitForm = (value: any) => {
    Swal.fire({
      title: `ยืนยันการ${
        user?.me?.profile?.id ? 'แก้ไข' : 'สร้าง'
      }ข้อมูลพนักงาน`,
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
              id: user?.me?.profile?.userId
                ? user?.me?.profile?.userId
                : undefined,
              age: value.age.toString(),
            },
          },
        })
          .then((val) => {
            console.log(val);
            if (val.data?.createAccountUser?.status) {
              Swal.fire(
                `${
                  user?.me?.profile?.id ? 'แก้ไข' : 'สร้าง'
                }ข้อมูลพนักงานสำเร็จ!`,
                '',
                'success',
              );

              refetch();
            }
          })
          .catch((err) => {
            Swal.fire(
              `${
                user?.me?.profile?.id ? 'แก้ไข' : 'สร้าง'
              }ข้อมูลพนักงานไม่สำเร็จ!`,
              '',
              'error',
            );
            console.error(err);
          });
      }
    });
  };

  if (networkStatus === NetworkStatus.refetch) return null;

  if (isUserload) {
    return null;
  }

  return (
    <>
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
              <Form.Item
                name={'staff_code'}
                label={'รหัสพนักงาน'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกรหัสพนักงาน',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={4} xl={4}>
              <Form.Item
                name={'staff_status'}
                label={'Status'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณาเลือก Status',
                  },
                ]}
              >
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
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              <Form.Item name={'citizen_id'} label={'เลขประจำตัวประชาชน'}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              <Form.Item name={'social_id'} label={'หมายเลขประกันสังคม'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={4} xl={4}>
              <Form.Item name={'prefix_th'} label={'คำนำหน้า'}>
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
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={5} xl={5}>
              <Form.Item name={'firstname_th'} label={'ชื่อ'}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={5} xl={5}>
              <Form.Item name={'lastname_th'} label={'นามสกุล'}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={4} xl={4}>
              <Form.Item name={'nickname'} label={'ชื่อเล่น'}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={3} xl={3}>
              <Form.Item name={'gender'} label={'เพศ'}>
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
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={3} xl={3}>
              <Form.Item name={'blood_type'} label={'กรุ๊ปเลือด'}>
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
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={4} xl={4}>
              <Form.Item name={'prefix_en'} label={'Prename'}>
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
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={10} xl={10}>
              <Form.Item name={'firstname_en'} label={'Name'}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={10} xl={10}>
              <Form.Item name={'lastname_en'} label={'Surname'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={4} xl={4}>
              <Form.Item name={'dob'} label={'วัน/เดือน/ปี'}>
                <DatePicker
                  format={'DD-MM-YYYY'}
                  onChange={onChangeAge}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={4} xl={4}>
              <Form.Item name={'age'} label={'อายุ'}>
                <Input disabled />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8} md={8} lg={6} xl={6}>
              <Form.Item name={'relationship'} label={'สถานภาพสมรส'}>
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
              </Form.Item>
            </Col>

            <Col xs={24} sm={8} md={12} lg={4} xl={4}>
              <Form.Item name={'shirt_size'} label={'T-Shirt Size'}>
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
              </Form.Item>
            </Col>

            <Col xs={24} sm={8} md={12} lg={6} xl={6}>
              <Form.Item
                name={'employee_status'}
                label={'สถานภาพพนักงาน'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกสถานภาพพนักงาน',
                  },
                ]}
              >
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
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={4} xl={4}>
              <Form.Item name={'start_date_work'} label={'วันที่เริ่มงาน'}>
                <DatePicker format={'DD-MM-YYYY'} style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item
                name={'email'}
                label={'E-Mail'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกอีเมล',
                  },
                ]}
              >
                <Input />
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
                <Input.Password />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              <Form.Item
                name={'role_company'}
                label={'Role'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอก Role',
                  },
                ]}
              >
                <Select options={selectrole} allowClear />
              </Form.Item>
            </Col>
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
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={18} xl={18}>
              <Form.Item
                name={'citizen_address'}
                label={'หมู่บ้าน/คอนโด ซอย ถนน'}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'citizen_country'} label={'ประเทศ'}>
                <Select options={country} showSearch allowClear />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'citizen_province'} label={'จังหวัด'}>
                <Select
                  showSearch
                  options={province ? province : []}
                  onChange={onProvinceChangeCitizen}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'citizen_district'} label={'เขต/อำเภอ'}>
                <Select
                  onChange={onDistrictChangeCitizen}
                  showSearch
                  options={district ? district : []}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'citizen_state'} label={'แขวง/ตำบล'}>
                <Select
                  showSearch
                  onChange={onAmphoeChangeCitizen}
                  options={amphoe ? amphoe : []}
                  allowClear
                />
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
                <Input />
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
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={18} xl={18}>
              <Form.Item name={'contract_address'} label={'หมู่บ้าน/คอนโด ซอย'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'contract_province'} label={'จังหวัด'}>
                <Select
                  showSearch
                  options={province ? province : []}
                  onChange={onProvinceChangeContract}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'contract_district'} label={'เขต/อำเภอ'}>
                <Select
                  onChange={onDistrictChangeContract}
                  showSearch
                  options={districtcontract ? districtcontract : []}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'contract_state'} label={'แขวง/ตำบล'}>
                <Select
                  showSearch
                  onChange={onAmphoeChangeContract}
                  options={amphoecontract ? amphoecontract : []}
                  allowClear
                />
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
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item label={'E-Mail Company'}>
                <Input />
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
                    <Input />
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
                    <Input />
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
                    <Input />
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
                    <Input />
                  </Form.Item>
                </Col>
              </div>
            </div>
          </Row>

          <Row gutter={16}>
            <Form.Item>
              <Space>
                {ability.can(
                  role?.edit?.action as string,
                  role?.edit?.subject as string,
                ) && (
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
                )}
                {/* <Button
                    style={{
                      marginBottom: '10px',
                    }}
                    onClick={() => {
                        companyNavigate('/:companycode/employee');
                    }}
                  >
                    ยกเลิก
                  </Button> */}
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default ProfileEmployee;
