import Emitter from '../mixins/emitter'
import PageBase from '../mixins/page-base'
export default {
  name: 'DialogPageBase',
  componentName: 'DialogPage',
  mixins: [PageBase, Emitter],
  props: {
    params: {
      type: Object
    },
    dataUrl: {
      type: String
    },
    postUrl: {
      type: String
    }
  },
  data () {
    return {
      model: {},
      rules: [],
      errors: {}
    }
  },
  created () {
    this.dispatch('DialogEx', 'pageInstance', this)
    this.$on('validate', this.onValidate)
  },
  methods: {
    onValidate (errors) {
      this.errors = Object.assign({}, this.errors, errors)
    },
    getError (name) {
      return this.errors[name] && this.errors[name].length ? this.errors[name][0] : null
    },
    hasError (name) {
      return this.getError(name) != null
    },
    getErrorTip (name) {
      return {
        content: this.getError(name),
        closed: !this.hasError(name),
        position: 'right'
      }
    },
    load () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.model = {
            name: '12345',
            email: '123@123.com',
            hero: ''
          }
          resolve(this.model)
        }, 1000)
      })
    },
    submit () {
      return new Promise((resolve, reject) => {
        let isValid = true
        for (let key in this.errors) {
          if (this.errors[key].length) {
            isValid = false
            break
          }
        }
        if (!isValid) {
          reject(new Error('请正确填写表单'))
        }
        setTimeout(() => {
          resolve('')
        }, 1000)
      })
    }
  },
  watch: {
    params: {
      deep: true,
      handler () {
        this.load()
      }
    }
  }
}
