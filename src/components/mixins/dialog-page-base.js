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
    url: {
      type: String
    },
    post: {
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
      if (!this.url) return
      return new Promise((resolve, reject) => {
        this.$http.get(this.url, this.params).then(result => {
          if (result) {
            this.model = result
          }
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    },
    submit (isEdit = false) {
      if (!this.post) return
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
        } else {
          this.$http.post(this.$utility.getUrl(this.post, {
            isEdit
          }, false), this.model).then(result => {
            this.$emit('submitSuccess')
            resolve(result)
          }).catch(err => {
            reject(err)
          })
        }
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
