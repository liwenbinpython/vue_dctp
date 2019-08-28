import request from '@/utils/request';

// 获取资源列表
export const getMyResource = () =>{
  return request({
      url: '/user_resource',
      method: 'get',
  });
}

// 查看我的授权
export const getMyAuthorization = (authorization_id:number) => {
  return request({
    url: '/user_resource/auth_robot',
    method: 'get',
    params:{
      authorization_id
    }
  });
}

// 获取授权列表
export const Accredit = (page:number=1) => {
  return request({
    url: '/user_resource/auth',
    method: 'get',
    params:{
      page
    }
  });
}
//删除我的授权
export const deleteAccredit = (authorization_id:any) => {
  return request({
    url: '/user_resource/auth',
    method: 'delete',
    params: {
      authorization_id
    }
  });
}
//还原回收站信息
export const restoreRecycled = (recycle_id_list: any) => {
  return request({
    url: '/recycle_bin/select_revert',
    method: 'post',
    data: {
      'recycle_id_list[]': recycle_id_list
    }
  });
}
//删除回收站信息
export const deleteRecycled = (recycle_id_list: any) => {
  return request({
    url: '/recycle_bin/select_delete',
    method: 'post',
    data: {
      'recycle_id_list[]':recycle_id_list
    }
  });
}
//单个还原回收站信息
export const restoreSingleRecycled = (recycle_id: any) => {
  console.log(recycle_id)
  return request({
    url: '/recycle_bin',
    method: 'post',
    data: {
      recycle_id
    }
  });
}
//单个删除回收站信息
export const deleteSingleRecycled = (recycle_id: any) => {
  return request({
    url: '/recycle_bin',
    method: 'delete',
    params: {
      recycle_id
    }
  });
}

// 获取我的消息
export const getMymessage = () => {
  return request({
    url: '/user/message',
    method: 'get',
    params: {
      all_message: 'all_message',
      page: 1
    }
  });
}

// 我的服务
export const getService = () => {
  return request({
    url: '/user_resource/service',
    method: 'get',
  });
}

// 获取交易所列表
export const getExchange = () => {
  return request({
    url: '/exchange',
    method: 'get',
  });
}

// 可添加的交易所列表
export const addExchangeList = () => {
  return request({
    url: '/exchange_store',
    method: 'get',
  });
}

// 添加交易所
export const addExchange = (exchange_name:string) => {
  return request({
    url: '/exchange',
    method: 'post',
    data: {
      exchange_name
    }
  });
}

// 删除交易所
export const delExchange = (exchange_id:number) => {
  return request({
    url: '/exchange',
    method: 'delete',
    params: {
      exchange_id
    },
  });
}

// 获取api_key列表
export const getKeyList = (exchange_id:number) => {
  return request({
    url: '/exchange/key',
    method: 'get',
    params: {
      exchange_id
    },
  });
}

// 查看余额
export const getBalanceList = (key_id:number) => {
  return request({
    url: '/exchange/key/account_balance',
    method: 'post',
    data: {
      key_id
    },
  });
}

// 添加密钥
export const addSecretKey = (exchange_id:number, key_name:string, access_key:string, secret_key:string) => {
  return request({
    url: '/exchange/key',
    method: 'post',
    data: {
      key_name,
      access_key,
      secret_key,
      exchange_id
    },
  });
}

// 删除密钥
export const delSecretKey = (key_id:number) => {
  return request({
    url: '/exchange/key',
    method: 'delete',
    params: {
      key_id
    },
  });
}

export const getSymbolList = (exchange_id:number) => {
  return request({
    url: '/exchange/symbol',
    method: 'get',
    params: {
      exchange_id
    },
  });
}

// 添加symbol
export const addNewSymbol = (symbol_name:string, symbol:string, code:string, digits:number, price_step:number, min_lot:number, lot_step:number, max_lot:number, exchange_id:number) => {
  return request({
    url: '/exchange/symbol',
    method: 'post',
    data: {
      symbol_name,
      symbol,
      code,
      digits,
      price_step,
      min_lot,
      lot_step,
      max_lot,
      exchange_id
    },
  });
}

// 修改symbol
export const modifyMySymbol = (params:object) => {
  return request({
    url: '/exchange/symbol',
    method: 'put',
    params: params,
  });
}

// 删除symbol
export const delSymbol = (symbol_id:number) => {
  return request({
    url: '/exchange/symbol',
    method: 'delete',
    params: {
      symbol_id
    },
  });
}

// 机器人
// 获取授权种类
export const getAccreditType = (authorization_type:string) => {
  return request({
    url: '/robot/auth_list',
    method: 'get',
    params: {
      authorization_type
    },
  });
} 

// 获取授权机器人
export const getAccreditRobot = (authorization_id:number, authorization_type:string) => {
  return request({
    url: '/robot/auth/robot_strategy',
    method: 'get',
    params: {
      authorization_id,
      authorization_type
    },
  });
}

// 根据策略代码获取所有策略参数
export const getStrategyAllParams = (strategy_code:string, authorization_type:string) => {
  return request({
    url: '/robot/auth/parameters_robot',
    method: 'get',
    params: {
      strategy_code,
      authorization_type
    },
  });
}

