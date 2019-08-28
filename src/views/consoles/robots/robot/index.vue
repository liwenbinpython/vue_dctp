<template>
  <div class="app-container exchange">
    <div class="title">
        <h4>机器人管理</h4>
        <div class="btngrop" style="float:right">
          <el-button type="primary" size="small" @click="go('/addrobot')">添加机器人</el-button>
          <el-button type="success" size="small" @click="startMulRobot()">启动机器人</el-button>
          <el-button type="danger" size="small"  @click="stopMulRobot()">停止机器人</el-button>
        </div>
    </div>
     
    <el-table
    :data="indexAllInfo.robot_list_info"
    @selection-change="handleSelectionChange"
    ref="multipleTable"
    :header-cell-style="{background:'#E9EEF4',color:'#7B85AB',fontWeight:'400'}"
    >
      <el-table-column width="50" align="center" prop="robot.id"  type='selection'>
        <!-- <template slot-scope="scope">
          <el-checkbox v-model="scope.row.checked" @change="getStartOrStopRobotID(scope.row.robot.id, scope.row.checked, scope.row.robot.status)"></el-checkbox>
        </template> -->
      </el-table-column>
      <el-table-column label="机器人id" prop="robot.id" align="center">
      </el-table-column>
      <el-table-column label="机器人名称" prop="robot.name" align="center">
      </el-table-column>
      <el-table-column label="策略名称" prop="strategy.strategy_name" align="center"></el-table-column>
      <el-table-column label="服务器" prop="robot.host" align="center"></el-table-column>
      <el-table-column prop='robot_strategy' v-if='false'></el-table-column>
      <el-table-column label="参数" align="center" prop='parameters'>
        <template slot-scope="scope" class="pop">
          <el-tooltip placement="bottom" effect="light" style="border: none;cursor: pointer;" transition="">
            <div slot="content" style="font-weight:bold">{{ scope.row.strategy.strategy_name }}</div>
            <div slot="content" style='color:#666;margin-top:8px;' v-for='(key,val, index) of scope.row.parameters' :key='index'>{{ key.description }} : {{ scope.row.robot_strategy[val] }}</div>
            <span style="color:#409EFF;cursor: pointer;">查看</span>
          </el-tooltip>
          <span style="color:#409EFF;margin-left:16px;cursor: pointer;" @click="modifyparams(scope.row.robot.id)" v-if='scope.row.robot.status === 0'>修改</span>
        </template>
      </el-table-column>
      <el-table-column label="授权" prop="robot.robot_type" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.robot_type === 'robot'">机器人</span>
          <span v-else>策略</span>
        </template>
      </el-table-column>
      <el-table-column label="授权码" prop="robot.authorization_id" align="center"></el-table-column>
      <el-table-column label="状态" prop="robot.status" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.robot.status === 1">启动</span>
          <span v-else>停止</span>
        </template>
      </el-table-column>
      <el-table-column label="控制" prop="control" align="center">
        <template slot-scope="scope">
          <button class='con_btn1' @click="startOrStop(scope.row.robot.id, scope.row.robot.status)" v-if='scope.row.robot.status === 1'>停止</button>
          <button class='con_btn' @click="startOrStop(scope.row.robot.id, scope.row.robot.status)" v-else>启动</button>
        </template>
      </el-table-column>
      <el-table-column label="运行日志" prop="log" align="center">
        <template slot-scope="scope">
          <span style="cursor: pointer;" @click="lookFor(scope.row.robot.id)">查看</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="bundle" align="center">
        <template slot-scope="scope">
          <!--<router-link :to="'/robot/hedge_data_download?robot_id='+ scope.row.robot.id" target='_blank' v-if='scope.row.strategy.strategy_code === "hedge_middle_price"'>下载报表</router-link>-->
          <span style="color:#409EFF;margin-right:16px;cursor: pointer;" @click="downloadReport(scope.row.robot.id)" v-if='scope.row.strategy.strategy_code === "hedge_middle_price"'>下载报表</span>
          <span style="color:#F56C6C;cursor: pointer;;" @click="delRobot(scope.row.robot.id, scope.row.robot.name)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper"
      @current-change="currentPage"
      :total="indexAllInfo.page_total">
    </el-pagination>
    <con :visible.sync="isStart" :text='qrText'></con>
    <modify :visible.sync="isShow" :params='childParams' @childModifyData='getChildParams'></modify>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from "vue-property-decorator";
  import { getRobotIndexInfo, startRobot,lookLog, stopRobot, selectSymbol, getSelectKeyList, StartMultiRobot, stopMultiRobot, deleteRobot } from '@/api/consoles'
  import con from '../popup/control.vue'
  import modify from '../popup/modifyparams.vue'
  import request from '@/utils/request';
  import { Message, MessageBox } from 'element-ui';
  @Component({
    components:{con, modify},
  })
  export default class RobotIndex extends Vue{
    private isStart:boolean = false
    private isShow:boolean = false
    private indexAllInfo:any = []
    private robot_id:number = 0
    private childParams:any = ''
    private checkBox:object[] = []
    private qrText:object = {}
    private multipleSelection:any = ''
    private multipleTable:any = []
    private logRobotId:number = 0
    private page:number = 1
    private created(){
      this.getRobotIndex()
    }

    // 获取批量启动或停止机器人列表
    private getStartOrStopRobotID(id:number, onOff:boolean, status:number){
      if(onOff){
        this.checkBox.push({robot_id: id, status: status})
      }else{
        let index = this.checkBox.indexOf({robot_id: id, status: status})
        this.checkBox.splice(index, 1)
      }
    }

    private handleSelectionChange(val:any) {
      this.multipleSelection = val;
    }

    // 获取机器人首页数据
    private getRobotIndex(page:number=1){
      getRobotIndexInfo('strategy',page).then((res) => {
        if(res.status === 200){
          this.indexAllInfo = res.data
        }
      })
    }
    // 获取子组件传递的参数
    private getChildParams(param:any){
      this.indexAllInfo = param;
    }
    // 停止机器人
    private stopMulRobot(){
      this.qrText = {}
      let stopList:number[] = []
      let stopStauts:any[] = []
      let close_id:any[] = []
      for(let r of this.multipleSelection){
        stopList.push(r.robot.id)
        stopStauts.push(r.robot.status)
      }
      for(let i in stopStauts){
        if(stopStauts[i] === 0){
          close_id.push(stopList[i])
        }
      }
      //if(close_id === undefined || close_id.length == 0){
        stopMultiRobot({robot_id_list: stopList}).then((res:any) => {
          if(res.status === 200){
            this.qrText = {robot_id: stopList, msg:'success', status: 'new_stop',content:res.msg}
            this.getRobotIndex(this.page);
            this.isStart = !this.isStart
          }
        })
        
      // }else{
      //   this.$alert('ID为:'+ close_id +'的机器人已停止', '温馨提示')
      // }
    }

    // 分页
    private currentPage(page:number){
      this.getRobotIndex(page)
      this.page = page
    }
    //查看
    private lookFor(id:any){
      lookLog(Number(id)).then((res) => {
        if(res.status === 200){
          let routeData = this.$router.resolve({
              path: '/runninglog?id='+ id
          })
          window.open(routeData.href, '_blank')
        }
      })
    }
    // 启动机器人
    private startMulRobot(){
      this.qrText = {}
      let robotIdList:number[] = []
      let robotStauts:any[] = []
      let flag_id:any[] = []
      for(let r of this.multipleSelection){
        robotIdList.push(r.robot.id)
        robotStauts.push(r.robot.status)
      }
      for(let i in robotStauts){
        if(robotStauts[i] === 1){
          flag_id.push(robotIdList[i])
        }
      }
      //if(flag_id === undefined || flag_id.length == 0){
        StartMultiRobot({robot_id_list: robotIdList}).then((res:any) => {
          if(res.status === 200){
            this.qrText = {robot_id: robotIdList, msg:'success', status: 'new_start',content:res.msg}
            this.getRobotIndex(this.page);
            this.isStart = !this.isStart
          }
        })
      // }else{
      //   this.$alert('ID为:'+ flag_id +'的机器人已启动', '温馨提示')
      // }
    }

    // 修改机器人参数
    private modifyparams(robot_id:number){
      this.isShow = !this.isShow
      for(let i of this.indexAllInfo.robot_list_info){
        if(robot_id === i.robot.id){
          let bindData = []
          let dat:any = {}
          let exchange_id_array:any = []
          for(let j=0;j<i.robot_strategy.robot_exchange_count;j++){
            for(let k in i.robot_strategy){
              if(k.startsWith('exchange_'+(j+1))){
                dat['exchange_'+(j+1)] = i.robot_strategy[k]
              }else if(k.startsWith('symbol_'+(j+1))){
                dat['symbol_'+(j+1)] = i.robot_strategy[k]
              }else if(k.startsWith('key_'+(j+1))){
                dat['key_'+(j+1)] = i.robot_strategy[k]
              }
            }
          }
          for(let x=0;x<i.robot_strategy.robot_exchange_count;x++){
            exchange_id_array.push(dat['exchange_'+ (x+1)][0])
            bindData.push({'exchange': (dat['exchange_'+ (x+1)] ? dat['exchange_'+ (x+1)][1] :null) + '-' + (dat['exchange_'+ (x+1)] ? dat['exchange_'+ (x+1)][0] :null),
            'symbol': (dat['symbol_'+ (x+1)]?  dat['symbol_'+ (x+1)][1] : null) +( dat['symbol_'+ (x+1)] ?  dat['symbol_'+ (x+1)][0] : null),
             'key': (dat['key_'+ (x+1)] ? dat['key_'+ (x+1)][1] : null) + (dat['key_'+ (x+1)] ? dat['key_'+ (x+1)][0] : null)
            })
          }
          let symbolList:any = []
          let keyList:any = []
          let first_exchange_id:any = []
          for(let y in bindData){
            first_exchange_id.push(bindData[y].exchange)
            let id:any = ''
            for(let i in dat){
              if(bindData[y].exchange === dat[i][1]+ '-' + dat[i][0]){
                id = dat[i][0]
                bindData[y].exchange = bindData[y].exchange.split('-')[0]
                break
              }
            }
            selectSymbol(id).then((res) => {
              if(res.status === 200){
                symbolList.push(res.data)
              }
            })
            getSelectKeyList(id).then((res) => {
              if(res.status === 200){
                keyList.push(res.data)
              }
            })
          }
          this.childParams = {
            key: i.parameters,
            val:i.robot_strategy,
            bindData: bindData,
            count:i.robot_strategy.robot_exchange_count,
            symbol:symbolList,
            keylist:keyList,
            firstExchangeId:first_exchange_id,
            robot_id: robot_id,
            idArray: exchange_id_array,
            curPage: this.page
          }
        }
      }
    }

    // 删除机器人
    private delRobot(robot_id:number, name:string){
      this.$alert('确定删除'+ name +'机器人吗？', '温馨提示').then(() => {
        deleteRobot(robot_id).then((res) => {
          if(res.status === 200){
            this.getRobotIndex(this.page)
          }
        })
      })
    }
    private go(url:string){
      this.$router.push({path: url})
    }

    // 启动或停止机器人
    private startOrStop(robot_id:number, status:any){
      if(status === 1){
        stopRobot(robot_id).then((res) => {
          if(res.status === 200){
            this.qrText = {robot_id: robot_id, msg:'success', status: 'stop'}
            this.isStart = !this.isStart
            this.getRobotIndex(this.page) // 刷新页面
          }
        })
      }else{
        startRobot(robot_id).then((res) => {
          if(res.status === 200){
            this.qrText = {robot_id: robot_id, msg:'success', status: 'start'}
            this.isStart = !this.isStart
            this.getRobotIndex(this.page) // 刷新页面
          }
        })
      }
    }
    get token() {
      return this.$store.state.user.token;
    }
    //下载报表
    private downloadReport(robot_id:any) {
      let m_iframe = document.createElement("iframe");
      m_iframe.style.width = 0+'px';
      m_iframe.style.height = 0+'px';
      m_iframe.src=`api/robot/hedge_data_download?token=${this.token}&robot_id=${robot_id}`;
      document.body.appendChild(m_iframe);
    }
  }
