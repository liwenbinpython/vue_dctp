<template>
  <div class="popupbox">
    <el-dialog :visible.sync="visible" :show-close="false" width="500px" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false"> 
    <h4 slot="title">修改监控参数</h4>
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
      <el-form style="margin-top:-20px; width:400px;margin:0 auto;" ref="form" :model="params" :rules="rules">
        <el-form-item v-for='(item,index) of params.bindData' :key='index'>
          <label for="" style="margin-top:30px">交易所</label>
          <el-select style="width:100%" v-model="params.bindData[index].exchange" @change="initSelectSymbolAndKey(params.bindData[index].exchange, index)">
            <el-option v-for="(ex, index) of exchangeList" :key='index' :label="ex.exchange_name" :value="ex.exchange_name"></el-option>
          </el-select>
          <label for="" style="margin-top:30px">symbol</label>
          <el-select style="width:100%" v-model="params.bindData[index].symbol">
            <el-option v-for='(s, index) of params.symbol[index]' :key='s + index' :label="s.name" :value="s.name+s.id"></el-option>
          </el-select>
          <label for="" style="margin-top:30px">key</label>
          <el-select style="width:100%" v-model="params.bindData[index].key">
            <el-option v-for='(key,index) of params.keylist[index]' :key='key + index' :label="key.key_name" :value="key.key_name+key.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-for="(name, value, index) of params.key" :key="index+'+'" :prop="value">
          <label for="">{{ name.description }} </label>
          <el-select v-if="name.html_type === 'radio'" v-model="param[value]" style="width:100%">
            <el-option v-for="(opt, index) of params.key[value].html_value" :key="index + '_'" :label="String(opt)" :value="opt"></el-option>
          </el-select>
          <el-checkbox-group v-model="param[value]" v-else-if="name.html_type === 'checkbox_notice'">
            <el-checkbox v-for='(par, index) of params.key[value].html_value' :key='index+"*"' :label="String(par)" :value="par"></el-checkbox>
          </el-checkbox-group>
          <el-input v-else  style="width:100%;margin:0 auto;" v-model="params.val[value]"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;margin-top:30px;" @click="putCurrentParams">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import { modifyRobotParams, selectExchange, selectSymbol, getSelectKeyList, getRobotIndexInfo } from '@/api/consoles'
  import { constants } from 'crypto';
  import { connect } from 'http2';
  const validatePass = (rule: any, value: string, callback: any) => {
    console.log(value);
    // if (value.length < 5) {
    //   callback(new Error('密码不能小于5位'));
    // }else if(value.indexOf(" ")!=-1){
    //   callback(new Error('密码不能含有空格'));
    // } else {
    //   callback();
    // }
  };
  @Component
  export default class ModifyParams extends Vue{
    @Prop({ default: false }) private visible!: boolean;
    @Prop({ default: '' }) private params!: any;
    private param:any = ''
    private count:number = 0
    private exchangeList:any = ''
    private symbolList:any = []
    private keyList:any = []
    private test:any={}

    private rules:any = {
      password: [{ required: true, trigger: 'blur', validator: validatePass }],
    };
    private cancelModal(){
      // 关闭弹窗，触发父组件修改visible值
      this.$emit('update:visible', false);
    }
    @Watch('params')
    watchParams(newVal:boolean, oldVal:boolean){
      console.log(newVal);
      let keys:any = this.params.key;
      Object.keys(keys).forEach((item:any) => {
        if(!keys[item].html_type){
          this.rules[item] = [{ required: true, trigger: 'blur', validator: validatePass }]
        }
      })
    }
    @Watch('visible')
    watchVisible(newVal:boolean, oldVal:boolean){
      if(newVal === true){
        for(let i in this.params.val){
          if(i === 'notice'){
            this.params.val[i] = JSON.parse(this.params.val[i])
          }
        }
        this.param = JSON.parse(JSON.stringify(this.params.val))
        this.getExchange()
        // this.count = 1
      }
    }

     // 添加机器人修改后参数
    private putCurrentParams(){
      let subParams:any = {}
      for(let ex in this.params.bindData){
        subParams['exchange_id_' + (Number(ex)+1)] = ''
        for(let id in this.exchangeList){
          if(this.params.bindData[ex].exchange === this.exchangeList[id].exchange_name){
            subParams['exchange_id_' + (Number(ex)+1)] = this.exchangeList[id].exchange_id
          }
        }
        subParams['symbol_id_' + (Number(ex)+1)] = ''
        for(let i in this.params.symbol){
          for(let j in this.params.symbol[i]){
            if(this.params.bindData[ex].symbol === this.params.symbol[i][j].name+this.params.symbol[i][j].id){
              subParams['symbol_id_' + (Number(ex)+1)] = this.params.symbol[i][j].id
            }
          }
        }
        
        subParams['key_id_' + (Number(ex)+1)] = ''
        for(let i in this.params.keylist){
          for(let j in this.params.keylist[i]){
            if(this.params.bindData[ex].key === this.params.keylist[i][j].key_name+this.params.keylist[i][j].id){
              subParams['key_id_' + (Number(ex)+1)] = this.params.keylist[i][j].id
            }
          }
        }
        
      }
      for(let v in this.params.key){
        for(let y in this.param){
          if(v === y){ 
            if(this.params.key[y].html_type === 'radio'){ // 下拉框取值
              subParams[v] = this.param[v]
            }if(this.params.key[y].html_type === 'checkbox_notice'){ // 下拉框取值
              subParams[v] = JSON.stringify(this.param[v])
            }else{
              subParams[v] = this.params.val[v] // 输入框取值
            }
          }
        }
      }
      subParams['robot_id'] = this.params.robot_id
      modifyRobotParams(subParams).then((res) => {
        if(res.status === 200){
          this.cancelModal()
          this.getExchange()
          getRobotIndexInfo('monitor',this.params.curPage).then((res) => {
            if(res.status === 200){
              this.$emit('childModifyData', res.data)
            }
          })
          this.$alert('参数修改成功！', '温馨提示')
        }
      })
    }

    // 获取交易所列表
    private getExchange(){
      selectExchange().then((res) => {
        if(res.status === 200){
          this.exchangeList = res.data
        }
      })
    }
    
    // 初始化symbol key 下拉列表
    private initSelectSymbolAndKey(exchange_name:any, index:number){
      let id:any = ''
      for(let i in this.exchangeList){
        if(this.exchangeList[i].exchange_name === exchange_name ){
          id = this.exchangeList[i].exchange_id
          break
        }
      }
      this.params.bindData[index].symbol = ''
      this.params.bindData[index].key = ''
      this.getSymbol(id, index)
      this.getKey(id, index)
    }

    // 获取symbol列表
    private getSymbol(exchange_id:number, index:number){
      selectSymbol(exchange_id).then((res) => {
        if(res.status === 200){
          (this.params.symbol as any).splice(index, 1, res.data)
        }
      })
    }

    // 获取key列表
    private getKey(exchange_id:number, index:number){
      getSelectKeyList(exchange_id).then((res) => {
        if(res.status === 200){
          (this.params.keylist as any).splice(index, 1, res.data)
        }
      })
    }

  }
</script>

<style lang="scss" scoped>
  h4{
    padding: 0;
    margin-top:0px;
  }
  .el-dialog{
    height:300px;
  }
  .el-input{
    width:400px;
    margin:0px 30px;
  }
  .el-form-item{
    margin-bottom: 0;
  }
  .el-form-item__content{
    line-height: 20px;
  }
  .el-dialog__body{
    padding-top: 0 !important;
  }
</style>
