import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  theme,
  Upload,
  Modal
} from 'antd';
import { useEffect, useState } from 'react';
import { RiCloseFill, RiHotelLine } from 'react-icons/ri';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import facebook from '../../../assets/Facebook-logo.png';
import initial from '../../../assets/initials-logo.png';
import instagram from '../../../assets/Instagram-logo.png';
import line from '../../../assets/Line-logo.png';
import { CREATE_COMPANY_ACCOUNT } from '../../../service/graphql/Company';
import { CreateCompanyBranch } from '../../../__generated__/graphql';
import { GET_PROVINCE } from '../../../service/graphql/Province';
import { useAuth } from '../../../hooks/useAuth';
import Maps from './component/Maps'

import './index.css'

const { useToken } = theme;

const Newcompany = () => {
  const token = useToken();
  const { companyNavigate } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm<CreateCompanyBranch>();
  const getLatLng = Form.useWatch('latlng', form);
  const { data: province_data, refetch } = useQuery(GET_PROVINCE);
  const [createCompanyAccount] = useMutation(CREATE_COMPANY_ACCOUNT);
  const [visible, setVisible] = useState(false)
  const [district, setDistrict] = useState<
    { value?: string | null; label?: string | null }[] | undefined
  >(undefined);
  const [amphoe, setAmphoe] = useState<
    { value?: string | null; label?: string | null }[] | undefined
  >(undefined);

  let Editdata = location.state as any;
  console.log(Editdata);

  useEffect(() => {
    if (Editdata?.mode) {
      getUserData();
    }
  }, [province_data]);

  const getUserData = () => {
    onProvinceChange(Editdata?.country);
    onDistrictChangeCitizen(Editdata?.state);
    onAmphoeChangeCitizen(Editdata?.city);
    form.setFieldsValue({ ...Editdata, latlng: [Editdata.lat, Editdata.lng] });
  };

  const province = province_data?.getProvince?.map((e) => {
    return {
      label: e?.name,
      value: e?.id,
    };
  });

  const onProvinceChange = (value: string) => {
    if (!value) {
      setDistrict([]);
      setAmphoe([]);
    }
    form.setFieldValue('city', null);
    form.setFieldValue('state', null);
    form.setFieldValue('zip', null);
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
    form.setFieldValue('city', null);
    form.setFieldValue('zip', null);
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

    form.setFieldValue('zip', zipCode);
  };

  const onSubmitForm = (value: any) => {
    let objvalue = {
      ...value,
      id: Editdata?.id ? Editdata?.id : undefined,
      lat: value?.latlng ? (value?.latlng[0]).toString() : '',
      lng: value?.latlng ? (value?.latlng[1]).toString() : '',
    };
    delete objvalue?.latlng;
    Swal.fire({
      title: `${Editdata?.id ? 'แก้ไข' : 'สร้าง'}การสร้างข้อมูล!`,
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonColor: token.token.colorPrimary,
      denyButtonColor: '#ea4e4e',
      confirmButtonText: 'ตกลง',
      denyButtonText: `ยกเลิก`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        createCompanyAccount({
          variables: {
            data: objvalue,
          },
        })
          .then((val) => {
            console.log(val);
            if (val?.data?.createAndUpdateComBarance?.status) {
              Swal.fire(
                `${Editdata?.id ? 'แก้ไข' : 'สร้าง'}ข้อมูลบริษัทสำเร็จ!`,
                '',
                'success',
              );
              refetch();
              navigate(-1);
            }
          })
          .catch((err) => {
            Swal.fire(
              `${Editdata?.id ? 'แก้ไข' : 'สร้าง'}ข้อมูลบริษัทไม่สำเร็จ!`,
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
      <div className="relative flex flex-row items-center">
        <div className="flex flex-row items-center text-4xl">
          <RiHotelLine />
        </div>
        <span className="ml-4 text-lg tracking-wide truncate">
          ข้อมูลบริษัท / นิติบุคคล
        </span>
        <span style={{ position: 'absolute', right: '10px', height: '10px' }}>
          <Button
            type="primary"
            onClick={() =>
              companyNavigate('/:companycode/company/CompanyStructure')
            }
            style={{
              marginBottom: '10px',
              backgroundColor: token.token.colorPrimary,
            }}
          >
            จัดการโครงสร้างบริษัท
          </Button>
        </span>
      </div>
      <Divider style={{ backgroundColor: token.token.colorPrimary }} />

      <Card className="shadow-md">
        <Form size={'large'} form={form} onFinish={onSubmitForm}>
          <Row gutter={12}>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <Form.Item
                name={'name'}
                label={'ชื่อบริษัท'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกชื่อบริษัท',
                  },
                ]}
              >
                {Editdata?.mode == 'view' ? (
                  <Input
                    disabled
                    autoComplete="off"
                    placeholder="กรุณากรอกชื่อบริษัท"
                  />
                ) : (
                  <Input autoComplete="off" placeholder="กรุณากรอกชื่อบริษัท" />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <Form.Item
                name={'companyId'}
                label={'เลขจดทะเบียนบริษัท'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกเลขจดทะเบียนบริษัท',
                  },
                ]}
              >
                {Editdata?.mode == 'view' ? (
                  <Input
                    disabled
                    autoComplete="off"
                    placeholder="กรุณากรอกเลขจดทะเบียนบริษัท"
                  />
                ) : (
                  <Input
                    autoComplete="off"
                    placeholder="กรุณากรอกเลขจดทะเบียนบริษัท"
                  />
                )}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <Form.Item label={'เลขทะเบียนภาษีมูลค่าเพิ่ม'}>
                {Editdata?.mode == 'view' ? (
                  <Input
                    disabled
                    autoComplete="off"
                    placeholder="กรุณากรอกเลขทะเบียนภาษีมูลค่าเพิ่ม"
                  />
                ) : (
                  <Input
                    autoComplete="off"
                    placeholder="กรุณากรอกเลขทะเบียนภาษีมูลค่าเพิ่ม"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                name={'address'}
                label={'ที่อยู่ 1'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกที่อยู่',
                  },
                ]}
              >
                {Editdata?.mode == 'view' ? (
                  <Input
                    disabled
                    autoComplete="off"
                    placeholder="กรุณากรอกที่อยู่"
                  />
                ) : (
                  <Input autoComplete="off" placeholder="กรุณากรอกที่อยู่" />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item name={'address_2'} label={'ที่อยู่ 2'}>
                {Editdata?.mode == 'view' ? (
                  <Input
                    disabled
                    autoComplete="off"
                    placeholder="กรุณากรอกที่อยู่"
                  />
                ) : (
                  <Input autoComplete="off" placeholder="กรุณากรอกที่อยู่" />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item
                name={'country'}
                label={'จังหวัด'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกจังหวัด',
                  },
                ]}
              >
                {Editdata?.mode == 'view' ? (
                  <Select
                    placeholder="กรุณากรอกจังหวัด"
                    onChange={onProvinceChange}
                    filterOption={(input, option) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={province ? province : []}
                    allowClear
                    showSearch
                    disabled
                  />
                ) : (
                  <Select
                    placeholder="กรุณากรอกจังหวัด"
                    onChange={onProvinceChange}
                    filterOption={(input, option) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={province ? province : []}
                    allowClear
                    showSearch
                  />
                )}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item
                name={'state'}
                label={'เขต/อำเภอ'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกเขต/อำเภอ',
                  },
                ]}
              >
                {Editdata?.mode == 'view' ? (
                  <Select
                    placeholder="กรุณากรอกเขต/อำเภอ"
                    onChange={onDistrictChangeCitizen}
                    filterOption={(input, option) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={district ? district : []}
                    allowClear
                    showSearch
                    disabled
                  />
                ) : (
                  <Select
                    placeholder="กรุณากรอกเขต/อำเภอ"
                    onChange={onDistrictChangeCitizen}
                    filterOption={(input, option) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={district ? district : []}
                    allowClear
                    showSearch
                  />
                )}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item
                name={'city'}
                label={'แขวง/ตำบล'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกแขวง/ตำบล',
                  },
                ]}
              >
                {Editdata?.mode == 'view' ? (
                  <Select
                    placeholder="กรุณากรอกแขวง/ตำบล"
                    onChange={onAmphoeChangeCitizen}
                    filterOption={(input, option) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={amphoe ? amphoe : []}
                    allowClear
                    showSearch
                    disabled
                  />
                ) : (
                  <Select
                    placeholder="กรุณากรอกแขวง/ตำบล"
                    onChange={onAmphoeChangeCitizen}
                    filterOption={(input, option) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={amphoe ? amphoe : []}
                    allowClear
                    showSearch
                  />
                )}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item name={'zip'} label={'รหัสไปรษรีย์'}>
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item
                name={'tel'}
                label={'เบอร์โทรศัพท์'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกเบอร์โทรศัพท์',
                  },
                ]}
              >
                {Editdata?.mode == 'view' ? (
                  <Input
                    disabled
                    autoComplete="off"
                    placeholder="กรุณากรอกเบอร์โทรศัพท์"
                  />
                ) : (
                  <Input
                    autoComplete="off"
                    placeholder="กรุณากรอกเบอร์โทรศัพท์"
                  />
                )}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item name={'fax'} label={'โทรสาร (Fax)'}>
                {Editdata?.mode == 'view' ? (
                  <Input
                    disabled
                    autoComplete="off"
                    placeholder="กรุณากรอกโทรสาร (Fax)"
                  />
                ) : (
                  <Input
                    autoComplete="off"
                    placeholder="กรุณากรอกโทรสาร (Fax)"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item name={'website'} label={'Web Site'}>
                {Editdata?.mode == 'view' ? (
                  <Input disabled autoComplete="off" />
                ) : (
                  <Input autoComplete="off" />
                )}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item label={'แผนที่'}>
                {Editdata?.mode == 'view' ? (
                  <Button
                    onClick={() => setVisible(true)}
                    type="primary"
                    disabled
                    style={{
                      width: '100%',
                      marginBottom: '10px',
                      backgroundColor: token.token.colorPrimary,
                    }}
                  >
                    เปิดแผนที่
                  </Button>
                ) : (
                  <Button
                    onClick={() => setVisible(true)}
                    type="primary"
                    style={{
                      width: '100%',
                      marginBottom: '10px',
                      backgroundColor: token.token.colorPrimary,
                    }}
                  >
                    เปิดแผนที่
                  </Button>
                )}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item name='latlng' label={'พิกัด'}>
                {Editdata?.mode == 'view' ? (
                  <Input disabled autoComplete="off" />
                ) : (
                  <Input autoComplete="off" />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item name={'email'} label={'อีเมล์ #1'}>
                {Editdata?.mode == 'view' ? (
                  <Input disabled autoComplete="off" />
                ) : (
                  <Input autoComplete="off" />
                )}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item name={'email_2'} label={'อีเมล์ #2'}>
                {Editdata?.mode == 'view' ? (
                  <Input disabled autoComplete="off" />
                ) : (
                  <Input autoComplete="off" />
                )}
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item name={'company_type'} label={'ประเภทของธุรกิจ หลัก'}>
                {Editdata?.mode == 'view' ? (
                  <Select
                    disabled
                    options={[
                      {
                        value: '1',
                        label: 'สำนักงานใหญ่',
                      },
                      {
                        value: '2',
                        label: 'สาขา',
                      },
                    ]}
                  />
                ) : (
                  <Select
                    options={[
                      {
                        value: '1',
                        label: 'สำนักงานใหญ่',
                      },
                      {
                        value: '2',
                        label: 'สาขา',
                      },
                    ]}
                  />
                )}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item
                name={'sub_company_type'}
                label={'ประเภทของธุรกิจ ย่อย'}
              >
                {Editdata?.mode == 'view' ? (
                  <Select
                    disabled
                    options={[
                      {
                        value: '1',
                        label: 'สำนักงานใหญ่',
                      },
                      {
                        value: '2',
                        label: 'สาขา',
                      },
                    ]}
                  />
                ) : (
                  <Select
                    options={[
                      {
                        value: '1',
                        label: 'สำนักงานใหญ่',
                      },
                      {
                        value: '2',
                        label: 'สาขา',
                      },
                    ]}
                  />
                )}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item
                name={'registeredamount'}
                label={'ทุนจดทะเบียน ( บาท )'}
              >
                {Editdata?.mode == 'view' ? (
                  <Input disabled autoComplete="off" placeholder="( บาท )" />
                ) : (
                  <Input autoComplete="off" placeholder="( บาท )" />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Divider style={{ backgroundColor: token.token.colorPrimary }} />

          <div
            className="text-base py-2"
            style={{ color: token.token.colorPrimary }}
          >
            โลโก้บริษัท
          </div>
          <Row gutter={16} className="px-2">
            <Col span={12} offset={6}>
              {Editdata?.mode == 'view' ? (
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  maxCount={1}
                  className={'upload-custom'}
                  listType="picture"
                >
                  <Button
                    disabled
                    type="primary"
                    style={{
                      width: '100%',
                      marginBottom: '10px',
                      backgroundColor: token.token.colorPrimary,
                    }}
                  >
                    เลือกรูป
                  </Button>
                </Upload>
              ) : (
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  maxCount={1}
                  className={'upload-custom'}
                  listType="picture"
                >
                  <Button
                    type="primary"
                    style={{
                      width: '100%',
                      marginBottom: '10px',
                      backgroundColor: token.token.colorPrimary,
                    }}
                  >
                    เลือกรูป
                  </Button>
                </Upload>
              )}
            </Col>

          </Row>
          <Divider style={{ backgroundColor: token.token.colorPrimary }} />

          <div
            className="text-base"
            style={{ color: token.token.colorPrimary }}
          >
            Social Link
          </div>

          <Row gutter={16}>
            <Col>
              {/*---------------- Facebook ----------------*/}
              <div className="relative flex flex-row items-center">
                <div className="flex flex-row ml-2 tems-center text-4xl">
                  {/* <FaFacebookSquare /> */}
                  <img
                    src={facebook}
                    alt="Facebook-logo"
                    style={{ width: '40px' }}
                  />
                </div>
                <div className="flex items-center ml-8 mt-6">
                  <Col span={24}>
                    <Form.Item name={'social_facebook'}>
                      {Editdata?.mode == 'view' ? (
                        <Input disabled autoComplete="off" />
                      ) : (
                        <Input autoComplete="off" />
                      )}
                    </Form.Item>
                  </Col>
                </div>
                {/*---------------- in ----------------*/}
                <div className="flex flex-row items-center ml-6 text-4xl">
                  {/* <FaLinkedin /> */}
                  <img
                    src={initial}
                    alt="likedin-logo"
                    style={{ width: '40px' }}
                  />
                </div>
                <div className="flex items-center ml-8 mt-6">
                  <Col span={24}>
                    <Form.Item name={'social_likedin'}>
                      {Editdata?.mode == 'view' ? (
                        <Input disabled autoComplete="off" />
                      ) : (
                        <Input autoComplete="off" />
                      )}
                    </Form.Item>
                  </Col>
                </div>
              </div>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col>
              {/*---------------- instagram ----------------*/}
              <div className="relative flex flex-row items-center">
                <div className="flex flex-row ml-2 items-center text-4xl">
                  {/* <FaInstagramSquare /> */}
                  <img
                    src={instagram}
                    alt="instagram-logo"
                    style={{ width: '40px' }}
                  />
                </div>
                <div className="flex items-center ml-8 mt-6">
                  <Col span={24}>
                    <Form.Item name={'social_instragram'}>
                      {Editdata?.mode == 'view' ? (
                        <Input disabled autoComplete="off" />
                      ) : (
                        <Input autoComplete="off" />
                      )}
                    </Form.Item>
                  </Col>
                </div>
                {/*---------------- Line ----------------*/}
                <div className="flex flex-row items-center ml-6 text-4xl">
                  {/* <FaLine /> */}
                  <img src={line} alt="line-logo" style={{ width: '40px' }} />
                </div>
                <div className="flex items-center ml-8 mt-6">
                  <Col span={24}>
                    <Form.Item name={'social_line'}>
                      {Editdata?.mode == 'view' ? (
                        <Input disabled autoComplete="off" />
                      ) : (
                        <Input autoComplete="off" />
                      )}
                    </Form.Item>
                  </Col>
                </div>
              </div>
            </Col>
          </Row>
          <Divider style={{ backgroundColor: token.token.colorPrimary }} />

          <div
            className="text-base"
            style={{ color: token.token.colorPrimary }}
          >
            ไฟล์เอกสารการเป็นนิติบุคคล ***
          </div>
          <br />
          <Row gutter={16}>
            <Col md={12} xl={12} xs={24}>
              <Form.Item label="หนังสือรับรอง">
                {Editdata?.mode == 'view' ? (
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    maxCount={1}
                    className={'upload-custom'}
                    listType="picture"
                  >
                    <Button
                      disabled
                      type="primary"
                      style={{
                        width: '100%',
                        marginBottom: '10px',
                        backgroundColor: token.token.colorPrimary,
                      }}
                    >
                      เลือกไฟล์เอกสาร
                    </Button>
                  </Upload>

                ) : (
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    maxCount={1}
                    className={'upload-custom'}
                    listType="picture"
                  >
                    <Button
                      type="primary"
                      style={{
                        width: '100%',
                        marginBottom: '10px',
                        backgroundColor: token.token.colorPrimary,
                      }}
                    >
                      เลือกไฟล์เอกสาร
                    </Button>
                  </Upload>
                )}
              </Form.Item>
            </Col>

            <Col md={12} xl={12} xs={24} >
              <Form.Item label="ก.พ. 20">
                {Editdata?.mode == 'view' ? (
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    maxCount={1}
                    className={'upload-custom'}
                    listType="picture"
                  >
                    <Button
                      disabled
                      type="primary"
                      style={{
                        width: '100%',
                        marginBottom: '10px',
                        backgroundColor: token.token.colorPrimary,
                      }}
                    >
                      เลือกไฟล์เอกสาร
                    </Button>
                  </Upload>
                ) : (
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    maxCount={1}
                    className={'upload-custom'}
                    listType="picture"
                  >
                    <Button
                      type="primary"
                      style={{
                        width: '100%',
                        marginBottom: '10px',
                        backgroundColor: token.token.colorPrimary,
                      }}
                    >
                      เลือกไฟล์เอกสาร
                    </Button>
                  </Upload>
                )}
              </Form.Item>
            </Col>


          </Row>

          <Row gutter={16}>


            <Col xs={24} sm={12} md={12} lg={8} xl={12}>
              <Button
                style={{
                  width: '100%',
                  marginBottom: '10px',
                }}
                onClick={() => {
                  companyNavigate('/:companycode/company');
                }}
              >
                ยกเลิก
              </Button>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={12}>
              <Button
                htmlType="submit"
                type="primary"
                style={{
                  width: '100%',
                  marginBottom: '10px',
                  backgroundColor: token.token.colorPrimary,
                }}
              >
                บันทึก
              </Button>
            </Col>
          </Row>
          <div
            className="text-base"
            style={{ color: token.token.colorPrimary }}
          >
            *** กรอกข้อมูล และ Upload เอกสารที่ถูกต้อง เพื่อรับสิทธิ์ การใช้ระบบ
            Report/Dash Bard สำหรับผู้บริหาร/หรือฝ่ายบุคคล ของบริษัทฯ
            ฟรีตลอดอายุการใช้งาน
          </div>
        </Form>
      </Card>



      <br />
      {getLatLng}
      <Modal title="กรุณาเลือกพื้นที่" onOk={() => setVisible(false)} open={visible} okButtonProps={{ style: { backgroundColor: token.token.colorPrimary } }} onCancel={() => setVisible(false)} >
        <Maps defaulCenter={getLatLng ? { lat: parseFloat(getLatLng[0]), lng: parseFloat(getLatLng[1]) } : { lat: 13.7740564, lng: 100.7852518 }} onChange={(latlng) => form.setFieldValue('latlng', [latlng.lat, latlng.lng])} />
      </Modal>
    </>
  );
};

export default Newcompany;
