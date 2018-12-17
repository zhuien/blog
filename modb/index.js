var bodyParser = require('body-parser')
var express = require('express')
var api = require('./api')
var app = express()
/** */
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,X-token");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
});

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api', api)

app.listen(3366, () => {
  console.log('3366')
})
