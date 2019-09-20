let express = require('express')
let router = express.Router()
let adminApi = require('../../db/methods/adminApi/adminApi')
// 管理端登录
router.post('/adminLogin',function (req,res,next) {
    adminApi.adminLogin(res,req)
})

router.post('/addAdmin',function (req,res,next) {
    adminApi.addAdmin(res,req)
})


module.exports = router
