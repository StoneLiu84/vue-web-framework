<template>
  <transition name="loading-fade">
    <div
      class="loading-mask"
      v-show="visible"
      :class="customClass"
      :style="{'background-color': background || ''}">
      <div class="loading-spinner">
        <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"/>
        </svg>
        <p v-if="text" class="loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      visible: true,
      text: '',
      background: '',
      customClass: ''
    }
  },
  methods: {
    setText (text) {
      this.text = text
    },
    setVisible (visible) {
      this.visible = visible
    }
  }
}
</script>

<style lang="less">
@keyframes loading-rotate {
  to {
    transform: rotate(1turn);
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -40px;
  }
  to {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -120px;
  }
}
.loading-mask {
  position: absolute;
  z-index: 2000;
  background-color: rgba(255,255,255,0.5);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity .3s;
  .loading-spinner {
    top: 50%;
    margin-top: -35px;
    width: 100%;
    text-align: center;
    position: absolute;
    .circular {
      height: 42px;
      width: 42px;
      animation: loading-rotate 2s linear infinite;
      .path {
        animation: loading-dash 1.5s ease-in-out infinite;
        stroke-dasharray: 90,150;
        stroke-dashoffset: 0;
        stroke-width: 2;
        stroke: #409eff;
        stroke-linecap: round;
      }
    }
    .loading-text {
      color: #409eff;
      margin: 3px 0;
      font-size: 12px;
    }
  }
}
/* .loading-fade-enter-active,
.loading-fade-leave-active {
  transition: opacity .5s;
} */
.loading-fade-enter,
.loading-fade-leave-to {
  opacity: 0;
}
</style>
