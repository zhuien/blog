var objectId = require('mongodb').ObjectId;
const db = require('./db.js')
var URL = require('url')
var sd = require('silly-datetime')
var objToJson = require('../utils/common')

/********************* 查s ******************/
// 分页获取文章
exports.getArticles = (req, res, next) => {
  var params = JSON.stringify(req.query) === '{}' ? req.body : req.query
  var where = {}
  where.limit = params.limit ? parseInt(params.limit) : 4
  where.skip = where.limit * ((params.page ? params.page : 1) - 1)
  console.log(where)
  db.find({}, null, where)
    .then(results => {
      res.send(results)
    })
    .catch(err => {
      res.send(err)
    })
}

exports.getArticleCount = (req, res, next) => {
  var params = JSON.stringify(req.query) === '{}' ? req.body : req.query
  var where = {}
  db.estimatedDocumentCount({}).then(result => {
    res.send(result)
  }).catch(err => {
    res.send('err')
  })
}

// 根据 {_id} 获取文章详情
exports.getDetail = (req, res, next) => {
  var params = JSON.stringify(req.query) === '{}' ? req.body : req.query
  console.log(params.id)

  db.findById(params.id)
    .then(results => { res.send(results) })
    .catch(err => {
      res.send(err)
    })

}

// 根据 {_id} 获取评论
exports.getComment = (req, res, next) => {
  var params = JSON.stringify(req.query) === '{}' ? req.body : req.query
  console.log(params)
  if (!!params.ids) {
    var id = params.ids.split(',')
    id.forEach(function (v, k) {
      id[k] = objectId(v)
    })
    console.log(id)
    db.find('comment', {whereObj: {_id: {'$in': id}}}, (err, results) => {
      if (err) {
        res.send('err')
      } else {
        // res.send('res')
        res.send(results)
      }
    })
  } else {
    res.send('Illegal access')
  }
}

/********************* 查e ******************/

/********************* 改s ******************/
exports.updateArticle = (req, res, next) => {
  var params = JSON.stringify(req.query) === '{}' ? req.body : req.query
  if (!!params._id) {
    var whereObj = {_id: params._id}
    var upObj = params
    delete upObj['_id']
    upObj['utime'] = (new Date).toISOString()
    console.log(upObj)
    db.updateOne(whereObj, upObj).then(results => {
      res.send(results)
    }).catch(err => {
      res.send(err)
    })
  } else {
    res.send('Illegal access')
  }
}
/********************* 改e ******************/

/********************* 增s ******************/
exports.insertArticle = (req, res, next) => {
  var params = JSON.stringify(req.query) === '{}' ? req.body : req.query
  var obj = params;
  if (!!obj) {
    obj.cover = req.hostname + '/' + obj.cover
    db.save(obj)
      .then(results => {
        res.send(results);
      })
      .catch(err => {
        res.send(err)
      })
  } else {
    res.send('');
  }
};
/********************* 增e ******************/

/********************* 删s ******************/
exports.deleteArticle = (req, res, next) => {
  var params = JSON.stringify(req.query) === '{}' ? req.body : req.query
  if (!!params._id) {
    var obj = {_id: objectId(params._id)};
    db.remove(obj)
      .then(results => {
        // results = JSON.stringify(results) === '{}' ? objToJson('删除成功') : results
        res.send(results);
      })
      .catch(err => {
        res.send(err)
      })
  } else {
    res.send('');
  }
};
/********************* 删e ******************/
