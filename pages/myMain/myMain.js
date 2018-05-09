// pages/myMain/myMain.js
//import * as echarts from '../../ec-canvas/echarts';

var util = require("../../utils/util.js");

//导入饼图配置函数
var fun_Chart = require("./bindChart.js");

var buyButton = null;
var remoteUrl1 = getApp().globalData.remoteUrl1;  
var remoteUrl2 = getApp().globalData.remoteUrl2;  
var remoteUrl3 = getApp().globalData.remoteUrl3;  
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
    zhId: "165",//组合id
    datetype:[3,6,12,999],//时间类型
    width:"100%",
    item_color: ["#0e98d8","#199ddb","#21a1dd","#2fa8e0","#3fb0e4","#4fb8e8","#5ebfec","#6dc7f0","#88d3f6","#ace5ff"],//表格颜色
    bar_data:{},    //组合数据数据
    fund_data:{},   //组合配置基金详情数据
    imageSrc:["","","",""],//图片地址
    imageType:["syl","hc","dt","bl"],//图片类型
    item_bar_index:0,//选中时间序列
    hiddenarr: ["block", "none"],//列表的显示隐藏
    desireInp: '',  //愿望名默认为空
    risk_parameter: '-0.09',         //最大承受风险
    periods: '24',       //投资时间(月份)
    start_invest: '1000',  //初始金额
    total_money: '10000',    //期望完成收益金额(本金+收益)
    n_num: 0, //#定投期数
    p_money: 0,//#每月定投金额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.ecComponent_line = this.selectComponent('#mychart-dom-line');
    //this.ecComponent_bar = this.selectComponent('#mychart-dom-bar');
    console.log(options);
    var that=this;
    //that.getCharData(that.data.zhId,'','',that.data.datetype[0]);
    that.setData({ 
      zhId: options.zhId,
      p_money: options.p_money,
      n_num: options.n_num,
      total_money: options.total_money,
      start_invest: options.start_invest,
      periods: options.periods,
      risk_parameter: options.risk_parameter,
      desireInp: options.desireInp
      });
    that.setData({ imageSrc: [remoteUrl3 + '/img/get' + this.data.imageType[that.data.currentTab] + that.data.zhId + '_' + that.data.datetype[0] + '.jpeg', "", "", remoteUrl3 + '/img/get' + this.data.imageType[3] + that.data.zhId +'.jpeg']});
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

      var tempImage = this.data.imageSrc;
      tempImage[e.target.dataset.current] = remoteUrl3 + '/img/get' + this.data.imageType[e.target.dataset.current] + this.data.zhId + '_' + this.data.datetype[that.data.item_bar_index] + '.jpeg';
      that.setData({
        currentTab: e.target.dataset.current,
        hidden_arr: temp,
        imageSrc: tempImage
      })
    }
    console.log(temp);
  },

  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    console.log(e);
    if (that.data.currentTab === e.detail.current) {
      return false;
    } else {
      var temp = [false, false, false];
      temp[e.detail.current] = true;

      var tempImage = this.data.imageSrc;
      tempImage[e.detail.current] = remoteUrl3 + '/img/get' + this.data.imageType[e.detail.current] + this.data.zhId + '_' + this.data.datetype[that.data.item_bar_index] + '.jpeg';
      that.setData({
         currentTab: e.detail.current ,
         hidden_arr: temp,
         imageSrc: tempImage
      });
    }

  },
  /**
   * 点击时间tab
   */
  on_first_tab:function(e){
    var index= this.data.item_bar[e.target.dataset.index]
    var temp = [false, false, false, false];
    var tempImage = this.data.imageSrc;
    tempImage[this.data.currentTab] = remoteUrl3 + '/img/get' + this.data.imageType[this.data.currentTab] + this.data.zhId + '_' + this.data.datetype[e.target.dataset.index] + '.jpeg';
    temp[e.target.dataset.index] = !index;
    
    this.setData({ item_bar: temp, imageSrc: tempImage, item_bar_index: e.target.dataset.index})
    //this.getCharData(this.data.zhId, '', '', this.data.datetype[e.target.dataset.index]);
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
      this.setData({ hiddenarr: ["display", "none"] });
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
    var that = this;
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
        wx.showModal({
          title: '',
          content: '您没有完成交易，可以选择创建一个模拟心愿，来体验心愿运行状态',
          cancelColor: "#000",
          confirmText: "去创建",
          confirmColor: "#000",
          success: function (res) {
            if (res.confirm) {
              console.log('去创建');
              that.SaveDream();
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
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
          //var bardata = []
          var item={};
          var item_color=that.data.item_color;
          var risk = res.data.risk[0];
          for (var i = 0; i < res.data.type.length; i++) 
          {
            var ar = res.data.type[i];
            item = { value: ar.bl, name: ar.f_type, itemStyle: fun_Chart.getPieItemStyle(item_color[i], item_color[i])}
            //bardata.push(item);
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
          //that.ChartBarInit('', bardata)
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
    //this.ecComponent_line = this.selectComponent('#mychart-dom-line');
    //this.ecComponent_bar = this.selectComponent('#mychart-dom-bar');
  },
  /**
   * 保存模拟心愿
   */
  SaveDream: function () {
    var that = this;
    var userinfo = util.GetUserInfo();
    that.setData({ hiddenLoading: false });
    wx.request({
      url: remoteUrl2 + 'SaveDream/?userid=' + userinfo.id + '&dr_name=' + that.data.desireInp + '&dr_money=' + that.data.total_money + '&dr_time=' + that.data.periods + '&in_money=' + that.data.start_invest + '&max_hc=' + that.data.risk_parameter + '&classid=' + that.data.zhId + '&iftrue=0&n_num=' + that.data.n_num + '&p_money=' + that.data.p_money + '&nd=' + parseInt(1000 * Math.random()),
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.errMsg == "request:ok") {

          // {
          //   wx.switchTab({
          //     url: '../wish_list/wish_list',
          //   });
          // }
          // var userinfo = util.GetUserInfo()
          if (userinfo && userinfo.id) {
            if (!getApp().globalData.firstLogin) {
              var pages = getCurrentPages();
              var prePage = pages[pages.length - 5];
              //console.log(prePage);
              wx.navigateBack({ delta: 4 });
              prePage.getDreamList(userinfo.id);
            }
            else {
              wx.switchTab({
                url: '../wish_list/wish_list',
              });
            }
          }


        }
        else {
          wx.showToast({
            title: '创建心愿失败',
            icon: 'none',
            duration: 2000
          });
        }

      }
      ,
      fail: function (res) {
        wx.showToast({
          title: '创建心愿失败',
          icon: 'none',
          duration: 2000
        });
      },
      complete: function (res) {
        //隐藏loading
        that.setData({ hiddenLoading: true });
      }
    })
  },
  /**
 * 绑定银行卡
 */
  on_addbank: function (e) {
    wx.navigateTo({
      url: '../certification/certification',
    })
  },
  /**
 * 确认购买
 */
  next_step: function () {
    //判断扣款金额是不是大于5万，
    this.setData({ hiddenarr: ["none", "block"] });
  },
  /**
  * 分笔买入
  */
  next_fb: function (e) {
    wx.navigateTo({
      url: '../auto_buy/auto_buy',
    })
  },
  /**
   * 上一步
   */
  next_up: function (e) {
    this.setData({ hiddenarr: ["display", "none"] });
  }
})