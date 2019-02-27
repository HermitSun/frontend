import axios from 'axios';
import {getToken} from "./token.ts";

axios.defaults.baseURL = 'http://localhost:3141';
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

//在API文件中
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    let config = err.config;
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(err);

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }

    // Increase the retry count
    config.__retryCount += 1;

    // Create new promise to handle exponential backoff
    let backoff = new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, config.retryDelay || 1);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function () {
        return axios(config);
    });
});

axios.interceptors.request.use(config => {
        // let token = getToken();
        // if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        config.url = axios.defaults.baseURL + config.url;/*拼接完整请求路径*/
        // console.log(config);
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// 登錄註冊
export const login = (params) => {
    return axios.post('/auth', params);
};
export const verifyCode = params => {
    return axios.get(`/email/verification`, {params: params});
};
export const sendVerifyEmail = () => {
    return axios.get(`/email/captchaDelivery`);
};
export const registerUser = params => {
    return axios.post(`/register/`, params);
};

// 申請表
export const getBasicInfo = () => {
    return axios.get('/application/basicInfo');
};
export const sendApplication = (params) => {
    return axios.post('/application/form', params);
};
export const saveApplication = (params) => {
    return axios.post('', params);
};
export const getApplication = (params) => {
    return axios.get('', params);
};

// 管理員
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
