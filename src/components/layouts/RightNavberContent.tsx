import { UserOutlined } from '@ant-design/icons';
import { Avatar, Typography } from 'antd';

const RightNavbarContent: React.FC = () => {
  return (
    <div style={{ paddingRight: 10 }}>
      <Avatar
        style={{ marginRight: 2 }}
        shape="square"
        icon={<UserOutlined />}
      />
      <Typography.Text>Wongsathorn kanno</Typography.Text>
    </div>
  );
};

export default RightNavbarContent;
