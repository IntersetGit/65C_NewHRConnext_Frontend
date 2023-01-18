import { Divider, theme } from "antd";
import { TbCalendarTime } from "react-icons/tb";

const { useToken } = theme;

const Leavepage: React.FC = () => {
    const token = useToken();

    return (
        <>
            <div className="flex text-2xl ml-2 pt-4">
                <TbCalendarTime size={30} />
                <div className="ml-2 text-lg">ปฏิทินวันหยุด</div>
            </div>
            <Divider style={{ backgroundColor: token.token.colorPrimary }} />
        </>
    )
};

export default Leavepage;
