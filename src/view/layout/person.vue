<template>
  <el-form :label-position="labelPosition" label-width="80px" :model="userInfo">
  <el-form-item label="昵称">
    <el-input v-model="userInfo.nickname"></el-input>
  </el-form-item>
  <el-form-item label="头像">
    <updataCom @success="getImg" :img="userInfo.avatar"></updataCom>
  </el-form-item>
  <el-form-item label="描述">
    <el-input v-model="userInfo.desc"></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="userInfo.email"></el-input>
  </el-form-item>
  <el-button @click="change">修改</el-button>
</el-form>
</template>

<script>
  import updataCom from '../../components/updata-com'

  export default {
    name: "person",
    data(){
      return{
        userInfo:{
          nickname: "",
          avatar: "",
          desc: "",
          email: "",
        },
        labelPosition:"right"
      }
    },
    components:{
      updataCom
    },
    methods:{
      initData(){
        this.userInfo = {...this.$store.state.userinfo}
        console.log(this.userInfo)
      },
      change(){
        this.$axios.put('/user/userInfo',this.userInfo).then(res=>{
          console.log(res)
          if(res.code == 200){
            this.$store.commit('CHANGE_USERINFO',res.data)
            this.initData()
            this.$message({
              message: '已修改信息',
              type: 'success'
            });
          }else(
            this.$message.error(res.msg)
          )
        })
      },
      getImg(event){
        this.userInfo.avatar = event
        console.log(event)
      }
    },
    created(){
      this.initData()
    }
  }
</script>

<style scoped>
  .img{
    width: 70px;
    height: 70px;
    margin-left: 20px;
  }
</style>