// 根据授权id获取所有策略参数
export const getAccreditAllParams = (authorization_id:number, authorization_type:string) => {
  return request({
    url: '/robot/auth/parameters_strategy',
    method: 'get',
    params: {
      authorization_id,
      authorization_type
    },
  });
}

// 添加机器人
export const addNewRobot = (params:any) => {
  return request({
    url: '/robot',
    method: 'post',
    data: params
  });
}

// 获取下拉框选择获取我的交易所
export const selectExchange = () => {
  return request({
    url: '/api/exchange',
    method: 'get'
  });
}

// 下拉框选择获取交易所下的symbol
export const selectSymbol = (exchange_id:number) => {
  return request({
    url: '/api/symbol?'+ Date.now(),
    method: 'get',
    params:{
      exchange_id
    }
  });
}

// 获取服务器列表
export const getServerList = () => {
  return request({
    url: '/robot/host_list',
    method: 'get'
  });
}

// 下拉框选择获取交易所下的key
export const getSelectKeyList = (exchange_id:number) => {
  return request({
    url: '/api/key?'+Date.now(),
    method: 'get',
    params: {
      exchange_id
    }
  });
}


// 获取深度和实时报价
export const getDepthTable = (params:any) => {
  return request({
    url: '/key_api/depth?'+ Date.now(),
    method: 'get',
    params
  });
}

//下单
export const orderSend = (data: any) => {
  return request({
    url: '/key_api/order_send',
    method: 'post',
    data
  });
}

// 查询当前委托挂单
export const getQueryTable = (data:any) => {
  return request({
    url: '/key_api/order_query_query',
    method: 'post',
    data
  });
}

// 全部撤单
export const deleteAllQuery = (data: any) => {
  return request({
    url: '/key_api/key_order_delete_all',
    method: 'post',
    data
  });
}

// 区间撤单
export const sectionRevoke = (data:any) => {
  return request({
    url: '/key_api/key_order_delete_section',
    method: 'post',
    data
  });
}

// 机器人下单查询
export const selectRobotOrder = () => {
  return request({
    url: '/robot/all',
    method: 'get',
  });
}

// 获取下单机器人列表
export const robotOrderList = (robot_id:number, page:number) => {
  return request({
    url: '/robot/order_all',
    method: 'get',
    params:{
      robot_id,
      page
    }
  });
}

// 机器人下单订单详情
export const orderDetails = (robot_order_id:number) => {
  return request({
    url: '/robot/order_query',
    method: 'get',
    params:{
      robot_order_id
    }
  });
}

// 撤单
export const repealQuery = (data: any) => {
  console.log('参数：',data)
  return request({
    url: '/key_api/order_delete',
    method: 'post',
    data
  });
}

// 是否撤单完成
export const isRevokeComplete = (params:any) => {
  return request({
    url: '/key_api/is_order_delete',
    method: 'get',
    params
  });
}

// 查询历史成交
export const getHistoryTable = (data: any) => {
  return request({
    url: '/key_api/order_hist_query_query',
    method: 'post',
    data
  });
}


// 获取机器人首页所需所有信息
export const getRobotIndexInfo = (robot_type:string='strategy', page:number=1) => {
  return request({
    url: '/robot',
    method: 'get',
    params: {
      robot_type,
      page
    }
  });
}

// 启动机器人
export const startRobot = (robot_id:number) =>{
  return request({
    url: '/robot/start',
    method: 'post',
    data: {
      robot_id
    }
  });
}

// 停止机器人
export const stopRobot = (robot_id:number) =>{
  return request({
    url: '/robot/stop',
    method: 'post',
    data: {
      robot_id
    }
  });
}

// 获取修改机器人参数
export const modifyRobotParams = (params:any) => {
  return request({
    url: '/robot',
    method: 'put',
    params: params
  });
}

// 选择启动多个机器人
export const StartMultiRobot = (params:any) => {
  return request({
    url: '/robot/select_start',
    method: 'put',
    params
  });
}

// 选择停止多个机器人
export const stopMultiRobot = (params:any) => {
  return request({
    url: '/robot/select_stop',
    method: 'put',
    params
  });
}

// 删除机器人
export const deleteRobot = (robot_id:number) => {
  return request({
    url: '/robot',
    method: 'delete',
    params:{
      robot_id
    }
  });
}

// 查看日志
export const lookLog = (robot_id:number) => {
  return request({
    url: '/robot/log_info',
    method: 'get',
    params:{
      robot_id
    }
  });
}

// 获取可添加监控
export const getMonitoring = () => {
  return request({
    url: '/monitor/all',
    method: 'get'
  });
}

// 获取我的服务器
export const getMyServer = () => {
  return request({
    url: '/user_resource/host',
    method: 'get'
  })
}

//查看回收站
export const getRecycle_bin = (data:any) => {
  return request({
    url: '/recycle_bin',
    method: 'get',
    params:data
  })
}
//获取回收站类型
export const getRecycle_type = (data: any) => {
  return request({
    url: '/recycle_bin/type',
    method: 'get',
    params: data
  })
}