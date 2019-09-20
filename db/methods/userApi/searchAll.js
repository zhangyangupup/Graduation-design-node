var mysql = require('mysql');
var dbConfig = require('../../DBConfig');
var userSQL = require('../../usersql');
var responseJSON = require('../tojson');
var pool = mysql.createPool(dbConfig.mysql);
// method name
var searchAll = function (res, req) {
    pool.getConnection(function (err, connection) {
        var param = req.body || req.params;
        // sql method name + params name
        connection.query(userSQL.getUser, [], function (err, result) {
          // judge method 判断方法 handle the result
            if (result.length !== 0) {
                result = {
                    data:result,
                    isSuccess:true,
                    length:result.length

                }
            } else if(result.length==0){
                result = {
                    msg: '不存在用户',
                }
            }else{
                result = {
                    msg:'查询失败，没有进行数据库查询'
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
module.exports = searchAll