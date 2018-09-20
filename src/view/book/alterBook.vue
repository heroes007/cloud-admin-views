<template>
  <div>
    <el-form :label-position="labelPosition" label-width="80px" >
      <el-form-item label="ID">
        <el-input v-model="book._id"></el-input>
      </el-form-item>
      <el-form-item label="题目">
        <el-input v-model="book.title"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="book.author"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <updataCom :img="book.img" @success="getImg"></updataCom>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="book.desc"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="book.type">
          <el-option
            v-for="(item,index) in typeCate"
            :key = "index"
            :label="item.title"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="book.index"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="changeBook">修改</el-button>
  </div>
</template>

<script>
  import updataCom from '../../components/updata-com'

  export default {
    name: "alterBook",
    components:{
      updataCom
    },
    data(){
      return{
        book:{
          _id:"",
          book_id:"",
          index:"",
          desc:"",
          author:"",
          img:"",
          type:"",
          title:""
        },
        labelPosition:"right",
        typeCate:[],
      }
    },
    methods:{
      getData(){
        this.$axios.get(`book/${this.$route.query.id}`).then(res=>{
          this.book = res.data
          console.log(res)
        })
      },
      getCate(){
        this.$axios.get(`/category`).then(res=>{
          this.typeCate = res.data
        })
      },
      changeBook(){
        this.book.book_id = this.book._id
        this.$axios.put('/book',this.book).then(res=>{
          if(res.code == 200){
            this.$message({
              message:res.msg,
              type:"success"
            })
          }else{
            this.$message.error(res.msg)
          }
        })
      },
      getImg(event){
        this.book.img = event
      }
    },
    created(){
      this.getData()
      this.getCate()
    }
  }
</script>

<style scoped>

</style>
