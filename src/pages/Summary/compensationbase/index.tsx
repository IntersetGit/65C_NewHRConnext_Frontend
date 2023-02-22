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
  Drawer,
  Checkbox,
} from 'antd';
import { GiReceiveMoney } from 'react-icons/gi';
import type { ColumnsType } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import edit from '../../../assets/Edit.png';
import Del from '../../../assets/DEL.png';
import View from '../../../assets/View.png';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import moment from 'moment';

import { useQuery, useMutation, from } from '@apollo/client';
import { FETCH_SELECT_BOOK_BANK, FETCH_AllSALARY_BASE } from '../../../service/graphql/Summary';
import { POSITION } from '../../../service/graphql/Position';
import BaseSalary from '../basesalary';
import dayjs from 'dayjs';

const { useToken } = theme;

const Compensationbase: React.FC = () => {
  const token = useToken();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<any>();
  const [formSearch] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  let propsstate = location.state as any;
  const [selectedRow, setSelectedRow] = useState<any>();
  const { data: TableData, loading, refetch } = useQuery(FETCH_AllSALARY_BASE);
  const { data: position } = useQuery(POSITION);
  const [maspositionlevel3, setMasPositionlevel3] = useState<
    { value?: string | null; label?: string | null }[] | undefined
  >(undefined);


  console.log("table", TableData)

  useEffect(() => {
    refetch()
  }, []);

  const onChange = (value) => {
    formSearch.setFieldValue('mas_positionlevel3', null);
    const maspositionlevel3 = position?.getMasPositon?.[0]?.mas_positionlevel2
      ?.find((e) => e?.id === value)
      ?.mas_positionlevel3?.map((e) => {
        return {
          label: e?.name,
          value: e?.id,
        };
      });

    setMasPositionlevel3(maspositionlevel3 ? maspositionlevel3 : []);
  };

  const mas_positionlevel2 =
    position?.getMasPositon?.[0]?.mas_positionlevel2?.map((e) => {
      return {
        label: e?.name,
        value: e?.id,
      };
    });

  const genarateMenu = (record: any) => {
    return [
      {
        key: 'view',
        label: 'ดูข้อมูล',
        icon: <img style={{ width: '17px', height: '17px' }} src={View} />,
        onClick: (e: any) => onMenuClick(e, record),
      },
    ];
  };

  const onMenuClick = (event: any, record: any) => {
    const { key } = event;
    if (key === 'view') {
      setSelectedRow(record);
      navigate(`remuneration?id=${record.profile.userId}`, {
        state: {
          ...record, userId: record?.profile?.userId,
        },
      });

      console.log("State", record)
    }
  };

  const Filter_baseSalary = () => {
    let Date_Time: any = [];
    let Date_New = new Date()
    let Thismonth = dayjs(Date_New).format("MM")
    let Thisyear = dayjs(Date_New).format("YYYY")

    // TableData?.data_salary?.bookbank_log?.push(Date_Time)
    // console.log("Date_F", Date_Time)

  }


  const columns: ColumnsType<any> = [
    {
      title: 'รหัสพนักงาน',
      key: 'profile',
      dataIndex: 'profile',
      align: 'center',
      render: (record) => record.staff_code,
    },
    {
      title: 'ชื่อ-สกุล',
      key: 'profile',
      dataIndex: 'profile',
      align: 'center',
      render: (txt: any) =>
        txt.prefix_th + ' ' + txt.firstname_th + ' ' + txt.lastname_th,
    },
    {
      title: 'แผนก',
      key: 'Position_user',
      align: 'center',
      render: (record) => {
        return record?.Position_user[0]?.mas_positionlevel2?.name;
      },
    },
    {
      title: 'ตำแหน่ง',
      key: 'Position_user',
      align: 'center',
      render: (record) => {
        return record?.Position_user[0]?.mas_positionlevel3?.name;
      },
    },
    {
      title: 'ฐานเงินเดือน',
      key: 'bookbank_log',
      dataIndex: 'bookbank_log',
      align: 'center',
      render: (record) => {
        return record?.[0]?.base_salary?.toFixed(2);
        // return JSON.stringify(data[0]?.base_salary);
        // if (parseInt(เดือนปัจจุบัน) < parseInt(เดือนที่มีผลบังคับใช้) && ปีปัจจุบัน === ปีที่มีผลบังคับใช้) { 
        //   return record?.[0]?.base_salary?.toFixed(2);
        // }
        // let data = record?.find((i) => i.accept_month <= dayjs().format('MM'));
        // return data ? data.base_salary : '-'
      },
    },
    {
      title: 'Action',
      key: 'Action',
      align: 'center',
      render: (_: any, record: any) => (
        <Dropdown
          menu={{
            items: genarateMenu(record),
          }}
          arrow
        >
          <MoreOutlined />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <div className="flex text-3xl ml-2 pt-4">
        <GiReceiveMoney />
        <div className="ml-2 text-xl">
          ข้อมูลฐานเงินเดือน
        </div>
      </div>

      <Divider />
      <Card className="shadow-xl">
        <Form form={formSearch} size="middle">
          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name="fristname" colon={false} label={'ชื่อพนักงาน'}>
                <Input allowClear></Input>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name="position2" colon={false} label={'แผนก'}>
                <Select
                  options={mas_positionlevel2}
                  onChange={onChange}
                  allowClear
                ></Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item name="position3" colon={false} label={'ตำแหน่ง'}>
                <Select
                  options={maspositionlevel3 ? maspositionlevel3 : []}
                  allowClear
                ></Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Space style={{ float: 'right' }}>
                <Form.Item>
                  <Button
                    onClick={() => {
                      formSearch.resetFields();
                      refetch(formSearch.getFieldsValue());
                    }}
                  >
                    Reset
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    style={{ backgroundColor: token.token.colorPrimary }}
                    loading={loading}
                    htmlType="submit"
                    onClick={() => {
                      refetch(formSearch.getFieldsValue());
                    }}
                  >
                    Search
                  </Button>
                </Form.Item>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card className="shadow-xl mt-4">
        <Table rowKey={'id'} columns={columns} dataSource={TableData?.data_salary as any}></Table>
      </Card>
      {/* position_data?.getposition_user as any */}

    </>
  );
};

export default Compensationbase;

