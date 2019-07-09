

export default class Song {
    constructor({ id, mid, singer, name, album, duration, image, url }) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }
}

// 这个函数拿到原始数据后，详细的罗列整理属性
export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    })
}
// 在这里处理musicData中的singer
export function filterSinger(singer) {
    let ret = []
    // 如果传入的singer是空，那么我们也return空
    if (!singer) {
        return ''
    }
    // 否则push name到ret里
    singer.forEach(element => {
        ret.push(element.name)
    });
    return ret.join('/')
}