var mongoose = require('mongoose')

var connStr = 'mongodb://127.0.0.1:27017/article'
const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000
}

mongoose.connect(connStr, options)
var db = mongoose.connection

db.on('error', console.error.bind(console, '连接数据库失败'));
db.once('open',()=>{
    //成功连接
    console.log('成功连接')
})
module.exports = db
