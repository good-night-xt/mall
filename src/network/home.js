import {request} from "./request";

export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type, page) {
    return request({
        url: `/home/data?type=${type}&page=${page}`,
        baseURL: 'http://152.136.185.210:8000/api/n3',
        parms: {
            type,
            page
        }
    })
}