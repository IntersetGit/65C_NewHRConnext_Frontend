import { theme } from 'antd';

import icon from '../../assets/icon.png';
import spinner from '../../assets/loadspinner.svg';

const { useToken } = theme;

type LoadingSpinnerType = {
  loadingtext?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerType> = ({ loadingtext }) => {
  const token = useToken();
  return (
    <div
      style={{
        backgroundColor: token.token.colorBgBase,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={icon} width={100} />
      <img src={spinner} width={60} />
      <p>{loadingtext ? loadingtext : 'กำลังโหลดข้อมูล'}</p>
    </div>
  );
};

export default LoadingSpinner;
