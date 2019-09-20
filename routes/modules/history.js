let express = require('express')
let router = express.Router()

router.post('/history', function (req,res,next) {
  // let a = JSON.stringify(req)
  res.header({"content-type":"text/html"})
    res.send('<h1>success</h1>')
})

module.exports = router