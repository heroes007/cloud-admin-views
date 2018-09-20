<template>
  <div>
    <el-table
      :data="tableData"
      :stripe="true"
      style="width: 100%">
      <el-table-column
        label="图书"
        width="180">.
        <template slot-scope="scope">
          <img :src="scope.row.img" class="user-avatar">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="题目"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="160">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="描述"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteBook(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block page">
      <el-pagination
        @current-change="changepage"
        :total="100"
        :page-size="5">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
      name: "book-list",
      data(){
        return{
          tableData:[],
          count:0,
          pn:""
        }
      },
      methods:{
        getBook(){
          this.$axios.get('/book',{pn:this.pn,size:5}).then(res=>{
            this.count = res.count
            this.tableData = res.data
            console.log(res)
          })
        },
        deleteBook(scope){
          console.log(scope)
          this.$axios.delete(`/book/${scope._id}`).then(res=>{
            console.log(res)
          })
        },
        handleEdit(scope){
          this.$router.push(`alterBook?id=${scope._id}`)
        },
        changepage(event){
          this.pn = event
          this.getBook()
        }
      },
    created(){
      this.getBook()
    }
  }
</script>

<style scoped>
  .user-avatar{
    width: 60px;
    height: 75px;
  }
  .page{
    text-align: center;
  }

</style>
