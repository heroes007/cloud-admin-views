<template>
  <div>
    <el-table
      :data="classifyData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="类别">
      </el-table-column>
      <el-table-column
        label="图书"
        width="180">.
        <template slot-scope="scope">
          <img :src="scope.row.icon" class="user-avatar">
        </template>
      </el-table-column>
      <el-table-column
        prop="index"
        label="排序"
        width="160">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">查看全部</el-button>
          <el-button
            size="mini"
            @click="changeEdit(scope.row)">修改分类</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block page">
      <el-pagination
        @current-change="changepage"
        :total="100"
        :page-size="6">
      </el-pagination>
    </div>
  </div>
</template>

<script>

    export default {
      name: "classify",
      data(){
        return{
          classifyData:[],
          pn:1,
          size:"",
          count:1,
          length:"",
          typeId:"",
        }
      },
      methods:{
        getData(){
          this.$axios.get('/category',{pn:this.count,size:6}).then(res=>{
            this.length = res.data.length
            this.classifyData = res.data
          })
        },
        handleEdit(scope){
          console.log(scope)
          this.$router.push(`classifyBook?id=${scope._id}`)
        },
        handleDelete(scope){
          this.$axios.delete(`/category/${scope._id}`).then(res=>{
            if(res.code == 200){
              this.$message({
                message: '删除一条分类',
                type: 'success'
              })
            }else{
              this.$message.error('删除失败');
            }
            console.log(res)
          })
        },
        changeEdit(scope){
          this.$router.push(`changeClassify?id=${scope._id}`)
        },
        changepage(event){
          this.count = event
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
    height: 60px;
  }
  .page{
    text-align: center;
  }
</style>
