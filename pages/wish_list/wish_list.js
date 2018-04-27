// pages/wish_list/wish_list.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    target: [
      {
        "imageUrl": "",
        "name": "六年后送孩子留学",
        "allmoney": 10000,
        "complete": 10000,
        "time": "最近一次心愿金存入4月13日",
        " yesterdayEarning": "0.56",
        "addEarning": "66.42"
      }, {
        "imageUrl": "",
        "name": "六年后送孩子留学",
        "allmoney": 10000,
        "complete": 4000,
        "time": "最近一次心愿金存入4月13日",
        " yesterdayEarning": "0.56",
        "addEarning": "66.42"
      },
      {
        "imageUrl": "",
        "name": "六年后送孩子留学",
        "allmoney": 10000,
        "complete": 2000,
        "time": "最近一次心愿金存入4月13日",
        " yesterdayEarning": "0.56",
        "addEarning": "66.42"
      },
      {
        "imageUrl": "",
        "name": "六年后送孩子留学",
        "allmoney": 10000,
        "complete": 0,
        "time": "最近一次心愿金存入4月13日",
        " yesterdayEarning": "0.56",
        "addEarning": "66.42"
      }
    ]
  }
  ,
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
   * 新的心愿
   */
  on_new_wish:function(){
    wx.navigateTo({
      url: '../first/first',
    })
  },
  /**
   * 心愿详细
   */
  on_detailed:function(){
    wx.navigateTo({
      url: '../wish_detailed/wish_detailed',
    })
  }
})