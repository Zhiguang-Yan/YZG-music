import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'

import * as getters from './getters'

import state from './state'
import mutations from './mutations'


// 引入vuex自带的log工具
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// 调试，只在生产环境下才为true
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    // 开启严格模式，监测state的改动是不是mutation里改的
    strict: debug,
    // 执行一个数组
    plugins: debug ? [createLogger()] : []
})