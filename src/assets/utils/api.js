import axios from 'axios';

let base = 'http://localhost:3000';

export const adminLogin = (params, token) => {
    return axios({
        method: 'post',
        url: `${base}/login/admin`,
        data: params,
        headers: {
            "Authorization": "Bearer " + token
        }
    });
};

export const studentLogin = (params, token) => {
    return axios({
        method: 'post',
        url: `${base}/login/student`,
        data: params,
        headers: {
            "Authorization": "Bearer " + token
        }
    });
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
    return axios({
        method: 'post',
        url: `${base}/form/download`,
        data: params,
        responseType: 'blob'
    });
};

export const modifyStuStatus = (params) => {
    return axios.post(`${base}/list/save`, params);
};
