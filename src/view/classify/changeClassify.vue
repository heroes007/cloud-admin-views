<template>
  <div>
    <el-form>
      <el-form-item label="题目">
        <el-input v-model="category.title"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <updataCom :img="category.icon" @success="getimg"></updataCom>
      </el-form-item>
      <el-form-item label="序号">
        <el-input v-model="category.index"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="changeClassify">修改</el-button>
  </div>
</template>

<script>
  import updataCom from '../../components/updata-com'

  export default {
    name: "changeClassify",
    data(){
      return{
        category:{
          title:"",
          icon:"",
          index:''
        },
        typeid:""
      }
    },
    components:{
      updataCom
    },
    methods:{
      getData(){
        this.typeid = this.$route.query.id
        this.$axios.get(`/category/${this.typeid}`,this.category).then(res=>{
          this.category = res.data
        })
      },
      getimg(event){
        this.category.icon = event
      },
      changeClassify(){
        this.$axios.put(`/category/${this.typeid}`,this.category).then(res=>{
          if(res.code == 200){
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.$router.push('classify')
          }else{
            this.$message.error(res.msg);
          }
        })
      }
    },
    created(){
      this.getData()
      this.getimg()
    }
  }
</script>

<style scoped>

</style>
