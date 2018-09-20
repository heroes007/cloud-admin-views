<template>
  <div>
    <div class="father">
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="admin">
        <el-form-item label="用户名：">
          <el-input v-model="admin.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input type="password" v-model="admin.password"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="admin.desc"></el-input>
        </el-form-item>
        <el-form-item label="头像：">
          <el-upload
            class="avatar-uploader"
            action="http://upload-z1.qiniup.com"
            :data="upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="admin.email"></el-input>
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input v-model="admin.nickname"></el-input>
        </el-form-item>
      </el-form>
      <el-button round @click="addAdmin" class="btn">添加用户</el-button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "index",
    data(){
      return{
        labelPosition: 'right',
        imageUrl: '',
        upload:{token:""},
        admin:{
          username:"",
          password:"",
          desc:"",
          avatar:"",
          email:"",
          nickname:""
        },
      }
    },
    methods:{
      addAdmin(){
        this.$axios.post('/user',this.admin).then(res=>{
          console.log(res)
          if(res.code == 200){
            this.$message({
              message: '恭喜你，成功添加一名管理员',
              type: 'success'
            });
          }else{
            this.$message.error(res.msg);
          }
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.admin.avatar = this.imageUrl
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      getupload(){
        axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
          this.upload.token = res.data.data
        })
      }
    },
    created(){
      this.getupload()
    }
  }
</script>

<style scoped>
  .btn{
    display: flex;
    justify-content: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
