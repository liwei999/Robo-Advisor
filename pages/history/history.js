// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    item_color: ["#0e98d8", "#199ddb", "#21a1dd", "#2fa8e0", "#3fb0e4", "#4fb8e8", "#5ebfec", "#6dc7f0", "#88d3f6", "#ace5ff"],//表格颜色
    fund_data: {
      "fund": [{
        "jjmc": "华夏成长",
        "jjdm": "000001",
        "bl1": "21.00",
        "bl2": "41.00",
        "operation":"加",
        "type": "货币型"
      }, {
        "jjmc": "先锋现金宝货币",
        "jjdm": "003585",
        "bl1": "32.11",
        "bl2": "26.98",
        "operation": "减",
        "type": "货币型"
      }
        , {
        "jjmc": "华夏成长2",
        "jjdm": "000032",
        "bl1": "32.11",
        "bl2": "26.98",
        "operation": "减",
        "type": "稳健型"
      }
        ,
      {
        "jjmc": "华夏成长2",
        "jjdm": "000032",
        "bl1": "32.11",
        "bl2": "26.98",
        "operation": "减",
        "type": "积极型"
      }
        , {
        "jjmc": "华夏成长2",
        "jjdm": "000032",
        "bl1": "32.11",
        "bl2": "26.98",
        "operation": "减",
        "type": "积极型"
      }, {
        "jjmc": "华夏成长2",
        "jjdm": "000032",
        "bl1": "69.11",
        "bl2": "70.98",
        "operation": "加",
        "type": "积极型"
      }
      ],
      "type": ["货币型", "稳健型", "积极型"]
    }
    ,
    reasons: ["调仓理由：首先上证指数趋势模型发出信号，由震荡变为下跌；其次均值 - CVaR风险管理、组合波动率监测均发出预警信号；为降低组合波动，降低权益类资产仓位。 ", "调仓理由：2", "调仓理由：3","调仓理由：4"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
      })
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

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  
  // }
})