
<template>
    <el-main class="form" :prop="prop">
        <el-form ref="form" :model="article" label-width="80px">
            <el-form-item label="文章名称">
                <el-input v-model="article.title" clearable class="form-input"></el-input>
            </el-form-item>
            <el-form-item label="作者">
                <el-input v-model="article.author" clearable class="form-input"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="article.desc" clearable class="form-input"></el-input>
            </el-form-item>
            <el-form-item label="封面">
                <el-upload
                    class="upload"
                    :on-change="uploadChange"
                    :action="uploadcfg.uplink"
                    :file-list="fileList"
                    list-type="picture"
                    :multiple="false"
                    :limit="uploadcfg.filelimit">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="article.sort" :min="0" label="sort"></el-input-number>
            </el-form-item>
            
            <el-form-item label="文章内容">
                <div id="editor"></div>
            </el-form-item>
            <el-form-item size="large">
                <el-button type="primary" @click="onSubmit">立即提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>
<script>
import {MY_URL} from '../../../config'
import E from 'wangeditor'

export default {
    name: "Eleditor",
    props: {
      prop: {
        type: String,
        default: ''
      },
    },
    data() {
        return {
            article: {
                title: '',
                desc: '',
                author: '',
                cover: '',
                sort: 0,
                content: '',
            },
            uploadcfg: {
                uplink: MY_URL + '/api/utilSingle',
                filelimit: 1
            },
            fileList: [],
            editor: null,
        }
    },
    methods: {
        initEditor() {
            this.editor = new E('#editor')
            this.editor.customConfig.onchange = (html) => {
                this.article.content = html
            }
            this.editor.create()
        },
        getContent() {
            alert(this.article.content)
        },
        onSubmit() {
            console.log(this.article)
            console.log(this.fileList)
            // return;
            var _this = this
            var url = !!_this.$route.params.id ? (MY_URL + '/api/updateArticle') : (MY_URL + '/api/insertArticle')
            this.$request({
                method: 'post',
                url: url,
                data: this.article
            }).then(e => {
                console.log(e)
                if (e.status == 200) {
                    var msg = !!_this.$route.params.id ? "修改文章成功" : "新建文章成功"
                    _this.$message({
                        message: msg,
                        type: 'success'
                    });
                }
            }).catch(e => {
                console.log(e)
            })
        },
        uploadChange(file, fileList){
            this.fileList = fileList
            this.article.cover = fileList[0].destination + fileList[0].filename
        },
        getArticle(){
            var _this = this
            if (!!this.$route.params.id) {
                this.axios.post(MY_URL + '/api/getDetail', {
                    id: this.$route.params.id
                })
                .then((e) => {
                    console.log(e)
                    if (e.status == 200 && !!e.data) {
                        _this.article = e.data
                        _this.fileList = [{name: e.data.covername, url: e.data.cover}]
                        _this.editor.txt.html(e.data.content)
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
            }
        }
    },
    mounted() {
        this.initEditor()
    },
    created() {
        this.getArticle()
    }
} 
</script>

<style lang="less" scoped>
.form{
    max-width: 900px;
    margin: auto;
    &-input{
        max-width: 400px;
    }
}
</style>