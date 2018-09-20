<template>
  <div>
    <el-form :label-position="labelPosition" label-width="80px">
      <el-form-item label="题目：">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="图标：">
        <updataCom @success="getimg" :img="icon"></updataCom>
      </el-form-item>
    </el-form>
    <el-button round @click="showOverflowTooltip" class="btn">添加分类</el-button>
  </div>
</template>

<script>
  import updataCom from '../../components/updata-com'

  export default {
    name: "addClassify",
    components:{
      updataCom
    },
    data () {
      return{
        title:"",
        icon:"",
        labelPosition:"right"
      }
    },
    methods:{
      showOverflowTooltip(){
        this.$axios.post('/category',{title:this.title,icon:this.icon}).then(res=>{
          if(res.code == 200){
            this.getimg()
            this.$message({
              message: '恭喜你，成功添加一条分类',
              type: 'success'
            });
          }else(
            this.$message.error(res.msg)
          )
        })
      },
      getimg(res) {
        this.icon = res
      }
    }
  }
</script>

<style scoped>

</style>
