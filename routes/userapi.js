let express = require('express');
let router = express.Router();
// require new method
let addUser = require('../db/methods/userApi/addUser')
let login = require('../db/methods/userApi/login')
let querySearch = require('../db/methods/userApi/searchMethod')
let changePwd = require('../db/methods/userApi/changePwd')
let searchAll = require('../db/methods/userApi/searchAll')
let adminLogin = require('../db/methods/userApi/adminLogin')
// 添加用户
router.post('/addUser', function (req, res, next) {
    addUser(res, req)
});
// 查询用户
router.post('/searchUser', function (req, res, next) {
    querySearch(res,req)
})
router.post('/login', function (req, res, next) {
    login(res, req)
});
router.post('/changePwd',function (req,res,next) {
    changePwd(res,req)
})
router.post('/searchAll',function (req,res,next) {
    searchAll(res,req)
})
router.post('/adminLogin',function (req,res,next) {
    adminLogin(res,req)
})
module.exports = router;