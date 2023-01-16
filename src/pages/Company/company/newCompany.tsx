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
} from 'antd';
import { gql } from '../../../__generated__/gql';
import { useEffect, useState } from 'react';
import { RiCloseFill, RiCommunityLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import facebook from '../../../assets/Facebook-logo.png';
import initial from '../../../assets/initials-logo.png';
import instagram from '../../../assets/Instagram-logo.png';
import line from '../../../assets/Line-logo.png';
import { CREATE_COMPANY_ACCOUNT } from '../../../service/graphql/Company';
import { CreateCompanyBranch } from '../../../__generated__/graphql';

// ------------------------- Upload------------------------------------ //
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
// ------------------------- Upload------------------------------------ //

const { useToken } = theme;

const GET_PROVINCE = gql(/* GraphQL */ `
  query GetProvince {
    getProvince {
      name
      district {
        name
        amphoe {
          name
          zipcode
        }
      }
    }
  }
`);

// ------------------------- Upload------------------------------------ //
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
// ------------------------- Upload------------------------------------ //

const Newcompany = () => {
  const token = useToken();
  const navigate = useNavigate();
  const [form] = Form.useForm<CreateCompanyBranch>();
  const { data: province_data, refetch } = useQuery(GET_PROVINCE);
  const [createCompanyAccount] = useMutation(CREATE_COMPANY_ACCOUNT);
  const [district, setDistrict] = useState<
    { value?: string | null; label?: string | null }[] | undefined
  >(undefined);
  const [amphoe, setAmphoe] = useState<
    { value?: string | null; label?: string | null }[] | undefined
  >(undefined);

  // ------------------------- Upload------------------------------------ //
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  // ------------------------- Upload------------------------------------ //

  const province = province_data?.getProvince?.map((e) => {
    return {
      label: e?.name,
      value: e?.name,
    };
  });

  const onProvinceChangeCitizen = (value: string) => {
    form.setFieldValue('city', null);
    form.setFieldValue('state', null);
    form.setFieldValue('zip', null);
    const district = province_data?.getProvince
      ?.find((e) => e?.name === value)
      ?.district?.map((e) => {
        return {
          label: e?.name,
          value: e?.name,
        };
      });
    setDistrict(district ? district : []);
  };

  const onDistrictChangeCitizen = (value: string) => {
    form.setFieldValue('city', null);
    form.setFieldValue('zip', null);
    const amphoe = province_data?.getProvince
      ?.find((e) => e?.district?.find((_e) => _e?.name === value))
      ?.district?.find((e) => e?.name === value)
      ?.amphoe?.map((e) => {
        return {
          label: e?.name,
          value: e?.name,
        };
      });
    setAmphoe(amphoe ? amphoe : []);
  };

  const onAmphoeChangeCitizen = (value: string) => {
    const zipCode = province_data?.getProvince
      ?.find((e) =>
        e?.district?.find((_e) =>
          _e?.amphoe?.find((__e) => __e?.name === value),
        ),
      )
      ?.district?.find((e) => e?.amphoe?.find((_e) => _e?.name === value))
      ?.amphoe?.find((e) => e?.name === value)?.zipcode;

    form.setFieldValue('zip', zipCode);
  };

  const onSubmitForm = (value: CreateCompanyBranch) => {
    Swal.fire({
      title: `ยืนยันการสร้างข้อมูลบริษัท`,
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
            data: value
          },
        })
          .then((val) => {
            console.log(val);
            if (val?.data?.createAndUpdateComBarance?.status) {
              Swal.fire(
                `สร้างข้อมูลบริษัทสำเร็จ!`,
                '',
                'success',
              );
              refetch();
            }
          })
          .catch((err) => {
            Swal.fire(
              `'สร้างข้อมูลบริษัทไม่สำเร็จ!`,
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
          <RiCommunityLine />
        </div>
        <span className="ml-4 text-lg tracking-wide truncate">
          ข้อมูลบริษัท / นิติบุคคล
        </span>
        <span style={{ position: 'absolute', right: '10px', height: '10px' }}>
          <Button
            type="primary"
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
        <Form
          size={'large'}
          form={form}
          onFinish={onSubmitForm}
        >
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
                <Input autoComplete='off' placeholder="กรุณากรอกชื่อบริษัท" />
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
                <Input autoComplete='off' placeholder="กรุณากรอกเลขจดทะเบียนบริษัท" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <Form.Item label={'เลขทะเบียนภาษีมูลค่าเพิ่ม'}>
                <Input autoComplete='off' placeholder="กรุณากรอกเลขทะเบียนภาษีมูลค่าเพิ่ม" />
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
                <Input autoComplete='off' placeholder="กรุณากรอกที่อยู่" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item name={'address_2'} label={'ที่อยู่ 2'}>
                <Input autoComplete='off' placeholder="กรุณากรอกที่อยู่" />
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
                <Select
                  placeholder="กรุณากรอกจังหวัด"
                  onChange={onProvinceChangeCitizen}
                  options={province ? province : []}
                  allowClear
                  showSearch
                />
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
                <Select
                  placeholder="กรุณากรอกเขต/อำเภอ"
                  onChange={onDistrictChangeCitizen}
                  options={district ? district : []}
                  allowClear
                  showSearch
                />
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
                <Select
                  placeholder="กรุณากรอกแขวง/ตำบล"
                  onChange={onAmphoeChangeCitizen}
                  options={amphoe ? amphoe : []}
                  allowClear
                  showSearch
                />
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
                <Input autoComplete='off' placeholder="กรุณากรอกเบอร์โทรศัพท์" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item name={'fax'} label={'โทรสาร (Fax)'}>
                <Input autoComplete='off' placeholder="กรุณากรอกโทรสาร (Fax)" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item name={'website'} label={'Web Site'}>
                <Input autoComplete='off' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item label={'แผนที่'}>
                <Button
                  type="primary"
                  style={{
                    width: '100%',
                    marginBottom: '10px',
                    backgroundColor: token.token.colorPrimary,
                  }}
                >เปิดแผนที่</Button>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item label={'พิกัด'}>
                <Input autoComplete='off' />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item name={'email'} label={'อีเมล์ #1'}>
                <Input autoComplete='off' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item name={'email_2'} label={'อีเมล์ #2'}>
                <Input autoComplete='off' />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item name={'company_type'} label={'ประเภทของธุรกิจ หลัก'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'ขายอสังหาทรัพย์',
                    },
                    {
                      value: '2',
                      label: 'ร้านอาหาร',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item name={'sub_company_type'} label={'ประเภทของธุรกิจ ย่อย'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'ขายปุ๋ย',
                    },
                    {
                      value: '2',
                      label: 'ขายทอดมัน',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Form.Item name={'registeredamount'} label={'ทุนจดทะเบียน ( บาท )'}>
                <Input autoComplete='off' placeholder="( บาท )" />
              </Form.Item>
            </Col>
          </Row>
          <Divider style={{ backgroundColor: token.token.colorPrimary }} />

          <div className="text-base py-2" style={{ color: token.token.colorPrimary }}>
            โลโก้บริษัท
          </div>
          <Row gutter={16} className="px-2">
            <Col xs={24} sm={6} md={6} lg={6} xl={4}>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  marginBottom: '10px',
                  backgroundColor: token.token.colorPrimary,
                }}
              >เลือกรูป</Button>

              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>

            </Col>
            <Col xs={24} sm={14} md={14} lg={14} xl={14}>
              <Input autoComplete='off' />
            </Col>
            <Col xs={24} sm={4} md={4} lg={4} xl={4}>
              <Button className="flex flex-row items-center text-2xl">
                <RiCloseFill />
              </Button>
            </Col>
          </Row>
          <Divider style={{ backgroundColor: token.token.colorPrimary }} />

          <div className="text-base" style={{ color: token.token.colorPrimary }}>
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
                      <Input autoComplete='off' />
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
                      <Input autoComplete='off' />
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
                      <Input autoComplete='off' />
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
                      <Input autoComplete='off' />
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
            <Col>
              <Form.Item label="หนังสือรับรอง">
                <Button
                  type="primary"
                  style={{
                    width: '100%',
                    marginBottom: '10px',
                    backgroundColor: token.token.colorPrimary,
                  }}
                >
                  เลือกไฟล์เอกสาร</Button>
              </Form.Item>
            </Col>
            <Col xs={24} sm={18} md={6} lg={8} xl={6}>
              <Form.Item>
                <Input autoComplete='off' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6} md={6} lg={6} xl={1}>
              <Button className="flex flex-row items-center text-2xl">
                <RiCloseFill />
              </Button>
            </Col>
            <Col>
              <Form.Item label="ก.พ. 20">
                <Button
                  type="primary"
                  style={{
                    width: '100%',
                    marginBottom: '10px',
                    backgroundColor: token.token.colorPrimary,
                  }}
                >
                  เลือกไฟล์เอกสาร</Button>
              </Form.Item>
            </Col>
            <Col xs={24} sm={18} md={6} lg={8} xl={6}>
              <Form.Item>
                <Input autoComplete='off' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6} md={6} lg={6} xl={1}>
              <Button className="flex flex-row items-center text-2xl">
                <RiCloseFill />
              </Button>
            </Col>
          </Row>

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
                    navigate('/:companycode/company');
                  }}
                >
                  ยกเลิก
                </Button>
              </Space>
            </Form.Item>
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
    </>
  );
};

export default Newcompany;
