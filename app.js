let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
// example api
let indexRouter = require('./routes/index');
// user api
let addUserRouter = require('./routes/userapi')
// classification api
let classificationRouter = require('./routes/modules/classification')
// products api
let productsApi = require('./routes/modules/products')
// history api
let historyApi = require('./routes/modules/history')
// app config api
let appConfigApi = require('./routes/modules/appConfig')
// shopcar config api
let shopCarApi = require('./routes/modules/shopCar.js')
// admin
let adminApi = require('./routes/modules/admin.js')
let app = express();
// 跨域问题头部设置
// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   res.header("Content-Type", "application/json");

//   if (req.method == 'OPTIONS') {
//     res.send(200); /让options请求快速返回/
//   }
//   else {
//     next();
//   }
// });
let allowCrossDomain = function(req, res, next) {
  // 允许的请求源地址
  res.header('Access-Control-Allow-Origin', '*');
  // 允许的请求方式
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  // 访问控制允许凭证
  res.header('Access-Control-Allow-Credentials','true');
  next();
};
app.use(allowCrossDomain);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 模板引擎
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * -------------此处为各一级路由配置板块-------------------
 */
// example router
app.use('/', indexRouter);
// user api router
app.use('/userapi', addUserRouter)
// 分类选项
app.use('/classification', classificationRouter)
// 产品
app.use('/products', productsApi)
// 流程历史
app.use('/history', historyApi)
// app配置项
app.use('/appConfig',appConfigApi)
// 购物车
app.use('/shopcar',shopCarApi)
// 管理端登录
app.use('/admin', adminApi)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/**
 * 二级路由配置模块闭合
 */
module.exports = app;
