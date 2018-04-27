//格式化时间
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//接口地址
const urlstr = "https://vojs.dsfof.com.cn/";

//暴露接口
module.exports = {
  formatTime: formatTime,
  urlstr: urlstr,
  toast: toast,
  GetUserInfo: GetUserInfo,
  SetLoginedGoBack: SetLoginedGoBack,
  GetLoginedGoBacKStatus: GetLoginedGoBacKStatus,
  CheckRiskTest:CheckRiskTest,
}

//显示提示
function toast(toast) {
  wx.showToast({
    title: toast,
    duration: 2000
  })
}

//返回登录用户id
function GetUserInfo()
{
  var rui = 'rememberUserInfo';
  try {
   var rbFlag = wx.getStorageSync(rui).rbFlag;
   if (rbFlag) {
      var rif = wx.getStorageSync(rui);
      return rif
    } 
    else {
      return null;
    }
  } catch (e) {
      return null;
  }
}

//设置登录后是否立即返回的状态
function SetLoginedGoBack(status)
{
  var app = getApp();
  getApp().globalData.loginedGoBack = status
}

//返回登录后是否立即返回的状态
function GetLoginedGoBacKStatus()
{
  return getApp().globalData.loginedGoBack
}

//判断是否需要风险测评
function CheckRiskTest()
{
    wx.showModal({
      content: '您还没有做风险测评，请先完成测评',
      confirmText: '去测评',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击去测评');
          wx.navigateTo({
            url: '../riskAssessment/riskAssessment',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
}