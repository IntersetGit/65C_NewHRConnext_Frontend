import { UserOutlined } from '@ant-design/icons';
import { Avatar, Typography } from 'antd';
import { MeQuery } from '../../__generated__/graphql';

type RightNavContentType = {
  user: MeQuery | undefined;
};

const RightNavbarContent: React.FC<RightNavContentType> = ({ user }) => {
  return (
    <div style={{ paddingRight: 10 }}>
      <Avatar
        style={{ marginRight: 2 }}
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
