// pages/third/third.js
import * as echarts from '../../ec-canvas/echarts';
//圆图
function getPieOption() {
  return {
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
        avoidLabelOverlap: false,
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
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ]
      }
    ]
  };
}
//折线图设置
function getLineOption(navDate, dailyReturn1, dailyReturn2){
  console.log(navDate)

  return {
    backgroundColor: "#fff",
    // color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    color: ['red',"#37A2DA"],

    tooltip: {
      trigger: 'axis'
    },
    legend: {
      x: 'center',
      y: 'bottom',
      //data: ['A商品', 'B商品', 'C商品']
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

// function initChart(canvas, width, height) {
//   const chart = echarts.init(canvas, null, {
//     width: width,
//     height: height
//   });
//   canvas.setChart(chart);

//   var option = {
//     // backgroundColor: "#ffffff",
//     // color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
//     // series: [{
//     //   label: {
//     //     normal: {
//     //       fontSize: 14
//     //     }
//     //   },
//     //   type: 'pie',
//     //   center: ['50%', '50%'],
//     //   radius: [0, '60%'],
//     //   data: [{
//     //     value: 55,
//     //     name: '北京'
//     //   }, {
//     //     value: 20,
//     //     name: '武汉'
//     //   }, {
//     //     value: 10,
//     //     name: '杭州'
//     //   }, {
//     //     value: 20,
//     //     name: '广州'
//     //   }, {
//     //     value: 38,
//     //     name: '上海'
//     //   },
//     //   ],
//     //   itemStyle: {
//     //     emphasis: {
//     //       shadowBlur: 10,
//     //       shadowOffsetX: 0,
//     //       shadowColor: 'rgba(0, 2, 2, 0.3)'
//     //     }
//     //   }
//     // }]

//     // tooltip: {
//     //   trigger: 'item',
      
//     // },
//     legend: {
//       orient: 'vertical',
//       x: 'right',
//       y:'center',
//       align:'left',
//       selectedMode :false,
//       // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
//     },
//     series: [
//       {
//         name: '访问来源',
//         type: 'pie',
//         radius: ['50%', '70%'],
//         center: ['30%', '50%'],
//         avoidLabelOverlap: false,
//         label: {
//           normal: {
//             show: false,
//             position: 'center'
//           },
//           emphasis: {
//             show: true,
//             textStyle: {
//               fontSize: '30',
//               fontWeight: 'bold'
//             }
//           }
//         },
        
//         data: [
//           { value: 335, name: '直接访问' },
//           { value: 310, name: '邮件营销' },
//           { value: 234, name: '联盟广告' },
//           { value: 135, name: '视频广告' },
//           { value: 1548, name: '搜索引擎' }
//         ]
//       }
//     ]
//   };

//   chart.setOption(option);
//   return chart;
// }
var lineChart="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhId: "",
    // ec: {
    //   // onInit: initChart
    //   onInit: function (canvas, width, height) {
    //     const pieChart = echarts.init(canvas, null, {
    //       width: width,
    //       height: height
    //     });
    //     canvas.setChart(pieChart);

    //     // 将 barChart 绑定到 this，以供其他函数访问
    //     this.pieChart = pieChart;
    //     pieChart.setOption(getPieOption());

    //     return pieChart;
    //   }
    // },
    // ec_line: {
    //   onInit: function (canvas, width, height) {
    //     lineChart = echarts.init(canvas, null, {
    //       width: width,
    //       height: height
    //     });
    //     canvas.setChart(lineChart);

    //     this.lineChart = lineChart;
    //     lineChart.setOption(getLineOption("", "", ""));
    //     //lineChart.setOption(getLineOption(navDate, dailyReturn1, dailyReturn2));

    //     return lineChart;
    //   }
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // console.log(this.data.zhId);
    // this.setData({zhId: "wwwww"});
    // console.log(this.data.zhId);
    //that.getDataZh();
      //that.getCharData('116', '', '', 3);
  },
  /**
   * 获得组合id
   */
  getDataZh:function(){
    var that = this;
    wx.request({
      url: 'http://office.dsfof.com.cn:8048/get_parameter/?risk=-0.05&periods=24&total_money=10000&start_invest=1000&callback=',
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
            that.setData({ zhId: res.data.zhid});
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
      url: 'https://221.dsfof.com.cn/GetZhsylxl.aspx?userid=&zhid=' + zhid + '&sdate=' + sdate + '&edate=' + edate + '&datetype=' + datetype+'&callback=',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        if(res.data)
        {
          var navDate=[];
          var dailyReturn1=[];
          var dailyReturn2 = [];
          for (var i = 0; i < res.data.length;i++)
          {
            navDate.push(res.data[i].navDate);
            dailyReturn1.push(res.data[i].dailyReturn1);
            dailyReturn2.push(res.data[i].dailyReturn2);
          }
          lineChart.setOption(getLineOption(navDate, dailyReturn1, dailyReturn2));
          console.log(that.data.ec_line.onInit) ;
          // that.setData({
          //   })


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
  onShareAppMessage: function () {
    return {
      title: '我有一个小小的心愿',
      path: '/pages/third/third',
      success: function (res) {
        // 转发成功
        // console.log("aaaa");
        // console.log(res);
        wx.showToast({
          title: '分享成功',
          duration: 2000,
        });
      },
      fail: function (res) {
        // 转发失败
        // console.log("bbb");
        // console.log(res);
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