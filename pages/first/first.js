// pages/first/first.js

var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: ["../../image/banner.png", "../../image/banner2.png", "../../image/banner3.png"],
    desire: [{ title: '两年后的旅行', money: '10000', time: 6 }, { title: '六年后的培养', money: '20000', time: 72 }, { title: '存1万块', money: '10000', time: 12 }, { title: '买个LV包', money: '20000', time: 9 },{ title: '买个MacBook', money: '6000', time: 8 }],
    desireInp:"",
    desireMoney:"",
    desiretime:"6",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //判断是否登录
    if (util.GetUserInfo().id)
    {
     if (getApp().globalData.firstLogin)
     {
       getApp().globalData.firstLogin=false;
        //跳转到登录成功默认主页
        wx.switchTab({
          url: '../wish_list/wish_list',
        });
     }
    }
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

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {
  
  // },
  /**
   * 下一步
   */
  next_step:function(e){
    
    var that=this;
    if (!this.data.desireInp)
    {
      wx.showToast({
        title: '请输入愿望',
        icon:'none',
        duration:2000
      });
      return;
    }
    if (!this.data.desireMoney)
    {
      wx.showToast({
        title: '请输入金额',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    wx.navigateTo({
      url: '../second/second?desireInp=' + this.data.desireInp + "&time=" + this.data.desiretime + "&desireMoney=" + this.data.desireMoney,
    })
  },
  /**
   * 目标点击事件
   */
  click_desire:function(e){
    console.log(e);
    var that= this;
    that.setData({ desireInp: e.currentTarget.dataset.title, desireMoney: e.currentTarget.dataset.money, desiretime: e.currentTarget.dataset.time});
  }
  ,
  /**
   * 输入愿望事件
   */
  desireInp:function(e){
    this.setData({ desireInp: e.detail.value });
  }
  ,
  /**
   * 输入金额
   */
  desireInpMoney:function(e)
  {
    this.setData({ desireMoney: e.detail.value});
  }
})