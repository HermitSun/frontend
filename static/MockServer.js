const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/LoginController/login', jsonParser, (req, res) => {
    console.log(req.body);
    let emailAddress = req.body.emailAddress;
    let password = req.body.password;
    let captcha = req.body.captcha;
    let result = {
        isSucceed: false,
        information: '-2'
    };
    for (let user of userInfo) {
        if (user.emailAddress === emailAddress) {
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
    }
    res.json(result);
});

app.listen(3000, () => {
    console.log('I\'m listening on port 3000!')
});

let userInfo = [
    {
        "id": 1,
        "emailAddress": "admin",
        "username": "administrator",
        "password": '123'
    },
    {
        "id": 2,
        "emailAddress": "syl",
        "username": "WenSun",
        "password": '123456'
    },
    {
        "id": 3,
        "emailAddress": "test",
        "username": "tester",
        "password": '456'
    }
];
