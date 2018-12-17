<template>
  <div class="app">
    <el-container>
      <el-header class="header" style="">
        <div class="header-menu">
          <el-dropdown>
            <i class="el-icon-td-liebiao"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>更新日志</el-dropdown-item>
              <el-dropdown-item>关于作者</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="header-avatar"><span class="header-avatar-ic"></span></div>
        <p class="header-desc">This is Tiny-d pig blog</p>
        <div class="header-detailed">
          <ul>
            <li>{{ total }}</li>
            <li>0</li>
            <li>0</li>
          </ul>
          <ul>
            <li>文章</li>
            <li>评论</li>
            <li>浏览</li>
          </ul>
        </div>
      </el-header>
      <el-main>
        <article class="article" v-for="item in article" :key="'a' + item._id">
          <div class="article-content">

            <a @click="go(item._id)" v-if="item.cover">
              <div class="article-content-header"><img :src="item.cover"></div>
            </a>

            <h3 class="article-content-title">
              <a @click="go(item._id)">{{ item.title }}</a>
            </h3>

            <div class="article-content-text">
              <p> {{ item.desc }}</p>
            </div>

            <footer class="article-content-footer">
              <div class="">
                <span>
                  <a @click="go(item._id)">深入全文 <i class="el-icon-td-31fanhui2"></i></a>
                </span>
              </div>
            </footer>

          </div>
        </article>
        <el-pagination
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="limit"
          layout="prev, pager, next"
          :total="total"
          class="article-page"
          v-if="article">
        </el-pagination>
        <!-- <div class="article-page el-pagination el-pagination--small">
          <button type="button" disabled="disabled" class="btn-prev"><i class="el-icon el-icon-arrow-left"></i></button>
          <ul class="el-pager"><li class="number active">1</li></ul>
          <button type="button" disabled="disabled" class="btn-next"><i class="el-icon el-icon-arrow-right"></i></button>
        </div> -->
        <div class="footer">
            <p><a href="http://www.miitbeian.gov.cn">粤ICP备18150236号</a></p>
            <p>Copyright © 2018 Tiny-d pig </p>
        </div>
      </el-main>
      <!-- <el-footer height="80" v-if="article">
        <div class="footer">
            <p>Copyright © 2018 Tiny-d pig </p>
        </div>
      </el-footer> -->
    </el-container>
  </div>
</template>

<script>
import {MY_URL} from '../../config'
export default {
  name: 'Home',
  data() {
    return {
      article: [],
      currentPage: 1,
      limit: 4,
      total: 1   
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.getArticle()
    },
    go(id){
      this.$router.push({
        path: 'detail/' + id, 
      })
    },
    getArticle(){
      var _this = this
      this.$request({
        method: 'post',
        url: MY_URL + '/api/getArticles',
        data: {page: this.currentPage}
      }).then((e) => {
        console.log('$request', e.data)
        if (e.status == 200) {
          _this.article = e.data
        }
      }).catch((e) => {
        console.log(e)
      })
      this.$request({
        method: 'post',
        url: MY_URL + '/api/getArticleCount',
        data: {page: this.currentPage}
      }).then((e) => {
        if (e.status == 200) {
          _this.total = e.data.count
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  },
  created() {
    this.getArticle();
  }
}
</script>

<style lang="less">
  .app {
    .el-main::-webkit-scrollbar {
      display: none;
    }
    .el-main{
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
    }
    .header{
      position: relative;
      -webkit-box-shadow: 1px 3px 10px -4px rgba(0, 0, 0, 0.7);
      box-shadow: 1px 3px 10px -4px rgba(0, 0, 0, 0.7);
      background-color: #019875;
      width: 100%;
      color: #fff;
      background-size: cover;
      height: 240px !important;
      // text-align: center;
      margin-top: -20px;
      font-size: 18px;
      &-menu{
        // float: left;
        margin-top: 50px;
        margin-left: 15px;
        font-size: 24px;
        .el-dropdown{
          font-size: 24px;
          color: white;
        }
      }
      &-avatar{
        text-align: center;
        &-ic{
          display: inline-block;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-top: 10px;
          background: url(../../assets/1.jpg) center;
          background-size: cover;
          transition: 2s;
        }
      }
      &-desc{
        text-align: center;
        margin-block-start: .1em;
        margin-block-end: .1em;
      }
      &-detailed{
        max-width: 320px;
        margin: auto;
        background: white;
        text-align: center;
        -webkit-box-shadow: 1px 2px 10px -4px rgba(95, 66, 135, 0.5);
        box-shadow: 1px 2px 10px -4px rgba(95, 66, 135, 0.5);
        padding: 6px 0;
        margin-top: 20px;
        border-radius: 5px;
        ul{
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          display: -webkit-flex;
          display: flex;
          width: 100%;
          li {
            -webkit-flex: 1;
            flex: 1;
            color: #262627;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
          }
        }
      }
    }
    .article {
      margin-top: .3rem;
      cursor: inherit;
      clear: both;
      position: relative;
      overflow: hidden;
      user-select: none;
      &-content{
        max-width: 700px;
        margin: 0 auto 20px;
        padding: 20px 15px;
        transition: all 100ms linear 0s;
        background: white;
        margin: 20px auto;
        -webkit-box-shadow: 1px 2px 10px -4px rgba(95, 66, 135, 0.5);
        box-shadow: 1px 2px 10px -4px rgba(95, 66, 135, 0.5);
        &-header{
          position: relative;
          margin-top: -20px;
          z-index: 1;
          top: 0;
          left: 0;
          overflow: hidden;
          margin-right: -15px;
          margin-left: -15px;
          img{
            width: 100%;
            max-height: 220px;
            transition: all 1s ease-in-out;
            box-shadow: 0 0 0 1px #eee;
          }
          img:hover{
            transform: scale(1.1)
          }
        }
        &-title{
          font-size: 16px;
          @media screen and (max-width: 750px){
            font-size: 20px;
          }
          max-width: 61.8%;
          margin-left: auto;
          margin-right: auto;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          line-height: 1.5;
          color: #111;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          a{
            color: dimgray !important;
          }
        }
        &-text{
          p{
            font-size: 14px;
            color: #424141;
            text-indent: 2em;
            letter-spacing: 1px;
            position: relative;
            line-height: 2em;
            height: 4em;
            overflow: hidden;
            word-break: break-word;
          }
        }
        &-footer{
          margin: 0;
          position: relative;
          div{
            font-size: 13px;
            color: #565656;
            text-transform: capitalize;
            text-align: right;
            a{
              color: #565656;
            }
          }
        }
      }
      &-page{
        text-align: center;
        line-height: 30px;
        margin: 10px 0;
        padding-top: 10px;
        vertical-align: middle;
        li.active {
          background: #019875;
          color: white;
          border-radius: 50%;
          display: inline-block;
        }
      }
    }
    .footer{
      color: dimgray;
      font-size: 12px;
      text-align: center;
    }
  }
</style>