<template>
  <div class="recommend">
    <!--在调用scroll组件时一定要保证元素已经渲染完毕，元素有变化一定要及时refresh-->
    <scroll class="recommend-content" :data="this.discList" ref="scroll">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <slider>
            <div v-for="(item, index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl" alt="silder" />
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, index) in discList" :key="index" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" alt="icon" width="60" height="60" />
              </div>
              <div class="text">
                <h2 class="name" v-text="item.creator.name"></h2>
                <p class="desc" v-text="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from "base/scroll/scroll";
import { getRecommend, getDiscList } from "api/recommend.js";
import { ERR_OK } from "api/config.js";
import Slider from "base/slider/slider";
import Loading from "base/loading/loading";
export default {
  data() {
    return {
      recommends: [],
      discList: []
    };
  },
  created() {
    this._getRecommend();

    this._getDiscList();
  },
  methods: {
    _getRecommend() {
      getRecommend().then(result => {
        if (result.code === ERR_OK) {
          this.recommends = result.data.slider;
        }
      });
    },
    _getDiscList() {
      getDiscList().then(result => {
        if (result.code === ERR_OK) {
          this.discList = result.data.list;
        }
      });
    },
    loadImage() {
      // 图片加载完成后，让scroll组件重新计算高度，由于图片高度都是一样的，所以仅需调用一次
      if (!this.checkloaded) {
        this.$refs.scroll.refresh();
        this.checkloaded = true;
      }
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
};
</script>
<style lang="stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}</style>
