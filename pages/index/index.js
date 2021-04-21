//获取应用实例
const app = getApp()
import QQMapWX from '../../utils/sdk/qqmap-wx-jssdk.min.js';
// 实例化API核心类获取经纬度
let qqmapsdk = new QQMapWX({
  key: 'DXABZ-2FE36-YLNSQ-EIFOE-3434V-RFBLX' // 必填
})

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    fromAddressInfo: {},
    toAddressInfo: {},
    calculateInfo: { // 计算
      distance: '', // 距离 公里
      duration: '' // 时间 分钟
    },
    travelPrice: '', // 价格
    travelTime: '', // 时间
    isTakeTaxi: false, // 是否可以呼叫快车
    forecastPriceList: [ // 预计车辆价格
      {
        type: '出租车',
        price: ''
      },  {
        type: '快车',
        price: ''
      },  {
        type: '优享',
        price: ''
      }
    ],
    carTypeActive: 0
  },
  onLoad: function () {
    console.log(app.globalData.fromAddressInfo, 'app.globalData')
    if (!app.globalData.fromAddressInfo.latitude) {
      // 判断是否定位信息 如果没有则重新获取定位
      if (app.globalData.location.latitude) {
        // 根据经纬度获取具体地址
        this.reverseGeocoder(app.globalData.location)
      } else {
        app.getLocation().then(res => {
          let { latitude, longitude } = res
          this.reverseGeocoder({latitude, longitude})
        })
      }
    }
    // 获取设置过的起点 终点信息
    this.setData({
      fromAddressInfo: app.globalData.fromAddressInfo,
      toAddressInfo: app.globalData.toAddressInfo
    })
    
    // 已设置过起点 终点，则获取距离
    if (this.data.fromAddressInfo.latitude && this.data.toAddressInfo.latitude) {
      this.getDistance()
      this.setData({
        isTakeTaxi: true
      })

    }
    console.log(this.data.toAddressInfo)
  },
  /**
   * @function 根据经纬度获取地址信息
   * @param { Object } 经纬度信息
   */
  reverseGeocoder(location) {
    qqmapsdk.reverseGeocoder({
      location,
      success: res => {
        let { location, address, formatted_addresses  } = res.result
        let data = {
          latitude: location.lat,
          longitude: location.lng,
          address: formatted_addresses.recommend,
          recommend: address
        }
        app.globalData.fromAddressInfo = data
        this.setData({
          fromAddressInfo: app.globalData.fromAddressInfo,
          toAddressInfo: app.globalData.toAddressInfo
        })
      }
    })
  },
  /**
   * 去选择起点
   */
  handleFromAddress() {
    wx.navigateTo({
      url: '/pages/selectedAddress/selectedAddress',
    })
  },
  /**
   * 去选择终点
   */
  handleToAddress () {
    wx.navigateTo({
      url: '/pages/toEndAddress/toEndAddress',
    })
  },
  /**
   * @function 获取两点的距离
   */
  getDistance () {
    // 起点经纬度
    let fromLocation = {
      latitude: app.globalData.fromAddressInfo.latitude,
      longitude: app.globalData.fromAddressInfo.longitude
    }
    // 终点经纬度
    let toLocation = [{
      latitude: app.globalData.toAddressInfo.latitude,
      longitude: app.globalData.toAddressInfo.longitude
    }]
    //调用距离计算接口
    qqmapsdk.calculateDistance({
        mode: 'driving', // 可选值：'driving'（驾车)
        from: fromLocation || '',
        to: toLocation,
        success: res =>  {
          let result = res.result
          this.setData({
            'calculateInfo.distance': (result.elements[0].distance / 1000).toFixed(1), // 转换为公里
            'calculateInfo.duration': Math.floor(result.elements[0].duration / 60) // 转换为分钟
          })
          console.log(this.data.calculateInfo)
          this.getPrice()
        },
        complete: function(res) {
          console.log(res);
        }
    })
  },
  /**
   * 计算价格与预计时间
   * 计算公式：1.8元/公里，0.35元/分钟
   */
  getPrice () {
    let travelPrice = this.data.calculateInfo.distance * 1.8 +  this.data.calculateInfo.duration * 0.35
    this.setData({
      'forecastPriceList[0].price': (travelPrice * 0.8).toFixed(2), // 拼车价格
      'forecastPriceList[1].price': (travelPrice).toFixed(2),
      'forecastPriceList[2].price': (travelPrice * 1.2).toFixed(2) // 优享价格
    })
    console.log(travelPrice, 'travelPrice')
  },
  /**
   * 选中的车辆类型
   */
  chooseCarType (e) {
    this.setData({
      carTypeActive: e.currentTarget.dataset.index
    })
  },
  /**
   * @function 确认呼叫
   */
  confirmTaxi () {
    if (!this.data.isTakeTaxi) {
      wx.showToast({
        title: '请选择正确的地址',
        icon: 'none'
      })
    } else {
      wx.redirectTo({
        url: '/pages/waitTaxi/waitTaxi',
      })
    }
  },
  bindCartType () {
    wx.showToast({
      icon: 'none',
      title: '暂无车辆，敬请期待',
    })
  }
})
