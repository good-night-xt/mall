import axios from 'axios'

export function request(config, baseURL='http://123.207.32.32:8000') {
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL,
        // baseURL: 'http://152.136.185.210:8000/api/n3',
        timeout: 5000
    })

    // 2.axios的拦截器
    //2.1请求拦截的作用
    instance.interceptors.request.use(config => {
        return config
    })

    // 2.2响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    })

    // 3.发送真正的网络求情
    return instance(config)
}

