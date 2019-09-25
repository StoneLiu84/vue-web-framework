<template>
  <DialogEx
    ref="dialog"
    :title="title"
    :height="height"
    :width="width"
    :loading="loading"
    @buttonClick="onButtonClick">
    <slot></slot>
  </DialogEx>
</template>

<script>
export default {
  name: 'PageDialog',
  componentName: 'PageDialog',
  props: {
    page: {
      type: Object
    },
    title: {
      type: String
    },
    height: {
      type: [Number, String]
    },
    width: {
      type: [Number, String]
    }
  },
  data () {
    return {
      loading: false,
      componentInstance: null
    }
  },
  created () {
    this.$on('pageInstance', componentInstance => {
      this.componentInstance = componentInstance
      this.load()
    })
  },
  mounted () {},
  methods: {
    open () {
      this.$refs.dialog.open()
    },
    close () {
      this.$refs.dialog.close()
    },
    onButtonClick (type) {
      if (type === 'save') {
        this.submit()
      }
    },
    load () {
      if (this.componentInstance && this.componentInstance.load) {
        this.loading = true
        this.componentInstance.load().then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    submit () {
      if (this.componentInstance && this.componentInstance.submit) {
        this.loading = true
        this.componentInstance.submit().then(() => {
          this.loading = false
          this.close()
        }).catch(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang="less">

</style>
