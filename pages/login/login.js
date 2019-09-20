var httpRequestUtil = require("../../utils/network.js"); //require引入
var md5 = require("../../utils/md5/md5.js"); //require引入
var httpUrl = require("../../utils/util.js"); //require引入
const app = getApp();
Page({
  data: {

    userName: false,

    userPassword: false

  },

  onLoad: function(options) {
     //console.log();
  },
 
  onReady: function() {

    // 页面渲染完成

  },

  onShow: function() {

    // 页面显示

  },

  onHide: function() {
    // 页面隐藏

  },

  onUnload: function() {

    // 页面关闭

  },
  //登录
  formSubmit: function(e) {
    let that = this;
    let userName = e.detail.value.userName;
    let userPassword = e.detail.value.userPassword;
    if (userName == '' || userPassword == '') {
      wx.showModal({
        title: '提示',
        content: '请输入账号和密码！',
      })
      this.setData({
        userName: true,
        userPassword: true,
      })
      return false;
    } else {
      this.setData({
        userName: false,
        userPassword: false,
      })
    }
    if (userName !== '' && userPassword !== '') {
      wx.showLoading({ title: '数据请求中...', icon: 'loading', duration: 10000 });//显示请求框
      var userPassword1 = md5.hexMD5(userPassword);
      var webData = {
        loginName: userName,
        passWord: userPassword1
      }
      wx.request({
        url: httpRequestUtil.webUrl+'fmServer/mobile/authen/login', 
        data: {
          loginName: userName,
          passWord: userPassword1
        },
        dataType:'json',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值  application/x-www-form-urlencoded(post) application/json(get)
        },
        success: function (res) {
          console.log("===data==:"+res.data);
          var result = res.data.result;
          if (result==0){ 
            wx.userInfo = res.data.data[0].id;//获取用户登录id
            wx.switchTab({  
              url: '../home/home'
            });
          }else{
            wx.showModal({
              title: '登录失败',
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
            content: '请求超时，请重新登录！',
          })
        }
      })

    }else{
      wx.showModal({
        title: '登录失败',
        content: '账号或密码为空',
        confirmColor: '#b02923',
        showCancel: false
      })
      return false;
    }

  },
  //用户注册
  register:function(e){
       wx.navigateTo({
         url: '../users/userRegister/userRegister',
       })
  }

})