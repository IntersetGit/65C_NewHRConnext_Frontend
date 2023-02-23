import { MoreOutlined } from '@ant-design/icons';
import {
  Divider,
  theme,
  Card,
  Form,
  Row,
  Col,
  Input,
  Select,
  Button,
  Space,
  Table,
  Dropdown,
} from 'antd';
import { RiSuitcaseLine } from 'react-icons/ri';
import edit from '../../../assets/Edit.png';
import Del from '../../../assets/DEL.png';
import View from '../../../assets/View.png';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { FETCH_ALL_LEAVE } from '../../../service/graphql/Leave';
import { useQuery } from '@apollo/client';
import { POSITION } from '../../../service/graphql/Position';
import { useState } from 'react';

const { useToken } = theme;

const Leave: React.FC = () => {
  const token = useToken();
  const navigate = useNavigate();
  const { data: leave_data, refetch } = useQuery(FETCH_ALL_LEAVE);
  const { data: position } = useQuery(POSITION);
  const [maspositionlevel3, setMasPositionlevel3] = useState<
    { value?: string | null; label?: string | null }[] | undefined
  >(undefined);
  const [formSearch] = Form.useForm();

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
    console.log(maspositionlevel3);
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
      // {
      //   key: 'edit',
      //   label: 'แก้ไข',
      //   icon: <img style={{ width: '17px', height: '17px' }} src={edit} />,
      //   onClick: (e: any) => onMenuClick(e, record),
      // },
      {
        key: 'view',
        label: 'ดูข้อมูล',
        icon: <img style={{ width: '17px', height: '17px' }} src={View} />,
        onClick: (e: any) => onMenuClick(e, record),
      },
      // {
      //   key: 'delete',
      //   label: 'ลบข้อมูล',
      //   icon: <img style={{ width: '20px', height: '20px' }} src={Del} />,
      //   onClick: (e: any) => onMenuClick(e, record),
      // },
    ];
  };

  const onMenuClick = (event: any, record: any) => {
    const { key } = event;
    if (key === 'edit') {
    } else if (key === 'view') {
      const count_all = leave_data?.getAllleave?.data_count;
      navigate(`approve?id=${record.id}`, {
        state: { ...record, count_all },
      });
    } else if (key === 'delete') {
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: 'ลำดับ',
      align: 'center',
      render: (_: any, record: any, index: any) => {
        return index + 1;
      },
    },
    {
      title: 'ชื่อ-สกุล',
      key: 'profile',
      dataIndex: 'profile',
      align: 'center',
      render: (txt: any) => txt?.firstname_th + ' ' + txt?.lastname_th,
    },
    {
      title: 'ตำแหน่ง',
      align: 'center',
      render: (record) => {
        return record?.Position_user[0]?.mas_positionlevel3?.name;
      },
    },
    {
      title: 'แผนก',
      align: 'center',
      render: (record) => {
        return record?.Position_user[0]?.mas_positionlevel2?.name;
      },
    },
    {
      title: 'เบอร์โทร',
      key: 'profile',
      dataIndex: 'profile',
      align: 'center',
      render: (record: any) => record?.tel,
    },
    {
      title: 'หัวหน้างาน',
      align: 'center',
      render: (txt: any) => {
        const name = txt.Position_user?.[0]?.header?.profile?.firstname_th;
        const last = txt.Position_user?.[0]?.header?.profile?.lastname_th;
        return `${name ? name : ''} ${last ? last : ''}`;
      },
    },
    {
      title: 'Action',
      key: 'Action',
      align: 'center',
      render: (record: any) => (
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
        <RiSuitcaseLine />
        <div className="ml-2 text-lg">การลา</div>
      </div>

      <Divider style={{ backgroundColor: token.token.colorPrimary }} />

      <Card className="shadow-xl">
        <Form form={formSearch} size="middle">
          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name={'name'} colon={false} label={'ชื่อ'}>
                <Input allowClear></Input>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item
                name={'mas_positionlevel2'}
                colon={false}
                label={'แผนก'}
              >
                <Select
                  options={mas_positionlevel2}
                  onChange={onChange}
                  allowClear
                ></Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item
                name={'mas_positionlevel3'}
                colon={false}
                label={'ตำแหน่ง'}
              >
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
                    type="primary"
                    style={{ backgroundColor: token.token.colorPrimary }}
                  >
                    Reset
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button htmlType="submit">Search</Button>
                </Form.Item>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card className="shadow-xl mt-4">
        <Row>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Space>
              <Col>
                <Button
                  type="primary"
                  size="middle"
                  style={{
                    marginBottom: '10px',
                    backgroundColor: token.token.colorPrimary,
                  }}
                  // onClick={() => {
                  //   navigate('useremployee');
                  // }}
                >
                  + ตั้งค่าการลา
                </Button>
              </Col>
            </Space>
          </div>
        </Row>

        <Table
          columns={columns}
          scroll={{ x: 1500 }}
          rowKey={'id'}
          dataSource={leave_data?.getAllleave?.data_all as any}
        ></Table>
      </Card>
    </>
  );
};

export default Leave;
