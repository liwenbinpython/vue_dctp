<template>
  <div class="popupbox">
    <el-dialog :visible.sync="visible" :show-close="false" width="500px" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false">
    <h4 slot="title">修改交易对值</h4>
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
      <el-form style="margin-top:-20px" :model="ruleForm" :rules="rules" ref="ruleForm" >
          <el-form-item prop="symbol_name" label="交易对象名">
            <el-input v-model="ruleForm.symbol_name"></el-input>
          </el-form-item>

          <el-form-item prop="symbol" label="交易对">
            <el-input v-model="ruleForm.symbol"></el-input>
          </el-form-item>

          <el-form-item prop="code" label="交易对交易代码">
            <el-input v-model="ruleForm.code"></el-input>
          </el-form-item>

          <el-form-item prop="digits" label="价格小数位数">
            <el-input v-model="ruleForm.digits"></el-input>
          </el-form-item>

          <el-form-item prop="price_step" label="价格最小变动值">
            <el-input v-model="ruleForm.price_step"></el-input>
          </el-form-item>

          <el-form-item prop="min_lot" label="最小下单数量">
            <el-input v-model="ruleForm.min_lot"></el-input>
          </el-form-item>

          <el-form-item prop="lot_step" label="下单数量最小变动值">
            <el-input v-model="ruleForm.lot_step"></el-input>
          </el-form-item>

          <el-form-item prop="max_lot" label="最大下单数量">
            <el-input v-model="ruleForm.max_lot"></el-input>
          </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width:400px;margin:0 30px;margin-top:30px;" @click="modifySymbol('ruleForm')">确定</el-button>
        </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import { modifyMySymbol, getSymbolList } from '@/api/consoles';
    import { ElForm } from 'element-ui/types/form';
import { resolve4 } from 'dns';
  @Component
  export default class Modify extends Vue{
    @Prop({ default: false }) private visible!: boolean;
    @Prop({ default: {} }) private childparams!: object;
    @Prop({ default: 1 }) private id!: number;
    private cancelModal(){
      // 关闭弹窗，触发父组件修改visible值
      this.$emit('update:visible', false);
    }
    private ruleForm:any = {};
    @Watch("childparams")
    watchChildparams(newVal: boolean) {
      this.ruleForm = newVal;
    }
    private rules:any = {
      symbol_name: [
        { required: true, message: '请输入交易对象名', trigger: 'blur' },
        {max: 32, required: true, message: '交易对象名输入有误', trigger: 'blur'},
      ],
      symbol:[
        {required: true, message: '请输入交易对', trigger: 'blur'},
        {max: 64, required: true, message: '交易对输入有误', trigger: 'blur'},
      ],
      code:[
        {required: true, message: '请输入交易对交易代码', trigger: 'blur'},
        {max: 64, required: true, message: '交易对交易代码输入有误', trigger: 'blur'},
      ],
      digits:[
        {required: true, message: '请输入价格小数位数', trigger: 'blur'},
        {pattern: /^[0-9]+$/, required: true, message: '价格小数位数只能输入整数', trigger: 'blur'},
      ],
      price_step:[
        {required: true, message: '请输入价格最小变动值', trigger: 'blur'},
        {pattern:  /^\d+(?:\.\d+)?$/, required: true, message: '价格最小变动值只能输入数字', trigger: 'blur'},
      ],
      min_lot:[
        {required: true, message: '请输入最小下单数量', trigger: 'blur'},
        {pattern:  /^\d+(?:\.\d+)?$/, required: true, message: '最小下单数量只能输入数字', trigger: 'blur'},
      ],
      lot_step:[
        {required: true, message: '请输入下单数量最小变动值', trigger: 'blur'},
        {pattern: /^\d+(?:\.\d+)?$/, required: true, message: '下单数量最小变动值只能输入数字', trigger: 'blur'},
      ],
      max_lot:[
        {required: true, message: '请输入最大下单数量', trigger: 'blur'},
        {pattern: /^\d+(?:\.\d+)?$/, required: true, message: '最大下单数量只能输入数字', trigger: 'blur'},
      ]
    }
    private modifySymbol(formName: any){
      if(this.ruleForm){
        (this.$refs[formName] as ElForm).validate((valid:any) => {
          if(valid){
            modifyMySymbol(this.ruleForm).then((res) => {
              if(res.status === 200){
                this.cancelModal()
                getSymbolList(this.id).then((res) => {
                  if(res.status === 200){
                    this.$emit('childModifyData', res.data)
                  }
                })
              }
            })
          }
          
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  h4{
    padding: 0;
    margin-top:0px;
  }
  .form{
    padding:0 10px;
  }
  .el-dialog{
    height:300px;
  }
  .el-form-item{
    margin-bottom: 20px;
  }
  .el-form-item__content{
    line-height: 20px;
  }
  .el-dialog__body{
    padding: 30px !important;
  }
</style>
