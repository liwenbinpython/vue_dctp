import request from '@/utils/request';

export const getNoticeList = (request_type: any, page: any, anno_id:any) =>{
    return request({
        url: '/annocement_handler',
        method: 'get',
        params:{
            request_type,
            page,
            anno_id
        }
    });
}

export const getNoticeDetail = (id: any) => {
    return request({
        url: '/notice/detail',
        method: 'post',
        data: {
            id
        }
    });
}
    