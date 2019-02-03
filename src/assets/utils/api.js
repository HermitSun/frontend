import axios from 'axios';

let base = 'http://localhost:3000';

export const adminLogin = params => {
    return axios.post(`${base}/login/admin`, params).then(res => res.data);
};

export const studentLogin = params => {
    return axios.post(`${base}/login/student`, params).then(res => res.data);
};

export const getCaptcha = () => {
    return axios.get(`${base}/login/captcha`).then(res => res.data);
};

export const verifyCode = params => {
    return axios.get(`${base}/email/verification`, params).then(res => res.data);
};

export const sendEmail = params => {
    return axios.post(`${base}/email/send-verification-email`, params).then(res => res.data);
};

export const registerUser = params => {
    return axios.post(`${base}/register/student`, params).then(res => res.data);
};

export const checkStuList = params => {
    return axios.get(`${base}/list/getlist`, params).then(res => res.data);
};

export const checkStuDetail = () => {
    return axios.get(`${base}/list/detail`, params).then(res => res.data);
};

export const setMessage = params => {
    return axios.post(`${base}/message/set`, params).then(res => res.data);
};

export const getMessage = () => {
    return axios.get(`${base}/message/get`).then(res => res.data);
};

export const remind = () => {
    return axios.post(`${base}/email/remind`).then(res => res.data);
};
