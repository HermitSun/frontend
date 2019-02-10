import axios from 'axios';
import {getToken} from "./token.ts";

axios.defaults.baseURL = 'http://localhost:3000';

axios.interceptors.request.use(config => {
        let token = getToken();
        if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.url = axios.defaults.baseURL + config.url;/*拼接完整请求路径*/
        console.log(config);
        return config;
    },
    err => {
        return Promise.reject(err);
    });

export const adminLogin = (params) => {
    return axios.post('/login/admin', params);
};

export const studentLogin = (params) => {
    return axios.post('/login/student', params);
};

export const getCaptcha = () => {
    return axios.get(`/login/captcha`);
};

export const verifyCode = params => {
    return axios.get(`/email/verification`, {params: params});
};

export const sendEmail = params => {
    return axios.post(`/email/send-verification-email`, params);
};

export const registerUser = params => {
    return axios.post(`/register/student`, params);
};

export const checkStuList = params => {
    return axios.get(`/list/getlist`, {params: params});
};

export const checkStuDetail = () => {
    return axios.get(`/list/detail`);
};

export const setMessage = params => {
    return axios.post(`/message/set`, params);
};

export const getMessage = () => {
    return axios.get(`/message/get`);
};

export const remind = () => {
    return axios.post(`/email/remind`);
};

export const modifyStuInfo = (params) => {
    return axios.post(`/list/save`, params);
};

export const exportSelected = (params) => {
    return axios({
        method: 'post',
        url: `/form/download`,
        data: params,
        responseType: 'blob'
    });
};

export const modifyStuStatus = (params) => {
    return axios.post(`/list/save`, params);
};
