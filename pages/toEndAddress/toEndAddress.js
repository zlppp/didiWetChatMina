const app = getApp()
import QQMapWX from '../../utils/sdk/qqmap-wx-jssdk.min.js';

// 实例化API核心类获取经纬度
let qqmapsdk = new QQMapWX({
  key: 'DXABZ-2FE36-YLNSQ-EIFOE-3434V-RFBLX' // 必填
})
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    suggestion: [], // 关键词搜索出来地址列表
    selectedCityData: { // 城市选择信息
      isShow: false,
      allCityList: [], // 完整的城市信息
      cityData: {} // 选择的城市
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getsuggest()
  },
  backfill: function (e) {
    var id = e.currentTarget.id;
    console.log(id, 'id')
    for (var i = 0; i < this.data.suggestion.length; i++) {
      if (i == id) {
        this.setData({
          backfill: this.data.suggestion[i].title
        })
      }
    }
  },
  /**
   * 查找全部城市
   */
  selectedCity () {
    wx.showLoading()
    qqmapsdk.getCityList({
      success: res => {//成功后的回调
        wx.hideLoading()
        this.setData({
          'selectedCityData.isShow': true,
          'selectedCityData.allCityList': res.result[1]
        })
      },
    })
  },
  /**
   * 选择城市子组件传递的参数
   */
  confirmCity(e) {
    this.setData({
      'selectedCityData.cityData': e.detail.item,
      'selectedCityData.isShow': false
    })
    this.getsuggest()
  },
  /**
   * 根据关键字查询地址
   */
  getsuggest (e) {
    wx.showLoading()
    console.log(e, this.data.selectedCityData.cityData.name, '111')
    //获取输入框值并设置keyword参数
    let keyword = e ? e.detail : this.data.selectedCityData.cityData.name
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      keyword: keyword || '杭州',
      region: this.data.selectedCityData.cityData.name , //设置城市名，限制关键词所示的地域范围，非必填参数
      success: res => {//搜索成功后的回调
        wx.hideLoading()
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          })
        }
        this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug
        })
      },
      fail: res => {
        console.log(res)
        wx.hideLoading()
      }
    })
  },
  /**
   * 取消搜索
   */
  searchCancel () {
    if (this.data.selectedCityData.isShow) {
      this.setData({
        'selectedCityData.isShow': false
      })
    } else {
      wx.redirectTo({
        url: '/pages/index/index'
      })
    }
  },
  /**
   * 确认选择
   */
  confirmSelected (e) {
    // wx.showLoading()
    app.globalData.toAddressInfo = e.currentTarget.dataset.item
    wx.redirectTo({
      url: '/pages/index/index'
    })
  }
})