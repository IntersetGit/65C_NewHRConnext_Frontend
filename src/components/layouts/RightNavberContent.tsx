import { UserOutlined } from '@ant-design/icons';
import { Avatar, theme, Typography } from 'antd';
import { MeQuery } from '../../__generated__/graphql';

const { useToken } = theme;

type RightNavContentType = {
  user: MeQuery | undefined;
};

const RightNavbarContent: React.FC<RightNavContentType> = ({ user }) => {
  const token = useToken();
  return (
    <div style={{ paddingRight: 10 }}>
      <Avatar
        style={{ marginRight: 2, backgroundColor: token.token.colorPrimary }}
        shape="square"
        icon={<UserOutlined />}
      />
      <Typography.Text>
        {user?.me?.profile?.firstname} {user?.me?.profile?.lastname}
      </Typography.Text>
    </div>
  );
};

export default RightNavbarContent;
