import axios from 'axios';
import { baseURL } from '../config';


async function PostAPIWithoutHeader(endpoint,body)
{
    try{
        let data = await axios.post(`${baseURL}${endpoint}`, body)
        return { error: false, data: data };
    }
    catch (error) {
        return { error: true, data: error.response };
    }
}

const dataServices = {
    PostAPIWithoutHeader
};

export default dataServices;