import axios from "axios";

export const RestCaller = axios.create({
    baseURL: 'http://3.230.143.246:3000/api',
    timeout: 1000
});
