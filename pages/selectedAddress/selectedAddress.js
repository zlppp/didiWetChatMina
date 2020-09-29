import QQMapWX from '../../utils/sdk/qqmap-wx-jssdk.min.js';

// 实例化API核心类获取经纬度
let qqmapsdk = new QQMapWX({
  key: 'DXABZ-2FE36-YLNSQ-EIFOE-3434V-RFBLX' // 必填
});

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: {
      longitude: 0,
      latitude: 0,
    },
    addressInfo: { // 地址信息
      latitude: '',
      longitude: '', // 经度
      address: '',
      recommend: ''
    },
    mapHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.location.longitude) {
      app.getLocation().then(res => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      })
    } else {
      this.setData({
        longitude: app.globalData.location.longitude,
        latitude: app.globalData.location.latitude
      })
    }
    // 如果有设置过起点 则取缓存
    if (app.globalData.fromAddressInfo.latitude) {
      this.reverseGeocoder(app.globalData.fromAddressInfo)
    } else {
      this.reverseGeocoder(app.globalData.location)
    }
    this.setData({
      mapHeight: app.globalData.systemInfoSync.windowHeight
    })
    console.log(this.data.mapHeight)
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('map')
  },
  /**
   * 移动地图事件
   */
  regionchange () {
    let that = this
    this.mapCtx.getCenterLocation({ //getCenterLocation可以获取地图中点的经纬度
      success: function (res) {
        that.setData({
          'addressInfo.latitude': res.latitude,
          'addressInfo.longitude': res.longitude
        })
        let location = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        that.reverseGeocoder(location)
      }
    })
  },
  /**
   * 根据经纬度获取详细地址信息
   */
  reverseGeocoder(location) {
    qqmapsdk.reverseGeocoder({
      location,
      success: res => {
        this.setData({
          'addressInfo.address': res.result.formatted_addresses.recommend,
          'addressInfo.recommend': res.result.address
        })
        console.log(res, 'ress')
      }
    })
  },
  /**
   * 确定从出发地址
   */
  handleFrom () {
    app.globalData.fromAddressInfo = this.data.addressInfo
    console.log(app.globalData.fromAddressInfo)
    wx.redirectTo({
      url: '/pages/index/index',
    })
  }
})