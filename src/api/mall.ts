import request from '@/utils/request';

export const fetchList = ( params: any ) =>
  request({
    url: '/mall/mall_showcase',
    method: 'get',
    params,
  });

export const create = ( data: any ) =>
  request({
    url: '/mall/submit_order',
    method: 'post',
    data,
  });


export const del = ( params: any ) =>
  request({
    url: '/mall/submit_order',
    method: 'delete',
    params,
  });

export const delOrder = (params: any) =>
  request({
    url: '/mall/order_showcase',
    method: 'delete',
    params,
  });

export const fetchRate = ( params: any ) =>
  request({
    url: '/mall/get_exchange_rate',
    method: 'get',
    params,
  });

export const fetchOrder = ( params: any ) =>
  request({
    url: '/mall/order_showcase',
    method: 'get',
    params,
  });

export const orderPay = ( data: any ) =>
  request({
    url: '/mall/order_pay',
    method: 'post',
    data,
  });

export const orderDetail = ( data: any ) =>
  request({
    url: '/mall/get_order_info',
    method: 'post',
    data,
  });
export const renewal = (data: any) =>
request({
  url: '/mall/order_renewal',
  method: 'post',
  data,
});

