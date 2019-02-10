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
    add: function (username, password, name) {
        openConnection();
        let params = [null, username, password, name];
        let sql = "insert into admininfo values (?,?,?,?);";
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
        let sql = "delete from admininfo where id = ?;";
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log("[REMOVE ERROR] - ", err.message);
                return;
            }
            console.log("remove id=%d success ", id);
        });
        closeConnection();
    },
    update: function (id, username, password, name) {
        openConnection();
        let sql = `update admininfo set username = '${username}',password='${password}',name='${name}' where id = ${id};`;
        connection.query(sql, function (err, result) {
            if (err) {
                console.log("[UPDATE ERROR] - ", err.message);
                return;
            }
            console.log("update success " + result.affectedRows);
        });
        closeConnection();
    },
    get: function (username) {
        return new Promise((resolve, reject) => {
            openConnection();
            let sql = `select * from admininfo where username = '${username}';`;
            connection.query(sql, (err, result) => {
                if (err) {
                    console.log("[GET ERROR] - ", err.message);
                    return '{}';
                }
                resolve(result);
            });
            closeConnection();
        }).then((value) => {
            if (value.length !== 0) {
                let user = {
                    id: value[0].id,
                    username: value[0].username,
                    password: value[0].password,
                    name: value[0].name
                };
                return JSON.stringify(user);
            } else {
                console.log("User Not Found.");
                return JSON.stringify({});
            }
        }, (value) => {
            return value;
        }).catch((err) => {
            console.log(err);
        });
    },
    showAll: function () {
        openConnection();
        let sql = "SELECT * FROM admininfo order by id asc;";
        connection.query(sql, function (err, results) {
            if (err) {
                console.log("[SELECT ERROR] - ", err.message);
                return;
            }
            if (results) {
                for (let i = 0; i < results.length; i++) {
                    console.log("%d\t%s\t%s", results[i].id, results[i].username, results[i].name);
                }
            }
        });
        closeConnection();
    }
};
