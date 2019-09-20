var httpRequestUtil = require("../../../utils/network.js"); //require引入
var md5 = require("../../../utils/md5/md5.js"); //require引入
var httpUrl = require("../../../utils/util.js"); //require引入
const app = getApp();
Page({
  data: {
    goodsName: false,
    goodsPrice: false,
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show,
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
    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    let userId =0;
    if (goodsName == '' || goodsPrice == '') {
      wx.showModal({
        title: '提示',
        content: '请输入商品名称，价格！',
      })
      this.setData({
        goodsName: true,
        goodsPrice: true,
      })
      return false;
    } if (!reg.test(goodsPrice)) { //pData.mons就是金额
      wx.showToast({
        title: "请输入正确的金额",
        icon: 'none',
        duration: 1000
      })
      return
    } else {
      this.setData({
        goodsName: false,
        goodsPrice: false,
      })
    }
    if (goodsName !== '' && goodsPrice !== '') {
      wx.showLoading({ title: '数据请求中...', icon: 'loading', duration: 10000 });//显示请求框
     
      wx.request({
        url: httpRequestUtil.webUrl + 'fmServer/mobile/goods/addGoods',
        data: {
          name: goodsName,
          price: goodsPrice,
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
            console.log("账单添加成功！！！");
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