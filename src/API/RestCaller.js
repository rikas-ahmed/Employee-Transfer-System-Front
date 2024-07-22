import axios from "axios";

export const RestCaller = axios.create({
    baseURL: 'http://52.91.222.78:3000/api',
    timeout: 1000
});
