
var mysql = require('mysql');
var dbConfig = require('../../DBConfig');
var userSQL = require('../../usersql.js');
var responseJSON = require('../tojson.js')
var pool = mysql.createPool(dbConfig.mysql);

// search classes
let searhClass = function (res,req) {
    pool.getConnection(function (err, connection) {
      let param = req.body || req.params;
      connection.query(userSQL.classification, [param.class], function (err, result) {
         if(result){
           result = result
         }else{
           result = {
             msg:'搜索失败',
             status: false
           }
         }
         if(err){
           result=err
         }
         responseJSON(res, result)
         connection.release()
      })
    })
  }

  // add classes
  let addClasses = function (res,req) {
    pool.getConnection(function (err, connection) {
      let param = req.body
      connection.query(userSQL.insertclass, [param.class, param.id, param.label, param.isShow, param.smallClass], function (err,result) {
        if(result){
          result = {
            msg:result,
            status:true,
            class:param.class,
            id:param.id,
            label:param.label
          }
        }else{
          result = {
            msg:'请求失败',
            status: false
          }
        }
        if(err){
          result={
            msg:err
          }
        }
        responseJSON(res,result)
        connection.release()
      })
    })
  }

  // delete class
  let deleteClass = function (res,req) {
    pool.getConnection(function (err, connection) {
      let param = req.body
      connection.query(userSQL.deleteclass, [param.id], function (err, result) {
        if(result){
          result={
            data:result,
            status:true
          }
          if(err){
            result={
              err:err,
              status:true
            }
          }
          responseJSON(res, result)
          connection.release()
        }
      })      
    })
  }
  module.exports = { addClasses, searhClass, deleteClass }