// pages/report/report.js
var wxCharts = require('../../utils/wxcharts.js');
var httpRequestUtil = require("../../utils/network.js"); //require引入

var columnChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chartTitle: '账单数据',
    isMainChartDisplay: true,
    columnDate: {
      title: '账单详情',
      data: [23, 28, 35, 54, 95,56],
      categories: ['一月', '二月', '三月', '四月', '五月','六月']
    },
    pieDate:[
      {
        name: '一月',
        data: 50,
      }, {
        name: '二月',
        data: 30,
      }, {
        name: '三月',
        data: 34,
      }, {
        name: '四月',
        data: 23,
      }, {
        name: '五月',
        data: 46,
      }, {
        name: '六月',
        data: 34,
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log("onLoad is loading");
    wx.showLoading({ title: '数据请求中...', icon: 'loading', duration: 10000 });//显示请求框
    /*----数据请求begin---*/
    wx.request({
      url: httpRequestUtil.webUrl + 'fmServer/mobile/authen/login',
      data: {
        userId: wx.userInfo,
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值  application/x-www-form-urlencoded(post) application/json(get)
      },
      success: function (res) {
        console.log("===data==:" + res.data);
        var result = res.data.result;
        if (result == 0) {
          //赋值
          /*columnDate=
          pieDate=
          that.setData({
            columnDate:,
            pieDate:
          })*/
        } else {
          wx.showModal({
            title: '请求超时,请检查网络',
            content: res.data.msg,
            confirmColor: '#b02923',
            showCancel: false
          })
          return false;
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '请求超时,请检查网络！',
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    console.log("onReady is loading");
    var that=this;
    var windowWidth = 360;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    //柱状图  categories:chartData.main.categories , data:chartData.main.data,
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: that.data.columnDate.categories,
      series: [{
        name: '账单详情',
        color: '#188df0',
        data: that.data.columnDate.data,
        format: function (val, name) {
          return val.toFixed(2) + '元';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '元';
        },
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15,
        },
        legendTextColor: '#000000'
      },
      width: windowWidth,
      height: 180,
    });
    //饼图
    new wxCharts({
      canvasId: 'pieCanvas',
      type: 'pie',
      series: that.data.pieDate,
      width: windowWidth,
      height:220,
      dataLabel: true
    });
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

  }
})