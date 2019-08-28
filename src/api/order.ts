import request from '@/utils/request';

// 工单评价
export const orderAppraise = (data:any) =>{
  return request({
      url: '/work_order/assess',
      method: 'post',
      data
  });
}