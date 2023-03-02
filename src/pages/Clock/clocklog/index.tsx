import { AntDesignOutlined, MoreOutlined } from '@ant-design/icons';
import {
  Avatar,
  Tabs,
  Divider,
  theme,
  Row,
  Col,
  DatePicker,
  Card,
  Input,
  Table,
  Dropdown,
  Drawer,
  Button,
  Form,
  Select,
  Space,
} from 'antd';
import { useLocation } from 'react-router-dom';
import edit from '../../../assets/Edit.png';
import Del from '../../../assets/DEL.png';
import View from '../../../assets/View.png';
import dayjs from 'dayjs';

const ClockInClockOutLog = () => {
  const location = useLocation();
  let propsstate = location.state as any;

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

  const columns: any = [
    {
      title: 'วันที่',
      key: 'date',
      dataIndex: 'date',
      align: 'center',
    },
    {
      title: 'เวลาเข้างาน',
      key: 'clock_in',
      dataIndex: 'clock_in',
      align: 'center',
    },
    {
      title: 'เวลาออกงาน',
      key: 'clock_out',
      dataIndex: 'clock_out',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'Action',
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

  const data = [
    {
      key: '1',
      date: '01/02/2023',
      clock_in: '08 : 30',
      clock_out: '17 : 35',
    },
    {
      key: '2',
      date: '02/02/2023',
      clock_in: '08 : 26',
      clock_out: '17 : 40',
    },
    {
      key: '3',
      date: '03/02/2023',
      clock_in: '08 : 25',
      clock_out: '17 : 39',
    },
    {
      key: '4',
      date: '04/02/2023',
      clock_in: '08 : 25',
      clock_out: '17 : 39',
    },
  ];

  return (
    <>
      <Card className="shadow-xl">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div>
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={<AntDesignOutlined />}
              ></Avatar>
            </div>
          </Col>

          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <div className="text-lg font-bold">
              <u className="text-blue-800">
                {propsstate?.profile?.firstname_th}{' '}
                {propsstate?.profile?.lastname_th}
              </u>
              <div className="mt-4">
                {propsstate?.Position_user?.mas_positionlevel3
                  ? propsstate?.Position_user?.mas_positionlevel3
                  : 'ไม่มีตำแหน่งงาน'}
                {/* {position_data?.getposition_user?.[
                  position_data?.getposition_user?.length - 1
                ]?.mas_positionlevel3?.name ?? 'ไม่มีตำแหน่งงาน'} */}
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={16} className="py-10">
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <div className="py-3">เดือน/ปี</div>
            <DatePicker
              style={{ width: '100%' }}
              picker="month"
              format={'MM/YYYY'}
              disabled
              defaultValue={dayjs(propsstate?.date)}
            />
          </Col>
        </Row>

        <Table
          className="py-4"
          columns={columns}
          scroll={{ x: 1500 }}
          dataSource={data}
        ></Table>
      </Card>
    </>
  );
};

export default ClockInClockOutLog;
