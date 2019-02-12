const sdb = require('./StudentDB');
const adb = require('./AdminDB');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({extended: false});

const froms = {
    'JUNIOR_PASSED': 0,
    'JUNIOR_FAILED': 1,
    'JUNIOR_ALL': 2,
    'SENIOR_PASSED': 3,
    'SENIOR_FAILED': 4,
    'SENIOR_ALL': 5
};

const StudentState = {
    'NULL': 0,
    'UNDER_EXAMINED': 1,
    'JUNIOR_PASSED': 2,
    'JUNIOR_FAILED': 3,
    'SENIOR_PASSED': 4,
    'SENIOR_FAILED': 5
};

const LoginErrors = {
    'USER_NOT_EXIST': '-2',
    'PASSWORD_WRONG': '-1',
    'CAPTCHA_WRONG': '0'
};

app.all('*', function (req, res, next) {
    //响应头指定了该响应的资源是否被允许与给定的origin共享。
    // *表示所有域都可以访问，同时可以将*改为指定的url，表示只有指定的url可以访问到资源
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Authorization,Content-Type,Accept");
    //允许请求资源的方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.post('/login/student', jsonParser, async (req, res) => {
    console.log(req.body);
    let emailAddress = req.body.emailAddress;
    let password = req.body.password;
    let captcha = req.body.captcha;
    let result = {
        information: LoginErrors.USER_NOT_EXIST
    };
    let user = await sdb.get(emailAddress);
    user = JSON.parse(user);
    console.log(user);
    if (user != {}) {
        if (user.password === password) {
            if (captcha === '123') {
                result.token = 'TestToken';
                result.information = user.username;
            } else {
                result.information = LoginErrors.CAPTCHA_WRONG;
            }
        } else {
            result.information = LoginErrors.PASSWORD_WRONG;
        }
    }
    res.json(result);
});

app.post('/login/admin', jsonParser, async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let captcha = req.body.captcha;
    let result = {
        information: LoginErrors.USER_NOT_EXIST
    };
    let user = await adb.get(username);
    user = JSON.parse(user);
    if (user != {}) {
        if (user.password === password) {
            if (captcha === '123') {
                result.token = 'TestToken';
                result.information = user.name;
            } else {
                result.information = LoginErrors.CAPTCHA_WRONG;
            }
        } else {
            result.information = LoginErrors.PASSWORD_WRONG;
        }
    }
    res.json(result);
});

app.get('/list/getlist', jsonParser, async (req, res) => {
    let {from, page, name} = req.query;
    let allStudents = await sdb.getAll();
    let actualStudents = [];
    if (from == froms.JUNIOR_ALL) {
        actualStudents = allStudents.filter(user => {
            return !(name && user.username.indexOf(name) === -1) && (user.status === StudentState.JUNIOR_FAILED
                || user.status === StudentState.JUNIOR_PASSED);
        });
    } else if (from == froms.JUNIOR_FAILED) {
        actualStudents = allStudents.filter(user => {
            return !(name && user.username.indexOf(name) === -1) && user.status === StudentState.JUNIOR_FAILED;
        });
    } else if (from == froms.JUNIOR_PASSED) {
        actualStudents = allStudents.filter(user => {
            return !(name && user.username.indexOf(name) === -1) && user.status === StudentState.JUNIOR_PASSED;
        });
    } else if (from == froms.SENIOR_ALL) {
        actualStudents = allStudents.filter(user => {
            return !(name && user.username.indexOf(name) === -1) && (user.status === StudentState.SENIOR_FAILED
                || user.status === StudentState.SENIOR_PASSED);
        });
    } else if (from == froms.SENIOR_FAILED) {
        actualStudents = allStudents.filter(user => {
            return !(name && user.username.indexOf(name) === -1) && user.status === StudentState.SENIOR_FAILED;
        });
    } else if (from == froms.SENIOR_PASSED) {
        actualStudents = allStudents.filter(user => {
            return !(name && user.username.indexOf(name) === -1) && user.status === StudentState.SENIOR_PASSED;
        });
    } else {
        actualStudents = [];
    }
    let total = actualStudents.length;
    let temp = [];
    for (let i = 0; i < total; ++i) {
        temp.push({
            id: actualStudents[i].id,
            name: actualStudents[i].username,
            gender: actualStudents[i].gender,
            score: actualStudents[i].score,
            school: actualStudents[i].highSchool,
            status: actualStudents[i].status
        });
    }
    actualStudents = temp.filter((u, index) => 15 * (page - 1) <= index && index < 15 * page);
    res.json({
        total: total,
        stuList: actualStudents
    });
});

app.post('/list/save', jsonParser, async (req, res) => {
    let paramLength = Object.keys(req.body).length;
    if (paramLength === 2) {//modifyStuStatus
        let ids = req.body.ids;
        let status = req.body.status;
        let result = {
            isSucceed: false
        };
        for (let id of ids) {
            let tempRes = await sdb.updateStatus(id, status);
            result.isSucceed = tempRes;
            if (!tempRes) {
                break;
            }
        }
        res.json(result);
    } else if (paramLength === 3) {//modifyStuInfo
        let id = req.body.id;
        let username = req.body.name;
        let highSchool = req.body.school;
        let result = {
            isSucceed: false
        };
        result.isSucceed = await sdb.updateEdit(id, username, highSchool);
        res.json(result);
    }
});

app.post('/form/download', jsonParser, async (req, res) => {
    console.log(req.body);
    //此处应有下载操作
    let id = req.body.id;
    let username = req.body.name;
    let highSchool = req.body.school;
    let result = {
        isSucceed: false
    };
    result.isSucceed = await sdb.updateEdit(id, username, highSchool);
    res.json(result);
});

app.listen(3000, () => {
    console.log('I\'m listening on port 3000!')
});
