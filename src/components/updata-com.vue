<template>
    <el-upload
      class="avatar-uploader"
      action="http://upload-z1.qiniup.com"
      :data="upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="img" :src="img" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
    import axios from 'axios'

    export default {
      data() {
        return {
          imageUrl: '',
          upload:{token:""}
        };
      },
      props:{img:""},
      methods: {
        handleAvatarSuccess(res, file) {
          this.imageUrl = res.url
          this.$emit('success',this.imageUrl)
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
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    height: 178px;
  }
  .avatar-uploader :hover {
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
