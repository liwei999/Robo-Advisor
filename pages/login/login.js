// pages/login/login.js

var util = require("../../utils/util.js");

var remoteUrl1 = getApp().globalData.remoteUrl1;
var remoteUrl2 = getApp().globalData.remoteUrl2;  
var rui = 'rememberUserInfo';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: 'dsfof',
    passWd: '123456'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //用户名，手机号，密码输入框
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  passWdInput: function (e) {
    this.setData({
      passWd: e.detail.value
    })
  },
  loginBtnClick: function () {
    console.log("点击-------------");
    var that = this;

    var userName = this.data.userName;
    var passWd = this.data.passWd;
    if (userName == '' || userName == undefined) {
      console.log("用户名不能为空");
      toast('用户名不能为空');
      return;
    }
    if (passWd == '' || passWd == undefined) {
      console.log("密码不能为空");
      toast('密码不能为空');
      return;
    }

    wx.showToast({
      title: '验证登录信息...',
      icon: 'loading'
    });

    // 记住密码,你也可以放到请求数据成功的里面，这样用户输错信息，就不会记住错误的密码
    // 跳转带有tab的界面使用：wx.switchTab({ url: "../home/home" });
    // 最后再进行MD5加密，这里假设数据请求成功直接跳转界面
    var request = true;

    wx.request({
      url: remoteUrl2 + 'CheckLogin/?user_name=' + this.data.userName + '&password=' + this.data.passWd,
      data: {
      },
      method: 'Get',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function (res) {
        if (res.errMsg === 'request:ok') {
          console.log(res.data)
          console.log(res.data[0].id)
          if (res.data[0].id != "0") {
            wx.setStorageSync("sessionid", res.header["Set-Cookie"])
            var obj = new Object();
            obj.name = that.data.userName;   //登录名称
            obj.pswd = that.data.passWd;    //登录密码
            obj.id = res.data[0].id;        //用户id
            obj.rbFlag = true;   //记住密码
            console.log('obj', obj);
            wx.setStorageSync(rui, obj);

            //判断是否需要返回上一页
            if (util.GetLoginedGoBacKStatus())
            {
              var pages = getCurrentPages();
              var prePage = pages[pages.length - 2];
              //跳出上一页购买界面
              //console.log(prePage.buyButton)
              

              //后退到上一页
              wx.navigateBack({
                delta: -1
              });

              prePage.autoOpenBuy();
            }
            else
            {
              //跳转到登录成功默认主页
              wx.switchTab({
                url: '../wish_list/wish_list',
              });
            }

          }
          else {
            toast("账号或密码错误！");
          }
        }
      },
      fail: function (res) {
        wx.showToast({
          title: "登录异常，请重试！",
          icon: 'loading',
          duration: 3000
        })
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

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {
  
  // }
  /**
  * 注册
  */
  on_register: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  /**
  * 登录
  */
  on_login: function () {
    wx.showToast({
      title: '点击了登录',
      icon: 'none'
    })
  }
})

function toast(toast) {
  wx.showToast({
    title: toast,
    duration: 2000
  })
}
