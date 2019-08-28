<template>
  <div class="">
    <div class="record">
      <div class="title">沟通记录</div>
      <div class="content">
        <div class="item">
          <p>用户1：问题描述：xxxxx</p>
          <p>2019-7-29  12：00：00</p>
        </div>
      </div>
    </div>
    <div class="message">
      <div class="title">留言</div>
      <div class="content">
        <el-input
        style="width:50%;"
          type="textarea"
          :autosize="{ minRows: 8}"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>

        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-button style="margin-top:30px;" size="small" type="primary" >提交</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name:'step1',
  data() {
    return {
      textarea:'',
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },
  methods:{
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
.title{
  height: 36px;
  line-height: 36px;
  color:#7686A8;
  padding-left: 10px;
  background: #F2F5FA;
}
.item{
  p{
    font-size: 14px;
  }
}
.record{
  border:1px solid #7686A8;
  .content{
    padding: 20px;
  }
}
.message{
  margin-top: 30px;
  border:1px solid #7686A8;
  .content{
    padding: 20px;
  }
}
.upload-demo{
  width: 500px;
  margin-top: 30px;
}
</style>
