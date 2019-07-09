import { playMode } from 'common/js/config'
const state = {
    singer: {},
    playing: false,
    //全屏
    fullScreen: false,
    // 播放列表
    playlist: [],
    //顺序列表
    sequenceList: [],

    mode: playMode.sequence,
    //当前播放的是哪首歌
    currentIndex: -1,
    disc: {},
    topList: {}

}
export default state