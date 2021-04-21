// components/selected-city/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cityList: { // 城市列表
      type: Array,
      default: [],
      animationData: {}
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    copyCityList: [], // 城市列表副本 
    sortCityList: [], // 根据字母排序后的城市列表
    scrollTopId: '',
    scrollHeight: '',
    selectedLetter: '', // 选中的字母
    isShowLetter: false
  },
  onShow () {
    
  },
  ready () {
    let cityList = this.data.cityList
    console.log(app.globalData.systemInfoSync, 'systemInfoSync')
    for(let i  = 0; i < this.data.cityList.length; i++) {
      // 取出首字母
      let firstLetter = cityList[i].pinyin[0].slice(0,1).toUpperCase()
      if (this.isCityList(firstLetter)) {
        for (var k = 0; k < this.data.copyCityList.length; k++) {
          if (firstLetter == this.data.copyCityList[k].index) {
            this.data.copyCityList[k].list.push({
              id: cityList[i].id,
              name: cityList[i].name,
              fullName: cityList[i].fullname,
              location: cityList[i].location
            });
            break;
          }
        }
      } else {
        this.data.copyCityList.push({
          index: firstLetter,
          list: [{
            id: cityList[i].id,
            name: cityList[i].name,
            fullName: cityList[i].fullname,
            location: cityList[i].location
          }]
        })
      }
    }
    this.sortLetter()
    this.setData({
      sortCityList: this.data.copyCityList
    })
    this.getSrollHeight()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 设置scroll-view高度
     */
    getSrollHeight () {
      let windowHeight = app.globalData.systemInfoSync.windowHeight // 屏幕的高度
      this.setData({
        scrollHeight: windowHeight * 750 - 100
      })
    },
    isCityList (firstLetter) {
      var bStop = false
      for (var i = 0; i < this.data.copyCityList.length; i++) {
        if (this.data.copyCityList[i].index == firstLetter) {
          bStop = true
          break
        }
      }
      return bStop //存在为true 不存在未false
    },
    sortLetter () {
      this.data.copyCityList.sort((item1, item2) => {
        if (item1.index > item2.index) {
          return 1;
        } else {
          return -1;
        }
      })
    },
    /**
     * 选择的城市
     */
    handCity(e) {
      this.triggerEvent('confirm', { item: e.currentTarget.dataset.item })
    },
    /**
     * 跳转到对应字母，将首字母赋值
     */
    selecteChooseHandle(e) {
      console.log(e.target.dataset.index, 'eee')
      let index= e.target.dataset.index
      let top = wx.createSelectorQuery().in(this)
      this.isShowLetter = true
      this.setData({
        isShowLetter: true
      })
      top.select('#' + index).boundingClientRect(rect=>{
        wx.pageScrollTo({
          scrollTop: rect.top - 100,
          duration: 500
        })
        console.log(rect, 'rect')
        }).exec()
     
      this.setData({
        scrollTopId: e.target.id,
        selectedLetter: index
      })
      setTimeout(() => {
        this.setData({
          isShowLetter: false
        })
      }, 1000);
      console.log(e)
    }, 
    touchmove () {
      console.log(11)
    },
    touchstartLetter () {
      console.log('anxiale ')
    }
    
  }
})
