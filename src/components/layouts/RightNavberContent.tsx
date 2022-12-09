import { UserOutlined } from '@ant-design/icons';
import { Avatar, Skeleton, theme, Typography } from 'antd';
import { MeQuery } from '../../__generated__/graphql';

const { useToken } = theme;

type RightNavContentType = {
  user: MeQuery | undefined;
  isUserloading: boolean;
};

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
      <div
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
      </div>
      <Avatar
        style={{ marginLeft: 10, backgroundColor: token.token.colorPrimary }}
        shape="square"
        icon={<UserOutlined />}
      />
    </div>
  );
};

export default RightNavbarContent;
