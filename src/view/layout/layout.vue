<template class="container">
  <el-container>
    <el-aside width="200px">
      <el-menu :router="true">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-location"></i>用户管理</template>
          <el-menu-item-group>
            <el-menu-item index="users">用户列表</el-menu-item>
            <el-menu-item index="addUsers">添加用户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-tickets"></i>分类管理</template>
          <el-menu-item-group>
            <el-menu-item index="classify">分类管理</el-menu-item>
            <el-menu-item index="addClassify">添加分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-edit-outline"></i>图书管理</template>
          <el-menu-item-group>
            <el-menu-item index="bookList">图书列表</el-menu-item>
            <el-menu-item index="addBook">添加图书</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-edit-outline"></i>轮播图管理</template>
          <el-menu-item-group>
            <el-menu-item index="slideShow">轮播图列表</el-menu-item>
            <el-menu-item index="addSlideShow">添加轮播图</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <span class="title">爱尚云书后台管理系统</span>
        <el-dropdown class="person" placement="bottom-end">
          <span class="el-dropdown-link">
            <img class="img" :src="userInfo.avatar">
          </span>
          <el-dropdown-menu slot="dropdown">
            <span @click="person"><el-dropdown-item>个人信息</el-dropdown-item></span>
            <span @click="change"><el-dropdown-item>修改密码</el-dropdown-item></span>
            <span @click="out"><el-dropdown-item>退出登录</el-dropdown-item></span>
          </el-dropdown-menu>
        </el-dropdown>

      </el-header>

      <el-main>
        <div class="newWindow" v-if="isShow">
          <div class="windows">
            <h2>修改密码</h2>
            <el-form :label-position="labelPosition" ref="changeWord" :rules="rule" label-width="80px" :model="changeWord">
              <el-form-item prop="changeWord.password" label="原密码">
                <el-input type="password"  v-model="changeWord.password" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item prop="changeWord.new_password" label="新密码">
                <el-input type="password"  v-model="changeWord.new_password" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item prop="changeWord.change_password" label="确认密码">
                <el-input type="password"  v-model="changeWord.change_password" style="width: 280px"></el-input>
              </el-form-item>
            </el-form>
            <div style="margin: 20px auto ;">
              <el-button style="width: 100px ;" @click="changePassword('changeWord')">确认</el-button>
              <el-button style="width: 100px ;" @click="cancel">取消</el-button>
            </div>
          </div>
        </div>
        <router-view style="padding: 20px"/>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
    export default {
      name: "layout",
      data() {
        var password = (rule ,value ,callback)=>{
          if(value === ''){
            callback(new Error('请输入密码'))
          }
        };
        var validatePass = (rule ,value ,callback)=>{
          if(value === ''){
            callback(new Error("请输入密码"))
          }else{
            if(this.changeWord.new_password !== ""){
              this.$refs.changeWord.validateField('change_password')
            }
            callback()
          }
        };
        var validatePass2 = (rule ,value ,callback)=>{
          if(value === ''){
            callback(new Error("请再次输入密码"))
          }else if(value !== this.changeWord.new_password){
            callback(new Error("两次输入密码不一致!"))
          }else{
            callback()
          }
        };
        return {
          userInfo: {
            nickname: "",
            avatar: "",
            desc: "",
            email: "",
          },
          rule:{
            new_password:{
              validator:validatePass,trigger:'blur'
            },
            change_password:{
              validator:validatePass2,trigger:'blur'
            }
          },
          changeWord:{
            password:"",
            new_password:"",
            change_password:""
          },
          labelPosition:"right",
          isShow:false,
        }
      },
      methods:{
        initData(){
          this.userInfo = {...this.$store.state.userinfo}
        },
        person(){
          this.$router.push('person')
          console.log("hello")
        },
        out(){
          this.$router.push('/')
        },
        change(){
          this.isShow = true
        },
        cancel(){
          this.isShow = false
        },
        changePassword(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios.put('/user/password',this.changeWord).then(res=>{
                console.log(res)
                if(res.code == 200){
                  this.isShow = false
                  this.$message({
                    message: res.msg,
                    type: 'success'
                  });
                }else{
                  this.$message.error(res.msg);
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      },
      created(){
        this.initData()
      }
    }
</script>

<style scoped>
  .container{
    height: 100vh;
    overflow: hidden;
  }
  .el-main{
    padding: 0;
  }
  .el-container{
    height: 100vh;
  }
  .el-header {
    display: flex;
    justify-content: center;
    background-color: #fff;
    color: #333;
    line-height: 60px;
    border-bottom: 1px solid #eee;
    text-align: center;
  }
  .title{
    font-size: 22px;
  }
  .el-aside {
    color: #333;
    background-color:  rgb(238, 241, 246);

  }
  .img{
    margin-top: 3px;
    margin-right: 30px;
    height: 54px;
    width: 54px;
    border-radius: 50%  ;
  }
  .person{
    position: relative;
    left: 340px;
  }
  .newWindow{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #ccc;
    z-index: 996;
  }
  .windows{
    position: fixed;
    top: 50%;
    right: 50%;
    transform: translate(50% ,-50%);
    z-index: 998;
    background-color: #fff;
    height: 400px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .windows h2{
    text-align: center;
    margin-bottom: 40px;
  }
</style>
