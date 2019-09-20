var mysql = require('mysql');
var dbConfig = require('../../DBConfig');
var userSQL = require('../../usersql');
var responseJSON = require('../tojson');
var pool = mysql.createPool(dbConfig.mysql);
/**
  * @param  {} id
  * @param  {} password
  * @param  {} phoneNumber
*/
// method name
var changePassword = function (res, req) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        // sql method name + params name
        
        connection.query(userSQL.changePwd, [param.passWord, param.id] , function (err, result) {
          // judge method 判断方法 handle the result
            if(result.changedRows>0){
              result={
                isSuccess:true,
                msg:`更改成功，更改条数${result.changedRows}`
              }
            }else{
              result={
                isSuccess:false,
                msg:'没有更改'
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
module.exports = changePassword