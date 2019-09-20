let mysql = require('mysql')
let dbConfig = require('../../DBConfig')
let userSQL = require('../../usersql')
let responseJSON = require('../tojson')
let pool = mysql.createPool(dbConfig.mysql)
// 获取购物车
let getShopCar = function (res,req) {
  pool.getConnection(function (err,connection) {
    let param = req.body
    connection.query(userSQL.getShopCar,[param.userId],function (err,result) {
       if(result){
         result={
           data:result,
           status:true
         }
       }else{
         result={
           msg:'获取购物车信息失败',
           err:err,
           status:false
         }
       }
       responseJSON(res,result)
       connection.release()
    })
  })
}
// 增加商品至购物车
let addShopCar = function (res,req) {
  pool.getConnection(function (err,connection) {
    let param = req.body
    connection.query(userSQL.addShopCar,[param.userId, param.productId,param.imgSrc, param.proTitle,param.classKind, param.price,param.isSelected, param.count],function (err,result) {
       if(result){
         result={
           data:result,
           status:true,
           msg:'添加购物车成功'
         }
       }else{
         result={
           msg:'添加购物车失败',
           err:err,
           status:false
         }
       }
       responseJSON(res,result)
       connection.release()
    })
  })
}
// 更新商品数量至购物车
let updateShopCarCount = function (res,req) {
  pool.getConnection(function (err,connection) {
    let param = req.body
    connection.query(userSQL.UpdateShopCarCount,[param.count,param.userId, param.productId],function (err,result) {
       if(result){
         result={
           data:result,
           status:true,
           msg:'更新购物车成功'
         }
       }else{
         result={
           msg:'更新购物车失败',
           err:err,
           status:false
         }
       }
       responseJSON(res,result)
       connection.release()
    })
  })
}
// 删除商品购物车
let deleteShopCar = function (res,req) {
  pool.getConnection(function (err,connection) {
    let param = req.body  
    connection.query(userSQL.deleteShopCar,[param.productId,param.userId],function (err,result) {
       if(result){
         result={
           data:result,
           status:true,
           msg:'操作成功'
         }
       }else{
         result={
           msg:'删除失败',
           err:err,
           status:false
         }
       }
       responseJSON(res,result)
       connection.release()
    })
  })
}

// 增加订单
let addOrder = function (res,req) {
  pool.getConnection(function (err,connection) {
      let param = req.body
      connection.query(userSQL.addOrder,[param.orderId ,param.personId ,param.date ,param.phoneNum ,param.address ,param.count ,param.allPrice ,param.price ,param.logisticsCost, param.status, param.imgSrc, param.proTitle],function (err,result) {
        if(result){
          result={
            data:result,
            status:true,
            msg:'增加订单成功'
          }
        }else{
          result={
            msg:'增加订单失败',
            err:err,
            status:false
          }
        }
        responseJSON(res,result)
        connection.release()
      })   
  })
}
// 查询订单
let searchOrders = function (res,req) {
  pool.getConnection(function (err,connection) {
    let param = req.body
    let method
    if(param.personId!=='' && param.status===''){
      method = userSQL.searchOrders
    }else if(param.status!==''){
      method = userSQL.searchOrdersStatus
    }else{
      method = userSQL.searchAllOrders
    }
    connection.query(method,[param.personId, param.status],function (err,result) {
      if(result){
        result={
          data:result,
          status:true,
          msg:'查询成功'
        }
      }else{
        result={
          msg:'查询失败',
          err:err,
          status:false
        }
      }
      responseJSON(res,result)
      connection.release()
    })
  })
}
// 更新订单状态
let updateOrder = function (res,req) {
  pool.getConnection(function (err,connection) {
    let param = req.body
    let method
    connection.query(userSQL.updateOrder,[param.status, param.orderId,param.personId],function (err,result) {
      if(result){
        result={
          data:result,
          status:true,
          msg:'更新订单状态成功'
        }
      }else{
        result={
          msg:'更新状态失败',
          err:err,
          status:false
        }
      }
      responseJSON(res,result)
      connection.release()
    })
  })
}
// 删除订单
let deleteOrder = function (res,req) {
  pool.getConnection(function (err,connection) {
    let param = req.body
    let method
    connection.query(userSQL.deleteOrder,[param.orderId,param.personId],function (err,result) {
      if(result){
        result={
          data:result,
          status:true,
          msg:'删除订单成功'
        }
      }else{
        result={
          msg:'删除订单失败',
          err:err,
          status:false
        }
      }
      responseJSON(res,result)
      connection.release()
    })
  })
}
module.exports = { getShopCar, addShopCar,addOrder, searchOrders, deleteShopCar,updateOrder,deleteOrder,updateShopCarCount }