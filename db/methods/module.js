var mysql = require('mysql');
var dbConfig = require('../../DBConfig');
var userSQL = require('../../usersql');
var responseJSON = require('../tojson');
var pool = mysql.createPool(dbConfig.mysql);
// method name
var exampleMethod = function (res, req) {
    pool.getConnection(function (err, connection) {
        var param = req.body || req.params;
        // sql method name + params name
        connection.query(userSQL.login, [param.id, param.password], function (err, result) {
          // judge method 判断方法 handle the result
            if (result.length !== 0) {
                result = {
                    msg: '登陆成功',

                }
            } else {
                result = {
                    msg: '登陆失败',

                }
            }
          // handle the result to Json and push in response
            responseJSON(res, result);
            // disconnect the mySQL pool
            connection.release()
        })
    })
}
// export the method
module.exports = exampleMethod