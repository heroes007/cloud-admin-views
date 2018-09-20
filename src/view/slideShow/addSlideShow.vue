<template>
  <div>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="swiper">
      <el-form-item label="图片：">
        <updataCom v-model="swiper.img" @success="getImg"  :img="swiper.img"></updataCom>
      </el-form-item>
      <el-form-item label="题目：" style="width: 500px;">
        <el-input v-model="swiper.title"></el-input>
      </el-form-item>
      <el-form-item label="图书：">
        <template>
          <el-select v-model="categoryId" @change="getcateBook">
            <el-option
              v-for="(item,index) in category"
              :key="index"
              :label="item.title"
              :value="item._id">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <template v-if="isAdd">
        <div class="addbook">
          <img :src="addbookMessge.img" alt="" class="img">
          <div class="message">
            <div class="title">题目：{{addbookMessge.title}}</div>
            <div class="author">作者：{{addbookMessge.author}}</div>
          </div>
        </div>
      </template>
      <el-form-item label="序号：" style="width: 500px;">
        <el-input-number v-model="swiper.index" @change="handleChange"></el-input-number>
      </el-form-item>
    </el-form>
    <el-button round @click="addSwiper" class="btn">添加轮播图</el-button>

    <el-dialog title="书籍列表" :visible.sync="isShow">
      <el-table :data="books">
        <el-table-column property="title" label="书名" width="150"></el-table-column>
        <el-table-column property="img" label="书籍头图" width="200">
          <template slot-scope="scope">
            <img :src="scope.row.img" class="user-avatar">
          </template>
        </el-table-column>
        <el-table-column property="author" label="作者"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="addBook(scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import updataCom from "../../components/updata-com"
  export default {
    name: "addSlideshow",
    components:{
      updataCom
    },
    data(){
      return{
        swiper:{
          title:"",
          img:"",
          book:"",
          index:1
        },
        labelPosition:"right",
        category:[],
        categoryId:"",
        isShow:false,
        isAdd:false,
        books:[],
        addbookId:"",
        addbookMessge:{},
      }
    },
    methods:{
      addSwiper(){
       this.$axios.post('/swiper',this.swiper).then(res=>{
         console.log(res)
       })
      },
      getCategory(){
        this.$axios.get('category').then(res=>{
          this.category = res.data
        })
      },
      getcateBook(){
        this.$axios.get(`/category/${this.categoryId}/books`).then(res=>{
          if(res.code == 200){
            this.books = res.data.books
            this.isShow = true
          }
        })
      },
      addBook(scope){
        this.addbookId = scope._id
        this.isShow = false
        this.$axios.get(`book/${this.addbookId}`).then(res=>{
          this.addbookMessge = res.data
          this.isAdd = true
          this.swiper.book = res.data._id
        })
      },
      getImg(event){
        this.swiper.img = event
      },
      handleChange(value){
        this.swiper.index = value
      }
    },
    created(){
      this.getImg()
      this.getCategory()
    }
  }
</script>

<style scoped>
  .user-avatar{
    width: 60px;
    height: 70px;
  }
  .addbook{
    height: 100px;
    display: flex;
    flex-direction: row;
  }
  .img{
    margin: 10px;
    height: 70px;
    width: 60px;
  }
  .message{
    margin: 10px;
  }
  .title{
    font-size: 16px;
  }
  .author{
    font-size: 15px;
    margin-top: 5px;
    color: #666;
  }
</style>
