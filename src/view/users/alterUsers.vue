<template>
  <div>
    <h1>无法修改！！！</h1>
    <el-button @click="back">返回</el-button>
  </div>
</template>

<script>
  export default {
    name: "alterUser",
    data(){
    },
    methods:{
      back(){
        this.$router.push('users')
      }
    }
  }
</script>

<style scoped>
  h1{
    text-align: center;
    color: red;
    font-size: 80px;
  }
</style>
