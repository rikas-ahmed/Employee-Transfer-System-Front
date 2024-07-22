import axios from "axios";

export const RestCaller = axios.create({
    baseURL: 'http://54.236.50.5:3000/api',
    timeout: 1000
});
