let mysql = require('mysql')
let dbConfig = require('../../DBConfig')
let userSQL = require('../../usersql')
let responseJSON = require('../tojson')
let pool = mysql.createPool(dbConfig.mysql)
// 获取轮播图
let getBannerImgs = function (res,req) {
  pool.getConnection(function (err,connection) {
    let param = req.body
    connection.query(userSQL.getBannerImgs,[],function (err,result) {
       if(result){
         result={
           data:result,
           status:true
         }
       }else{
         result={
           msg:'获取轮播图失败',
           err:err,
           status:false
         }
       }
       responseJSON(res,result)
       connection.release()
    })
  })
}
// 更改轮播图地址
let updateBannerImgs = function (res,req) {
  pool.getConnection(function (err,connection) {
    let param = req.body
    connection.query(userSQL.updateBannerImg,[param.src,param.info, param.imgId],function (err,result) {
       if(result){
         result={
           data:result,
           status:true,
           msg:'更改成功'
         }
       }else{
         result={
           msg:'更改失败',
           err:err,
           status:false
         }
       }
       responseJSON(res,result)
       connection.release()
    })
  })
}


module.exports = { getBannerImgs, updateBannerImgs }