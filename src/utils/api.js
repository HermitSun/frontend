import axios from 'axios';
import {getStudentToken, getAdminToken} from "./token.ts";

const BASE_URL = 'http://localhost:3141';

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use((config) => {
        let stuToken = getStudentToken();
        let adminToken = getAdminToken();
        if (stuToken) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `Bearer ${stuToken}`;
        } else if (adminToken) {
            config.headers.Authorization = `Bearer ${adminToken}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    });

// 登錄註冊
export const login = (params) => {
    return axios.post('/auth', params);
};
export const verifyCode = params => {
    return axios.get(`/email/verification`, {params: params});
};
export const registerUser = params => {
    return axios.post(`/register/`, params);
};
export const sendVerifyEmail = (params) => {
    return axios.post('/email/send-verification-email', params);
};
export const resetPassword = (params) => {
    return axios.post('/email/verification', params)
};

// 消息
export const studentGetMessage = () => {
    return axios.get('/message/');
};

// 申請表
export const getBasicInfo = () => {
    return axios.get('/application/form');
};
export const sendApplication = (params) => {
    return axios.post('/application/form', params);
};
export const getMajors = () => {
    return axios.get('/majorSetting/majorGetting');
};
export const getApplicationStatus = () => {
    return axios.post('/application/form_check');
};

// 附件
export const sendAttachment = (data, header) => {
    return axios.post('/application/attachment', data, header);
};
export const checkAttachmentUpload = (params) => {
    return axios.post('/application/attachment_check', params);
};
export const getAttachmentNames = () => {
    return axios.get('/application/attachment_names');
};

// 管理員
export const allStart = (params) => {
    return axios.post('/start/start', params)
};
export const setAdminEmail = (params) => {
    return axios.post('/email/adminEmailSet', params)
};
export const getAdminEmail = () => {
    return axios.get('/email/preAdmission')
};
export const adminGetMessage = () => {
    return axios.get('/message/released_broadcast');
};
export const adminSendMessage = (params) => {
    return axios.post('/message/global_broadcast', params);
};
export const adminUpdateMessage = (params) => {
    return axios.put('/message/global_broadcast', params);
};
export const adminDeleteMessage = (params) => {
    return axios.delete('/message/global_broadcast', {params: params});
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
