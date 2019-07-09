// 这个是和import花括号一样的，import*是选择所有
import * as types from './mutation-types'


// 通常我们mutations会和mutations-types作关联，这样便于我们修改
const matutations = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    }
}
export default matutations