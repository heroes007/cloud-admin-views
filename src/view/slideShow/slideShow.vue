<template>
  <div>
    <el-table
      :data="showData"
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
        prop="index"
        label="序号"
        width="160">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteshow(scope.row)">删除</el-button>
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
    name: "slideshow",
    data(){
      return{
        showData:[],
        pn:""
      }
    },
    methods:{
      getData(){
        this.$axios.get('/swiper',{pn:this.pn,size:5}).then(res=>{
          console.log(res)
          this.showData = res.data
        })
      },
      deleteshow(row){
        this.axios.delete(`/swiper/${row._id}`).then(res=>{
          console.log(res)
        })
      },
      changepage(event){
        this.pn = event
        this.getData()
      }
    },
    created(){
      this.getData()
    }
  }
</script>

<style scoped>
  .user-avatar{
    width: 60px;
    height: 70px;
  }
  .page{
    text-align: center;
  }
</style>
