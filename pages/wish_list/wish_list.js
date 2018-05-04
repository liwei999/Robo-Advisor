// pages/wish_list/wish_list.js
var util = require("../../utils/util.js");
var remoteUrl1 = getApp().globalData.remoteUrl1;
var remoteUrl2 = getApp().globalData.remoteUrl2;  

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading: false,//页面加载loading true不显示
    target: [
      // {
      //   "imageUrl": "",
      //   "name": "六年后送孩子留学",
      //   "allmoney": 100000,
      //   "complete": 1000,
      //   "time": "最近一次心愿金存入4月13日",
      //   "yesterdayEarning": "0.56",
      //   "addEarning": "66.42"
      // }, {
      //   "imageUrl": "",
      //   "name": "六年后送孩子留学",
      //   "allmoney": 10000,
      //   "complete": 4000,
      //   "time": "最近一次心愿金存入4月13日",
      //   " yesterdayEarning": "0.56",
      //   "addEarning": "66.42"
      // },
      // {
      //   "imageUrl": "",
      //   "name": "六年后送孩子留学",
      //   "allmoney": 10000,
      //   "complete": 2000,
      //   "time": "最近一次心愿金存入4月13日",
      //   " yesterdayEarning": "0.56",
      //   "addEarning": "66.42"
      // },
      // {
      //   "imageUrl": "",
      //   "name": "六年后送孩子留学",
      //   "allmoney": 10000,
      //   "complete": 0,
      //   "time": "最近一次心愿金存入4月13日",
      //   " yesterdayEarning": "0.56",
      //   "addEarning": "66.42"
      // }
    ],
    imagesrc: ["../../image/1.png", "../../image/2.png", "../../image/3.png"]
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户id
    var userinfo = util.GetUserInfo();
    console.log(userinfo)
    if (userinfo!=null)
    {
      var userid = util.GetUserInfo().id;
      console.log(userid);
      this.getDreamList(userid);
    }
  },

  /**
   * 按用户id返回心愿列表
   */
  getDreamList: function (userid) {
    var that = this;
    wx.request({
      url: remoteUrl2 + 'ListDream/?userid='+userid,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data);
        if (res.data) {
          //将数据显示到图表上
          //隐藏loading
          that.setData({ hiddenLoading: true,
          target:res.data});
        }
      }
      ,
      fail: function (res) {
        util.toast("请求失败！");
      },
      complete: function (res) {

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
    // var userinfo = util.GetUserInfo();
    // console.log(userinfo)
    // if (userinfo != null) {
    //   var userid = util.GetUserInfo().id;
    //   console.log(userid);
    //   this.getDreamList(userid);
    // }
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