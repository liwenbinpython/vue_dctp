<template>
  <div class="app-container runninglog">
    <div class="title">
        <h4>运行日志</h4>
    </div>
    <div class="content">
      <ul>
        <li v-for="(data, index) of logData" :key='index'>
          <p><span style="color:#409EFF;font-size:14px;">时间：</span>{{ data[0] }}</p>
          <p>{{ data[1] }}</p>
          <p>{{ data[2] }}：{{ data[3] }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import { lookLog } from '@/api/consoles'
  @Component
  export default class Runninglog extends Vue{
    private url:string = ''
    private logData:any[] = []
    @Watch('logData')
    private WatchlogData(newVal:any, oldVal:any){
      if(newVal.lenght > 300){

      }
    }

    private beforeUpdate(){
      let scrollTop = document.documentElement.scrollTop
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      if(scrollTop + clientHeight >= scrollHeight){
        this.$nextTick(() => {
          document.documentElement.scrollTop = document.documentElement.scrollHeight;
        })
      }
    }

    private created(){
      let robot_id = this.$route.query.id
      lookLog(Number(robot_id)).then((res) => {
        if(res.status === 200){
          let ws = new WebSocket(res.data)
          ws.onopen = () => {
            ws.send(JSON.stringify({robot_id: robot_id, status: 201}))
          }
          ws.onmessage = (res) => {
            for(let i in JSON.parse(res.data).log){
              this.logData.push(JSON.parse(res.data).log[i])
            }
          }
         }
      })
    }
  }
</script>

<style scoped>
  .runninglog{
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
  }
  .content{
    clear: both;
    white-space: pre-wrap
  }
  ul li p{
    margin:5px 0;
    width: 100%;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
  ul li {
    margin-top:15px;
  }
</style>
