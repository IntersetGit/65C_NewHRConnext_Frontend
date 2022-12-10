import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  MenuProps,
  Skeleton,
  Space,
  theme,
  Typography,
} from 'antd';
import { MeQuery } from '../../__generated__/graphql';
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';

const { useToken } = theme;

type RightNavContentType = {
  user: MeQuery | undefined;
  isUserloading: boolean;
};

const profileDetailstyle: React.CSSProperties = {
  lineHeight: '1',
};

const items: MenuProps['items'] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: 'ออกจากระบบ',
    key: '3',
    icon: <HiOutlineArrowRightOnRectangle />,
  },
];

const RightNavbarContent: React.FC<RightNavContentType> = ({
  user,
  isUserloading,
}) => {
  const token = useToken();
  return (
    <div
      style={{
        paddingRight: 10,
        userSelect: 'none',
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      <Divider type="vertical" style={{ margin: 0 }} />
      {/* <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography.Text>
          {isUserloading ? (
            <Skeleton.Input active={true} size={'small'} />
          ) : (
            <>{user?.me?.profile?.firstname}</>
          )}
        </Typography.Text>
        <Typography.Text
          style={{ fontSize: '0.8rem', textAlign: 'end', color: '#6A6A6A' }}
        >
          {isUserloading ? (
            <Skeleton.Input active={true} size={'small'} />
          ) : (
            <>{user?.me?.role?.name}</>
          )}
        </Typography.Text>
      </div> */}
      <Dropdown
        dropdownRender={(menu) => (
          <div
            className="dropdown-content"
            style={{
              borderRadius: token.token.borderRadius,
              paddingLeft: '5px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
              }}
            >
              <Typography.Text style={{ fontWeight: 'bold' }}>
                Account
              </Typography.Text>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  justifyItems: 'center',
                }}
              >
                <Avatar
                  size={'large'}
                  style={{
                    backgroundColor: token.token.colorPrimary,
                    marginRight: '15px',
                  }}
                  shape="square"
                  icon={<UserOutlined />}
                />
                <div
                  style={{
                    lineHeight: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'flex-start',
                  }}
                >
                  <Typography.Text
                    style={{
                      ...profileDetailstyle,
                      fontSize: '1.3em',
                      maxWidth: '200px',
                      wordBreak: 'break-all',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {user?.me?.profile?.firstname} {user?.me?.profile?.lastname}
                  </Typography.Text>
                  <Typography.Text
                    style={{ ...profileDetailstyle, fontSize: '0.9em' }}
                  >
                    {user?.me?.email}
                  </Typography.Text>
                  <Typography.Text
                    style={{ ...profileDetailstyle, fontSize: '0.85em' }}
                  >
                    {user?.me?.role?.name}
                  </Typography.Text>
                </div>
              </div>
            </div>
            <Divider style={{ margin: 0 }} />
            {menu}
          </div>
        )}
        menu={{ items }}
        trigger={['click']}
      >
        <Avatar
          style={{
            cursor: 'pointer',
            marginLeft: 10,
            backgroundColor: token.token.colorPrimary,
          }}
          shape="square"
          icon={<UserOutlined />}
        />
      </Dropdown>
    </div>
  );
};

export default RightNavbarContent;
