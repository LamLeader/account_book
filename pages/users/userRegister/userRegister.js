var md5 = require("../../../utils/md5/md5.js"); //require引入
var httpUrl = require("../../../utils/util.js"); //require引入
var httpRequestUtil = require("../../../utils/network.js"); //require引入
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    phone: '',
    newPassword: '',
    passwordAgain: '',
  },
  handleInputNickname: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  handleInputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  handleNewChanges: function (e) {
    this.setData({
      newPassword: e.detail.value
    })
  },
  handleNewChangesAgain: function (e) {
    this.setData({
      passwordAgain: e.detail.value
    })

  },
  //校验注册手机号码
  validatePhone(e){
    var that=this;
    var phone = that.data.phone;
    var warn;
    if (phone == '') {
      warn = "号码不能为空";
      wx.showToast({
        title: warn,
        image: '/images/time.png',
        duration: 2000
      })
      return
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      warn = "号码格式不正确";
      wx.showToast({
        title: warn,
        image: '/images/time.png',
        duration: 2000
      })
      return
    }
    var url = httpRequestUtil.webUrl + 'fmServer/mobile/ajax/' + phone;
    wx.showLoading({ title: '数据请求中...', icon: 'loading', duration: 10000 });//显示请求框
    wx.request({
      url: url,
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.result == 99) {
          wx.showModal({
            title: '提示',
            content: '您注册的电话号码已存在:' + phone,
          })
          //清空输入数据
          that.setData({
            phone:''
          })
        }else {
          //可以注册
        }
      }, fail: function (res) {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '请求超时！服务器异常请联系管理员！',
        })
      }
    })
  },
  //用户注册
  submit: function (e) {
    var that = this;
    var warn = "";
    var nickname = that.data.nickname;
    var phone = that.data.phone;
    var newPassword = that.data.newPassword;
    var passwordAgain = that.data.passwordAgain;
    if (nickname == '') {
      warn = "昵称不能为空";
      wx.showToast({
        title: warn,
        image: '/images/time.png',
        duration: 2000
      })
      return
    } else if (phone == '') {
      warn = "号码不能为空";
      wx.showToast({
        title: warn,
        image: '/images/time.png',
        duration: 2000
      })
      return
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      warn = "号码格式不正确";
      wx.showToast({
        title: warn,
        image: '/images/time.png',
        duration: 2000
      })
      return
    } else if (newPassword == '') {
      warn = "密码不能为空";
      wx.showToast({
        title: warn,
        image: '/images/time.png',
        duration: 2000
      })
      return
    } else if (passwordAgain != newPassword) {
      wx.showToast({
        title: '两次密码不一致',
        image: '/images/error.png',
        duration: 2000
      })
      return
    } else {
      var password = that.data.newPassword;
      var userPassword = md5.hexMD5(password);
      var lev = 0;
      wx.showLoading({ title: '数据请求中...', icon: 'loading', duration: 10000 });//显示请求框
      wx.request({
        url: httpRequestUtil.webUrl + 'fmServer/mobile/authen/register',
        method: "POST",
        data: {
          nickname: nickname,
          loginname: phone,
          password: userPassword,
          lev: lev
        },
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          if (res.data.result == 0) {
            wx.showToast({
              title: '注册成功',
              icon: 'loading',
              duration: 2000
            })
            that.setData({
              success: true
            })
          } else {
            console.log(res.data.result)
            wx.showToast({
              title: '注册失败',
              icon: 'loading',
              duration: 2000
            })
            that.setData({
              success: false
            })
          }

        }, fail: function (res) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '请求超时！服务器异常请联系管理员！',
          })
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //返回用户查询页面
  return_home:function(){
      wx.redirectTo({
        url: '../../login/login',
      })
  }
})
