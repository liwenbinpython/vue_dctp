<template>
  <div class="orderList">
    <div class="list_header header">
      <el-row>
        <el-col :span="8">
          <div class="grid-content">订单名称</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">支付金额</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">状态</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">产品时长</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">操作</div>
        </el-col>
      </el-row>
    </div>
    <div class="list">
      <div class="item"  v-for="item in list" :key="item.order_id">
        <div class="item_header header">
          <div class="item_header_left">
            <span>{{item.settlement_time}}</span>
            <span>订单单号：{{item.order_id}}</span>
            <span @click="serviceIsShow = true" class="service">
              联系客服
              <i class="el-icon-service"></i>
            </span>
          </div>
          <div @click="deleteOrder(item.order_id)" class="item_header_right">
            <i class="el-icon-delete"></i> 删除
          </div>
        </div>
        <div class="item_content">
          <el-row>
            <el-col :span="8">
              <div class="grid-content">{{item.title}}</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">{{item.order_amount + item.settlement_currency}}</div>
            </el-col>
            <el-col :span="4">
              <div v-if="item.order_status == 0" class="grid-content danger">未付款</div>
              <div v-else-if="item.order_status == 1" class="grid-content success">已付款</div>
              <div v-else-if="item.order_status == 2" class="grid-content">已失效</div>
              <div v-else class="grid-content">正在付款</div>
            </el-col>
            <el-col :span="4">
              <div v-if="item.billing_method == 'day'" class="grid-content">{{item.duration}}天</div>
              <div v-else-if="item.billing_method == 'month'" class="grid-content">{{item.duration}}月</div>
              <div v-else class="grid-content">---</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content" style="border:none">
                
                <el-button v-if="item.order_status === 0" @click="payment(item.order_id,item.title)" style="width:80px;" size="mini" type="danger">立即付款</el-button>
                <el-button
                  v-if="item.order_status != 0"
                  @click="details(item.order_id)"
                  style="width:80px;"
                  size="mini"
                  type="primary"
                >订单详情</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="none" v-if="list.length == 0">暂无数据</div>
      <div class="page">
        <el-pagination
         @current-change="handleCurrentChange"
          prev-text = "上一页"
          next-text = "下一页"
          layout="prev, pager, next, jumper"
          :total="data.total"
          :page-size="data.page_size"
          :current-page = "data.currentPage"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 联系客服弹出框 -->
    <el-dialog
      title="联系客服"
      :visible.sync="serviceIsShow"
      width="500px"
      >
      <div class="serviceBox">
        <img src="@/assets/img/qrcode.jpg" alt="">
        <p>请微信扫描关注</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="serviceIsShow = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="订单详情" :visible.sync="dialogVisible" width="500px">
      <div class="detial">
        <div class="addr">
          收款地址 :
          <span>{{orderDetial.settlement_address}}</span>
        </div>
        <p>商品名称 : {{orderDetial.title}}</p>
        <p v-if="orderDetial.mall_type == 'strategy'">商品类型 : 策略类</p>
        <p v-else-if="orderDetial.mall_type == ' robot'">商品类型 : 机器人类</p>
        <p v-else>商品类型 : 服务商品</p>

        <p>商品描述 : {{orderDetial.description}}</p>
        <p v-if="orderDetial.billing_method == 'day'">商品价格 : {{orderDetial.mall_price}}/天</p>
        <p v-else-if="orderDetial.billing_method == 'month'">商品价格 : {{orderDetial.mall_price}}/月</p>
        <p v-else>商品价格 : {{orderDetial.mall_price}}</p>

        <p v-if="orderDetial.billing_method == 'day'">商品时长 : {{orderDetial.duration}}天</p>
        <p v-else-if="orderDetial.billing_method == 'month'">商品时长 : {{orderDetial.duration}}月</p>
        <p v-else>商品时长 : {{orderDetial.duration}}</p>
        <p>商品到期时间 : {{orderDetial.settlement_time}}</p>
        <p>结算币种 : {{orderDetial.settlement_currency}}</p>

        <p v-if="orderDetial.order_status == 0">状态 : 未付款</p>
        <p v-else-if="orderDetial.order_status == 1">状态 : 已付款</p>
        <p v-else-if="orderDetial.order_status == 2">状态 : 已失效</p>
        <p v-else>状态 : 正在付款</p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteOrder(orderDetial.order_id)" size="small" type="danger" plain>删 除</el-button>
        <el-button size="small" type="primary" @click="serviceIsShow = true">联系客服</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { del , delOrder} from '@/api/mall';
