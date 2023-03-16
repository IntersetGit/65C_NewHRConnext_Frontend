import Swal from 'sweetalert2';
import logo from '../assets/HR logo.png';
import marklight from '../assets/auth-v2-login-mask-light.png';

const ResetPassword: React.FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <img
                src={logo}
                style={{ position: 'absolute', left: 10, width: 50, top: 10 }}
            />
            <img
                src={marklight}
                style={{ position: 'absolute', bottom: 40, width: 1200, right: 0 }}
            />
        </div>
    )
}
export default ResetPassword;