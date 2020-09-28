
//app.js
const globalData = {
  fromAdrdessInfo: {}, // 从哪里出发的地址信息
  toAddressInfo: {}, // 去哪里的地址信息
  systemInfoSync: {} // 获取手机的基本信息
}

App({
  onLaunch: function () {
    this.getLocation()
    this.initGlobalData()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData, 'this.globalData')
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  initGlobalData () {
    this.globalData.fromAddressInfo = wx.getStorageSync('fromAddressInfo') || {}
    this.globalData.systemInfoSync = wx.getSystemInfoSync()
    console.log(this.globalData.systemInfoSync)
  },
  onShow () {
    
  },
  /**
   * 获取用户当前位置
   */
  getLocation() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        altitude: 'm',
        type:'gcj02',
        success: location => {
          let { latitude, longitude } = location
          this.globalData.location.latitude = latitude
          this.globalData.location.longitude = longitude
          resolve(location)
          console.log(location, 'location')
        },
        fail: fail => {
          reject(fail)
        }
      })
    })
  },
  /**
   * 根据经纬度获取详细地址信息
   */
  reverseGeocoder(location) {
    console.log(location)
    return new Promise((resolve, reject) => {
      qqmapsdk.reverseGeocoder({
        location,
        success: res => {
          // this.setData({
          //   'addressInfo.address': res.result.formatted_addresses.recommend,
          //   'addressInfo.recommend': res.result.address
          // })
          resolve(location)
          console.log(res, 'ress')
        },
        fail: fail => {
          reject(fail)
        }
      })
    })
  },
  globalData: {
    userInfo: null,
    location: {
      latitude: 0,
      longitude: 0
    }
  }
})