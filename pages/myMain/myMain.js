// pages/myMain/myMain.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    item_bar:[true,false,false,false],
    isLogin: false,//模拟判断是否登录 默认没登录 false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        Account_Type: e.target.dataset.current,
        //temp: e.detail.current == 0 ? '团队' : '理财师'
      });
    }
  },
  /**
   * 点击时间tab
   */
  on_first_tab:function(e){
    var index= this.data.item_bar[e.target.dataset.index]
    var temp = [false, false, false, false];
    temp[e.target.dataset.index] = !index;
   
      this.setData({ item_bar: temp })
  },
  click_history:function(e){
    wx.navigateTo({
      url: '../history/history',
    })
  },
  click_buy:function(e)
  {

    if (this.data.isLogin) {
      wx.showModal({
        content: '您还没有做风险测评，请先完成测评',
        confirmText: '去测评',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击去测评');
            wx.redirectTo({
              url: '../riskAssessment/riskAssessment',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您还没有登录，请先登录',
        cancelText: '登录',
        confirmText: '注册',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击注册');
            wx.navigateTo({
              url: '../register/register',
            });
          } else if (res.cancel) {
            console.log('用户点击登录')
            wx.navigateTo({
              url: '../login/login',
            });
          }
        }
      })
      this.setData({ isLogin: !this.data.isLogin });
    }
    
  }

})