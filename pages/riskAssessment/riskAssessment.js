// pages/riskAssessment/riskAssessment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: ['../../image/temp15.png', '../../image/temp16.png'],
    index:0
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

  click_next:function(){
    var that=this;
    var temp = ++that.data.index;
    if (temp<=that.data.image.length-1)
    {
      that.setData({ index: temp });
    }
    else
    {
      wx.navigateTo({
        url: '../riskType/riskType',
      })
    }
  },
  next_upper:function(){
    var that = this;
    var temp = --that.data.index;
    if (temp >= 0) {
      that.setData({ index: temp });
    }
  }
})