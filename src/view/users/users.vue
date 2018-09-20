<template>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="头像"
          width="180">.
          <template slot-scope="scope">
            <img :src="scope.row.avatar" class="user-avatar">
          </template>
        </el-table-column>
        <el-table-column
        prop="nickname"
        label="昵称">
      </el-table-column>
        <el-table-column
          prop="desc"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block page">
        <el-pagination
          @current-change="changepage"
          :total="count"
          :page-size="6">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          tableData:[],
          id:[],
          count:0,
          pn:"",
          userData:{
          }
        }
      },
      methods:{
        getData(){
          this.$axios.get('/user',{pn:this.pn,size:6}).then(res=>{
            this.count = res.count
            this.tableData = res.data
            console.log(this.count)
          })
        },
        handleEdit(){
          this.$alert('无法修改', {
            confirmButtonText: '确定',
          });
        },
        handleDelete(index,row){
          this.$axios.post('/user/delete',{userIds:[row._id]}).then(res=>{
            this.$message.success(res.msg)
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
    height: 60px;
    border-radius: 50%;
  }
  .page{
    text-align: center;
  }
</style>
