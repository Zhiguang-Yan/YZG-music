<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  props: {
    // 滚动的类型，1表示会派发事件，会截流
    probeType: {
      type: Number,
      default: 1
    },
    // 是否允许在滚动上点击，可能和fastclick有冲突，可以用class="needsclick"解决
    click: {
      type: Boolean,
      default: true
    },
    // 是否派发滚动事件
    listenScroll: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    // 是否派发滚动到底部的事件，用于上拉加载
    pullup: {
      type: Boolean,
      default: false
    },
    // 是否派发列表滚动开始的事件
    beforeScroll: {
      type: Boolean,
      default: false
    },
    // 当数据更新后，刷新scroll的延时
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  methods: {
    // 确保dom已经就绪
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      // 在mounted时初始化一个better-scroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      });
      if (this.listenScroll) {
        // 如果为true的话，用$emit向外派发滚动事件
        let me = this;
        this.scroll.on("scroll", pos => {
          me.$emit("scroll", pos);
        });
      }
    },
    // 禁用滚动
    disable() {
      this.scroll && this.scroll.disable();
    },
    //刷新
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    //滚到固定位置
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },

    //滚到固定的dom
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    // 允许滚动
    enable() {
      this.scroll && this.scroll.enable();
    }
  },
  //监听数据变化
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    }
  }
};
</script>
<style lang="stylus"></style>
