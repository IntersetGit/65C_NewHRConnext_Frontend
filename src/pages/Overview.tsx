import { Avatar, Col, Divider, List, message, theme, Typography } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useEffect, useState } from 'react';
import { RiHotelLine } from 'react-icons/ri';

const { useToken } = theme;
const ContainerHeight = 560;

interface UserItem {
  email: string;
  gender: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}
const fakeDataUrl =
  'https://randomuser.me/api/?results=5&inc=name,gender,email,nat,picture&noinfo';

const Overview: React.FC = () => {
  const token = useToken();
  const [data, setData] = useState<UserItem[]>([]);

  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
      });
  };

  useEffect(() => {
    appendData();
  }, []);

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
        <List>
          <VirtualList
            data={data}
            height={ContainerHeight}
            itemHeight={47}
            itemKey="id"
          >
            {(item: UserItem) => (
              <List.Item key={item.email}>
                <List.Item.Meta
                  avatar={<Avatar shape="square" src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={item.email}
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
