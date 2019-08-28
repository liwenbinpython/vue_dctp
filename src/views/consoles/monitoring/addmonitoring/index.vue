<template>
  <div class="app-container addrobot">
    <div class="title">
        <h4>添加监控
          <button class='back' @click="back()">返回 <i class="el-icon-refresh-left"></i></button>
        </h4>
    </div>
    <el-form style="margin-top:10px;width:500px;margin:0 auto">
      <el-form-item label="服务器">
        <el-select style="width:500px;" v-model="serverName" @change="isShowStrategy(accredit_type)">
          <el-option v-for='(server, index) of serverList' :key='index' :label="server" :value="server"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="监控列表">
        <!-- <el-select style="width:500px;" v-model="accredit_id" @change='getAuthorRobot(accredit_id, accredit_type)' v-if="accredit_type === 'robot'">
          <el-option v-for='(author, index) of AuthorizationList' :key='index' :label="author.strategy_name + ' ——— 授权使用率：' + author.authorization_rate" :value="author.strategy_code" ></el-option>
        </el-select> -->
        
        <el-select style="width:500px;" v-model="accredit_id" @change='setRobotParams(accredit_id)'>
          <el-option v-for='(author, index) of AuthorizationList' :key='index' :label="author.strategy_name" :value="author.strategy_code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="监控名字">
        <el-input style="width:500px;" v-model="robotName"></el-input>
      </el-form-item>
      <el-form-item v-show='strategy_show' label="策略">
        <el-select style="width:500px;" v-model="strategy_code" @change="setRobotParams(strategy_code)">
          <el-option v-for='(robot, index) of authorRobotList' :key='index' :label="robot.strategy_name" :value="robot.strategy_code"></el-option>
        </el-select>
      </el-form-item>
      </el-form>
      <div class="config">
        <h5>配置参数</h5>
        <el-form style="width:500px;margin:0 auto" ref="form" :model="config.parameters" :rules="rules">
          <el-form-item v-for='(item,index) in exchangeSymbolKeyList' :key='index'>
            <label for="" style="margin-top:30px">交易所</label>
            <el-select style="width:100%" v-model="exchangeSymbolKeyList[index].exchange" @change='getSelectSymbol(exchangeSymbolKeyList[index].exchange, index)'>
              <el-option v-for="(ex, index) of exchangeList" :key='index' :label="ex.exchange_name" :value="ex.exchange_name"></el-option>
            </el-select>
            <label for="" style="margin-top:30px">symbol</label>
            <el-select style="width:100%" v-model="exchangeSymbolKeyList[index].symbol">
              <el-option v-for='(s, index) of symbolList[index]' :key='index+"+"' :label="s.name" :value="s.id"></el-option>
            </el-select>
            <label for="" style="margin-top:30px">key</label>
            <el-select style="width:100%" v-model="exchangeSymbolKeyList[index].key">
              <el-option v-for='(key,index) of keyList[index]' :key='index+"-"' :label="key.key_name" :value="key.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :prop="index" v-for="(opt, index) of config.parameters" :key='index+"-"' :label="opt.description" style="margin-top;-10px">
            <el-select style="width:500px;" v-model="opt.value" v-if="opt.html_type === 'radio'">
              <el-option v-for='(par, index) of opt.html_value' :key='index' :label="String(par)" :value="par" ></el-option>
            </el-select>
            
            <el-checkbox-group v-model="opt.value" v-else-if="opt.html_type === 'checkbox_notice'">
              <el-checkbox v-for='(par, index) of opt.html_value' :key='index+"+"' :label="String(par)" :value="par"></el-checkbox>
            </el-checkbox-group>
           
            <el-input v-else v-model="opt.value"></el-input>
          </el-form-item>
          <el-form-item v-if='btn_show'>
            <el-button type='primary' style="width:100%;margin-top:20px" @click="addRobot">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import { getAccreditType, getAccreditRobot, getStrategyAllParams, getAccreditAllParams, addNewRobot, selectExchange, selectSymbol, getServerList, getSelectKeyList, getMonitoring } from '@/api/consoles'
  import { ElForm } from 'element-ui/types/form';
  const validateData = (rule: any, value: any, callback: any) => {
    let newValue = value.value;
    if(newValue == ''){
      callback(new Error('请输入'+value.description));
    }else{
      callback();
    }
  };

  @Component
  export default class addRobots extends Vue{ 
    private isShow:boolean = false
    private strategy_show = false
    private config:object = {}
    private AuthorizationList:object[] = []
    private authorization_id:number = 0
    private accredit_type:string = ''
    private accredit_id:any = ''  // 监控类型名称
    private strategy_code:string = ''
    private authorRobotList:object[] = []
    private flag:string = ''
    private params:any = ''
    private btn_show:boolean = false
    private exchangeList:any[] = []
    private exchangeCount:any[] = []
    private symbolList:any[] = []
    private keyList:any[] = []
    // 服务器列表
    private serverList:any[] = []  
    private serverName:string = ''
    // 机器人名称
    private robotName:string = ''
    // 多组 (交易所 symbol key) 对应的绑定
    private exchangeSymbolKeyList:any[] = []
    private rules = {
      
    };
    @Watch('flag')
    watchFlag(newVal:string, oldVal:string) {
      if(newVal !== oldVal){
        this.accredit_id = ''
        this.config = []
        this.btn_show = false
      }
    }
    @Watch('accredit_type')
    watchaAcreditType(newVal:string, oldVal:string){
      if(newVal === 'robot' && this.exchangeSymbolKeyList){
        this.exchangeSymbolKeyList = []
      }
    }
    
    private created(){
      this.getSever();
    }

    // 动态显示参数(机器人授权)
    private setRobotParams(code:string){
      this.exchangeSymbolKeyList = []
      getStrategyAllParams(code, this.accredit_type).then((res) => {
        if(res.status === 200){
          for(let i in res.data.parameters){
            if(res.data.parameters[i].html_type === 'checkbox_notice'){
              res.data.parameters[i].value = []
            }else{
              res.data.parameters[i].value = ''
            } 
          }
          this.exchangeCount = []
          for(let i=0;i<res.data.exchange_count;i++){
            this.exchangeSymbolKeyList.push({exchange:'', symbol:'', key:''})
          }
          this.config = res.data
          this.btn_show = true
          let formData = res.data.parameters;
          let _this = this;
          Object.keys(formData).forEach(item => {
            if(!formData[item].html_type){
              (this.rules as any)[item] = [{ required: true, trigger: 'blur', validator: validateData }]
            }
          })
        }
      })
    }

    // 动态显示策略选项
    private isShowStrategy(params:string){
      if(params === 'robot'){
        this.strategy_show = true
      }else{
        this.strategy_show = false
      }
      this.flag = params
      this.getAuthorizationType(params)
      this.getSelectExchange()
    }

    // 获取监控列表
    private getAuthorizationType(params:string){
      getMonitoring().then((res) => {
        if(res.status === 200){
          this.AuthorizationList = res.data
        }
      })
    }

    // 获取授权机器人
    private getAuthorRobot(author_id:number, author_type:string){
      getAccreditRobot(author_id, author_type).then((res) => {
        if(res.status === 200){
          this.authorRobotList = res.data
        }
      })
    }

    // 获取交易所下拉框选项
    private getSelectExchange(){
      selectExchange().then((res) => {
        if(res.status === 200){
          this.exchangeList = res.data
        }
      }) 
    }
    
    private getSelectSymbol(name:any, index:number){
      this.exchangeSymbolKeyList[index].symbol = ''
      this.exchangeSymbolKeyList[index].key = ''
      //下拉框选择获取交易所下的symbole
      let id:any = ''
      for(let i in this.exchangeList){
        if(this.exchangeList[i].exchange_name === name){
          id = this.exchangeList[i].exchange_id
          break
        }
      }
      selectSymbol(id).then((res) => {
        if(res.status === 200){
          (this.symbolList as any).splice(index, 1, res.data)
        }
      })
      // 获取下拉框选择获取交易所下的key
      getSelectKeyList(id).then((res) => {
        if(res.status === 200){
          (this.keyList as any).splice(index, 1, res.data)
        }
      })
    }

    // 获取服务器列表
    private getSever(){
      getServerList().then((res) => {
        if(res.status === 200){
          this.serverList = res.data
        }
      })
    }

    private back(){
      this.$router.go(-1)
    }

    // 添加监控
    private addRobot(){
      (this.$refs.form as ElForm).validate((valid: boolean) => {
        if(valid){
          let params:any = {}
          params['strategy_code'] = this.accredit_id
          params['robot_name'] = this.robotName
          for(let par in (this.config as any).parameters){
            if((this.config as any).parameters[par].value instanceof Array){
              params[par] = JSON.stringify((this.config as any).parameters[par].value)
            }else{
              params[par] = (this.config as any).parameters[par].value
            }
          }
          for(let esk in this.exchangeSymbolKeyList){
            params['exchange_id_' + (Number(esk)+1)] = ''
            for(let index in this.exchangeList){
              if(this.exchangeList[index].exchange_name === this.exchangeSymbolKeyList[esk].exchange){
                params['exchange_id_' + (Number(esk)+1)] = this.exchangeList[index].exchange_id
              }
            }
            params['symbol_id_' + (Number(esk)+1)] = this.exchangeSymbolKeyList[esk].symbol
            params['key_id_' + (Number(esk)+1)] = this.exchangeSymbolKeyList[esk].key
          }
          params['host'] = this.serverName
          params['authorization_type'] = "monitor"
          params['authorization_id'] = this.accredit_id
          
          addNewRobot(params).then((res) => {
            if(res.status ===200){
              this.$router.go(-1)
            }
          })
        }
     });
    }
  }
</script>

<style scoped lang='scss'>
  @import '@/styles/back.scss';
  .addrobot{
    color: #212D4F;
    padding-top:10px;
    background: #fff;
    border: 15px solid #E9EEF4;
  }
  h4{
    padding: 10px 0;
    margin: 0;
    float: left;
  }
  .title{
    overflow: hidden;
    border-bottom: 1px solid #E9EEF4;
  }
  .el-form-item__content{
    width:500px;
    margin: 0 auto;
  }
  p{
    margin: 0;
  }
  .config h5{
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    padding: 10px 0;
    margin: 0;
  }
</style>