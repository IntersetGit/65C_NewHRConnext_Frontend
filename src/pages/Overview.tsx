import { ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Avatar, Button, Col, Divider, List, theme, Typography } from 'antd';
import VirtualList from 'rc-virtual-list';
import { RiHotelLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FETCH_OWNCOMAPNY } from '../service/graphql/Company';
import LoadingSpinner from '../components/loading-spinner';

const { useToken } = theme;
const ContainerHeight = 560;

const Overview: React.FC = () => {
  const token = useToken();
  const { ability } = useAuth();
  const navigate = useNavigate();
  const { data: companyData, loading: companyLoading } =
    useQuery(FETCH_OWNCOMAPNY);

  if (companyLoading) {
    return <LoadingSpinner loadingtext="Loading company data...." />;
  }

  if (companyData?.getownCompany?.redirect) {
    navigate(`/${companyData.getownCompany.company?.companyCode}`, {
      replace: true,
    });
  }

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
      <Col xs={24} sm={24} md={17} lg={12} xl={10}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            placeItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
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
              level={4}
            >
              เลือกบริษัทที่ต้องการใช้งาน
            </Typography.Title>
          </div>
          {ability.can('create', 'Company') && (
            <Button
              size="large"
              type="primary"
              style={{
                backgroundColor: token.token.colorPrimary,
              }}
              icon={<PlusOutlined />}
            >
              เพิ่มบริษัทของคุณ
            </Button>
          )}
        </div>
        <Divider style={{ backgroundColor: token.token.colorPrimary }} />
        <List loading={companyLoading}>
          <VirtualList
            data={
              companyData?.getownCompany?.companies
                ? companyData?.getownCompany?.companies
                : []
            }
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
                  title={<>{item?.name}</>}
                  description={item?.companyCode}
                />
                <div>
                  <Link
                    to={`/${item?.companyCode}`}
                    relative="path"
                    reloadDocument
                  >
                    <Button
                      className="flex content-center justify-center items-center"
                      icon={
                        <ArrowRightOutlined
                          style={{
                            color: token.token.colorPrimary,
                          }}
                        />
                      }
                    ></Button>
                  </Link>
                </div>
              </List.Item>
            )}
          </VirtualList>
        </List>
      </Col>
    </div>
  );
};

export default Overview;
