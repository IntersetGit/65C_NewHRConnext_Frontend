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
    Table,
    theme,
    Dropdown,
    Menu,
} from 'antd';
import { GiReceiveMoney } from 'react-icons/gi';
import type { ColumnsType } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import edit from '../../../assets/Edit.png';
import Del from '../../../assets/DEL.png';
import View from '../../../assets/View.png';

const { useToken } = theme;

const Compensation: React.FC = () => {

    const token = useToken();

    const genarateMenu = (record: any) => {
        return [
            {
                key: 'edit',
                label: 'แก้ไข',
                icon: <img style={{ width: '17px', height: '17px' }} src={edit} />,
                onClick: (e: any) => onMenuClick(e, record),
            },
            {
                key: 'view',
                label: 'ดูข้อมูล',
                icon: <img style={{ width: '17px', height: '17px' }} src={View} />,
                onClick: (e: any) => onMenuClick(e, record),
            },
            {
                key: 'delete',
                label: 'ลบข้อมูล',
                icon: <img style={{ width: '20px', height: '20px' }} src={Del} />,
                onClick: (e: any) => onMenuClick(e, record),
            },
        ];
    };

    const onMenuClick = (event: any, record: any) => {
        const { key } = event;
        if (key === 'edit') {
        } else if (key === 'view') {
        } else if (key === 'delete') {
        }
    };

    return (
        <>
            <div className="flex text-3xl ml-2 pt-4">
                <GiReceiveMoney />
                <div className="ml-2 text-xl">
                    ค่าตอบแทน ( เงินเดือน ค่าล่วงเวลา ค่าบริหาร เบี้ยขยัน และ อื่น ๆ )
                </div>
            </div>

            <Divider />
            <Card className="shadow-xl">
                <Form size="middle">
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                            <Form.Item name="search" colon={false} label={'ชื่อพนักงาน'}>
                                <Input allowClear></Input>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                            <Form.Item name="search" colon={false} label={'แผนก/ฝ่าย'}>
                                <Select allowClear></Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                            <Form.Item name="search" colon={false} label={'ตำแหน่ง'}>
                                <Select allowClear></Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                            <Space style={{ float: 'right' }}>
                                <Form.Item>
                                    <Button>Reset</Button>
                                </Form.Item>

                                <Form.Item>
                                    <Button htmlType="submit">Search</Button>
                                </Form.Item>
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </Card>


        </>
    );
};

export default Compensation;