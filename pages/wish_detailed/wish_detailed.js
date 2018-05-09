// pages/wish_detailed/wish_detailed.js
import * as echarts from '../../ec-canvas/echarts';

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    // backgroundColor: "#ffffff",
    //color: ["#37A2DA", "#32C5E9", "#67E0E3"],
    series: [{
      // name: '业务指标',
      center: ["50%", "85%"],// 仪表位置
      radius: '168%',//仪表大小
      type: 'gauge',
      startAngle:190,
      endAngle:-10,
      detail: {
        formatter: '{value}%',
        offsetCenter:[0,'10%'],
        fontSize:20
      },
      pointer:{
        width: 1,//指针宽度。
        length:'70%',
      },
     //轴线相关配置
      axisLine: {
        show: true,
        lineStyle: {
          width: 10,
          shadowBlur: 0,
          color: [
            [1, '#FF8D3B']
          ]
        }
      },
      //刻度样式。
      axisTick: {
        show: false
      },
      splitLine:{
        show:true,
        lineStyle: {
          color: '#F0F6F9',
        }
      },
      axisLabel:{
        show: true,
      },
      data: [{
        value: 50,
        //name: '完成率',
      }]

    }]
  };

  chart.setOption(option, true);

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
  // onShareAppMessage: function () {
  
  // }
  /**
   * 加速实现心愿
   */
  click_accelerate:function(){
    wx.showToast({
      title: '加速实现心愿',
      icon:"none"
    });
    wx.navigateTo({
      url: '../accelerate/accelerate',
    })
  }
  ,
  /**
   * 更多
   */
  click_more:function(e){
    this.setModalStatus(e);
  }
  ,
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
})