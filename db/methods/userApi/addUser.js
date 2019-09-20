/* 注册api */
var mysql = require('mysql');
var dbConfig = require('../../DBConfig');
var userSQL = require('../../usersql');
var responseJSON = require('../tojson')
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据

var query = function (res, req) {
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数  
        var param = req.body;
        // 建立连接 增加一个用户信息 
        connection.query(userSQL.insert, [param.id, param.name, param.age, param.passWord, param.defaultAddress, param.province, param.city, param.detailddress, param.phoneNumber], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '增加成功',
                };
            }else{
                result = {
                    code: -200,
                    msg: '增加失败',
                    reason:'账号已存在 '
                }
            }
            if(err){
                result={
                    err:err
                }
            }
            // 以json形式，把操作结果返回给前台页面     
            responseJSON(res, result);
            // 释放连接  
            connection.release();

        });
    });
}
module.exports = query