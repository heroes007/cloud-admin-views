<template>
  <div class="container">
    <div class="title">欢迎来到爱尚云书后台管理系统</div>
    <h1 id="h1" ref="title"></h1>
    <el-form class="box" :rules="rule" ref="form"  :model="form">
      <h2 class="login">请登陆</h2>
      <div class="name">
        <el-form-item label="用户名："  prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
      </div>
      <div class="pass">
        <el-form-item label="密码："  prop="password" >
          <el-input v-model="form.password" type="password" placeholder="请输入密码" @keyup.enter.native="login"></el-input>
        </el-form-item>
      </div>
      <el-row class="btn">
        <el-button class="btn-login" type="primary" @click="login" :loading="isLogin">登陆</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
    export default {
      name: "index",
      data () {
        var checkUsername = (rule ,value ,callback)=>{
          if(value){
            return callback()
          }else{
            return callback(new Error('用户名不能为空'))
          }
        };
        var checkPassword = (rule ,value ,callback)=>{
          if(!value){
            return callback(new Error('密码不能为空'))
          }else if(value.length < 5){
            return callback(new Error('密码不低于五位'))
          }else{
            return callback
          }
        };
        return{
          form:{
            username:"",
            password:""
          },
          isLogin:false,
          rule:{
            username:[
              {validator:checkUsername,trigger:'blur'}
            ],
            password:[
              {validator:checkPassword,trigger:'blur'}
            ]
          }
        }
      },
      methods:{
        login(){
          this.isLogin = true
          this.$axios.post('/login',this.form).then(res=>{
            if(res.code == 200){
              this.$store.commit('CHANGE_USERINFO',res.data)
              this.$message({
                message: '登录成功',
                type: 'success',
              });
              this.$router.push('/layout')
            }else{
              this.$message.error('登陆失败');
            }
            this.isLogin = false
          }).catch(err=>{
            this.isLogin = false
          })
        },
        validateLogin() {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.login()
            } else {
              return false;
            }
          });
        }
      },
    }
</script>

<style scoped>
  .container{
    overflow: hidden;
    height:100vh;
    background-color: #444c56;
  }
  .title{
    margin-top: 50px;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }
  .box{
    height: 300px;
    width: 400px;
    background-color: #fff;
    padding: 30px;
    margin: 20px auto;
    border-radius: 6px;
  }
  .login{
    text-align: center;
  }
  .name{
    margin: 30px 0;
  }
  .name h4{
    margin: 10px;
  }
  .pass{
    margin: 30px 0;
  }
  .pass h4{
    margin: 10px;
  }
  .btn-login{
    width: 400px;
    height: 40px
  }
</style>
