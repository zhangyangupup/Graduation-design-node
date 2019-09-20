var mysql = require('mysql');
var dbConfig = require('../../DBConfig');
var userSQL = require('../../usersql');
var responseJSON = require('../tojson');
var pool = mysql.createPool(dbConfig.mysql);
var login = function (res, req) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        var typeq = typeof (req.body)
        connection.query(userSQL.login, [param.id, param.password], function (err, result) {
            if (result.length !== 0) {
                result = {
                    msg: '登陆成功',
                    success: true,
                    name: result[0].name,
                    id:result[0].id,
                    defaultAddress: result[0].defaultAddress,
                    province: result[0].province,
                    city: result[0].city,
                    detailddress: result[0].detailddress,
                    phoneNumber: result[0].phoneNumber
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
module.exports = login