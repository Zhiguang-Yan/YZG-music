<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" @select="selectSinger" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>
<script>
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
import Singer from "common/js/singer";
import ListView from "base/listview/listview";
import { mapMutations } from "vuex";
const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;
export default {
  data() {
    return {
      singers: []
    };
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          let result = res.data.list;
          this.singers = this._normalizeSinger(result);
        }
      });
    },
    _normalizeSinger(list) {
      //定义数组
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((element, index) => {
        // 循环数组找出10个push到热门
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              id: element.Fsinger_mid,
              name: element.Fsinger_name
            })
          );
        }
        // 字母开头赋值给key,创建字母数组
        const key = element.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            id: element.Fsinger_mid,
            name: element.Fsinger_name
          })
        );
      });
      //现在我们要给map排序
      let hot = [];
      let ret = [];
      for (let key in map) {
        let val = map[key];
        // 如果它匹配字母，就push进ret
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      //sort排序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    })
  },
  created() {
    this._getSingerList();
  },
  components: {
    ListView
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
