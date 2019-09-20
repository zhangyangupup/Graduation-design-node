let express = require('express')
let router = express.Router()
let appConfigApi = require('../../db/methods/appConfigApi/appConfigApi')
// 获取轮播图
router.post('/getBannerImgs',function (req,res,next) {
  appConfigApi.getBannerImgs(res,req)
})

// 更改轮播图
router.post('/updateBannerImg',function (req,res,next) {
  appConfigApi.updateBannerImgs(res,req)
})



module.exports = router