import { Tabs } from 'antd';
import { generatePath, Outlet, useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Managerights: React.FC = () => {
    const navigate = useNavigate();
    let { companycode } = useParams();

    const onChange = (key: string) => {
        navigate(generatePath(key, { companycode }));
    };

    return (
        <>
            <Tabs
                defaultActiveKey="/:companycode/managerights"
                className="right-tab"
                onChange={onChange}
                items={[
                    {
                        label: `จัดการสิทธิ์การใช้งาน`,
                        key: '/:companycode/managerights',
                    },
                    {
                        label: `จัดการกลุ่มผู้ใช้งาน`,
                        key: '/:companycode/managerights/usergroups',
                    },
                ]}
            />
            <Outlet />
        </>
    );
};

export default Managerights;
