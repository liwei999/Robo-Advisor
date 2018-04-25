// pages/third/third.js

import * as echarts from '../../ec-canvas/echarts';
function getPieItemStyle(StartColor,EndColor)
{
  return{
    normal: {
      color: { // 完成的圆环的颜色
        colorStops: [{
          offset: 0,
          color: StartColor // 0% 处的颜色
        }, {
          offset: 1,
          color: EndColor// 100% 处的颜色
        }]
      },
      label: {
        show: false
      },
      labelLine: {
        show: false
      }
    }
  }

}

//圆图
function getPieOption() {
  return {
    title: {
      text: '3000万',
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
        data: [
          { value: 335, name: '本金 200000',
            itemStyle: getPieItemStyle('#00cefc','#367bec')
          },
          { value: 310, name: '预期收益 10000',
            itemStyle: getPieItemStyle('#F1A950', '#F1A950') 
           },
          { value: 234, name: '定投 5100', itemStyle: getPieItemStyle('#E26A1A', '#E26A1A')  },
          
          { value: 135, name: '资金缺口 200000',
            itemStyle: getPieItemStyle('#FFFFFF', '#FFFFFF') 
          }
        ]
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

Page({
  /**
   * 页面的初始数据
   */
  data: {
    zhId: "",
    money: '10000.25',    //一次性投资金额
    risk:'-0.05',         //最大承受风险
    start_invest:'1000',  //定投金额
    total_money:'10000',    //期望收益金额

    hiddenLoading: false,//页面加载loading true不显示
    ec: {
      lazyLoad:true
    },
    ec_line: {
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //绑定本金图表
   // this.ChartBarInit();

    //隐藏loading
    //this.setData({ hiddenLoading: true });

    // this.setData({zhId: "wwwww"});

    //选取最优组合
   
    that.getDataZh();
  },
  /**
   * 获得组合id
   */
  getDataZh:function(){
    var that = this;
    wx.request({
      url: remoteUrl2+'get_parameter/?risk=-0.05&periods=24&total_money=10000&start_invest=1000&callback=',
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

            //绑定本金图表
            that.ChartBarInit();

            //隐藏loading
            //that.setData({ hiddenLoading: true });

            //绑定组合折线图
            that.getCharData(res.data.zhid,'','',3);
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

  ChartBarInit:function()
  {
    this.ecComponent_bar.init((canvas, width, height) => {
      const pieChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      pieChart.setOption(getPieOption());
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
  /**
   * 立即购买
   */
  onclickbuy:function(e){
    if (this.data.isLogin)
    {
      this.setModalStatus(e)
    }else
    {
      wx.showModal({
        title: '提示',
        content: '您还没有登录，请先登录',
        cancelText:'登录',
        confirmText:'注册',
        success:function(res){
          if (res.confirm) {
            console.log('用户点击注册')
          } else if (res.cancel) {
            console.log('用户点击登录')
          }
        }
      })
    }
    this.setData({ isLogin: !this.data.isLogin});
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
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
  }, 
  /**
   * 确认绑定
   */
  next_step:function(){
    wx.navigateTo({
      url: '../bankcard/bankcard',
    })
  },
  onclickmain:function(){
    wx.navigateTo({
      url: '../myMain/myMain',
    })
  }
})