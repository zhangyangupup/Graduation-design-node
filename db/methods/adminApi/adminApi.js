let mysql = require('mysql')
let dbConfig = require('../../DBConfig')
let userSQL = require('../../usersql')
let responseJSON = require('../tojson')
let pool = mysql.createPool(dbConfig.mysql)


let adminLogin = function(res,req){
    pool.getConnection(function (err,connection) {
       let param = req.body
       connection.query(userSQL.adminLogin,[param.id,param.password],function (err,result) {
           if(result.length!==0){
                result = {
                    msg: '登陆成功',
                    success: true,
               }
           }else{
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
};

var addAdmin = function (res, req) {
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数  
        var param = req.body;
        // 建立连接 增加一个用户信息 
        connection.query(userSQL.addAdmin, [param.id,param.passWord], function (err, result) {
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


module.exports = { adminLogin ,addAdmin};
