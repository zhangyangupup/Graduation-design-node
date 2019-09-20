let express = require('express')
let router = express.Router()
let shopCarApi = require('../../db/methods/shopCarApi/shopCarApi')
// 获取购物车商品
router.post('/getShopCar',function (req,res,next) {
  shopCarApi.getShopCar(res,req)
})

// 增加商品至购物车
router.post('/addShopCar',function (req,res,next) {
  shopCarApi.addShopCar(res,req)
})
// 更新购物车商品数量
router.post('/updateShopCarCount',function (req,res,next) {
  shopCarApi.updateShopCarCount(res,req)
})
// 删除购物车商品
router.post('/deleteShopCar',function (req,res,next) {
  shopCarApi.deleteShopCar(res,req)
})
// 增加订单
router.post('/addOrder',function (req,res,next) {
  shopCarApi.addOrder(res,req)
})
// 查询订单
router.post('/searchOrders',function (req,res,next) {
  shopCarApi.searchOrders(res,req)
})
// 更新订单状态
router.post('/updateOrderStatus',function (req,res,next) {
  shopCarApi.updateOrder(res,req)
})
// 删除订单
router.post('/deleteOrder',function (req,res,next) {
  shopCarApi.deleteOrder(res,req)
})
module.exports = router