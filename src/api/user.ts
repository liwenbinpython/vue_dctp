import request from '@/utils/request';

// 申请代理
export const subAgency = (data: any) => {
    return request({
        url: '/user/application_project_side',
        method: 'get',
        params: {
            ...data
        }
    });
}

export const getEmailCode = (email:any) => {
    return request({
        url: '/get_email_code',
        method: 'post',
        data: {
            email
        }
    });
}
export const checkEmailCode = (email: any, email_code:any) => {
    return request({
        url: '/email_code_check',
        method: 'post',
        data: {
            email,
            email_code
        }
    });
}

export const bindEmail = (email: any, email_code: any) => {
    return request({
        url: '/user/email',
        method: 'put',
        params : {
            email,
            email_code
        }
    });
}

export const getPhoneCode = (telephone: any) => {
    return request({
        url: '/get_telephone_code',
        method: 'post',
        data: {
            telephone
        }
    });
}

export const checkPhoneCode = (telephone: any, telephone_code: any) => {
    return request({
        url: '/telephone_code_check',
        method: 'post',
      data: {
            telephone,
            telephone_code
        }
    });
}

export const bindPhone = (telephone: any, telephone_code: any) => {
    return request({
        url: '/user/telephone',
        method: 'post',
        data: {
            telephone
        }
    });
}
export const changePhone = (telephone: any, telephone_code: any) =>{
    return request({
        url: '/user/telephone',
        method: 'put',
        params: {
            telephone,
            telephone_code
        }
    });
}

export const getUserOrder = (request_type: any, order_id: any, page:any) => {
    return request({
        url: '/mall/order_showcase',
        method: 'get',
        params:{
            request_type,
            order_id,
            page
        }
    });
}
// 操作日志
export const getOperateLog = () => {
    return request({
        url: '/user/user_op_log',
        method: 'get',
    });
}
// 代理管理
export const getProxy = () => {
    return request({
        url: '/user/proxy',
        method: 'get',
    });
}

export const getCom = (page:any) => {
    return request({
        url: '/user/commission_record',
        method: 'get',
        params:{
            page
        }
    });
}

export const exCom = (page: any) => {
    return request({
        url: '/user/extract_commission_record',
        method: 'get',
        params: {
            page
        }
    });
}

//申请提现
export const withdraw = (collection_address: any, symbol_type: any, volume:any) => {
    return request({
        url: '/user/commission_withdraw',
        method: 'post',
        data: {
            collection_address,
            symbol_type,
            volume
        }
    });
}

// 申请记录
export const getApplication = () => {
    return request({
        url: '/user/application_notes',
        method: 'get',
        params: {

        }
    });
}

export const deleteApplication = (note_id: any) => {
    return request({
        url: '/user/application_notes',
        method: 'delete',
        params: {
            note_id
        }
    });
}

// 我的工单
export const getWorkOrder = () => {
    return request({
        url: '/work_order',
        method: 'get'
    });
}

export const subWorkOrder = (title: any, content: any, type_id:any) => {
    return request({
        url: '/work_order',
        method: 'post',
        data:{
            title,
            content,
            type_id
        }
    });
}

export const deleteWorkOrder = (work_order_id:any) => {
    return request({
        url: '/work_order',
        method: 'delete',
        params: {
            work_order_id
        }
    });
}

export const getWorkOrderType = () => {
    return request({
        url: '/work_order/type',
        method: 'get'
    });
}

export const getWorkOrderInfo = (work_order_id: any) => {
    return request({
        url: '/work_order/info',
        method: 'get',
        params: {
            work_order_id
        }
    });
}
