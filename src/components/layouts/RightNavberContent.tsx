import { UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Dropdown, MenuProps, theme, Typography } from 'antd';
import { MeQuery } from '../../__generated__/graphql';
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineIdentification,
  HiOutlineCog6Tooth,
  HiOutlineClipboard,
  HiOutlineComputerDesktop,
  HiOutlineQuestionMarkCircle,
} from 'react-icons/hi2';

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
    label: 'โปรไฟล์',
    key: '0',
    icon: <HiOutlineIdentification size={'18'} />,
  },
  {
    label: 'กิจกรรม',
    key: '1',
    icon: <HiOutlineClipboard size={'18'} />,
  },
  {
    label: 'เลือกบริษัท',
    key: '2',
    icon: <HiOutlineComputerDesktop size={'18'} />,
  },
  {
    label: 'ช่วยเหลือ',
    key: '3',
    icon: <HiOutlineQuestionMarkCircle size={'18'} />,
  },
  {
    label: 'ตั้งค่าผู้ใช้',
    key: '4',
    icon: <HiOutlineCog6Tooth size={'18'} />,
  },
  {
    type: 'divider',
  },
  {
    label: 'ออกจากระบบ',
    key: '5',
    icon: <HiOutlineArrowRightOnRectangle size={'18'} />,
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
