let mysql = require('mysql');
let connection;

function openConnection() {
    connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '123456789',
        database: 'nodetest'
    })
}

function closeConnection() {
    connection.end();
}

module.exports = {
    add: function (username, emailAddress, password) {
        openConnection();
        let params = [null, username, emailAddress, password];
        let sql = "insert into userinfo values (?,?,?,?);";
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log("[INSERT ERROR] - ", err.message);
                return;
            }
            console.log("insert success, the generated id is:", result.insertId);
        });
        closeConnection();
    },
    remove: function (id) {
        openConnection();
        let params = [id];
        let sql = "delete from userinfo where id = ?;";
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log("[REMOVE ERROR] - ", err.message);
                return;
            }
            console.log("remove id=%d success ", id);
        });
        closeConnection();
    },
    update: function (id, username, emailAddress, password) {
        openConnection();
        let sql = `update userinfo set username = '${username}',emailAddress='${emailAddress}'
        ,password='${password}' where id = ${id};`;
        connection.query(sql, function (err, result) {
            if (err) {
                console.log("[UPDATE ERROR] - ", err.message);
                return;
            }
            console.log("update success " + result.affectedRows);
        });
        closeConnection();
    },
    get: function (emailAddress) {
        return new Promise((resolve, reject) => {
            openConnection();
            let params = [emailAddress];
            let sql = "select * from userinfo where emailAddress = ?;";
            let info = '{}';
            connection.query(sql, params, (err, result) => {
                if (err) {
                    console.log("[GET ERROR] - ", err.message);
                    return;
                }
                if (result.length !== 0) {
                    resolve(result);
                } else {
                    console.log("User Not Found.");
                }
            });
            closeConnection();
        }).then((value) => {
            let user = {
                id: value[0].id,
                emailAddress: value[0].emailAddress,
                username: value[0].username,
                password: value[0].password
            };
            return JSON.stringify(user);
        }, (value) => {
            return value;
        }).catch((err) => {
            console.log(err);
        });
    },
    showAll: function () {
        openConnection();
        let sql = "SELECT * FROM userinfo order by id asc;";
        connection.query(sql, function (err, results) {
            if (err) {
                console.log("[SELECT ERROR] - ", err.message);
                return;
            }
            if (results) {
                for (let i = 0; i < results.length; i++) {
                    console.log("%d\t%s\t%s", results[i].id, results[i].username, results[i].emailAddress);
                }
            }
        });
        closeConnection();
    }
};
