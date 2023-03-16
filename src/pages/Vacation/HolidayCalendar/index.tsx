import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Row,
  theme,
  DatePicker,
  Space,
  Table,
  Dropdown,
  Drawer,
  Input,
  Select,
} from 'antd';
import TableHoliday from '../HolidayCalendar/tableholiday';
import edit from '../../../assets/Edit.png';
import Del from '../../../assets/DEL.png';
import View from '../../../assets/View.png';
import { TbCalendarTime } from 'react-icons/tb';
import type { DatePickerProps } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import {
  FETCH_ALL_HOLIDAY,
  HOLIDAY_YEAR,
  CREATE_HOLIDAY_DATE,
} from '../../../service/graphql/Holiday';
import { useMutation, useQuery } from '@apollo/client';
import Swal from 'sweetalert2';

const { useToken } = theme;

const Holidaypage: React.FC = () => {
  const token = useToken();
  const [openyear, setOpenyear] = useState(false);
  const [openday, setOpenday] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [drawerType, setDrawerType] = useState(1);
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>(
    'checkbox',
  );
  const [form] = Form.useForm();
  const { data: data_all } = useQuery(FETCH_ALL_HOLIDAY);
  const { data: data_year } = useQuery(HOLIDAY_YEAR);
  const [createholiday] = useMutation(CREATE_HOLIDAY_DATE);

  const showDraweryear = (type: any) => {
    setOpenyear(true);
    setDrawerType(type);
  };

  const onCloseyear = () => {
    setOpenyear(false);
  };

  const showDrawerday = () => {
    setOpenday(true);
  };

  const onCloseday = () => {
    setOpenday(false);
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
  };

  const onFinish = (value) => {
    Swal.fire({
      title: `ยืนยันการเพิ่มข้อมูลวันหยุด`,
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonColor: token.token.colorPrimary,
      denyButtonColor: '#ea4e4e',
      confirmButtonText: 'ตกลง',
      denyButtonText: `ยกเลิก`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        createholiday({
          variables: {
            data: selectedRows.map((i) => ({
              day: i.day,
              month: i.month,
              year: i.year,
              holiday_name: i.holiday_name,
            })),
          },
        })
          .then((val) => {
            console.log(val);
            if (val.data?.createAndUpdateHolidayDate?.status) {
              Swal.fire(`เพิ่มข้อมูลวันหยุดสำเร็จ!`, '', 'success');
            }
          })
          .catch((err) => {
            Swal.fire(`เพิ่มข้อมูลวันหยุดไม่สำเร็จ!`, '', 'error');
            console.error(err);
          });
      }
    });
  };

  const onMenuClick = (event: any, record: any) => {
    const { key } = event;
    if (key === 'edit') {
      showDraweryear(2);
      setSelectedRows(record);
    } else if (key === 'view') {
      showDraweryear(3);
      setSelectedRows(record);
    } else if (key === 'delete') {
    }
  };

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

  const columns: ColumnsType<any> = [
    {
      title: 'ปี',
      dataIndex: 'year',
      key: 'year',
      align: 'center',
    },
    {
      title: 'จำนวนวันหยุด',
      dataIndex: 'count',
      key: 'count',
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'option',
      align: 'center',
      render: (record) => (
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

  const columnsyear: ColumnsType<any> = [
    {
      title: 'วัน',
      dataIndex: 'day',
      align: 'center',
    },
    {
      title: 'เดือน',
      dataIndex: 'month',
      align: 'center',
      render: (record) => {
        return (
          <div>
            {record === 1
              ? 'มกราคม'
              : record === 2
              ? 'กุมภาพันธ์'
              : record === 3
              ? 'มีนาคม'
              : record === 4
              ? 'เมษายน'
              : record === 5
              ? 'พฤษภาคม'
              : record === 6
              ? 'มิถุนายน'
              : record === 7
              ? 'กรกฎาคม'
              : record === 8
              ? 'สิงหาคม'
              : record === 9
              ? 'กันยายน'
              : record === 10
              ? 'ตุลาคม'
              : record === 11
              ? 'พฤศจิกายน'
              : 'ธันวาคม'}
          </div>
        );
      },
    },
    {
      title: 'ปี',
      dataIndex: 'year',
      align: 'center',
    },
    {
      title: 'วันหยุด',
      dataIndex: 'holiday_name',
      render: (text: string) => <a>{text}</a>,
    },
  ];

  return (
    <>
      <div className="flex text-2xl ml-2 pt-4">
        <TbCalendarTime size={30} />
        <div className="ml-2 text-lg">ปฏิทินวันหยุด</div>
      </div>
      <Divider style={{ backgroundColor: token.token.colorPrimary }} />

      <Card className="shadow-md mb-3">
        <Row gutter={5}>
          <Col xs={24} sm={24} md={16} lg={16} xl={8}>
            <Form.Item label={<b> เลือกปี </b>}>
              <DatePicker
                style={{ width: '100%' }}
                onChange={onChange}
                picker="year"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={16}>
            <div className="flex items-center justify-end justify-items-center">
              <Button
                type="primary"
                style={{ backgroundColor: token.token.colorPrimary }}
              >
                Search
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      <Card className="shadow-md mb-3">
        <Row gutter={8}>
          <Col>
            <Button
              type="primary"
              size="middle"
              style={{
                marginBottom: '10px',
                backgroundColor: token.token.colorPrimary,
              }}
              onClick={() => showDraweryear(1)}
            >
              + เพิ่มวันหยุดรายปี
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              size="middle"
              style={{
                marginBottom: '10px',
                backgroundColor: token.token.colorPrimary,
              }}
              onClick={showDrawerday}
            >
              + เพิ่มวันหยุดรายวัน
            </Button>
          </Col>
        </Row>
        <Table
          dataSource={data_all?.GetHolidayDate?.year_count as any}
          columns={columns}
        />
      </Card>

      <Drawer
        title="เพิ่มวันหยุดรายปี"
        headerStyle={{ textAlign: 'center' }}
        placement="right"
        onClose={onCloseyear}
        open={openyear}
        width="40%"
      >
        <Form form={form} onFinish={onFinish}>
          <div
            className="flex text-2xl"
            style={{ color: token.token.colorPrimary }}
          >
            <TbCalendarTime size={30} />
            <div
              className="ml-2 text-lg"
              style={{ color: token.token.colorPrimary }}
            >
              {' '}
              รายละเอียดปฏิทิน
            </div>
          </div>
          <Divider style={{ backgroundColor: token.token.colorPrimary }} />

          <Row>
            <Col xs={24} sm={6} md={12} lg={12} xl={5}>
              <Form.Item name={''} label={'เลือกปี'}></Form.Item>
            </Col>
            <Col xs={24} sm={18} md={12} lg={12} xl={10}>
              <DatePicker
                className="mb-5"
                style={{ width: '100%' }}
                onChange={onChange}
                picker="year"
              />
            </Col>
          </Row>
          {/* <Row>
            <Col xs={24} sm={10} md={12} lg={12} xl={5}>
              <Form.Item name={''} label={'จำนวนวันหยุด'}></Form.Item>
            </Col>
            <Col xs={24} sm={14} md={12} lg={12} xl={10}>
              <Input className="mb-5" />
            </Col>
          </Row> */}
          <Table
            rowKey={'id'}
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columnsyear}
            dataSource={data_year?.GetHoliDayYear as any}
            // pagination={{ pageSize: 5 }}
            pagination={false}
            // scroll={{ x: '45vh', y: '35vh', }}
          />
          <Row
            gutter={16}
            style={{ position: 'relative', top: '20px', float: 'right' }}
          >
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
                    setOpenyear(false);
                  }}
                >
                  ยกเลิก
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </Drawer>

      <Drawer
        title="เพิ่มวันหยุดรายวัน"
        headerStyle={{ textAlign: 'center' }}
        placement="right"
        onClose={onCloseday}
        open={openday}
        width="40%"
      >
        <Form>
          <div
            className="flex text-2xl"
            style={{ color: token.token.colorPrimary }}
          >
            <TbCalendarTime size={30} />
            <div
              className="ml-2 text-lg"
              style={{ color: token.token.colorPrimary }}
            >
              {' '}
              รายละเอียดปฏิทิน
            </div>
          </div>
          <Divider style={{ backgroundColor: token.token.colorPrimary }} />
          <Row>
            <Col xs={24} sm={16} md={12} lg={12} xl={8}>
              <Form.Item name={''} label={'เลือก วัน/เดือน/ปี'}></Form.Item>
            </Col>
            <Col xs={24} sm={18} md={12} lg={12} xl={10}>
              <DatePicker
                className="mb-5"
                style={{ width: '100%' }}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={8} md={12} lg={12} xl={8}>
              <Form.Item name={''} label={'ชื่อวันหยุด'}></Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={10}>
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="กรุณาเลือกวันที่จะหยุด"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                  {
                    value: '1',
                    label: 'วันจักรี',
                  },
                  {
                    value: '2',
                    label: 'วันสงกรานต์',
                  },
                  {
                    value: '3',
                    label: 'วันแรงงานแห่งชาติ',
                  },
                  {
                    value: '4',
                    label: 'วันฉัตรมงคล',
                  },
                  {
                    value: '5',
                    label: 'วันวิสาขบูชา',
                  },
                  {
                    value: '6',
                    label: 'วันอาสาฬหบูชา',
                  },
                ]}
              />
            </Col>
          </Row>

          <Row
            className="py-6"
            gutter={16}
            style={{
              position: 'relative',
              display: 'flex',
              top: '20px',
              float: 'right',
            }}
          >
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
                    setOpenday(false);
                  }}
                >
                  ยกเลิก
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default Holidaypage;
