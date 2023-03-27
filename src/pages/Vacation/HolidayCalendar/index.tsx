import React, { useEffect, useState } from 'react';
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
import dayjs from 'dayjs';

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
  const [dataselect, setDataselect] = useState([]);

  const [form] = Form.useForm();
  const [formday] = Form.useForm();
  const [formSearch] = Form.useForm();
  const { data: data_all, refetch } = useQuery(FETCH_ALL_HOLIDAY);
  const { data: data_year, refetch: refetchyear } = useQuery(HOLIDAY_YEAR);
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

  const onChangeTable: DatePickerProps['onChange'] = (date, dateString) => {
    let dateTable: any = parseInt(dateString);
    refetch({ year: dateTable });
    console.log(date, dateString);
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    let dates: any = parseInt(dateString);
    refetchyear({ year: dates });
    console.log(date, dateString);
  };

  const onChangeDay: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date);
    const newdate = dayjs().diff(date, 'day');
    console.log(newdate);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRowKeys);
      console.log(selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      disabled: drawerType === 3,
    }),
    hideSelectAll: true,
  };

  const onFinish = (value) => {
    let rows = data_year?.GetHoliDayYear?.map((root) => {
      const filter = selectedRows.find((e) => e === root?.id);
      const filteredData: any = dataselect.find(
        (e: any) => (e.holiday_yearId as string) === root?.id,
      );
      let status = 0;
      // console.log(filter, root, filteredData);
      if (filter) status = 1;
      return {
        ...root,
        id: filteredData?.id as string,
        status: status,
        holiday_yearId: root?.id,
        __typename: undefined,
      };
    });
    console.log(rows);
    console.log(dataselect);
    drawerType === 1
      ? Swal.fire({
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
                data: rows?.map((i) => ({
                  day: i.day,
                  month: i.month,
                  year: i.year,
                  holiday_name: i.holiday_name,
                  status: i.status,
                  holiday_yearId: i.holiday_yearId,
                })),
              },
            })
              .then((val) => {
                console.log(val);
                if (val.data?.createAndUpdateHolidayDate?.status) {
                  Swal.fire(`เพิ่มข้อมูลวันหยุดสำเร็จ!`, '', 'success');
                  refetch();
                }
              })
              .catch((err) => {
                Swal.fire(`เพิ่มข้อมูลวันหยุดไม่สำเร็จ!`, '', 'error');
                console.error(err);
              });
          }
        })
      : Swal.fire({
          title: `ยืนยันการแก้ไขข้อมูลวันหยุด`,
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
                data: rows,
              },
            })
              .then((val) => {
                console.log(val);
                if (val.data?.createAndUpdateHolidayDate?.status) {
                  Swal.fire(`แก้ไขข้อมูลวันหยุดสำเร็จ!`, '', 'success');
                  refetch();
                }
              })
              .catch((err) => {
                Swal.fire(`แก้ไขข้อมูลวันหยุดไม่สำเร็จ!`, '', 'error');
                console.error(err);
              });
          }
        });
  };

  const onFinishDay = (value) => {
    let day = value.date.date();
    let month = value.date.month() + 1;
    let year = value.date.year();
    let holiday_name = value.holiday_name;
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
            data: {
              day: day,
              month: month,
              year: year,
              holiday_name: holiday_name,
              status: 1,
            },
          },
        })
          .then((val) => {
            console.log(val);
            if (val.data?.createAndUpdateHolidayDate?.status) {
              Swal.fire(`เพิ่มข้อมูลวันหยุดสำเร็จ!`, '', 'success');
              refetch();
            }
          })
          .catch((err) => {
            Swal.fire(`เพิ่มข้อมูลวันหยุดไม่สำเร็จ!`, '', 'error');
            console.error(err);
          });
      }
    });
  };

  const onMenuClick = async (event: any, record: any) => {
    const { key } = event;
    console.log(key);
    if (key === 'edit') {
      let mapper = record.child.map((root) => {
        if (root.status === 1) {
          return root.holiday_yearId;
        } else {
          return root;
        }
      });
      let cuttype = record?.child.map((v) => {
        return {
          id: v.id,
          holiday_name: v.holiday_name,
          day: v.day,
          month: v.month,
          year: v.year,
          status: v.status,
          holiday_yearId: v.holiday_yearId,
        };
      });
      onChange('' as any, record.year);
      setDataselect(cuttype);
      setSelectedRows(mapper);
      showDraweryear(2);
    } else if (key === 'view') {
      let mapper = record.child.map((root) => {
        if (root.status === 1) {
          return root.holiday_yearId;
        } else {
          return root;
        }
      });
      onChange('' as any, record.year);
      setSelectedRows(mapper);
      showDraweryear(3);
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
      render: (text: any) => <a>{text}</a>,
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
        <Form form={formSearch}>
          <Row gutter={5}>
            <Col xs={24} sm={24} md={16} lg={16} xl={8}>
              <Form.Item name={'year'} label={<b> เลือกปี </b>}>
                <DatePicker
                  style={{ width: '100%' }}
                  onChange={onChangeTable}
                  picker="year"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={16}>
              {/* <div className="flex items-center justify-end justify-items-center">
                <Button
                  type="primary"
                  style={{ backgroundColor: token.token.colorPrimary }}
                  onClick={() => {
                    refetch({ year: formSearch.getFieldsValue() });
                  }}
                >
                  Search
                </Button>
              </div> */}
            </Col>
          </Row>
        </Form>
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
              onClick={() => {
                showDraweryear(1);
                setSelectedRows('');
                onChange('' as any, '');
              }}
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
          rowKey={'id'}
          dataSource={data_all?.GetHolidayDate?.data as any}
          columns={columns}
        />
      </Card>

      <Drawer
        title={`${
          drawerType == 1
            ? 'เพิ่มวันหยุดรายปี'
            : drawerType == 2
            ? 'แก้ไขวันหยุดรายปี'
            : 'ดูวันหยุดรายปี'
        }`}
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
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item name={'year'} label={'เลือกปี'}>
                <DatePicker
                  style={{ width: '100%' }}
                  onChange={onChange}
                  picker="year"
                />
              </Form.Item>
            </Col>
          </Row>

          <Table
            rowKey={'id'}
            rowSelection={{
              type: selectionType,
              selectedRowKeys: selectedRows,
              ...rowSelection,
            }}
            columns={columnsyear}
            dataSource={data_year?.GetHoliDayYear as any}
            pagination={drawerType == 3 ? false : { pageSize: 10 }}
            // pagination={false}
            // scroll={{ x: '45vh', y: '35vh', }}
          />

          <Row
            gutter={16}
            style={{ position: 'relative', top: '20px', float: 'right' }}
          >
            <Form.Item>
              <Space>
                {drawerType !== 3 && (
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
        title={`เพิ่มวันหยุดรายวัน`}
        headerStyle={{ textAlign: 'center' }}
        placement="right"
        onClose={onCloseday}
        open={openday}
        width="40%"
      >
        <Form form={formday} onFinish={onFinishDay}>
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
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item name={'date'} label={'เลือก วัน/เดือน/ปี'}>
                <DatePicker
                  className="mb-5"
                  style={{ width: '100%' }}
                  onChange={onChangeDay}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item name={'holiday_name'} label={'ชื่อวันหยุด'}>
                <Input />
              </Form.Item>
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
                {drawerType !== 3 && (
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
                <Button
                  style={{
                    marginBottom: '10px',
                  }}
                  onClick={() => {
                    setOpenday(false);
                    formday.resetFields();
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
