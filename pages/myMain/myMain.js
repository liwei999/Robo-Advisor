// pages/myMain/myMain.js
import * as echarts from '../../ec-canvas/echarts';

var util = require("../../utils/util.js");

//导入饼图配置函数
var fun_Chart = require("./bindChart.js");

var buyButton = null;
var remoteUrl1 = getApp().globalData.remoteUrl1;  
var remoteUrl2 = getApp().globalData.remoteUrl2;  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    item_bar:[true,false,false,false],
    hidden_arr: [true,false,false],
    isLogin: false,//模拟判断是否登录 默认没登录 false
    ec_bar: {
      lazyLoad: true
    },
    ec_line: {
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false,
    nhsyl: 0.1,   //年化收益
    nhbdl: 0.2, //年化波动率
    f_hc: 0.3,  //最大回撤
    f_xp: 0.4,   //夏普比率
    zhId: "116",//组合id
    datetype:[3,6,12,999],//时间类型
    width:"100%",
    item_color: ["#0e98d8","#199ddb","#21a1dd","#2fa8e0","#3fb0e4","#4fb8e8","#5ebfec","#6dc7f0","#88d3f6","#ace5ff"],//表格颜色
    bar_data:{},    //组合数据数据
    fund_data:{}   //组合配置基金详情数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ecComponent_line = this.selectComponent('#mychart-dom-line');
    this.ecComponent_bar = this.selectComponent('#mychart-dom-bar');

    var that=this;
    that.getCharData(that.data.zhId,'','',that.data.datetype[0]);
    that.getZhDetails(that.data.zhId);
    //return
     var data1=[
      { value: 335, name: '直接访问' },
      { value: 310, name: '邮件营销' },
      { value: 234, name: '联盟广告' },
      { value: 135, name: '视频广告' },
      { value: 1548, name: '搜索引擎' }]
    //that.ChartBarInit('hehe',data1)
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

  //自动弹出购买按钮,首先要测评
  autoOpenBuy: function () {

    //判断是否测评
    if (!util.GetUserInfo().RiskTest) {
      //设置测评后返回标识
      getApp().globalData.RiskTestGoBack = true;

      //弹出测评窗口
      util.CheckRiskTest();
    }
    else {
      this.onclickbuy(buyButton)
    }
  },

  onclickbuy:function(e)
  {
    //保存在变量中，供回退时调用
    buyButton = e;
    //获取用户登录信息
    var userinfo = util.GetUserInfo()

    if (userinfo != null && userinfo.id) {
      //判断是否测评
      if (!util.GetUserInfo().RiskTest) {

        //设置测评后返回标识
        getApp().globalData.RiskTestGoBack = true;
        //弹出测评窗口
        util.CheckRiskTest();
        return
      }
      //弹出购买窗口
      this.setModalStatus(e)
    }
    else {
      wx.showModal({
        title: '提示',
        content: '您还没有登录，请先登录',
        cancelText: '取消',
        confirmText: '登录',
        success: function (res) {
          if (res.confirm) {

            //设置登录后立即返回上一页标记
            util.SetLoginedGoBack(true)
            wx.navigateTo({
              url: '../login/login',
            })
          } else if (res.cancel) {
            
          }
        }
      })
    }
    
  },
  /**
   * 显示隐藏菜单
   */
  setModalStatus: function (e) {
    console.log("设置显示状态，1显示0不显示", e.currentTarget.dataset.status);
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()

    this.setData({
      animationData: animation.export()
    })

    if (e.currentTarget.dataset.status == 1) {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }

    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (e.currentTarget.dataset.status == 0) {
        this.setData(
          {
            showModalStatus: false,
          }
        );

        //this.pageScrollToBottom();
      }
    }.bind(this), 200)
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
      chart.setOption(fun_Chart.getLineOption(arr1, arr2, arr3));

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
  //初始化饼图
  ChartBarInit: function (titleTxt, ChartData) {
    this.ecComponent_bar.init((canvas, width, height) => {
      const pieChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      //取得图表配置数据
      pieChart.setOption(fun_Chart.getPieOption(titleTxt, ChartData));

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return pieChart;
    });
  },

  /**
   * 根据组合详情 配置比例、基金组合详情、风险收益数据
   */
 getZhDetails: function(zhid) {
   var that=this;
    wx.request({
      url: remoteUrl2 + 'GetZhDetails/?zhid=' + zhid,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        
        if (res.data) {
          //整理组合配置数据
          var bardata = []
          var item={};
          var item_color=that.data.item_color;
          var risk = res.data.risk[0];
          for (var i = 0; i < res.data.type.length; i++) 
          {
            var ar = res.data.type[i];
            item = { value: ar.bl, name: ar.f_type, itemStyle: fun_Chart.getPieItemStyle(item_color[i], item_color[i])}
            bardata.push(item);
          }
          //console.log(bardata)
          console.log(res.data.risk)
          //设置组合风险收益值和
          that.setData({
            fund_data: res.data,
            nhsyl: risk.nhsyl,
            nhbdl: risk.nhbdl,
            f_hc: risk.f_hc,
            f_xp: risk.f_xp
          });

          


          //初始化组合配置图表
          that.ChartBarInit('', bardata)
        }
      }
      ,fail: function (res) {
        util.toast("请求数据异常！");
      },
      complete: function (res) {
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.ecComponent_line = this.selectComponent('#mychart-dom-line');
    this.ecComponent_bar = this.selectComponent('#mychart-dom-bar');
  }
})