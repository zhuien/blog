var express = require('express')
const myrouter = require('./router.js')
var router = express.Router()

// 文章
router.get('/getArticles', myrouter.getArticles)
router.get('/getDetail', myrouter.getDetail)
router.get('/getComment', myrouter.getComment)
router.get('/updateArticle', myrouter.updateArticle)
router.get('/insertArticle', myrouter.insertArticle)
router.get('/getArticleCount', myrouter.getArticleCount)
router.post('/getArticles', myrouter.getArticles)
router.post('/getDetail', myrouter.getDetail)
router.post('/getComment', myrouter.getComment)
router.post('/updateArticle', myrouter.updateArticle)
router.post('/insertArticle', myrouter.insertArticle)
router.post('/deleteArticle', myrouter.deleteArticle)
router.post('/getArticleCount', myrouter.getArticleCount)

// 文件上传
router.get('/utilSingle', myrouter.utilSingle, myrouter.utilSingleRes)
router.get('/utilMulterFile', myrouter.utilMulterFile, myrouter.utilMulterFileRes)
router.post('/utilSingle', myrouter.utilSingle, myrouter.utilSingleRes)
router.post('/utilMulterFile', myrouter.utilMulterFile, myrouter.utilMulterFileRes)

// 菜单
router.get('/getMenuList', myrouter.getMenuList)
router.get('/getMenu', myrouter.getMenu)
router.get('/updateMenu', myrouter.updateMenu)
router.get('/insertMenu', myrouter.insertMenu)
router.post('/getMenuList', myrouter.getMenuList)
router.post('/getMenu', myrouter.getMenu)
router.post('/updateMenu', myrouter.updateMenu)
router.post('/insertMenu', myrouter.insertMenu)


module.exports = router
