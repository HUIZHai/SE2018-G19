var util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    modalHidden: true,
    toastHidden: true
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '记录'
    })
  },
  onLoad:function(){
    this.getLogs()
  },
  set: function () {
  },
  getLogs: function () {
    let logs = wx.getStorageSync('logs')
    // logs.forEach(function(item, index, arry) {
    //   item.startime = new Date(item.startTime).toLocaleDateString()
    // })
    this.setData({
      logs: logs
    })
  },
  switchModal: function () {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  hideToast: function () {
    this.setData({
      toastHidden: true
    })
  },
  clearLog: function (e) {
    wx.setStorageSync('logs', [])
    this.switchModal()
    this.setData({
      toastHidden: false
    })
    this.getLogs()
  }
})