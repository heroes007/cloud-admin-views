<template>
  <div>
    <el-table
      :data="books"
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
      label="题目">
    </el-table-column>
      <el-table-column
        prop="author"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="描述"
        width="220"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "classityBook",
    data(){
      return{
        typeid:"",
        books:[],
      }
    },
    methods:{
      getfull(){
        this.typeid = this.$route.query.id
      },
      getData(){
        this.$axios.get(`/category/${this.typeid}/books`).then(res=>{
          console.log(res)
          this.books = res.data.books
        })
      },
      handleDelete(scope){
        this.$axios.delete(`/book/${scope._id}`).then(res=>{
          console.log(res)
        })
      }
    },
    created(){
      this.getfull()
      this.getData()
    }
  }
</script>

<style scoped>
  .user-avatar{
    width: 60px;
    height: 60px;
  }
</style>
