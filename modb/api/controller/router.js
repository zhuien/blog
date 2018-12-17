var articleController = require('./article')
var menuController = require('./menu')
var Utils = require('./utils')

// 文章
exports.getArticles = articleController.getArticles
exports.getDetail = articleController.getDetail
exports.getComment = articleController.getComment
exports.updateArticle = articleController.updateArticle
exports.insertArticle = articleController.insertArticle
exports.deleteArticle = articleController.deleteArticle
exports.getArticleCount = articleController.getArticleCount

// 菜单
exports.getMenuList = menuController.getMenuList
exports.getMenu = menuController.getMenu
exports.updateMenu = menuController.updateMenu
exports.insertMenu = menuController.insertMenu

// 文件上传
exports.utilSingle = Utils.utilSingle
exports.utilSingleRes = Utils.utilSingleRes
exports.utilMulterFile = Utils.utilMulterFile
exports.utilMulterFileRes = Utils.utilMulterFileRes
