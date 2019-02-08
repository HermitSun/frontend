const sdb = require('./StudentDB');
const adb = require('./AdminDB');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({extended: false});

const froms = {
    'NotPass': 0,
    'Pass': 1,
    'All': 2
};

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/login/student', jsonParser, async (req, res) => {
    console.log(req.body);
    let emailAddress = req.body.emailAddress;
    let password = req.body.password;
    let captcha = req.body.captcha;
    let result = {
        isSucceed: false,
        information: '-2'
    };
    let user = await sdb.get(emailAddress);
    user = JSON.parse(user);
    if (user !== {}) {
        if (user.password === password) {
            if (captcha === '123') {
                result.isSucceed = true;
                result.information = user.username;
            } else {
                result.information = '0';
            }
        } else {
            result.information = '-1';
        }
    }
    res.json(result);
});

app.post('/login/admin', jsonParser, async (req, res) => {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    let captcha = req.body.captcha;
    let result = {
        isSucceed: false,
        information: '-2'
    };
    let user = await adb.get(username);
    user = JSON.parse(user);
    if (user !== {}) {
        if (user.password === password) {
            if (captcha === '123') {
                result.isSucceed = true;
                result.information = user.name;
            } else {
                result.information = '0';
            }
        } else {
            result.information = '-1';
        }
    }
    res.json(result);
});

app.get('/list/getlist', jsonParser, async (req, res) => {
    let {from, page, name} = req.query;
    let allStudents = await sdb.getAll();
    let actualStudents = [];
    if (from == froms.All) {
        console.log('enter');
        actualStudents = allStudents.filter(user => {
            return !(name && user.username.indexOf(name) === -1);
        });
    } else if (from == froms.NotPass) {
        actualStudents = allStudents.filter(user => {
            return !(name && user.username.indexOf(name) === -1) && user.status === 0;
        });
    } else if (from == froms.Pass) {
        actualStudents = allStudents.filter(user => {
            return !(name && user.username.indexOf(name) === -1) && user.status === 1;
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
            status: actualStudents[i].status ? '通过' : '未通过'
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
