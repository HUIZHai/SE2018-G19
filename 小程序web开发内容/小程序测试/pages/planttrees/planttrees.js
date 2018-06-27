var util = require('../../utils/util.js');  
var app = getApp()



Page({
  data: {
    remainTimeText: '',
    log: {},
    completed: false,
    isRuning: false,
    count:"-1"
  },
    
  onShow: function(){
    var that=this
    var count= that.data.count
    count++
    that.setData({
      count:count
    })
  },
  onLoad: function () {
    
    var workTime = util.formatTime1(wx.getStorageSync('workTime'), 'HH')
    var starTime = Date.now()
    app.globalData.nowtime = util.formatTime(new Date()); 
    this.setData({
      workTime: workTime,
      remainTimeText: workTime + ':00'
    })
    wx.getStorage({
      key: 'worktime',
      success: function(res) {},
    })
  },
  //开始倒计时
  onReady: function () {
    var that = this
    var min = that.data.workTime
    let startTime = Date.now()
    let keepTime = min * 60 * 1000
    let isRuning = that.data.isRuning
    var endTime = keepTime + startTime
    that.setData({
      endTime: endTime,
    })
    console.log(startTime)
    console.log(keepTime)
    console.log(endTime)
    console.log(min)
    wx.request({
      url: 'https://alml.club/add', //仅为示例，并非真实的接口地址
      data: {
        worktime:parseFloat('0'+min),
        userid: app.globalData.openID
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("to data..",res.data)
        wx.request({
          url: 'https://alml.club/getworktime', //仅为示例，并非真实的接口地址
          data: {
            userid: app.globalData.openID
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log("backresult:", res.data)
          }
        })
      }
    })

    console.log(isRuning)
    if (!isRuning) {
      this.timer = setInterval((function () {
        this.updateTimer()
        // this.startNameAnimation()
      }).bind(this), 1000)
    } else {
      this.stopTimer()
    }
    this.setData({
      isRuning: !isRuning,
      completed: false,
      remainTimeText: min + ':00',
    })
    // this.data.log = {
    //   startTime: startTime,
    //   endTime: endTime,
    // }
    // this.saveLog(this.data.log)
  },


  // saveLog: function (log) {
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(log)
  //   wx.setStorageSync('logs', logs)
  //   console.log(log)
  // },



  
  onUnload:function(){
    var that= this
    wx.setStorage({
      key: 'count',
      data: that.data.count
    })
  },
  onHide: function () {
  },
  modalcnt: function () {
    wx.showModal({
      title: '确定要放弃吗',  
      content: '放弃将会扼杀这棵树',  
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          app.globalData.endtime = util.formatTime(new Date()); 
          wx.redirectTo({
            url: '../selfevaluate/selfevaluate',
          })
        } 
        else if (res.cancel) {
          console.log('用户点击取消')
        }
      }  
    })
  },


stopTimer: function () {
  // clear timer
  this.timer && clearInterval(this.timer)
},

updateTimer: function () {
  var that = this;
  var endTime = that.data.endTime
  let now = Date.now()
  let remainingTime = Math.round((endTime - now) / 1000)
  let H = util.formatTime1(Math.floor(remainingTime / (60 * 60)) % 24, 'HH')
  let M = util.formatTime1(Math.floor(remainingTime / (60)) % 60, 'MM')
  let S = util.formatTime1(Math.floor(remainingTime) % 60, 'SS')

  
  // update text
  if (remainingTime > 0) {
    let remainTimeText = (H === "00" ? "" : (H + ":")) + M + ":" + S
    this.setData({
      remainTimeText: remainTimeText
    })
  } else if (remainingTime == 0) {
    this.setData({
      completed: true
    })
    this.stopTimer()
    app.globalData.endtime = util.formatTime(new Date());
    wx.redirectTo({
      url: '../successfulsystem/successfulsystem',
    })
    return
  }
}

})