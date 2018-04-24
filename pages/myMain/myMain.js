// pages/myMain/myMain.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    item_bar:[true,false,false,false]
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
  on_first_tab:function(e){
    var index= this.data.item_bar[e.target.dataset.index]
    var temp = [false, false, false, false];
    temp[e.target.dataset.index] = !index;
   
      this.setData({ item_bar: temp })
      
  
   

  }
})