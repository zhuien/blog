<template>
    <div class="container">
        <el-main>
            <el-button-group>
                <el-button type="primary" icon="el-icon-edit" @click="insertArticle">新建</el-button>
                <el-button type="primary" icon="el-icon-delete" @click="delAll">删除</el-button>
                <el-button type="primary" icon="el-icon-search" @click="insertArticle">搜索</el-button>
            </el-button-group>
            <el-table max-height="900" :data="article" :row-class-name="tableRowClassName" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column 
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column label="封面">
                    <template slot-scope="scope">
                        <img :src="scope.row.cover" width="60"/>
                    </template>
                </el-table-column>
                <el-table-column
                    label="标题"
                    prop="title">
                </el-table-column>
                <el-table-column
                    label="作者"
                    prop="author">
                </el-table-column>
                <el-table-column
                    label="描述"
                    prop="desc">
                </el-table-column>
                <el-table-column
                    label="修改日期"
                    prop="utime">
                </el-table-column>
                <el-table-column label="操作" align="center" width="220">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-info" @click="detail(scope.row)">查看</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" @click="delOne(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="el-td-pagination" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="limit" layout="prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-main>
    </div>
</template>

<style>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
    .el-td-input {
        width: 350px;
    }
    .el-form-item {
        margin-bottom: 12px;
    }
    .el-td-pagination {
        margin: 20px 0;
        text-align: right;
    }
    .el-td-cover {
        width: 60px;
    }
    .el-td-diacontainer {
        padding: 20px 0;
        border: 0;
        border-radius: 0;
    }
    .el-table .cell{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>

<script>
import {MY_URL} from '../../../config'
import {dateFormat} from '../../../utils/utils'
export default {
  name: 'HelloWorld',
  data() {
    return {
      article: [],
      currentPage: 1,      
      limit: 10,      
      total: 3, 
      checked: [],
      selGood: [],
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.getArticle()
    },
    tableRowClassName ({ row, rowIndex }) {
    },
    detail (row) {
      this.$router.push({
        path: 'detail/' + row._id, 
      })
    },
    edit (row) {
      this.$router.push({
        path: 'articleEdit/' + row._id, 
      })
    },
    delAll () {
        console.log(this.selGood)
        const length = this.selGood.length;
        if (length < 1) {
                this.$message('至少选择一条数据');
            return;
        }
        let ids = '';
        for (let i = 0; i < length; i++) {
            ids += this.selGood[i].gid + (i == length - 1 ? '' : ',');
        }
        var params = new URLSearchParams(),
            status = 2
        params.append('ids', ids);
        params.append('status', status);
        this.$message.success(ids);
        this.deleteArticle(params)
    },
    delOne (row) {
      console.log(row)
      this.$request({
          method: 'post',
          url: MY_URL + '/api/deleteArticle',
          data: {_id: row._id}
      }).then(e => {
        if (e.status == 200) {
            this.$message.success('删除成功')
            this.delArticleById(row._id)
        }
      }).catch(e => {
        this.$message.error('发生错误')
      })
    },
    deleteArticle (params) {
        // this.axios.post(this.goodurl + 'setGoodStat', params)
        //     .then((res) => {
        //         console.log(res.data)
        //         if (res.data.status === 'success') {
        //             this.$message.success(res.data.msg);
        //             this.getGood()
        //             this.selGood = [];
        //         } else {
        //             this.$message.error(res.data.msg);
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         this.$message.error('出错了');
        //         return false;
        //     })
    },
    insertArticle () {
        this.$router.push('/articleSave')
    },
    getArticle(){
      var _this = this
      this.$request({
        method: 'post',
        url: MY_URL + '/api/getArticles',
        data: {page: this.currentPage, limit: this.limit}
      }).then((e) => {
        if (e.status == 200) {
          _this.article = e.data
          _this.currentPage
          _this.dealtime()
        }
      }).catch((e) => {
        console.log(e)
      })
      this.$request({
        method: 'post',
        url: MY_URL + '/api/getArticleCount',
        data: {page: this.currentPage, limit: this.limit}
      }).then((e) => {
        if (e.status == 200) {
          _this.total = e.data.count
        }
      }).catch((e) => {
        console.log(e)
      })
    //   this.$request.all([
    //       _this.$request.post('http://127.0.0.1:3366/api/getArticles', {page: this.currentPage, limit: this.limit}), 
    //       _this.$request.post('http://127.0.0.1:3366/api/getArticleCount')
    //     ])
    //     .then(axios.spread((res1, res2)=>{
    //         console.log(res1)
    //         console.log(res2)
    //         if (e.status == 200) {
    //             _this.article = e.data
    //             _this.currentPage++
    //             _this.dealtime()
    //         }
    //         if (res2.status == 200) {
    //             this.total = res.data.count
    //         }
    //     }))
    },
    dealtime () {
        var _this = this
        this.article.forEach((val, k) => {
            _this.article[k]['ctime'] = dateFormat(val.ctime)
            _this.article[k]['utime'] = dateFormat(val.utime)
        });
    },
    handleSelectionChange (val) {
        console.log(val)
        this.checked = val
        // this.checked = val ? cityOptions : [];
        // this.isIndeterminate = false
    },
    delArticleById (_id) {
        var _this = this
        _this.article.forEach((v, i) => {
            if (v._id == _id) {
                _this.article.splice(i, 1)
            }
        })
    }
  },
  created() {
    this.getArticle();
  }
}
</script>
