
var express = require('express');
var router = express.Router();
var searchClass = require('../../db/methods/classificationApi/classificationApi')
// 分类项查询
router.post('/classifications', function (req,res,next) {
  searchClass.searhClass(res,req)
})

// 分类项增加
router.post('/addClassification', function (req,res,next) {
  searchClass.addClasses(res,req)
})
// 分类删除
router.post('/deleteClass', function (req,res,next) {
  searchClass.deleteClass(res,req)
  // res.send('sasasa')
})
module.exports = router