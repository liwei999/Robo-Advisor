// pages/second/second.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timevalue:6,//实现愿望期限
    riskvalue:6,//最大风险承受
    typeLeft:"",//有无投入资金左
    typeReight: "havemoneyactionr",//有无投入资金右
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options.time);
    if (options.time)
    {
    that.setData({timevalue:options.time});
    }
    else
    {
      that.setData({ timevalue: 6 });
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
  
  // }
  //,
  next_step:function(){
    wx.navigateTo({
      url: '../webviewThird/webviewThird',
    })
  },
  /**
   * 绑定有无投入资金
   */
  bindstyle:function(e){
    var that=this;
    if (e.currentTarget.dataset.type=="l")
    {
      that.setData({typeLeft: "havemoneyactionl",typeReight:""});
    }
    else{
      that.setData({ typeLeft: "", typeReight: "havemoneyactionr" });
    }
  },
  /**
   * 绑定实现愿望和风险承受减号
   */
  timereduce:function(e){
    var that = this;
    if (e.currentTarget.dataset.time=="one")
    {
      var time = that.data.timevalue > 0 ? --that.data.timevalue: 0;
      that.setData({ timevalue: that.data.timevalue});      
    }
    else
    {
      console.log(that.data.riskvalue)
      var risk = that.data.riskvalue > 0 ? --that.data.riskvalue : 0;
      that.setData({ riskvalue: that.data.riskvalue });      
    }
  }
  ,
  /**
   * 绑定实现愿望和风险承受加号
   */
  timeadd:function(e){
    var that = this;
    if (e.currentTarget.dataset.time == "one") {
      that.setData({ timevalue: ++that.data.timevalue });
    }
    else
    {
      that.setData({ riskvalue: ++that.data.riskvalue });      
    }
  }
})