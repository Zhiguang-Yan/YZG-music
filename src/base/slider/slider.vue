<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        :class="{active:currentPageIndex===index}"
        v-for="(item, index) in dots"
        :key="index"
      >{{item}}</span>
    </div>
  </div>
</template>
<script>
import { addClass } from "common/js/dom";
import BScroll from "better-scroll";
export default {
  name: "slider",
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initSlider();
      this._initDots();
      if (this.autoPlay) {
        this._play();
      }
    }, 20);
    window.addEventListener("resize", () => {
      if (!this.slider) {
        return;
      }
      this._setSliderWidth(true);
      this.slider.refresh();
    });
  },
  methods: {
    // 设置图片宽度，图片容器宽度
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children;

      let width = 0;
      // 获取可视窗口宽度
      let sliderWidth = this.$refs.slider.clientWidth;
      // 遍历循环每张图片，添加样式，设置宽度
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        //添加样式
        addClass(child, "slider-item");
        // 设置单个宽度
        child.style.width = sliderWidth + "px";
        //整个宽度
        width += sliderWidth;
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + "px";
    },
    // 初始化轮播图小圆点
    _initDots() {
      this.dots = new Array(this.children.length - 2);
    },
    // 设置轮播跳转
    _play() {
      // 当前索引为0，给它加上一
      let pageIndex = this.currentPageIndex + 1;

      // 如果设置循环，页数加一
      if (this.loop) {
        pageIndex += 1;
      }
      if (pageIndex === this.children.length - 2) {
        pageIndex = 0;
      }
      // 开启定时器，调用better-scroll接口，跳转相应页面
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400);
      }, this.interval);
    },
    // 初始化slider，配置 一些参数
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true, // 横向滚动
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      });
      // 每次滚动结束后触发此事件
      this.slider.on("scrollEnd", () => {
        let pageIndex = this.slider.getCurrentPage().pageX;

        if (this.loop) {
          pageIndex -= 1;
        }
        this.currentPageIndex = pageIndex;
        // 每跳转一次，清空计时器，重启定时器
        if (this.autoPlay) {
          clearInterval(this.timer);
          this._play();
        }
      });
    }
  },
  deactivated() {
    clearInterval(this.timer);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="stylus">
@import '~common/stylus/variable';

.slider {
  min-height: 1px;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
