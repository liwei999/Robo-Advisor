// pages/setup/setup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  unsubscribeEvent: function (e) {
    var _this = this;
    console.log(e);
    var idx = e.currentTarget.dataset.idx;
    wx.showModal({
      title: '提示',
      content: '确定退出当前账号登录？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          //设置重新载入标记
          var app = getApp();
          getApp().globalData.reload = '1'

          wx.redirectTo({
            url: '../login/login',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
  // onShareAppMessage: function () {
  
  // }
  /**
   * 跳转到绑定银行卡
   */
  on_bank:function(){
     wx.navigateTo({
       url: '../bankcard/bankcard',
     })
  },
  /**
   * 跳转风险测评
   */
  on_risk:function(){
    wx.navigateTo({
      url: '../riskAssessment/riskAssessment',
    })
  },
  /**
   * 清除数据
   */
  clearData:function(){
    try {
      wx.clearStorageSync();
      wx.showToast({
        title: '清除成功',
        icon: 'none'
      });
      wx.redirectTo({
        url: '../first/first'
      });
    } catch (e) {
      wx.showToast({
        title: '清除失败',
        icon:'none'
      })
    }
  }
})