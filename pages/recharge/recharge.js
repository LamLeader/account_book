var httpRequestUtil = require("../../utils/network.js"); //require引入
var md5 = require("../../utils/md5/md5.js"); //require引入
var httpUrl = require("../../utils/util.js"); //require引入
const app = getApp();
Page({
  data: {
    goodsName: false,
    goodsPrice: false,
    goodsCounts: false,
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['日用类', '生活类', '其他'], //下拉列表的数据
    index: 0, //选择的下拉列 表下标,

  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show,
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },

  onLoad: function (options) {
    //console.log();
  },

  onReady: function () {

    // 页面渲染完成

  },

  onShow: function () {

    // 页面显示

  },

  onHide: function () {
    // 页面隐藏

  },

  onUnload: function () {

    // 页面关闭

  },
  //表单提交
  formSubmit: function (e) {
    let that = this;
    var goodsName = e.detail.value.goodsName;
    var goodsPrice = e.detail.value.goodsPrice;
    var goodsCounts = e.detail.value.goodsCounts;
    var show = that.data.index;
    console.log("下拉选项：" + show);
    if (goodsName == '' || goodsPrice == '' || goodsCounts == '') {
      wx.showModal({
        title: '提示',
        content: '请输入商品名称，价格，数量',
      })
      this.setData({
        goodsName: true,
        goodsPrice: true,
        goodsCounts: true,
      })
      return false;
    } else {
      this.setData({
        goodsName: false,
        goodsPrice: false,
        goodsCounts: false,
      })
    }
    if (goodsName !== '' && goodsPrice !== '' && goodsCounts !== '') {
      wx.showLoading({ title: '数据请求中...', icon: 'loading', duration: 10000 });//显示请求框
      let userId = httpUrl.userId;
      wx.request({
        url: httpRequestUtil.webUrl + 'fmServer/mobile/authen/login',
        data: {
          goodsName: goodsName,
          goodsPrice: goodsPrice,
          goodsCounts: goodsCounts,
          types: show,
          userId: userId,
        },
        dataType: 'json',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值  application/x-www-form-urlencoded(post) application/json(get)
        },
        success: function (res) {
          console.log("===data==:" + res.data);
          var result = res.data.result;
          wx.userInfo = res.data.data[0].id;
          if (result == 0) {
            wx.switchTab({
              url: '../home/home'
            });
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
            content: '请求超时，请联系管理员！',
          })
        }
      })

    } else {
      wx.showModal({
        title: '提示',
        content: '请求超时，请联系管理员！',
        confirmColor: '#b02923',
        showCancel: false
      })
      return false;
    }

  },
  //返回上级页面
  returnBack: function () {
    var pages = getCurrentPages(); // 当前页面
    var beforePage = pages[pages.length - 2]; // 前一个页面
    wx.navigateBack({
      success: function () {
        beforePage.onLoad(); // 执行前一个页面的onLoad方法
      }
    })
  }

})