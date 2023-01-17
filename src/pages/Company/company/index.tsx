import React from 'react';
import {
  theme,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Table,
  Card,
  Dropdown,
} from 'antd';
import edit from '../../../assets/Edit.png';
import Del from '../../../assets/DEL.png';
import View from '../../../assets/View.png';
import { RiCommunityLine } from 'react-icons/ri';
import { gql } from '../../../__generated__/gql';
import { useQuery } from '@apollo/client';
import Spinner from '../../../components/Spinner';
import type { ColumnsType } from 'antd/es/table';
import { CompanyQuery } from '../../../__generated__/graphql';
import { useNavigate } from 'react-router-dom';
import { MoreOutlined } from '@ant-design/icons';

const { useToken } = theme;

const GET_COMPANY = gql(/* GraphQL */ `
  query Company {
    company {
      _count {
        branch
      }
      branch {
        _count {
          users
        }
        id
        name
        address
        address_2
        city
        state
        zip
        country
        tel
        fax
        website
        lat
        lng
        email
        email_2
        company_type
        sub_company_type
        registeredamount
        social_facebook
        social_likedin
        social_instragram
        social_line
        createdAt
        updatedAt
      }
      userlimit
      name
    }
  }
`);

const Companyniti: React.FC = () => {
  const token = useToken();
  const { loading, data, refetch } = useQuery(GET_COMPANY);
  const navigate = useNavigate();

  const onMenuClick = (event: any, record: any) => {
    const { key } = event;
    console.log(record)
    if (key === 'edit') {
      navigate(`newCompany?id=${record?.id}`, {
        state: { ...record, mode: 'edit' },
      });
    } else if (key === 'view') {
      navigate(`newCompany?id=${record.id}`, {
        state: { ...record, mode: 'view' },
      });
    } else if (key === 'delete') {
      navigate(`newCompany?id=${record.id}`, {
        state: { ...record, mode: 'delete' },
      });
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

  const columns: ColumnsType<CompanyQuery> = [
    {
      title: 'ลำดับ',
      align: 'center',
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      title: 'ประเภทบริษัท',
      align: 'center',
      dataIndex: 'company_type',
    },
    {
      title: 'ชื่อบริษัท/สาขา',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: 'จำนวนพนักงาน',
      align: 'center',
      render: (_, record: any) => {
        return record._count?.users;
      },
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'address',
    },
    {
      title: 'หมายเลขโทรศัพท์',
      render: (_, record: any) => {
        return record.tel;
      },
    },
    {
      title: 'Web Site',
      render: (_, record: any) => {
        return record.website;
      },
    },
    {
      title: 'Actions',
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

  return (
    <>
      <div className="flex text-2xl ml-2 pt-4">
        <RiCommunityLine size={30} />
        <div className="ml-2 text-lg">จัดการบริษัท</div>
      </div>

      <Divider style={{ backgroundColor: token.token.colorPrimary }} />
      <Card className="shadow-md mb-3">
        <Row gutter={5}>
          <Col xs={24} sm={24} md={24} lg={17} xl={20}>
            <Form
              wrapperCol={{
                xl: { span: 5, offset: 0 },
                lg: { span: 12, offset: 0 },
                md: { span: 24, offset: 0 },
                sm: { span: 24, offset: 0 },
                xs: { span: 24, offset: 0 },
              }}
              layout="vertical"
            >
              <Form.Item label={<b>ชื่อบริษัท/สาขา</b>}>
                <Input />
              </Form.Item>
            </Form>
          </Col>
          <Col xs={24} sm={24} md={24} lg={7} xl={4}>
            <div className="space-x-2 flex h-full items-center justify-end justify-items-center">
              <Button
                loading={loading}
                type="primary"
                style={{ backgroundColor: token.token.colorPrimary }}
              >
                Search
              </Button>
              <Button>Reset</Button>
            </div>
          </Col>
        </Row>
      </Card>
      <Card className="shadow-md">
        <Col className="pb-4 flex justify-end">
          <Button
            type="primary"
            style={{
              marginBottom: '10px',
              backgroundColor: token.token.colorPrimary,
            }}
            onClick={() => {
              navigate('newCompany');
            }}
          >
            + เพิ่มสาขา
          </Button>
        </Col>
        <Table
          rowKey={'id'}
          dataSource={data?.company?.branch as any}
          loading={{
            spinning: loading,
            indicator: <Spinner />,
          }}
          columns={columns}
        />
      </Card>
    </>
  );
};

export default Companyniti;
