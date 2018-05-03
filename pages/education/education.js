// pages/education/education.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "1973-10-10",//默认出生年月
    currentDate: "",//当前系统时间
    riskvalue: 6,//最大风险承受
    typeLeft: "",//有无投入资金左
    typeReight: "havemoneyactionr",//有无投入资金右
    desireInp: "教育规划",      //愿望名称
    desireMoney: 20000,   //愿望期望金额
    start_invest: "0", //起始投入金额
    riskFous: false,//风险文本框焦点
    moneyFous: false,//可投入资金
    wishMoneyFous: false,//预期教育
    gradeType:[true,false,false,false],//教育阶段类型
    gradeTypeIndex:0,//当前教育阶段
    gradeEdu:[true,false],//内外院校
    gradeEduIndex:0//当前每年教育支出
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({ currentDate: util.formatTime1(new Date(), '-', false) });
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

  //手动输入起始金额
  moneyInput: function (e) {
    this.setData({
      start_invest: e.detail.value
    })
  },
  //手动输入最大风险承受
  riskInput: function (e) {
    this.setData({
      riskvalue: e.detail.value
    })
  },

  next_step: function () {
    var gourl = '../third/third?desireInp=' + this.data.desireInp//愿望名称
    gourl = gourl + '&desireMoney=' + this.data.desireMoney   //愿望金额
    gourl = gourl + '&gradeTypeIndex=' + this.data.gradeTypeIndex   //教育阶段类型
    gourl = gourl + '&riskvalue=' + (-parseFloat(this.data.riskvalue) / 100)   //最大风险承受
    gourl = gourl + '&start_invest=' + this.data.start_invest   //起始投入金额
    gourl = gourl + '&date=' + this.data.date   //出生年月
    gourl = gourl + '&gradeEduIndex=' + this.data.gradeEduIndex//每年教育支出类型
    gourl = gourl + '&timevalue=6'
    console.log(gourl)
    wx.navigateTo({
      url: gourl,
    })
  },
  /**
   * 绑定有无投入资金
   */
  bindstyle: function (e) {
    var that = this;
    if (e.currentTarget.dataset.type == "l") {
      that.setData({ typeLeft: "havemoneyactionl", typeReight: "" });
      that.setData({ moneyFous: true })
    }
    else {
      that.setData({ typeLeft: "", typeReight: "havemoneyactionr" });
    }
  },
  /**
   * 绑定实现愿望和风险承受减号
   */
  timereduce: function (e) {
    var that = this;
    // if (e.currentTarget.dataset.time == "one") {
    //   var time = that.data.timevalue > 20 ? parseInt(that.data.timevalue) - 1 : 65;
    //   that.setData({ timevalue: time });
    // }
    // else {
      console.log(that.data.riskvalue)
      var risk = that.data.riskvalue > 0 ? --that.data.riskvalue : 0;
      that.setData({ riskvalue: that.data.riskvalue });
    //}
  }
  ,
  /**
   * 绑定实现愿望和风险承受加号
   */
  timeadd: function (e) {
    var that = this;
    // if (e.currentTarget.dataset.time == "one") {
    //   var time = that.data.timevalue < 100 ? parseInt(that.data.timevalue) + 1 : 65;
    //   that.setData({ timevalue: time });
    // }
    // else {
      that.setData({ riskvalue: ++that.data.riskvalue });
    //}
  },
  /**
   * 获得焦点
   */
  onrisk: function (e) {
    this.setData({ riskFous: true });
  },
  
  /**
   * 绑定出生年月 改变事件
   */
  datachange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 预期养老文本框点击
   */
  onmoney: function (e) {
    this.setData({
      wishMoneyFous: true
    });
  },
  /**
   * 每月养老滑块改变事件
   */
  onslider: function (e) {
    this.setData({ desireMoney: e.detail.value });
  },
  /**
   * 每年教育支出
   */
  inpWishMoney: function (e) {
    if (e.detail.value > 200000) {
      wx.showToast({
        title: '金额不能大于20万',
        icon: 'none'
      })
      this.setData({
        desireMoney: 20000
      });
    }
    else {
      this.setData({
        desireMoney: e.detail.value
      });
    }

  },
  /**
   * 教育阶段
   */
  ongrade:function(e){
    console.log(e.currentTarget.dataset.index);
    let temp=[false,false,false,false];
    temp[e.currentTarget.dataset.index]=true;
    this.setData({ gradeType: temp, gradeTypeIndex: e.currentTarget.dataset.index});
  },
  /**
   * 每年教育支出类别
   */
  onGradeEdu:function(e)
  {
    console.log(e)
    let temp = [false, false];
    temp[e.currentTarget.dataset.index] = true;
    this.setData({ gradeEdu: temp, gradeEduIndex:e.currentTarget.dataset.index});
  }
})