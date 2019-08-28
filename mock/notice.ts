import Mock from 'mockjs';
let items = Mock.mock({
    'list|30': [{
        'id|+1': 0,
        'title': '@csentence(10, 20)',
        'create_time': '@datetime',
        'content': '@cparagraph()',
    }],
    'total': 30,
    'page_size': 5,
    'current_page': 1,
});
export default {
    list: (options: any) => {
        let body = options.body;
        let currentPage = +body.split('&')[0].split('=')[1];
        items.current_page = currentPage;
        let newItems = JSON.parse(JSON.stringify(items));
        newItems.list = items.list.slice((currentPage - 1) * items.page_size, currentPage * items.page_size);
        return {
            data: newItems,
            status:200
        }
    },
    detail: (options: any) => {
        let body = options.body;
        let id = +body.split('&')[0].split('=')[1];
        return {
            data: items.list.filter((item:any) => {
                return item.id === id;
            })[0],
            status: 200
        }
    }
};