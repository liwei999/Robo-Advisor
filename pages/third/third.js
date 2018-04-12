// pages/third/third.js
import * as echarts from '../../ec-canvas/echarts';

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    // backgroundColor: "#ffffff",
    // color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    // series: [{
    //   label: {
    //     normal: {
    //       fontSize: 14
    //     }
    //   },
    //   type: 'pie',
    //   center: ['50%', '50%'],
    //   radius: [0, '60%'],
    //   data: [{
    //     value: 55,
    //     name: '北京'
    //   }, {
    //     value: 20,
    //     name: '武汉'
    //   }, {
    //     value: 10,
    //     name: '杭州'
    //   }, {
    //     value: 20,
    //     name: '广州'
    //   }, {
    //     value: 38,
    //     name: '上海'
    //   },
    //   ],
    //   itemStyle: {
    //     emphasis: {
    //       shadowBlur: 10,
    //       shadowOffsetX: 0,
    //       shadowColor: 'rgba(0, 2, 2, 0.3)'
    //     }
    //   }
    // }]

    // tooltip: {
    //   trigger: 'item',
      
    // },
    legend: {
      orient: 'vertical',
      x: 'right',
      y:'center',
      align:'left',
      selectedMode :false,
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

  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  }
})