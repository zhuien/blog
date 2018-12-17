var objectId = require('mongodb').ObjectId;
const db = require('./db.js')
var URL = require('url')
var sd = require('silly-datetime')
var objToJson = require('../utils/common')

exports.getMenuList = (req, res, next) => {
  var params = JSON.stringify(req.query) === '{}' ? req.body : req.query
  db.find({}).then(results => {
    res.send(results)
  }).catch(err => {
    res.send(err)
  })
}

exports.getMenu = (req, res, next) => {
  var params = JSON.stringify(req.query) === '{}' ? req.body : req.query
  db.findById(params.id)
    .then(results => { res.send(results) })
    .catch(err => {
      res.send(err)
    })
}

exports.updateMenu = (req, res, next) => {
  var params = JSON.stringify(req.query) === '{}' ? req.body : req.query
  if (!!params._id) {
    var whereObj = {_id: params._id}
    var upObj = params
    delete upObj['_id']
    db.updateOne(whereObj, upObj).then(result => {
      JSON.stringify(results) === '{}' ? objToJson('修改成功') : results
      res.send(results)
    }).catch(err => {
      res.send(err)
    })
  } else {
    res.send('Illegal access')
  }
}

exports.insertMenu = (req, res, next) => {
  var params = JSON.stringify(req.query) === '{}' ? req.body : req.query
  var obj = params;
  if (!!obj) {
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
}