</script>

<style scoped>
  ul{
    list-style: none;
  }
  .exchange{
    color: #212D4F;
    padding-top:10px;
    background: #fff;
    border: 15px solid #E9EEF4;
    position: relative;
  }
  h4{
    padding: 10px 0;
    margin: 0;
    float: left;
  }
  #choice{
    position: absolute;
    left: 58px;
    z-index: 999;
    top:67px;
    font-size: 13px;
    color:rgb(123, 133, 171);
  }
  .title{
    overflow: hidden;
    border-bottom: 1px solid #E9EEF4;
  }
  .el-table{
    border: 1px solid #E9EEF4;
  }
  .el-table td{
    border: none;
  }
  p, span{
    
    margin: 0;
  }
  div[id~=el-tooltip]{
    border: none;
  }
  .con_btn{
    background: none;
    outline: none;
    border: 1px solid #67C23A;
    font-size: 12px;
    padding: 2px 10px;
    border-radius: 3px;
    color: #67C23A;
    cursor: pointer;
  }
  .con_btn1{
    background: none;
    outline: none;
    border: 1px solid #F56C6C;
    font-size: 12px;
    padding: 2px 10px;
    border-radius: 3px;
    color: #F56C6C;
    cursor: pointer;
  }
  .con_btn:hover{
    background: #67C23A;
    color:#fff;
  }
  .el-pagination{
    text-align: center;
    margin-top:20px;
  }
</style>

