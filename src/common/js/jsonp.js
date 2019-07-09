//json封装
import originJsonp from 'jsonp'

export default function jsonp(url, data, option) {
    //url可能没有问号
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

    return new Promise((resolve, reject) => {
        originJsonp(url, option, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

// 定义拼接字符串的函数
function param(data) {
    let url = '';
    // 遍历data数组，用&一个一个拼接起来
    for (var key in url) {
        // 如果是undefined就设为空，否则取出来
        let value = data[key] !== undefined ? data[k] : ''
        url += `&${key}=${encodeURIComponent(value)}`
    }
    // substring中只写一个参数的话，第二个参数就是到最后
    return url ? url.substring(1) : ''
}