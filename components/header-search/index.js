// components/header-search/index.js
const { windowWidth, windowHeight } = wx.getSystemInfoSync()

const app = getApp()
Component({
  externalClasses: ['input-width'],
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      default: '你在哪儿上车'
    },
    searchBtnText: {
      type: String,
      default: '取消'
    },
    slotWidth: { // 左边slot的宽度 计算输入框宽度
      type: Number,
      default: 140
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputWidth: ''
  },
  ready () {
    console.log(this.data.slotWidth, windowWidth,'slotWidth')
    let w = this.data.slotWidth + 120 +40
    this.setData({
      inputWidth: 150 // windowWidth - w 
    })
    console.log(this.data.inputWidth)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    inputSearch (e) {
      console.log(e.detail.value)
      this.triggerEvent('clickEvent', e.detail.value)
    },
    cancel () {
      this.triggerEvent('cancel')
    }
  }
})
