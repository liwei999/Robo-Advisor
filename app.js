//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code);
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
    userInfo: null,
    reload:'0',     //跳转到首页时是否重装载入数据
    screenHeight:0,  //屏幕高度
    loginedGoBack:false,  //登录后是否立刻后退
    RiskTestGoBack: false,  //测评后路回第三页
    firstLogin:true,  //是否首次登录
    remoteUrl1: 'https://221.dsfof.com.cn/webservice/',    //远程数据接口1
    remoteUrl2: 'https://221.dsfof.com.cn/py/',    //远程数据接口2
    remoteUrl3: 'https://221.dsfof.com.cn/'    //远程数据接口3
  }
})