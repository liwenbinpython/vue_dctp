<template>
  <div class="">
    <div class="record">
      <div class="title">沟通记录</div>
      <div class="content">
        <div class="item">
          <p>用户1：问题描述：xxxxx</p>
          <p>2019-7-29  12：00：00</p>
        </div>
        <div class="item">
          <p>用户1：问题描述：xxxxx</p>
          <p>2019-7-29  12：00：00</p>
        </div>
        <div class="item">
          <p>用户1：问题描述：xxxxx</p>
          <p>2019-7-29  12：00：00</p>
        </div>
        <div class="item">
          <p>用户1：问题描述：xxxxx</p>
          <p>2019-7-29  12：00：00</p>
        </div>
        <div class="line"></div>
      </div>
    </div>
    <div class="evaluate">
      <div class="title">待您评价</div>
      <div class="evaluate_content">
        <div class="evaluate_item"> 
          <span>整体评价:</span><el-rate v-model="star"></el-rate>
        </div>
        <div class="evaluate_item"> 
          <span>问题是否解决:</span>
          <el-radio v-model="radio" label="1">已解决</el-radio>
          <el-radio v-model="radio" label="2">未解决</el-radio>
        </div>
        <div class="evaluate_item" style="align-items:flex-start;"> 
          <span>我要反馈:</span>
          <el-input
          style="width:45%;"
            type="textarea"
            :autosize="{ minRows: 6}"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </div>
        <el-button style="margin-top:10px;margin-left:78px;" size="small" type="primary" >提交</el-button>
      </div>
      
    </div>
    
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      textarea:'',
      star:null,
      radio:'1'
    }
  },
  methods:{
    
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
  border-bottom:1px dashed #ccc;
}
.record{
  border:1px solid #7686A8;
  .content{
    padding: 20px;
  }
}
.evaluate{
  border:1px solid #7686A8;
  margin-top: 20px;
  .content{
    padding: 20px;
  }
}
.evaluate_content{
  padding: 10px;
  .evaluate_item{
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    span{
      display: block;
      margin-right: 10px;
    }
  }
}

</style>
