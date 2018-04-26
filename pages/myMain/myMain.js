// pages/myMain/myMain.js
import * as echarts from '../../ec-canvas/echarts';
var remoteUrl1 = getApp().globalData.remoteUrl1;  
//折线图设置
function getLineOption(navDate, dailyReturn1, dailyReturn2) {

  return {
    backgroundColor: "#fff",
    color: ['red', "#37A2DA"],

    tooltip: {
      trigger: 'axis'
    },
    legend: {
      // x: 'center',
      // y: 'bottom',
      bottom :10
    },
    grid: {
      containLabel: true,
      width: "85%",
      height: "75%",
      top: 20,
      left:'5%'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: navDate
    },
    yAxis: {
      x: 'center',
      type: 'value'
    },
    series: [{
      name: '组合增长率',
      type: 'line',
      smooth: true,
      data: dailyReturn1
    }, {
      name: '同类型',
      type: 'line',
      smooth: true,
      data: dailyReturn2
    }]
  };

}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    item_bar:[true,false,false,false],
    hidden_arr: [true,false,false],
    isLogin: false,//模拟判断是否登录 默认没登录 false

    ec_line: {
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false,
    zhId: "116",//组合id
    datetype:[3,6,12,999],//时间类型
    width:"100%",
    item_color: ["#0e98d8","#199ddb","#21a1dd","#2fa8e0","#3fb0e4","#4fb8e8","#5ebfec","#6dc7f0","#88d3f6","#ace5ff"],//表格颜色
    fund_data: {
      "fund": [{
        "jjmc": "华夏成长",
        "jjdm": "000001",
        "bl": "81.00",
        "type": "货币型"
      }, {
        "jjmc": "华夏成长2",
        "jjdm": "000032",
        "bl": "12.0",
        "type": "稳健型"
      }
      , {
        "jjmc": "华夏成长2",
        "jjdm": "000032",
        "bl": "12.0",
        "type": "稳健型"
      }
      ,
      {
        "jjmc": "华夏成长2",
        "jjdm": "000032",
        "bl": "12.0",
        "type": "积极型"
      }
        , {
        "jjmc": "华夏成长2",
        "jjdm": "000032",
        "bl": "12.0",
        "type": "积极型"
      }, {
        "jjmc": "华夏成长2",
        "jjdm": "000032",
        "bl": "12.0",
        "type": "积极型"
      }
      ],
      "type": ["货币型", "稳健型","积极型"]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.getCharData(that.data.zhId,'','',that.data.datetype[0]);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.ecComponent_line = this.selectComponent('#mychart-dom-line');
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
  
  // },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var temp = [false, false, false];
      temp[e.target.dataset.current]=true;
      that.setData({
        currentTab: e.target.dataset.current,
        hidden_arr: temp
      })
    }
    console.log(temp);
  },

  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /**
   * 点击时间tab
   */
  on_first_tab:function(e){
    var index= this.data.item_bar[e.target.dataset.index]
    var temp = [false, false, false, false];
    temp[e.target.dataset.index] = !index;
   
    this.setData({ item_bar: temp })
    this.getCharData(this.data.zhId, '', '', this.data.datetype[e.target.dataset.index]);
  },
  click_history:function(e){
    wx.navigateTo({
      url: '../history/history',
    })
  },
  click_buy:function(e)
  {

    if (this.data.isLogin) {
      wx.showModal({
        content: '您还没有做风险测评，请先完成测评',
        confirmText: '去测评',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击去测评');
            wx.redirectTo({
              url: '../riskAssessment/riskAssessment',
            })
          } else if (res.cancel) {
            console.log('用户点击取消') 
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您还没有登录，请先登录',
        cancelText: '登录',
        confirmText: '注册',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击注册');
            wx.navigateTo({
              url: '../register/register',
            });
          } else if (res.cancel) {
            console.log('用户点击登录')
            wx.navigateTo({
              url: '../login/login',
            });
          }
        }
      })
      this.setData({ isLogin: !this.data.isLogin });
    }
    
  },
  /**
   * 根据组合id获得图形数据
   */
  getCharData: function (zhid, sdate, edate, datetype) {
    var that = this;
    wx.request({
      url: remoteUrl1 + 'GetZhsylxl.aspx?userid=&zhid=' + zhid + '&sdate=' + sdate + '&edate=' + edate + '&datetype=' + datetype + '&callback=',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data);
        if (res.data) {
          var navDate = [];
          var dailyReturn1 = [];
          var dailyReturn2 = [];
          for (var i = 0; i < res.data.length; i++) {
            navDate.push(res.data[i].navDate);
            dailyReturn1.push(res.data[i].dailyReturn1);
            dailyReturn2.push(res.data[i].dailyReturn2);
          }
          //将数据显示到图表上
          that.ChartLineInit(navDate, dailyReturn1, dailyReturn2);
          //隐藏loading
          that.setData({ hiddenLoading: true });
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
  // 点击按钮后初始化图表
  ChartLineInit: function (arr1, arr2, arr3) {
    this.ecComponent_line.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      //setOption(chart);
      chart.setOption(getLineOption(arr1, arr2, arr3));

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

})