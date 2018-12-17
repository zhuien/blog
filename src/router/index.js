import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../components/app/App.vue'], resolve),
      meta     : { title: '首页' },
      children : [
        {
          path     : '/',
          component: resolve => require(['../components/app/Home.vue'], resolve),
          meta     : { title: '首页' }
        },
        {
          path     : '/detail/:id',
          component: resolve => require(['../components/app/ArticleDetail.vue'], resolve),
          meta     : { title: '文章详情' }
        },
        {
          path     : '/about',
          component: resolve => require(['../components/app/About.vue'], resolve),
          meta     : { title: '更新日志' }
        },
      ]
    },
    {
      path    : '/Home',
      redirect: '/articleList'
    },
    {
      path: '/Home',
      component: resolve => require(['../components/admin/home/Home.vue'], resolve),
      meta     : { title: '后台管理' },
      children : [
        {
          path     : '/articleList',
          component: resolve => require(['../components/admin/article/articleList.vue'], resolve),
          meta     : { title: '文章列表' }
        },
        {
          path     : '/articleEdit/:id',
          component: resolve => require(['../components/admin/article/ArticleEdit.vue'], resolve),
          meta     : { title: '修改文章' }
        },
        {
          path     : '/articleSave',
          component: resolve => require(['../components/admin/article/ArticleSave.vue'], resolve),
          meta     : { title: '新建文章' }
        },
      ]
    },
    
  ]
})
