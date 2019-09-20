var express = require('express')
var router = express.Router()
// 实际处理方法
var productApi = require('../../db/methods/productApi/productApi')
// 所有商品查询
router.post('/allProducts',function (req,res,next) {
  productApi.getAllProducts(res,req)
})
// 通过name查询商品
router.post('/getproductsbyRecommed', function (req,res,next) {
  productApi.getProductInfoByRecommed(res,req)
})
// recommed 获取商品
router.post('/getproductsbyname', function (req,res,next) {
  productApi.getProductInfoByName(res,req)
})
// 模糊查询
router.post('/getproductsbyLike', function (req,res,next) {
  productApi.getProsByLike(res,req)
})
// 增加商品
router.post('/addproduct', function (req,res,next) {
  productApi.addProduct(res,req)
})
// 通过id查询商品
router.post('/getproductsbyid', function (req,res,next) {
  productApi.getProductInfoById(res,req)
})
// 通过class分类查询商品
router.post('/getproductsbyclass', function (req,res,next) {
  productApi.getProductInfoByClass(res,req)
})
// 通过id删除商品
router.post('/deleteproductsbyid', function (req,res,next) {
  productApi.deleteProductInfoById(res,req)
})

// 通过id更新商品信息
router.post('/updateproduct', function (req,res,next) {
  productApi.updateProductInfo(res,req)
})
// 暴露模块
module.exports = router