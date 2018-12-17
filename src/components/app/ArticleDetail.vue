<template>
    <div class="article-detail">
        <el-container v-if="article">
            <div class="header" style="">
                <div class="header-menu" @click="back()">
                    <i class="el-icon-td-fenxiang3"></i>
                </div>
                <div class="header-title">
                    <h1>{{ article.title }}</h1>
                    <div class="subtitle">
                        <span><time>{{ article.ctime }}</time></span>
                        <span><a href="#">{{ article.title }}</a></span>
                        <span><i class="el-icon-td-kanguo"></i>{{ article.views }}</span>
                    </div>
                </div>
            </div>
            <div class="page-container">
                <div class="subtitle">
                    <span><time>{{ article.ctime }}</time></span>
                    &nbsp;-&nbsp;<span><a href="#">{{ article.title }}</a></span>
                    &nbsp;-&nbsp;<span><i class="el-icon-td-kanguo"></i>{{ article.views }}</span>
                </div>
                <div class="detailed">
                    <img :src="article.cover" alt="">
                </div>
                <div class="author">
                    <div class="author-header">
                        <img class="author-header-avatar" :src="article.cover">
                        <div class="author-header-title">{{ article.author }}</div>
                        <div class="author-header-subtitle">作者</div>
                    </div>
                </div>
                <article class="article" v-html="article.content">
                    {{ article.content }}
                </article>
                <div class="foot-info">
                    <el-tabs :tab-position="tabPosition">
                        <el-tab-pane>
                            <span slot="label">&nbsp;&nbsp;&nbsp;<i class="el-icon-td-jingshi"></i> 版权&nbsp;&nbsp;&nbsp;</span>
                            <div>
                                <ul class="list">
                                    <li>
                                        <i class="el-icon-td-kanguo"></i>
                                        <div>著作权归作者所有</div>
                                    </li>
                                </ul>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label">&nbsp;&nbsp;&nbsp;<i class="el-icon-td-xinxi"></i> 信息&nbsp;&nbsp;&nbsp;</span>
                            <div>
                                <ul class="list">
                                    <li><i class="el-icon-td-31wodexuanzhong"></i><div>{{ article.author }}</div></li>
                                    <li><i class="el-icon-td-kanguo"></i><div>{{ article.views }} Views</div></li>
                                    <li><i class="el-icon-td-jifen"></i><div>{{ article.ctime }}</div></li>
                                    <li><i class="el-icon-td-xiugaioryijian"></i><div>最后修改：{{ article.utime }}</div></li>
                                    <li><i class="el-icon-td-huiliuqujiage"></i><div>{{ article.author }}</div></li>
                                </ul>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <el-footer height="80">
                <div class="footer">
                    <p>Copyright © 2018 Tiny-d pig </p>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import {MY_URL} from '../../config'
