import React from 'react';
import {
  theme,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Popconfirm,
  Row,
  Table,
  Card,
  Typography,
} from 'antd';
import { RiCommunityLine } from 'react-icons/ri';
import { gql } from '../../../__generated__/gql';
import { useQuery } from '@apollo/client';
import Spinner from '../../../components/Spinner';
import type { ColumnsType } from 'antd/es/table';
import { CompanyQuery } from '../../../__generated__/graphql';
import { useNavigate } from 'react-router-dom';

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
        name
        address
        tel
        website
        id
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
      dataIndex: 'type',
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
      render: (text: any) => {
        return (
          <Popconfirm title="Delete?">
            <Button>Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex text-2xl ml-2 pt-4">
        <RiCommunityLine size={30} />
        <div className="ml-2 text-lg">จัดการบริษัท</div>
      </div>

      {/* <div className="px-2 py-2">
        <div className="relative flex flex-row items-center">
          <div className="flex">
            <RiCommunityLine style={{ color: token.token.colorText }} size={30} />
            <Typography.Title level={3}>จัดการบริษัท</Typography.Title>
          </div>
        </div>
      </div> */}

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
