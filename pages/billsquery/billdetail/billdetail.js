var fileData = require('../../../utils/data.js');
var httpRequestUtil = require("../../../utils/network.js"); //require引入
var utilsTimes = require('../../../utils/util.js');
// pages/billsquery/billdetail/billdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      billId:0,
      iobill:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log("goodsid:" + options.goodsid);
    that.setData({
      billId: options.goodsid
    }) 
    that.initQuery();
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

  },
  //初始查询
  initQuery: function () {
    //console.log("用户id1:" + wx.userInfo);
    var that = this;
    let userId;
    let id = that.data.billId;
    console.log("billId:"+id);
    wx.request({
      url: httpRequestUtil.webUrl + 'fmServer/mobile/account/accountById/'+id,
      data: {
        userId: wx.userInfo,
        //nickName: '', //that.data.nickname
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值  application/x-www-form-urlencoded(post) application/json(get)
      },
      success: function (res) {
        var result = res.data.result;
        if (result == 0) {
          console.log("userLength:" + res.data.data.length);
          var datas = res.data.data;
          console.log("types:" + datas[0].iobill.types);
          console.log("goodsName:" + datas[0].goods.name);
          that.setData({
            billsData: datas[0],
          })
        } else {
          wx.showModal({
            title: '提示',
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
          content: '请求超时，请检查网络！！！',
        })
      }
    })
  },
  //返回上级页面
  returnBack:function(){
    var pages = getCurrentPages(); // 当前页面
    var beforePage = pages[pages.length - 2]; // 前一个页面
      wx.navigateBack({
        success: function () {
          beforePage.onLoad(); // 执行前一个页面的onLoad方法
        }
      })
  }
})