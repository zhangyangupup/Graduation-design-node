// 数据库操作依赖项
var mysql = require('mysql')
// 数据库配置
var dbConfig = require('../../DBConfig')
// 引入抽离的sql语句
var userSQL = require('../../usersql.js')
// 工具函数将数据转json
var responseJSON = require('../tojson.js')
// 创建连接池
var pool = mysql.createPool(dbConfig.mysql)
// get all products
let getAllProducts = function (res,req) {
  pool.getConnection(function (err,connection) {
    // 获取请求参数
    let param = req.body
    // 进行数据库操作
    connection.query(userSQL.getAllProducts, [], function (err,result) {
      // 数据结果二次处理
      let a=[]
        result.forEach((element,index) => {
            if(index>=(param.size*param.page-param.size) && index<(param.size*param.page)){
              a.push(element)
            }
        });
        if(result){
          result={
            data:a,
            msg:'查询成功',
            status:true
          }
        }else{
          result={
            data:[],
            msg:'查询失败，结果为空',
            status:false
          }
        }
        // 转json并返回给前端
         responseJSON(res,result)
        //  断开数据库连接
         connection.release()
    })
  })
}
// get product info by productName
let getProductInfoByName = function (res,req) {
  pool.getConnection(function (err,connection) {
  let param = req.body || req.params
  let searchParam
  let sqlMethod
  // searchByProName
  if(param.methodName==='searchByProTitle'){
    searchParam = `%${param.productName}%`
    sqlMethod = userSQL.getProductName
  }else if(param.methodName==='searchByStoreId'){
    searchParam = `%${param.StoreId}%`
    sqlMethod = userSQL.getProductStoreId
  }else if(param.methodName==='searchByStoreName'){
    searchParam = `%${param.StoreName}%`
    sqlMethod = userSQL.getProductStoreName
  }else if(param.methodName==='searchByPrice'){
    searchParam = `%${param.price}%`
    sqlMethod = userSQL.getProductPrice
  }else if(param.methodName==='searchByProId'){
    searchParam = `%${param.id}%`
    sqlMethod = userSQL.getProductId
  }else if(param.methodName==='searchByClass'){
    searchParam = `${param.Class}`
    sqlMethod = userSQL.getProductClass
  }
  connection.query(sqlMethod, [searchParam],function (err, result) {
    if(result){
      result={
        result:result,
        msg:'查询成功',
        status:true
      }
    }
    if(err){
      result={
        msg:err,
        status:false
      }
    }
    responseJSON(res,result)
    connection.release()
  })
  })
}
// 模糊查询商品
let getProsByLike = function (res,req) {
  pool.getConnection(function (err,connection) {
  let param = req.body || req.params
  let searchStr = `%${param.str}%`
  connection.query(userSQL.getProductLike, [searchStr],function (err, result) {
    if(result){
      result={
        data:result,
        msg:'查询成功',
        status:true
      }
    }
    if(err){
      result={
        msg:err,
        status:false
      }
    }
    responseJSON(res,result)
    connection.release()
  })
  })
}
// add product
let addProduct = function (res, req) {
  pool.getConnection(function (err,connection) {
  let a = req.body || req.params
  connection.query(userSQL.addProduct, [a.proTitle,a.price,a.StoreName,a.ImgSrc1,a.ImgSrc2,a.ImgSrc3,a.id,a.StoreId,a.Class,a.imgSrc,a.isSelf,a.selfTitle,a.isActive,a.activeTitle,a.isSame,a.sameTitle,a.isRecommed],function (err,result) {
    if(result){
      result={
        result:result,
        msg:'增加成功',
        status:true
      }
    }
    if(err){
      result={
        err:err,
        msg:'增加失败',
        status:false
      }
    }
    responseJSON(res,result)
    connection.release()
  })
  })
}

// get product info by productid
let getProductInfoById = function (res,req) {
  pool.getConnection(function (err,connection) {
  let param = req.body || req.params
  let id = `%${param.id}%`
  connection.query(userSQL.getProductId, [id],function (err, result) {
    if(result){
      result={
        result:result,
        msg:'查询成功',
        status:true
      }
    }
    if(err){
      result={
        err:err,
        msg:'查询失败',
        status:false
      }
    }
    responseJSON(res,result)
    connection.release()
  })
  })
}

// get product info by recommed
let getProductInfoByRecommed = function (res,req) {
  pool.getConnection(function (err,connection) {
  let param = req.body || req.params
  connection.query(userSQL.getProductRecommed, [param.recommed],function (err, result) {
    if(result){
      result={
        data:result,
        msg:'查询成功',
        status:true
      }
    }
    if(err){
      result={
        err:err,
        msg:'查询失败',
        status:false
      }
    }
    responseJSON(res,result)
    connection.release()
  })
  })
}
// get product info by class
let getProductInfoByClass = function (res,req) {
  pool.getConnection(function (err,connection) {
  let param = req.body || req.params
  connection.query(userSQL.getProductClass, [param.class],function (err, result) {
    if(result){
      result={
        result:result,
        msg:'查询成功',
        status:true
      }
    }
    if(err){
      result={
        err:err,
        msg:'查询失败',
        status:false
      }
    }
    responseJSON(res,result)
    connection.release()
  })
  })
}

// delete product info by id
let deleteProductInfoById = function (res,req) {
  pool.getConnection(function (err,connection) {
  let param = req.body || req.params
  connection.query(userSQL.deleteProductId, [param.id],function (err, result) {
    if(result){
      result={
        result:result,
        msg:'删除成功',
        status:true
      }
    }
    if(err){
      result={
        err:err,
        msg:'删除失败，不存在此条信息',
        status:false
      }
    }
    responseJSON(res,result)
    connection.release()
  })
  })
}

// update product info
let updateProductInfo = function (res,req) {
  pool.getConnection(function (err,connection) {
  let param = req.body || req.params
  connection.query(userSQL.updateProduct, [param.parductName,param.price,param.storeName,param.storeId,param.id],function (err, result) {
    if(result){
      result={
        result:result,
        msg:'修改成功',
        status:true
      }
    }
    if(err){
      result={
        err:err,
        msg:'修改失败，不存在此条记录',
        status:false
      }
    }
    responseJSON(res,result)
    connection.release()
  })
  })
}



module.exports = { getProductInfoByName,getProsByLike, addProduct,getProductInfoByRecommed, getProductInfoById, getProductInfoByClass, deleteProductInfoById, updateProductInfo, getAllProducts }
