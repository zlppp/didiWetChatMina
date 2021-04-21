// pages/waitTaxi/waitTaxi.js
const app = getApp()
Page({
  colorStyle: {
    grayBg: '#f1f1f1',
    orangeBg: '#F59454'
  },
  screenWidth: wx.getSystemInfoSync().windowWidth,
  /**
   * 页面的初始数据
   */
  data: {
    waitTime: {
      minute: 0,
      second: 0
    },
    second: 0,
    countTimer: null,
    randomTime: 0,  // 随机生成一个120秒内的等待时间
    address: '' //上车地点
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.createdCanvas(this.colorStyle.grayBg)
    this.countInterval()
    this.setData({
      randomTime: parseInt(Math.random() * 120),
      address: app.globalData.fromAddressInfo.address
    })
    console.log(this.data.randomTime, app.globalData.fromAddressInfo.address)
  },
  /**
   * 绘制底色 圆心
   */
  createdCanvas(color) {
    let r = wx.getSystemInfoSync().windowWidth / 2 * 0.7
    let y = 280 / 750 * wx.getSystemInfoSync().windowWidth
    console.log(r, y, wx.getSystemInfoSync().windowWidth)
    let ctx = wx.createCanvasContext('canvasProgressbg')
    // 绘制一个圆 x, y, r
    ctx.arc(wx.getSystemInfoSync().windowWidth / 2, y, r, 0, 3 * Math.PI) 
    // 圆环底色
    ctx.setStrokeStyle(color)
    // 圆环边宽
    ctx.setLineWidth('5')
    ctx.stroke()
    ctx.draw()
  },
  /**
   * 定时器
   */
  drawCircle (step, color) {
    let r = wx.getSystemInfoSync().windowWidth / 2 * 0.7
    let y = 280 / 750 * wx.getSystemInfoSync().windowWidth
    let context = wx.createCanvasContext('canvasProgress')
    context.setLineWidth(5)
    context.setStrokeStyle(color);
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(wx.getSystemInfoSync().windowWidth / 2, y, r, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw();
  },
  /**
   * 定时器
   */
  countInterval () {
    this.countTimer = setInterval(() => {
      if (this.data.second < this.data.randomTime) {
        this.data.second++
        let second = this.data.second % 60
        if (second < 60 && second) {
          this.drawCircle(second / (60 / 2), this.data.waitTime.minute % 2 ? this.colorStyle.grayBg : this.colorStyle.orangeBg)
          this.setData({
            'waitTime.second': second < 10 ? '0' + second : second,
          })
        } else {
          this.setData({
            'waitTime.minute': parseInt(this.data.second / 60),
          })
          this.changeColorBg()
        }
      } else {
        // 打到车了
        clearInterval(this.countTimer)
        wx.showToast({
          icon: 'none',
          title: '附近暂无车辆可用',
        })
        // wx.redirectTo({
        //   url: '/pages/index/index'
        // })
      }
    }, 1000)
  },
  /**
   * 每满1分钟 底色和进度条颜色转换
   */
  changeColorBg () {
    if (this.data.waitTime.minute % 2) {
      this.createdCanvas(this.colorStyle.orangeBg)
      this.drawCircle(0, this.colorStyle.grayBg)
    } else {
      this.createdCanvas(this.colorStyle.grayBg)
      this.drawCircle(0, this.colorStyle.orangeBg)
    }
  },
  /**
   * 取消打车
   */
  cancelOrder () {
    let { minute, second } = this.data.waitTime
    console.log( this.data.waitTime)
    let that = this
    wx.showModal({
      title: '',
      content: `已等待${minute && minute + '分'}${second && +second + '秒'}，是否确认取消？`,
      success (res) {
        if (res.confirm) {
          clearInterval(that.countTimer)
          wx.navigateTo({
            url: '/pages/index/index'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})