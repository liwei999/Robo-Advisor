// pages/third/third.js

import * as echarts from '../../ec-canvas/echarts';

var util = require("../../utils/util.js");

function getPieItemStyle(StartColor,EndColor)
{
  return{
    normal: {
      color: StartColor,// 100% 处的颜色  安卓手机目前对渐变颜色支持不好
      // color: { // 完成的圆环的颜色
      //   //color: StartColor // 0% 处的颜色
      //   colorStops: [{
      //     offset: 0,
      //     color: StartColor // 0% 处的颜色
      //   }, {
      //     offset: 1,
      //     color: EndColor// 100% 处的颜色
      //   }]
      // },
      label: {
        show: true
      },
      labelLine: {
        show: true
      }
    }
  }

}

//圆图
function getPieOption(titleTxt,ChartData) {
  return {
    title: {
      text: titleTxt,
      x:'18%',
      y: 'center',
      textStyle: {
        fontWeight: 'normal',
        color: '#0580f2',
        fontSize: '20'
      }
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      y: 'center',
      align: 'left',
      selectedMode: false,
      isLogin:false,//模拟判断是否登录 默认没登录 false
      // isList:false,//是否显示列表 false 不显示
      // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['30%', '50%'],
        avoidLabelOverlap: true,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        data: ChartData
      }
    ]
  };
}
//折线图设置
function getLineOption(navDate, dailyReturn1, dailyReturn2){

  return {
    backgroundColor: "#fff",
    color: ['red',"#37A2DA"],

    tooltip: {
      trigger: 'axis'
    },
    legend: {
      x: 'center',
      y: 'bottom',
    },
    grid: {
      containLabel: true,
      width:"85%",
      height:"75%",
      top:20
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

var lineChart=null;
var remoteUrl1 = getApp().globalData.remoteUrl1;  
var remoteUrl2 = getApp().globalData.remoteUrl2;  
var buyButton=null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin:1,    //是否登录
    hideLineChart:false, //是否隐藏折线图
    hideBarChart:false, //是否隐藏bar图
    zhId: "",   //组合id
    desireInp:'',  //愿望名默认为空
    risk:'-0.09',         //最大承受风险
    periods:'24',       //投资时间(月份)
    start_invest: '1000',  //初始金额
    total_money:'10000',    //期望完成收益金额(本金+收益)
    ZhRiskList: [],  //组合风险收益
    hiddenLoading: true,//页面加载loading true不显示
    BarData: [],  //Bar图数据
    ec: {
      lazyLoad:true
    },
    ec_line: {
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false,
    hiddenarr:["block","none"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.riskvalue)
    {
      //接收传入的参数
      that.setData({
        risk: options.riskvalue,     //最大承受风险
        desireInp: options.desireInp,   //愿望名称
        start_invest: options.start_invest,  //起始投入金额
        total_money: options.desireMoney, //期望金额
        periods: options.timevalue    //投资月份
      });
    }

    //that.setData({ hiddenLoading: true });

    //设置组合风险收益
    this.setData({
      ZhRiskList: []
    });

    //选取最优组合
    that.getDataZh(this.data.risk, this.data.periods, this.data.total_money, this.data.start_invest);

  },
  /**
   * 获得组合id
   */
  getDataZh: function (risk, periods,total_money, start_invest){
    var that = this;
    var parm = 'GetBestZh/?risk=' + risk + '&periods='+periods+'&total_money='+total_money+'&start_invest='+ start_invest+'&callback='
    wx.request({
      url: remoteUrl2 + parm,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data)
        {
          res.data = res.data.replace('({','{');
          res.data = res.data.replace('})', '}');
          res.data = JSON.parse(res.data);
          //console.log(res.data)
          if(res.data.zhid!="")
          {
            that.setData({zhId: res.data.zhid});
            var per_money = parseFloat(res.data.per_money);   //定投金额
            var qk = parseFloat(res.data.qk).toFixed(0); //资金缺口
            var yq = parseFloat(res.data.yq).toFixed(0); //预期收益
            var dtnum = parseFloat(res.data.dtnum);   //定投金额
            var dtmoney = (per_money * dtnum).toFixed(0)
            //资金缺口=期望金额-资金缺口-初始投资金额

            var ar=[];
            var ar1 = {
              value: that.data.start_invest, name: '本金 ' + that.data.start_invest,itemStyle: getPieItemStyle('#00cefc', '#00cefc')
              };
            var ar2 = {
              value: yq, name: '预期收益 ' + yq, itemStyle: getPieItemStyle('#F1A950', '#F1A950')
            };
            var ar3 = {
              value: dtmoney, name: '定投 ' + dtmoney, itemStyle: getPieItemStyle('#E26A1A', '#E26A1A')
            };
            var ar4 = {
              value: qk, name: '资金缺口 ' + qk, itemStyle: getPieItemStyle('#FFFFFF', '#FFFFFF')
            };
            //如果定投金额为0，则不显示定投图例
            if (per_money=='0.00')
              ar=[ar1,ar2,ar4]
            else
              ar = [ar1, ar2, ar3, ar4]

            //绑定本金图表
            that.ChartBarInit(that.data.total_money, ar);

            //隐藏loading
            //that.setData({ hiddenLoading: true });

            //绑定组合折线图
            that.getCharData(res.data.zhid,'','',3);

            //绑定组合风险收益数据
            that.GetRiskData(res.data.zhid, that.data.periods)
          }
        }
        else
        {
          wx.showToast({
            title: '获取组合id失败',
            icon:'none'
          })
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
   * 根据组合id获得图形数据
   */
  getCharData:function (zhid, sdate, edate, datetype){
    var that = this;
    wx.request({
      url: remoteUrl1+'GetZhsylxl.aspx?userid=&zhid=' + zhid + '&sdate=' + sdate + '&edate=' + edate + '&datetype=' + datetype+'&callback=',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data);
        if(res.data)
        {
          var navDate=[];
          var dailyReturn1 = [];
          var dailyReturn2 = [];
          for (var i = 0; i < res.data.length;i++)
          {
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
  ChartLineInit: function (arr1,arr2,arr3) {
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

  ChartBarInit: function (titleTxt,ChartData)
  {
    this.ecComponent_bar.init((canvas, width, height) => {
      const pieChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      pieChart.setOption(getPieOption(titleTxt,ChartData));
      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      //this.chart = chart;
      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return pieChart;
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获取组件
    this.ecComponent_line = this.selectComponent('#mychart-dom-line');
    this.ecComponent_bar = this.selectComponent('#mychart-dom-bar');
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
  onShareAppMessage: function () {
    return {
      title: '我有一个小小的心愿',
      path: '/pages/third/third',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '分享成功',
          duration: 2000,
        });
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享失败',
          duration:2000,
          icon: 'none'
        });
      }
    }
  },
  onclick:function(){
    wx.navigateTo({
      url: '../bankcard/bankcard',
    })
  },
  // 获取容器高度，使页面滚动到容器底部  
  pageScrollToBottom: function () {
    wx.createSelectorQuery().select('#bt_buy').boundingClientRect(function (rect) {
      // 使页面滚动到底部  
      wx.pageScrollTo({
        scrollTop: rect.bottom
      })
    }).exec()
  },  
  //自动弹出购买按钮,首先要测评
  autoOpenBuy:function()
  {
    console.log(util.GetUserInfo())

    //判断是否测评
    if (!util.GetUserInfo().RiskTest) 
    {
      //设置测评后返回标识
      getApp().globalData.RiskTestGoBack = true;

      //弹出测评窗口
      util.CheckRiskTest();
    }
    else
    {
        this.onclickbuy(buyButton)
    }
  },

  /**
   * 立即购买
   */
  onclickbuy:function(e){
    //保存在变量中，供回退时调用
    buyButton=e;
    //console.log(e)

    //获取用户登录信息
    var userinfo=util.GetUserInfo()
    
    if (userinfo != null && userinfo.id)
    {
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
      this.setModalStatus(e);
    }
    else
    {
      wx.showModal({
        title: '提示',
        content: '您还没有登录，请先登录',
        cancelText:'取消',
        confirmText:'登录',
        success:function(res){
          if (res.confirm) {

            //设置登录后立即返回上一页标记
            util.SetLoginedGoBack(true)
            wx.navigateTo({
              url: '../login/login',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  /**
   * 显示隐藏菜单
   */
  setModalStatus: function (e) {
    var that =this;
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
          showModalStatus: true,
          hideLineChart:true,
          hideBarChart:true
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
            hideLineChart: false,
            hideBarChart:false
          }
        );

        this.pageScrollToBottom();
        wx.showModal({
          title: '',
          content: '您没有完成交易，可以选择创建一个模拟心愿，来体验心愿运行状态',
          cancelColor:"#000",
          confirmText:"去创建",
          confirmColor:"#000",
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
   * 确认购买
   */
  next_step:function(){
     //判断扣款金额是不是大于5万，
    this.setData({ hiddenarr:["none","display"]});
  },
  onclickmain:function(){
    wx.navigateTo({
      url: '../myMain/myMain',
    })
  },
  /**
 * 获得组合风险收益数据
 */
  GetRiskData: function (zhid,months) {
    var that = this;
    that.setData({ hiddenLoading: false });
    that.setData({ ZhRiskList: [] });
    wx.request({
      url: remoteUrl2 + 'GetZhRisk/?zhid='+zhid+'&months='+months+'&nd=' + parseInt(1000 * Math.random()),
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          //console.log(res.data)
          var tempdata = res.data;
          if (tempdata.length > 0) {
            that.setData({ 
              ZhRiskList: tempdata, 
              hiddenLoading: true 
            });
          }
        }
      }
      ,
      fail: function (res) {
        wx.showToast({
          title: '网络异常，下拉刷新',
          icon: 'none',
          duration: 2000
        })
      },
      complete: function (res) {
        //隐藏loading
        that.setData({ hiddenLoading: true });
      }
    })
  },
  /**
    * 保存模拟心愿
    */
  SaveDream: function () {
    var that = this;
    that.setData({ hiddenLoading: false });
    wx.request({
      url: remoteUrl2 + 'SaveDream/?userid=1&dr_name=怎么是空呢9&dr_money=10000&dr_time=24&in_money=5050&max_hc=-0.06&classid=206&iftrue=0&n_num=12&p_money=80.8&nd=' + parseInt(1000 * Math.random()),
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //console.log(res);
        if (res.errMsg =="request:ok")
        {

          {
            wx.switchTab({
              url: '../wish_list/wish_list',
            });
          }
          // var userinfo = util.GetUserInfo()
          // if (userinfo && userinfo.id) {
          //   var pages = getCurrentPages();
          //   var prePage = pages[pages.length - 4];
          //   //console.log(prePage);
          //   wx.navigateBack({ delta: 3 });
          //   prePage.getDreamList(userinfo.id);
          // }
          // else
          // {
          //   wx.switchTab({
          //     url: '../wish_list/wish_list',
          //   });
          // }
          
        }
        else
        {
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
  on_addbank:function(e){
    wx.navigateTo({
      url: '../certification/certification',
    })
  },
  /**
   * 分笔买入
   */
  next_fb:function(e)
  {
    wx.navigateTo({
      url: '../auto_buy/auto_buy',
    })
  },
  /**
   * 上一步
   */
  next_up:function(e)
  {
    this.setData({ hiddenarr: ["display", "none"] });
  }

})