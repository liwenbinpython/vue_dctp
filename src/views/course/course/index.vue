<template>
  <div class="home-container course">
    <div class="aside">
      <div class="item" v-for="item in list" :key="item.title">
        <div @click="custormAnchor(item.title)" class="item_title">{{item.title}}</div>
        <div class="item_options" v-for="options in item.children" :key="options.title">
          <div @click="custormAnchor(options.title)" class="item_options_title">{{options.title}}</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div id="关于sicklequant">
        关于sicklequant
      </div>
      <div id="提供哪些服务？">
        提供哪些服务？
      </div>
      <div id="如何修改邮箱、密码？">
        如何修改邮箱、密码？
      </div>
      <div id="如何支付？">
        如何支付？
      </div>
      <div id="如何申请成为代理？">
        如何申请成为代理？
      </div>
      <div id="如何获取佣金？">
        如何获取佣金？
      </div>
      <div id="基础设置">
        基础设置
      </div>
      <div id="添加交易所">
        添加交易所
      </div>
      <div id="添加密钥与交易对">
        添加密钥与交易对
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      list:[
        {title:'关于sicklequant',children:[{title:'提供哪些服务？'},{title:'如何修改邮箱、密码？'},{title:'如何支付？'},{title:'如何申请成为代理？'},{title:'如何获取佣金？'}]},
        {title:'基础设置',children:[{title:'添加交易所'},{title:'添加密钥与交易对'},{title:'配置交易对'},{title:'添加机器人'}]},
        {title:'策略参数',children:[{title:'普通深度制造策略'},{title:'定价深度制造策略'},{title:'行情跟随策略'},{title:'中间价刷量策略'},{title:'自主行情策略'},{title:'对冲策略'},{title:'参数修改步骤'}]},
        {title:'辅助工具',children:[{title:'分钟内k线监控策略'},{title:'账户余额监控策略'}]},
        {title:'常见问题',children:[{title:'策略需求'},{title:'异常处理'},{title:'故障排除'}]},
        {title:'联系我们',children:[{title:'联系我们'}]}
      ]
    }
  },
  methods:{
    custormAnchor(index) { //锚点滚动到固定位置      
        let anchorElement = document.getElementById(index);
        if(anchorElement) {
          anchorElement.scrollIntoView(); 
          window.scrollBy({top: -0.001,left: 0, behavior: "smooth"});
          if(getScrollTop() + getWindowHeight() != getScrollHeight()){
            window.scrollBy({top: -65,left: 0, behavior: "smooth"});
          }
        }
    }
  },
  components: {

  }
}
//滚动条在Y轴上的滚动距离
function getScrollTop(){
　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
　　if(document.body){
　　　　bodyScrollTop = document.body.scrollTop;
　　}
　　if(document.documentElement){
　　　　documentScrollTop = document.documentElement.scrollTop;
　　}
　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
　　return scrollTop;
}
//文档的总高度
 
function getScrollHeight(){
　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
　　if(document.body){
　　　　bodyScrollHeight = document.body.scrollHeight;
　　}
　　if(document.documentElement){
　　　　documentScrollHeight = document.documentElement.scrollHeight;
　　}
　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
　　return scrollHeight;
}
//浏览器视口的高度
 
function getWindowHeight(){
　　var windowHeight = 0;
　　if(document.compatMode == "CSS1Compat"){
　　　　windowHeight = document.documentElement.clientHeight;
　　}else{
　　　　windowHeight = document.body.clientHeight;
　　}
　　return windowHeight;
}
</script>

<style lang="scss" scoped>
.course{
  display: flex;
}
.aside{
  width: 300px;
  background: #ffffff;
  min-height: calc(100vh - 60px);
  box-sizing: border-box;
  padding:10px 20px;
  color: #22a8ee;
  position: fixed;
  left: 0;
  top: 60px;
  .item_title{
    height: 30px;
    line-height: 30px;
    font-weight: 700;
    cursor: pointer;
  }
  .item_options_title{
    height: 30px;
    line-height: 30px;
    text-indent: 1em;
    cursor: pointer;
  }
}
.content{
  margin-left: 350px;
  padding: 20px;
  div{
    margin-bottom: 500px;
  }
}
</style>
