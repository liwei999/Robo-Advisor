// pages/riskType/riskType.js
var util = require("../../utils/util.js");

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

    //
    //保存风险测评结果
    var userinfo = util.GetUserInfo();
    var obj = new Object();
    obj.name = userinfo.name;   //登录名称
    obj.pswd = userinfo.pswd;    //登录密码
    obj.id = userinfo.id;        //用户id
    obj.rbFlag = true;   //记住密码
    obj.RiskTest=true;
    wx.setStorageSync('rememberUserInfo', obj);

    console.log(util.GetUserInfo())

    if (getApp().globalData.RiskTestGoBack)
    {
      var pages = getCurrentPages();
      var prePage = pages[pages.length - 3];

      //后退两个页面
      wx.navigateBack({ delta:2});

      //恢复返回状态默认值
      getApp().globalData.RiskTestGoBack = false;

      //打开购买按钮
      prePage.autoOpenBuy();
    }
    else
    {
      wx.switchTab({
        url: '../wish_list/wish_list',
      })
    }
    //判断是否要跳转到第三页

  
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