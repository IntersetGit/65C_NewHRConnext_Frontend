import { createBrowserRouter } from 'react-router-dom';
import Layouts from '../components/layouts';

/**
 * ? Components
 */
import CompanyLocation from '../pages/Company/location';
import Home from '../pages/Home';
import Companyroot from '../pages/Company';
import CompanyStructure from '../pages/Company/structure';
import CompanyPosition from '../pages/Company/position';
import Login from '../pages/Login';
import Register from '../pages/Register';
import LoadingSpinner from '../components/loading-spinner';

/**
 * ?Import icons
 */
import { RiHotelLine , RiFolder2Line , RiChatHistoryLine , RiHome2Line } from "react-icons/ri";



export type RoutingType = {
    path : string;
    element : JSX.Element;
    icon? : JSX.Element;
    label? : string;
    key? : string | number;
    hideInmenu? : boolean;
    children? : RoutingType[];
}

export const routing : RoutingType[] = [
    {
        path : '/',
        element : <Layouts/>,
        children : [
            {
                path : '/',
                label : 'หน้าแรก',
                icon : <RiHome2Line/>,
                element : <Home/>
            },
            {
                path : '/company',
                label : 'บริษัท',
                icon : <RiHotelLine/>,
                element : <Companyroot/>,
                children : [
                    {
                        path : '/company/location',
                        label : 'ข้อมูลบริษัท',
                        icon : <RiFolder2Line/>,
                        element : <CompanyLocation/> 
                    },
                    {
                        path : '/company/structure',
                        label : 'ที่ตั้งบริษัท',
                        hideInmenu : true,
                        element : <CompanyStructure/> 
                    },
                    {
                        path : '/company/position',
                        label : 'ที่ตั้งบริษัท',
                        hideInmenu : true,
                        element : <CompanyPosition/> 
                    },
                    {
                        path : '/company/holiday',
                        label : 'วันหยุด',
                        icon : <RiChatHistoryLine/>,
                        element : <CompanyLocation/> 
                    }
                ]
            },
        ]
    },
    {
        path : '/auth',
        element : <Login/>
    },
    {
        path : '/register',
        element : <Register/>
    }
]

const router = createBrowserRouter(routing);
export default router