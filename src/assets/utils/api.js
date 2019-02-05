import axios from 'axios';

let base = 'http://localhost:3000';

export const adminLogin = params => {
    return axios.post(`${base}/login/admin`, params);
};

export const studentLogin = params => {
    return axios.post(`${base}/login/student`, params);
};

export const getCaptcha = () => {
    return axios.get(`${base}/login/captcha`);
};

export const verifyCode = params => {
    return axios.get(`${base}/email/verification`, {params: params});
};

export const sendEmail = params => {
    return axios.post(`${base}/email/send-verification-email`, params);
};

export const registerUser = params => {
    return axios.post(`${base}/register/student`, params);
};

export const checkStuList = params => {
    return axios.get(`${base}/list/getlist`, {params: params});
};

export const checkStuDetail = () => {
    return axios.get(`${base}/list/detail`);
};

export const setMessage = params => {
    return axios.post(`${base}/message/set`, params);
};

export const getMessage = () => {
    return axios.get(`${base}/message/get`);
};

export const remind = () => {
    return axios.post(`${base}/email/remind`);
};

export const modifyStuInfo = (params) => {
    return axios.post(`${base}/list/save`, params);
};

export const exportSelected = (params) => {
    return axios.post(`${base}/form/download`, params);
};
