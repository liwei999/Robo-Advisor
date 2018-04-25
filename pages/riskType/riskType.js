// pages/riskType/riskType.js
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
   * 确认购买
   */
  click_buy:function(){
    
    // var pages = getCurrentPages();
    // var currPage=pages[pages.length-3];//心愿计划第三页
    
    // wx.navigateBack({ delta: 2});
    wx.switchTab({
      url: '../wish_list/wish_list',
    })
  }
  ,
  /**
   * 重新测评
   */
  click_retest:function(){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 2];//测评主页
    console.log(pages);
    currPage.setData({index:0});
    
    wx.navigateBack({ delta: 1 });
  }
})