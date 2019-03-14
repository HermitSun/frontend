import axios from 'axios';
import {getStudentToken, getAdminToken} from "./token.ts";

/*
* @author: Wen Sun
* 全局API
*/

const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'http://47.99.190.101:3141'
    : 'http://localhost:3141';

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use((config) => {
        if (config.url.startsWith('/email')) {
            return config;
        } else {
            let stuToken = getStudentToken();
            let adminToken = getAdminToken();
            if (stuToken) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
                config.headers.Authorization = `Bearer ${stuToken}`;
            } else if (adminToken) {
                config.headers.Authorization = `Bearer ${adminToken}`;
            }
            return config;
        }
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
export const getResultMessage = (params) => {
    return axios.post('/message/resultMessage', params);
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
export const simplifyChar = (params) => {
    return axios.post('/application/simplify_api');
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
// export const allStart = (params) => {
//     return axios.post('/start/start', params)
// };
// 设置邮箱和授权码
export const setAdminEmail = (params) => {
    return axios.post('/email/adminEmailSet', params)
};
export const getAdminEmail = () => {
    return axios.get('/email/preAdmission')
};
// 站内消息（广播）的增删改查和发送
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
    return axios.delete('/message/global_broadcast', params);
};
// 招生专业的增删改查
export const addMajor = (params) => {
    return axios.post('/majorSetting/majorAdding', params);
};
export const deleteMajor = (params) => {
    return axios.post('/majorSetting/majorDeleting', params);
};
export const changeMajor = (params) => {
    return axios.post('/majorSetting/majorUpdate', params);
};
// DDL的设置
export const setDDL = (params) => {
    return axios.post('/DDL/setting', params);
};
export const getDDL = () => {
    return axios.get('/DDL/getting');
};
// 导出与下载
export const exportSelected = () => {
    return axios({
        method: 'post',
        url: '/fileDownload/fileDownload',
        // data: params,
        responseType: 'blob'
    });
};
// 学生审核及通知消息
export const checkStuList = params => {
    return axios.post('/list/acquirement', params);
};
export const updateStudentName = (params) => {
    return axios.post('/updateStudentName/updating', params);
};
export const updateStudentState = (params) => {
    return axios.post('/updateStudentState/updating', params);
};
export const notifyStudent = (params) => {
    return axios.post('/email/hint', params);
};
// 导出
export const createPdf = (params) => {
    return axios.post('/fileDownload/pdfCreation', params);
};
