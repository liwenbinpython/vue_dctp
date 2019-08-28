<template>
  <div class="app-container main" >
    <div class="content" ref="main">
      <div class="content_left">
        <div class="content_left_top">
          <div class="balance">
            <div class="title">
              余额查询
            </div>
            <div class="form">
              <div class="form_item">
                <span>交易所</span>
                <el-select style="width:60%;" v-model="balance.value" placeholder="请选择交易所">
                  <el-option
                    v-for="item in balance.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="form_item">
                <span>API_KEY</span>
                <el-select style="width:60%;" v-model="balance.value1" placeholder="请选择交易所">
                  <el-option
                    v-for="item in balance.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="form_item">
                <span>交易对</span>
                <el-select style="width:60%;" v-model="balance.value2" placeholder="请选择交易所">
                  <el-option
                    v-for="item in balance.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="table">
              <div class="table_header">
                <div>币种</div>
                <div>总余额</div>
                <div>可用余额</div>
              </div>
              <div class="table_item">
                <div>MTC</div>
                <div>10000</div>
                <div>2000</div>
              </div>
              <div class="table_item">
                <div>MTC</div>
                <div>10000</div>
                <div>2000</div>
              </div>
            </div>
          </div>
        </div>
        <div class="content_left_bottom">
           <div class="task">
             <div class="title">
              任务参数设置
             </div>
             <div class="form">
              <div class="form_item">
                <span>MTC 售出限量</span>
                <el-input-number style="width:60%;" v-model="task.num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
              </div>
              <div class="form_item">
                <span>USDT 使用限额</span>
                <el-input-number style="width:60%;" v-model="task.num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
              </div>
              <div class="form_item">
                <span>可控价格范围</span>
                <div class="task_form_item_box">
                  <el-input style="width:50%;" v-model="task.value" placeholder=""></el-input>
                  <div class="line"></div>
                  <el-input style="width:50%;" v-model="task.value1" placeholder=""></el-input>
                </div>
              </div>
            </div>
           </div>
        </div>
        <div class="content_left_remark">
          <div class="remark_title">
            <i class="el-icon-warning"></i>
            任务提醒：
          </div>
          <div class="remark_content">
            MTC任务用量已到限额数值，无可用余量参与本次任务！
          </div>
        </div>
      </div>
      <div class="content_right">
        <div class="rocker" ref="rocker">
            <div class="limb" ref="limb">
              <div class="text" :style="{top:item.top}" v-for="item,index in rocker.text" :key="index+item.title">
                {{item.title}}
              </div>
              <div class="branch" :style="{top:item.top}" v-for="item,index in rocker.branch" :key="index+item.top"></div>
              <div class="little_branch" :style="{top:item}" v-for="item,index in rocker.littleBranch.center" :key="index+item+'center'"></div>
              <div class="little_branch" :style="{top:item}" v-for="item,index in rocker.littleBranch.out" :key="index+item+'out'"></div>
              <div class="little_branch" :style="{top:item}" v-for="item,index in rocker.littleBranch.both" :key="index+item+'both'"></div>
              <div :class="{rotate:rotate}" class="block" ref="block" @mousedown="move" ></div>
            </div>
        </div>
        <div class="panel">
          <div class="panel_top">
            <el-button size="medium" type="primary">复位</el-button>
            <el-dropdown>
              <el-button size="medium" style="margin:0 20px;" plain type="primary">
                时间选择<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>11111</el-dropdown-item>
                <el-dropdown-item>22222</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button size="medium" type="primary" plain>查看订单</el-button>
          </div>
          <div class="panel_bottom">
            <div class="panel_form">
              <div class="panel_form_item">
                <div class="title">
                  实时面板
                </div>
                <div class="panel_form_box">
                  <div class="panel_form_box_item">
                    <span>涨幅</span>
                    <div>5秒/{{num}}%</div>
                  </div>
                  <div class="panel_form_box_item">
                    <span>价格</span>
                    <div>0.28</div>
                  </div>
                </div>
              </div>
              <div class="panel_form_item">
                <div class="title">
                  MTC
                </div>
                <div class="panel_form_box">
                  <div class="panel_form_box_item">
                    <span>任务用量</span>
                    <div>100</div>
                  </div>
                  <div class="panel_form_box_item">
                    <span>可用余量</span>
                    <div>0.28</div>
                  </div>
                </div>
              </div>
              <div class="panel_form_item">
                <div class="title">
                  USDT
                </div>
                <div class="panel_form_box">
                  <div class="panel_form_box_item">
                    <span>任务用额</span>
                    <div>100</div>
                  </div>
                  <div class="panel_form_box_item">
                    <span>可用余额</span>
                    <div>0.28</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      balance:{
        value: '',
        value1:'',
        value2:'',
        options: [{
          value: '选项1',
          label: '选项1'
        }, {
          value: '选项2',
          label: '选项2'
        }, {
          value: '选项3',
          label: '选项3'
        }, {
          value: '选项4',
          label: '选项4'
        }, {
          value: '选项5',
          label: '选项5'
        }]
      },
      task:{
        num:0,
        num1:0,
        value:'',
        value1:''
      },
      rocker:{
        text:[{title:'30%',top:'0%'},{title:'20%',top:'16.67%'},{title:'10%',top:'33.33%'},{title:'0%',top:'50%'},{title:'-10%',top:'66.67%'},{title:'-20%',top:'83.33%'},{title:'-30%',top:'100%'}],
        branch:[{top:'0%'},{top:'16.66%'},{top:'33.33%'},{top:'50%'},{top:'66.66%'},{top:'83.33%'},{top:'100%'}],
        littleBranch:{
          center:[],
          both:[],
          out:['8.33%','91.67%'],
        },
      },
      num:20,
      limbH:0,
      rotate:false,
    }
  },
  created(){
    this.rocker.littleBranch.center = this.setCenter();
    this.rocker.littleBranch.both = this.setBoth();
    // setInterval(() =>{
    //   var max = 30;
    //   var min = -30;
    //   var random = parseInt(Math.random()*(max-min)+min);
    //   this.num = random;
    // },2000)
  },
  mounted(){
    this.limbH = this.$refs.limb.offsetHeight + 2;
  },
  computed:{
    newHeight(){
      return this.limbH == 0 ? 0 : this.limbH/60*(30-this.num) - 15;
    }
  },
  watch:{
    // newHeight(val,oldVal){
    //   let block = this.$refs.block;
    //   console.log(parseInt(val),this.num)
    //   this.animate(block,parseInt(val));
    // }
  },
  methods:{
    handleChange(){

    },
    animate(ele,distance){
      let top = ele.offsetTop;
      let speet = Math.ceil(Math.abs(top-distance)/125);
      speet = speet < 5 ? 5 : speet;
      let timer = setInterval(() => {
        let top = ele.offsetTop;
        if(Math.abs(top - distance) >= 5){
          if(top > distance){
            ele.style.top = top - speet + 'px';
          }else{
            ele.style.top = top + speet + 'px';
          }
        }else{
          ele.style.top = distance + 'px';
          clearInterval(timer);
        }
      }, 20);
    },
    move(e){
      let block = e.target;
      let top = (e.clientY - block.offsetTop);
      let h = block.offsetHeight;
      let limbH = this.$refs.limb.offsetHeight - h+2;
      let clientY = e.clientY;
      let _this = this;
      this.$refs.rocker.addEventListener('mousemove', rockerMove,false)
      this.$refs.main.addEventListener('mouseup',(event) => {
        this.$refs.rocker.removeEventListener('mousemove',rockerMove,false);
      })
      function rockerMove(event){
        let newClientY = event.clientY;
        if(newClientY > clientY){
          _this.rotate = false;
        }else{
          _this.rotate = true;
        }
        clientY = newClientY;
        let newTop = 0;
        if(event.clientY - top < 0){
          block.style.top = 0 +'px';
          newTop = 0;
        }else if(event.clientY - top > limbH){
          block.style.top = limbH +'px';
          newTop = limbH
        }else{
          block.style.top = event.clientY - top +'px';
          newTop = event.clientY - top
        }
        //console.log(newTop/limbH*100);
      }
    },
    setCenter(){
      let one = 1.67;
      let count = 33.33;
      let arr = [];
      for(let i=0;i<20;i++){
        arr.push(count+'%');
        count += one;
      }
      return arr;
    },
    setBoth(){
      let one = 3.33;
      let count = 16.67;
      let arr = [];
      for(let i=0;i<5;i++){
        arr.push(count+'%');
        count += one;
      }
      count = 66.67;
      for(let i=0;i<5;i++){
        arr.push(count+'%');
        count += one;
      }
      return arr;
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
.rocker{
  padding: 20px 0;
  .limb{
    min-height: 100%;
    width: 2px;
    margin-left: 100px;
    background: #AAB0C3;
    position: relative;
    .text{
      position: absolute;
      left: -40px;
      color:#1F2E4E;
      font-size: 14px;
      margin-top: -8px;
      font-weight: 700;
      &::selection { background:#ffffff; }
    }
    .branch{
      position: absolute;
      width: 30px;
      height: 2px;
      background: #AAB0C3;
    }
    .little_branch{
      position: absolute;
      width: 15px;
      height: 2px;
      background: #AAB0C3;
    }
    .block{
      position: absolute;
      top:0px;
      width: 106px;
      height: 58px;
      background: url('../../../assets/img/rocker.png') no-repeat center 100%;
      cursor: pointer;
    }
    .rotate{
      transform: translateY(29px) rotateX(180deg);
      transform-origin:top;
    }
  }
}
.title{
  width: 100%;
  height:50px;
  font-size: 16px;
  color:#1F2E4E;
  font-weight: 700;
  text-align: center;
  line-height: 50px;
  background: #F2F5FA;
}
.form_item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  span{
    font-size: 14px;
    color: #7686A8;
  }
}
.task_form_item_box{
  width: 60%;
  display: flex;
  align-items: center;
  .line{
    width: 20px;
    height: 1px;
    background: #000;
    margin: 0 5px;
  }
}
.table{
  margin-top: 30px;
  &>div{
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #1F2E4E;
    font-size: 16px;
    height: 50px;
    &>div{
      width: 100%;
      text-align: center;
    }
  }
  .table_header{
    background: #F2F5FA;
    font-weight: 700;
  }
}
.main{
  color: #212D4F;
  padding: 20px;
  background: #fff;
  border: 15px solid #E9EEF4;
  box-sizing: border-box;
  height:calc(100vh - 110px);
  overflow-y: auto;
  .content{
    display: flex;
    .content_left{
      margin-right: 25px;
      width: 40%;
      .content_left_top,.content_left_bottom{
        padding: 20px;
        border:1px solid #ececec;
      }
      .content_left_bottom{
        margin-top: 20px;
      }
      .content_left_remark{
        margin-top: 20px;
        color: #FF6173;
        .remark_title{
          font-size: 16px;
          font-weight: 700;
        }
        .remark_content{
          margin-top: 20px;
          font-size: 14px;
        }
      }
    }
    .content_right{
      padding: 20px;
      width:60%;
      border:1px solid #ececec;
      display: flex;
      .rocker{
        width: 40%;
      }
      .panel{
        width: 60%;
        position: relative;
        .panel_top{
         display: flex;
         justify-content:flex-end; 
        }
        .panel_bottom{
          position: absolute;
          bottom:-20px;
          right: -20px;
          padding: 10px;
          border-left:1px solid #ececec;
          border-top:1px solid #ececec;
          width: 100%;
          .panel_form{
            .panel_form_box{
              display: flex;
              justify-content: space-between;
              margin-top: 20px;
              margin-bottom: 50px;
              .panel_form_box_item{
                width: 50%;
                display: flex;
                justify-content: space-between;
                flex-grow: 1;
                align-items: center;
                span{
                  display: block;
                  width: 70px;
                  flex-grow: 0;
                  flex-shrink: 0;
                  font-size: 14px;
                  color: #7686A8;
                }
                div{
                  height: 36px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-grow: 1;
                  border:1px solid #E4EBF2;
                }
              }
              .panel_form_box_item:first-of-type{
                margin-right: 30px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
