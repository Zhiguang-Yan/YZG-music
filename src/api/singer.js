import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios';

// 获取歌手列表
export function getSingerList() {
    const url = '/api/getSingerList'
    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    })
    return axios.get(url, {
        params: data,
    }).then((result) => {
        return Promise.resolve(result.data)
    })
}

// 获取歌手详情页列表
export function getSingerDetail(singerId) {
    const url = '/api/getSingerDetail'
    const data = Object.assign({}, commonParams, {
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0,
        singermid: singerId,
        order: 'listen',
        begin: 0,
        num: 100,
        songstatus: 1
    })
    return axios.get(url, {
        params: data,
    }).then((result) => {
        return Promise.resolve(result.data)
    })
}
