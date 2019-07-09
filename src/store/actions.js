import * as types from './mutation-types'


// 点击播放的函数
export const selectPlay = function ({ commit, state }, { list, index }) {

    commit(types.SET_PLAY_LIST, list)

    commit(types.SET_SEQUENCE_LIST, list)
    // 如果不是随机模式，播放索引正常
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}