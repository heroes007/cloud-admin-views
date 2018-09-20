<template>
  <div>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="book">
      <el-form-item label="链接：">
        <el-input v-model="book.url"></el-input>
      </el-form-item>
      <el-form-item label="作者：">
        <el-input v-model="book.author"></el-input>
      </el-form-item>
      <el-form-item label="头像：">
        <updataCom v-model="book.img" @success="getImg"  :img="book.img"></updataCom>
      </el-form-item>
      <el-form-item label="ID：">
        <el-select v-model="book.typeId" placeholder="请选择">
          <el-option
            v-for="(item,index) in category"
            :key="index"
            :label="item.title"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button round @click="addBook" class="btn">添加图书</el-button>
  </div>
</template>

<script>
  import updataCom from '../../components/updata-com'
  export default {
    name: "addBook",
    components:{
      updataCom
    },
    data(){
      return{
        book:{
          url:"",
          author:"",
          img:"",
          typeId:""
        },
        category:"",
        labelPosition:"right",
      }
    },
    methods:{
      addBook(){
        this.$axios.post('/book',this.book).then(res=>{
          if(res.code == 200){
            this.$message({
              message: '恭喜你，成功添加一本图书',
              type: 'success'
            });
          }else{
            this.$message.error(res.msg);
          }
        })
      },
      getCategory(){
        this.$axios.get('/category').then(res=>{
          console.log(res)
          this.category = res.data
        })
      },
      getImg(event){
        this.book.img = event
      }
    },
    created(){
      this.getCategory()
    }
  }
</script>

<style scoped>

</style>
