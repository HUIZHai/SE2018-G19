//app.js
const APP_ID = 'wxb1a10c757a09414d';//输入小程序appid  
const APP_SECRET = 'add180f3fb1a5a952a781360641e0a38';//输入小程序app_secret  
var OPEN_ID = ''//储存获取到openid  
var SESSION_KEY = ''//储存获取到session_key  


App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      
      success: function (res) {
        var app = getApp();
        wx.request({
          //获取openid接口  
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
          data: {
            appid: APP_ID,
            secret: APP_SECRET,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data)
            OPEN_ID = res.data.openid;//获取到的openid  
            SESSION_KEY =  res.data.session_key;//获取到session_key 
            app.globalData.openID = res.data.openid;
            console.log(app.globalData.openID)
            console.log(OPEN_ID.length)
            console.log(SESSION_KEY.length)
        //     this.setData({
        //       openid: res.data.openid.substr(0, 10) + '********' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length),
        //       session_key: res.data.session_key.substr(0, 8) + '********' + res.data.session_key.substr(res.data.session_key.length - 6, res.data.session_key.length)
        //     })
          }
          
        })
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
  globalData: {
    nowtime:{},
    endtime:{},
    userInfo: null,
    openID: "",
    SESSION_KEY:''
  }
})