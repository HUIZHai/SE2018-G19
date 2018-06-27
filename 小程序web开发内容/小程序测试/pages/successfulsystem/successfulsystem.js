// pages/systemevaluation/systemevaluation.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  tofirst: function () {
    wx.redirectTo({
      url: '../first/first',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var count = wx.getStorageSync('count')
    var startime = app.globalData.nowtime
    var endtime = app.globalData.endtime
    this.setData({
      startime: startime,
      endtime: endtime,
    })
    console.log(startime);
    console.log(endtime);
    this.setData({
      count: count,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})