export default {
    name: 'HelloWorld',
    data() {
        return {
            article: false,
            tabPosition: 'bottom',
            id: "",
        }
    },
    methods: {
        getArticle(){
            var _this = this
            this.axios.post(MY_URL + '/api/getDetail', {
                id: this.$route.params.id
            })
            .then((e) => {
                console.log(e)
                if (e.status == 200 && !!e.data) {
                    e.data.ctime = e.data.ctime.substring(0, 10)
                    e.data.utime = e.data.utime.substring(0, 10)
                    _this.article = e.data
                    _this.getComment()
                }
            })
            .catch((e) => {
                console.log(e)
            })
        },
        getComment(){
            var params = new URLSearchParams();
            params.append('ids', this.article.comment)
            console.log(this.article.comment)
            this.axios.post( MY_URL + '/api/getComment',params)
                .then((e) => {
                    console.log(e.data)
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        back(){
            this.$router.go(-1)
        }
    },
    created() {
        // this.id = this.$route.params.id
        // console.log(this.id)
        this.getArticle()
    },
}
</script>

<style lang="less">
.article-detail {
    .header {
        position: relative;
        -webkit-box-shadow: 1px 3px 10px -4px rgba(0, 0, 0, 0.7);
        box-shadow: 1px 3px 10px -4px rgba(0, 0, 0, 0.7);
        background-color: #019875;
        width: 100%;
        color: #fff;
        background-size: cover;
        height: 360px !important;
        // text-align: center;
        margin-top: -20px;
        font-size: 18px;
        &-menu {
            margin-top: 40px;
            font-size: 24px;
            margin-left: 5px;
        }
        @media screen and (max-width: 750px) {
            max-height: 200px !important;
        }
        &-title {
            max-width: 700px;
            margin: 0 auto;
            margin-top: 50px;
            padding: 0 10px;
            font-size: 16px;
            h1 {
                line-height: 1.1;
                margin: 10px 0;
            }
            .subtitle {
                @media screen and (max-width: 750px) {
                    display: none;
                }
                margin-top: 20px;
                font-size: 14px;
                font-weight: 400;
            }
        }
    }
    .page-container{
        cursor: inherit;
        clear: both;
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        z-index: 2;
        @media screen and (max-width: 750px) {
            margin: 0 10px;
        }
        .subtitle {
            display: none;
            background: white;
            padding: 12px;
            border-radius: 3px;
            width: 100%;
            box-shadow: 0 1px 4px 0 rgba(0,0,0,.16);
            @media screen and (max-width: 750px) {
                display: block;
            }
            margin-top: -20px;
            font-size: 14px;
            font-weight: 400;
            line-height: 16px;
        }
        .detailed {
            max-width: 700px;
            margin: auto;
            background: white;
            text-align: center;
            -webkit-box-shadow: 1px 2px 10px -4px rgba(95, 66, 135, 0.5);
            box-shadow: 1px 2px 10px -4px rgba(95, 66, 135, 0.5);
            padding: 6px;
            margin-top: -120px;
            border-radius: 5px;
            color: #444343;
            overflow: hidden;
            z-index: 2;
            @media screen and (max-width: 750px) {
                display: none;
            }
            img {
                width: 100%;
                min-height: 200px;
                max-height: 240px;
            }
        }
        .author{
            max-width: 700px;
            display: -webkit-flex;
            margin: 0 auto;
            display: flex;
            &-header{
                // position: relative;
                height: 72px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                padding: 16px;
                &-avatar {
                    float: left;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                &-title{
                    display: block;
                    margin-left: 52px;
                    overflow: hidden;
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 20px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    opacity: .87;
                }
                &-subtitle{
                    display: block;
                    margin-left: 52px;
                    overflow: hidden;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 20px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    opacity: .54;
                }
            }
        }
        .article {
            max-width: 700px;
            margin: auto;
            padding: 12px;
            cursor: inherit;
            clear: both;
            position: relative;
            overflow: hidden;
            user-select: none;
            font-size: 20px;
        }
        .foot-info{
            max-width: 700px;
            margin: auto;
            .el-tabs__header{
                margin-top: 0;
                .el-tabs__nav{
                    font-size: .3rem !important;
                }
            }
            .list{
                padding: 4px 0;
                font-size: 14px;
                margin: 0;
                list-style: none;
                background-color: transparent;
                // @media screen and (min-width: 750px) {
                //     font-size: .2rem;
                // }
                li{
                    list-style-type: disc;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                    min-height: 30px;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    padding: 0 16px;
                    text-decoration: none;
                    cursor: pointer;
                    -webkit-transition: background-color .3s cubic-bezier(.4,0,.2,1);
                    transition: background-color .3s cubic-bezier(.4,0,.2,1);
                    -webkit-box-align: center;
                    -webkit-align-items: center;
                    -ms-flex-align: center;
                    align-items: center;
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    div{
                        margin-left: 15px;
                        padding-top: 11px;
                        padding-bottom: 11px;
                        font-size: .25rem;
                        line-height: 18px;
                        font-size: 14px;
                        // @media screen and (min-width: 750px) {
                        //     font-size: .18rem;
                        // }
                    }
                }
            }
        }
    }
    .footer {
        color: dimgray;
        font-size: 12px;
        text-align: center;
    }
}
</style>