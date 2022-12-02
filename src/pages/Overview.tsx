import { useQuery } from '@apollo/client';
import { Avatar, Col, Divider, List, message, theme, Typography } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useEffect, useState } from 'react';
import { RiHotelLine } from 'react-icons/ri';
import { FETCH_OWNCOMAPNY } from '../service/graphql/Company';

const { useToken } = theme;
const ContainerHeight = 560;

const Overview: React.FC = () => {
  const token = useToken();
  const { data: companyData, loading: companyLoading } =
    useQuery(FETCH_OWNCOMAPNY);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        marginTop: 30,
      }}
    >
      <Col xs={24} sm={18} md={16} lg={12} xl={10}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            placeItems: 'center',
          }}
        >
          <Avatar
            size={'large'}
            style={{
              display: 'flex',
              justifyContent: 'center',
              justifyItems: 'center',
              alignItems: 'center',
              marginRight: 5,
              backgroundColor: token.token.colorPrimary,
            }}
            shape="square"
            icon={<RiHotelLine />}
          />
          <Typography.Title
            style={{ marginBottom: 0 }}
            copyable={false}
            level={3}
          >
            เลือกบริษัทที่ต้องการใช้งาน
          </Typography.Title>
        </div>
        <Divider style={{ backgroundColor: token.token.colorPrimary }} />
        <List loading={companyLoading}>
          <VirtualList
            data={companyData?.getownCompany ? companyData?.getownCompany : []}
            height={ContainerHeight}
            itemHeight={47}
            itemKey="id"
          >
            {(item, k) => (
              <List.Item key={k}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      src={item?.icon?.length && item?.icon}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        alignItems: 'center',
                      }}
                      icon={<RiHotelLine />}
                    />
                  }
                  title={
                    <>
                      {item?.name} ({item?.codeCompany})
                    </>
                  }
                  description={item?.companyType}
                />
                <div>Content</div>
              </List.Item>
            )}
          </VirtualList>
        </List>
      </Col>
    </div>
  );
};

export default Overview;