import { getUserOrder } from '@/api/user.ts'
import { Message, MessageBox } from 'element-ui';
import { setTimeout } from 'timers';
@Component({
  components: {}
})
export default class userInfo extends Vue {
  private list = [];
  private orderDetial = {

  };
  private type = 2;
  private data = {
    page_size:10,              // 每页条数
    total:0,                  // 数据总数
    currentPage : 1          // 当前页码
  };
  private dialogVisible = false;
  private serviceIsShow = false;
  private details(id:any){
    this.dialogVisible = true;
    getUserOrder(1,id,1).then((res:any) => {
      if(res.status === 200){
        this.orderDetial = res.data[0];
      }
    })
  }
private deleteOrder(orderId:any) {
    MessageBox.confirm(
      '你是否确定删除订单',
      '删除订单',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      },
    ).then(() => {
      delOrder({order_id: orderId,}).then((response: any) => {
        this.dialogVisible = false;
        if (response.status === 200) {
          this.fetchData();
          Message({
            message: response.msg,
            type: 'success',
            duration: 2 * 1000,
          });
        }
      });
    });
  }
private payment(id:any,title:any) {
  this.$router.push({
    path: `/mall/detail?mall_order_id=${id}&title=${title}`
  })
}

  // 获取续费订单列表
  private fetchData() {
    getUserOrder(this.type,null,this.data.currentPage).then((res:any) => {
      if(res.status === 200){
        this.list = res.data;
        this.data.total = res.volume;
      }
    })
  }
  // 页码发生改变
  private handleCurrentChange(page : number) {
    this.data.currentPage = page;
    this.fetchData();
  }
  mounted () {
    this.fetchData();
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/variables.scss";
.orderList {
    
  .header {
    height: 50px;
    background: #e9eef4;
    line-height: 50px;
    font-size: 14px;
  }
  .list_header {
    .grid-content {
      text-align: center;
      color: $fontColor;
    }
  }
  .none{
      height: 50px;
      line-height: 80px;
      text-align: center;
      color: #ccc;
  }
  .list {
    .item {
      margin-top: 20px;
      border: 1px solid #eee;
      .item_header {
        display: flex;
        padding-left: 20px;
        justify-content: space-between;
        color: $fontColor;
        span {
          margin-right: 50px;
        }
        .service {
          color: #409eff;
          cursor: pointer;
          i {
            margin-left: 5px;
          }
        }
        .item_header_right {
          width: 16.9%;
          text-align: center;
          color: #fe6073;
          cursor: pointer;
        }
      }
      .item_content {
        padding: 20px 0;
        .grid-content {
          text-align: center;
          height: 50px;
          border-right: 1px solid #eee;
          line-height: 50px;
          p {
            margin: 10px 0 0 0;
            font-size: 14px;
            cursor: pointer;
          }
        }
        .success {
          color: #409eff;
        }
        .danger {
          color: #fe6073;
        }
      }
    }
  }

}
.serviceBox{
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.detial {
  .addr {
    padding-left: 80px;
    span {
      color: #409eff;
      cursor: pointer;
    }
  }
  p {
    padding-left: 80px;
    margin: 20px 0;
  }
}
.page{
    margin-top:20px;
    display: flex;
    justify-content: center;
  }
</style>