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
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLine,
  FaLinkedin,
} from 'react-icons/fa';
import { RiCloseFill, RiCommunityLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import facebook from '../../../assets/Facebook-logo.png';
import initial from '../../../assets/initials-logo.png';
import instagram from '../../../assets/Instagram-logo.png';
import line from '../../../assets/Line-logo.png';

const { useToken } = theme;

const Newcompany = () => {
  const token = useToken();
  const navigate = useNavigate();

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
        <Form>
          <Row gutter={12}>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                label={'ชื่อบริษัท'}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกชื่อบริษัท',
                  },
                ]}
              >
                <Input placeholder="กรุณากรอกชื่อบริษัท" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label={'เลขจดทะเบียนบริษัท'}>
                <Input placeholder="กรุณากรอกเลขจดทะเบียนบริษัท" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item label={'เลขทะเบียนภาษีมูลค่าเพิ่ม'}>
                <Input placeholder="กรุณากรอกเลขทะเบียนภาษีมูลค่าเพิ่ม" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label={'ที่อยู่ 1'}>
                <Input placeholder="กรุณากรอกที่อยู่" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label={'ที่อยู่ 2'}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item label={'จังหวัด'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'กรุงเทพฯ',
                    },
                    {
                      value: '2',
                      label: 'ชลบุรี',
                    },
                    {
                      value: '3',
                      label: 'เชียงใหม่',
                    },
                    {
                      value: '4',
                      label: 'ขอนแก่น',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item label={'เขต/อำเภอ'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'ลาดพร้าว',
                    },
                    {
                      value: '2',
                      label: 'จอมพล',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item label={'เขต/อำเภอ'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'ลาดพร้าว',
                    },
                    {
                      value: '2',
                      label: 'จอมพล',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item label={'รหัสไปรษรีย์'}>
                <Input placeholder="กรุณากรอกรหัสไปรษรีย์" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={'เบอร์โทรศัพท์'}>
                <Input placeholder="กรุณากรอกเบอร์โทรศัพท์" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'โทรสาร (Fax)'}>
                <Input placeholder="กรุณากรอกโทรสาร (Fax)" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={'Web Site'}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'แผนที่'}>
                <Button>เปิดแผนที่</Button>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'พิกัด'}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label={'อีเมล์ #1'}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={'อีเมล์ #2'}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label={'ประเภทของธุรกิจ หลัก'}>
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
            <Col span={8}>
              <Form.Item label={'ประเภทของธุรกิจ ย่อย'}>
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'ปุ๋ย',
                    },
                    {
                      value: '2',
                      label: 'ทอดมัน',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'ทุนจดทะเบียน ( บาท )'}>
                <Input placeholder="( บาท )" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <br />
      <Card className="shadow-md">
        <Form>
          <Row gutter={16} className="px-2">
            <div
              className="text-base"
              style={{ color: token.token.colorPrimary }}
            >
              โลโก้บริษัท
            </div>
            <Col>
              <Button>เลือกรูป</Button>
            </Col>
            <Col span={12}>
              <Input />
            </Col>
            <Col>
              <Button className="flex flex-row items-center text-2xl">
                <RiCloseFill />
              </Button>
            </Col>
            <Divider style={{ backgroundColor: token.token.colorPrimary }} />
          </Row>

          <div
            className="text-base"
            style={{ color: token.token.colorPrimary }}
          >
            Social Link
          </div>

          <Row gutter={16}>
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
                  <Form.Item>
                    <Input />
                  </Form.Item>
                </Col>
              </div>
              {/*---------------- in ----------------*/}
              <div className="flex flex-row items-center ml-6 text-4xl">
                {/* <FaLinkedin /> */}
                <img
                  src={initial}
                  alt="Facebook-logo"
                  style={{ width: '40px' }}
                />
              </div>
              <div className="flex items-center ml-8 mt-6">
                <Col span={24}>
                  <Form.Item>
                    <Input />
                  </Form.Item>
                </Col>
              </div>
            </div>
          </Row>

          <Row gutter={16}>
            {/*---------------- instagram ----------------*/}
            <div className="relative flex flex-row items-center">
              <div className="flex flex-row ml-2 items-center text-4xl">
                {/* <FaInstagramSquare /> */}
                <img
                  src={instagram}
                  alt="Facebook-logo"
                  style={{ width: '40px' }}
                />
              </div>
              <div className="flex items-center ml-8 mt-6">
                <Col span={24}>
                  <Form.Item>
                    <Input />
                  </Form.Item>
                </Col>
              </div>
              {/*---------------- Line ----------------*/}
              <div className="flex flex-row items-center ml-6 text-4xl">
                {/* <FaLine /> */}
                <img src={line} alt="Facebook-logo" style={{ width: '40px' }} />
              </div>
              <div className="flex items-center ml-8 mt-6">
                <Col span={24}>
                  <Form.Item>
                    <Input />
                  </Form.Item>
                </Col>
              </div>
            </div>
          </Row>
        </Form>
      </Card>
      <br />
      <Card className="shadow-md">
        <Form>
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
                <Button>เลือกไฟล์เอกสาร</Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Button className="flex flex-row items-center text-2xl">
                <RiCloseFill />
              </Button>
            </Col>
            <Col>
              <Form.Item label="ก.พ. 20">
                <Button>เลือกไฟล์เอกสาร</Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Button className="flex flex-row items-center text-2xl">
                <RiCloseFill />
              </Button>
            </Col>
          </Row>

          <Row gutter={16}>
            <Form.Item>
              <Space>
                <Button
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
