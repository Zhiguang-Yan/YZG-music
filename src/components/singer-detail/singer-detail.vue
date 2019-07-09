<template>
  <transition>
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { getSingerDetail } from "api/singer";
import { ERR_OK } from "api/config";
import { createSong } from "common/js/song";
import MusicList from "components/music-list/music-list";
export default {
  data() {
    return {
      songs: []
    };
  },
  computed: {
    title() {
      return this.singer.name;
    },
    bgImage() {
      return this.singer.avatar;
    },
    ...mapGetters(["singer"])
  },
  created() {
    this._getSingerDetail();
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push({
          path: `/singer`
        });
        return;
      }
      getSingerDetail(this.singer.id).then(result => {
        if (result.code == ERR_OK) {
          this.songs = this._normalizeSong(result.data.list);
        }
      });
    },
    _normalizeSong(list) {
      let ret = [];
      list.forEach(element => {
        let { musicData } = element;
        // 必须保证有songid和albumid
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  components: {
    MusicList
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.slider-enter-active, .slider-leave-active {
  transition: all 0.3s;
}

.slider-enter, .slider-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
