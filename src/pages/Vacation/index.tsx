import { Tabs, theme } from 'antd';
import { generatePath, Outlet, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const { useToken } = theme;

const VacationHome: React.FC = () => {
    const navigate = useNavigate();
    const token = useToken();
    let { companycode } = useParams();

    const onChange = (key: string) => {
        navigate(generatePath(key, { companycode }));
    };

    return (
        <>
            <Tabs
                defaultActiveKey="/:companycode/vacation"
                className="right-tab"
                onChange={onChange}
                items={[
                    {
                        label: `ปฏิทินวันหยุด`,
                        key: '/:companycode/vacation',
                    },
                    {
                        label: `การลา`,
                        key: '/:companycode/vacation/Leave',
                    },
                ]}
            />
            <Outlet />
        </>
    )
};

export default VacationHome;
