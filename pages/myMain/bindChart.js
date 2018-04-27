import * as echarts from '../../ec-canvas/echarts';

//暴露接口
module.exports = {
  getPieOption: getPieOption,
  getLineOption: getLineOption,
  getPieItemStyle: getPieItemStyle,
}


//圆图
function getPieOption(titleTxt, ChartData) {
  return {
    title: {
      text: titleTxt,
      x: '18%',
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
      isLogin: false,//模拟判断是否登录 默认没登录 false
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
      bottom: 10
    },
    grid: {
      containLabel: true,
      width: "85%",
      height: "75%",
      top: 20,
      left: '5%'
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

//样式
function getPieItemStyle(StartColor, EndColor) {
  return {
    normal: {
      color: StartColor,// 100% 处的颜色  安卓手机目前对渐变颜色支持不好
      label: {
        show: true
      },
      labelLine: {
        show: true
      }
    }
  }
}

