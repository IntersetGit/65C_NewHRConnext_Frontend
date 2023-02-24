import axios from 'axios';
import { Cookies } from 'react-cookie';
const reg = new RegExp('(http?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
const url = new URL(import.meta.env.VITE_REST_URL_PATH);

const axiosAdapter = axios.create({
    baseURL: url.href,
    headers: {
        'Content-Type': 'application/json',
    },
    transformRequest: [function (data, headers) {
        const cookies = new Cookies();
        const token = cookies.get('access');
        if (token) {
            headers.Authorization = "Bearer " + token;
        }
        return JSON.stringify(data);
    }],
});


export default axiosAdapter;
