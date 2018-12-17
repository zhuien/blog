var mongoose = require('mongoose')
var connStr = 'mongodb://127.0.0.1:27017/article'

// 连接数据库
function _connect (cb) {
  mongoose.connect(connStr, { useNewUrlParser: true }, function (err, client) {
    if (err) {
      console.log('失败')
    } else {
      var db = mongoose.connection
      cb(db)
    }
  })
}

/** *********************插入*******************************/
// 插入一条记录
module.exports.insertOne = function (collection, obj, cb) {
  _connect(function (db) {
    db.collection(collection).insertOne(obj, function (err, results) {
      cb(err, results)
    })
  })
}

// 插入多条记录
/*
 * collection:插入的集合，
 * arr:插入的文档
 * cb:回调函数。通过该函数返回执行的结果
 */
module.exports.insertMany = function (collection, arr, cb) {
  _connect(function (db) {
    db.collection(collection).insertMany(arr, function (err, results) {
      cb(err, results)
    })
  })
}

/** *******************查找**********************************/
// 根据条件查找记录数
module.exports.count = function (collection, whereObj, cb) {
  _connect(function (db) {
    db.collection(collection).count(whereObj).then(function (count) {
      cb(count)
    })
  })
}

/* 查找
 * collection：集合
 * obj:
 * whereObj:条件，默认是{}
 * sortObj:排序，默认是{}
 * limit:显示提定条数,默认是0
 * skip:跳过指定条数，默认是0
 */
module.exports.find = function (collection, obj, cb) {
  // 如果有条件，将条件赋值给obj.whereObj,没有传条件默认为{}
  obj.whereObj = obj.whereObj || {}
  obj.sortObj = obj.sortObj || {}
  obj.limit = obj.limit || 0
  obj.skip = obj.skip || 0
  _connect(function (db) {
    db.collection(collection)
      .find(obj.whereObj)
      .sort(obj.sortObj)
      .limit(obj.limit)
      .skip(obj.skip)
      .toArray(function (err, results) {
        cb(err, results)
      })
  })
}

/** 查找一条记录 */
module.exports.findOne = function (collection, whereObj, cb) {
  _connect(function (db) {
    db.collection(collection).findOne(obj, function (err, results) {
      cb(err, results)
    })
  })
}

// 根据ID来查找记录
module.exports.findOneById = function (collection, id, cb) {
  _connect(function (db) {
    db.collection(collection).findOne({
      _id: mongodb.ObjectId(id)
    }, function (err, results) {
      cb(err, results)
    })
  })
}

/** *******************修改******************************************/
// 根据ID修改一条记录
module.exports.updateOneById = function (collection, id, upObj, cb) {
  _connect(function (db) {
    db.collection(collection).updateOne({
      _id: mongodb.ObjectId(id)
    }, upObj, function (err, results) {
      cb(err, results)
    })
  })
}

// 修改一条记录
module.exports.updateOne = function (collection, whereObj, upObj, cb) {
  _connect(function (db) {
    db.collection(collection).updateOne(whereObj, upObj, function (err, results) {
      cb(err, results)
    })
  })
}

// 修改多条记录
module.exports.updateMany = function (collection, whereObj, upObj, cb) {
  _connect(function (db) {
    db.collection(collection).updateMany(whereObj, upObj, function (err, results) {
      cb(err, results)
    })
  })
}

/** ********************删除**************************************/
// 根据ID来删除一条记录
module.exports.deleteOneById = function (collection, id, cb) {
  _connect(function (db) {
    db.collection(collection).deleteOne({
      _id: mongodb.ObjectId(id)
    }, function (err, results) {
      cb(err, results)
    })
  })
}

// 删除一条记录
module.exports.deleteOne = function (collection, whereObj, cb) {
  _connect(function (db) {
    db.collection(collection).deleteOne(whereObj, function (err, results) {
      cb(err, results)
    })
  })
}
// 删除多条记录
module.exports.deleteMany = function (collection, whereObj, cb) {
  _connect(function (db) {
    db.collection(collection).deleteMany(whereObj, function (err, results) {
      cb(err, results)
    })
  })
}
