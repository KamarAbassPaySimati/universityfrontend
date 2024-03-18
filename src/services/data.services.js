import axios from 'axios';
import { baseURL } from '../config';


async function PostAPIWithoutHeader(endpoint,body)
{
    try{
        let url = `${baseURL}${endpoint}`;
        console.log("URL:", url); // Print the URL
        let data = await axios.post(url, body);
        console.log("body:", body)
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