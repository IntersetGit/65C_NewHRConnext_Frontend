import { Divider, } from "antd";
import { GiReceiveMoney } from 'react-icons/gi';

const payslip: React.FC = () => {
    return (
        <>
            <div className="flex text-3xl ml-2 pt-4">
                <GiReceiveMoney />
                <div className="ml-2 text-xl">
                    สลิปเงินเดือน
                </div>
            </div>

            <Divider />
        </>
    )
}
export default payslip;