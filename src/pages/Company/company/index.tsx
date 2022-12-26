import React, { useState } from 'react';
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
} from 'antd';
import { RiCommunityLine, RiCloseFill } from 'react-icons/ri';
import { FaSearch } from 'react-icons/fa';
import { gql } from '../../../__generated__/gql';
import { useQuery } from '@apollo/client';
import { CompanyQuery } from '../../../__generated__/graphql';

const { useToken } = theme;

const GET_COMPANY = gql(/* GraphQL */ `
  query Company {
    company {
      branch {
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
  const { loading, data } = useQuery(GET_COMPANY);

  const columns = [
    {
      title: 'ลำดับ',
      dataIndex: 'id',
    },
    {
      title: 'ประเภท',
      dataIndex: 'type',
    },
    {
      title: 'ชื่อบริษัท/สาขา',
      dataIndex: 'name',
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'address',
    },
    {
      title: 'หมายเลขโทรศัพท์',
      dataIndex: 'tel',
    },
    {
      title: 'Web Site',
      dataIndex: 'website',
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
    <div className="px-2 py-2">
      <Form>
        <div className="relative flex flex-row items-center">
          <div className="flex flex-row items-center text-3xl">
            <RiCommunityLine />
          </div>
          <span className="ml-4 text-lg tracking-wide truncate font-bold">
            จัดการบริษัท
          </span>
        </div>
        <Divider />
        <Row>
          <Col xs={24} xl={12}>
            <Card
              bordered
              className="shadow-lg mb-5"
              size="small"
              style={{ borderColor: token.token.colorPrimary }}
            >
              {' '}
              <p className="text-lg font-bold">{data?.company?.name}</p>
              <p>มีจำนวนสมาชิกทั้งหมด /{data?.company?.userlimit}</p>
              <p>มีจำนวนสาขาทั้งหมด {data?.company?.branch?.length}</p>
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col>
            <Form.Item>
              <span className="tracking-wide truncate">ชื่อบริษัท / สาขา</span>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Input />
          </Col>
          <Col>
            <Button>
              <FaSearch />
            </Button>
          </Col>
        </Row>

        <Col>
          <Form.Item>
            <span
              className="tracking-wide truncate]"
              style={{
                marginRight: '3px',
                color: token.token.colorPrimary,
              }}
            >
              บริษัท / นิติบุคคล
            </span>
            <span
              style={{ position: 'absolute', right: '10px', height: '10px' }}
            >
              <Button
                style={{ height: '35px' }}
                onClick={() => {
                  // setTablefield(false);
                }}
              >
                + เพิ่มสาขา
              </Button>
            </span>
          </Form.Item>
        </Col>
        <Table
          dataSource={data?.company?.branch as any}
          loading={loading}
          columns={columns}
        />
      </Form>
    </div>
  );
};

export default Companyniti;
