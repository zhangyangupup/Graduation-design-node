var mysql = require('mysql');
var dbConfig = require('../../DBConfig');
var userSQL = require('../../usersql');
var responseJSON = require('../tojson');
var pool = mysql.createPool(dbConfig.mysql);
var adminLogin = function (res, req) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        var typeq = typeof (req.body)
        connection.query(userSQL.adminLogin, [param.id, param.password], function (err, result) {
            if (result.length !== 0) {
                result = {
                    msg: '登陆成功',
                    success: true,
                    result:result
                }
            } else {
                result = {
                    msg: '登陆失败,账号或密码错误',
                    success: false,
                    content: result,
                }
            }
            responseJSON(res, result);
            connection.release()
        })
    })
}
module.exports = adminLogin