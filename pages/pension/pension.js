// pages/pension/pension.js
var util=require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timevalue: 65,//退休年龄
    riskvalue: 6,//最大风险承受
    typeLeft: "",//有无投入资金左
    typeReight: "havemoneyactionr",//有无投入资金右
    desireInp: "养老规划",      //愿望名称
    desireMoney: 5000,   //愿望期望金额
    start_invest: "0", //起始投入金额
    riskFous: false,//风险文本框焦点
    moneyFous: false,//可投入资金
    wishMoneyFous:false,//预期养老
    // timeArr: [{ id: 1, name: "一年" }, { id: 2, name: "两年" }, { id: 3, name: "三年" }, { id: 4, name: "四年" }, { id: 5, name: "五年" }, { id: 6, name: "六年" }, { id: 7, name: "七年" }, { id: 8, name: "八年" }, { id: 9, name: "九年" }, { id: 10, name: "十年" }],//愿望期限选择
    //timeIndex: 0,//愿望期限下标
    date:"1973-10-10",//默认出生年月
    currentDate:"",//当前系统时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    that.setData({ currentDate: util.formatTime1(new Date(), '-', false)});
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
    var gourl = '../third/third?desireInp=' + this.data.desireInp
    gourl = gourl + '&desireMoney=' + this.data.desireMoney   //愿望金额
    gourl = gourl + '&timevalue=' + this.data.timevalue   //退休年龄
    gourl = gourl + '&riskvalue=' + (-parseFloat(this.data.riskvalue) / 100)   //最大风险承受
    gourl = gourl + '&start_invest=' + this.data.start_invest   //起始投入金额
    gourl = gourl + '&date=' + this.data.date   //出生年月
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
    if (e.currentTarget.dataset.time == "one") {
      var time = that.data.timevalue > 20 ? parseInt(that.data.timevalue) - 1 : 65;
      that.setData({ timevalue: time });
    }
    else {
      console.log(that.data.riskvalue)
      var risk = that.data.riskvalue > 0 ? --that.data.riskvalue : 0;
      that.setData({ riskvalue: that.data.riskvalue });
    }
  }
  ,
  /**
   * 绑定实现愿望和风险承受加号
   */
  timeadd: function (e) {
    var that = this;
    if (e.currentTarget.dataset.time == "one") {
      var time = that.data.timevalue <100 ? parseInt(that.data.timevalue) + 1 : 65;
      that.setData({ timevalue: time });
    }
    else {
      that.setData({ riskvalue: ++that.data.riskvalue });
    }
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
  datachange:function(e){
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 预期养老文本框点击
   */
  onmoney:function(e)
  {
    this.setData({
      wishMoneyFous:true
    });
  },
  /**
   * 每月养老滑块改变事件
   */
  onslider:function(e){
    this.setData({ desireMoney: e.detail.value});
  },
  /**
   * 每期预期养老输入框改变
   */
  inpWishMoney:function(e)
  {
    if (e.detail.value>50000)
    {
       wx.showToast({
         title: '金额不能大于5万',
         icon:'none'
       })
       this.setData({
         desireMoney: 50000
       });
    }
    else
    {
      this.setData({
        desireMoney: e.detail.value
      });
    }
    
  }
})