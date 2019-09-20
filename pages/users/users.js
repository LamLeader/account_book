//index.js
//获取应用实例
var app = getApp()
var fileData = require('../../utils/data.js');
var httpRequestUtil = require("../../utils/network.js"); //require引入

Page({
  // 页面初始数据
  data: {
    colors: ['red', 'orange', 'yellow', 'green', 'purple'],
    //banner 初始化
    banner_url: fileData.getBannerData(),
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    //nav初始化
    navTopItems: fileData.getIndexNavData(),
    navSectionItems: fileData.getIndexNavSectionData(),
    pageNum: 1,
    pageSize: 6,
    nickname:'',
    curIndex: 0,
  },
  searchNickName: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  //初次渲染函数 可多次渲染数据
  onReady:function(){
    console.log("用户id1:" + wx.userInfo);
    //wx.userInfo = res.data.data[0].id;//获取用户登录id
    var that = this;
    this.initQuery();//初次渲染方法

  },
  //函数加载 只加载一次 
  onLoad: function () {
    console.log("用户id1:" + wx.userInfo);
   
  },
  // 跳转至详情页
  navigateDetail: function (e) {
    wx.navigateTo({
      url: '../users/detail/detail?artype=' + e.currentTarget.dataset.artype
    })
  },
  // 加载更多
  loadMore: function (e) {
    console.log('加载更多');
    var that = this;
    let userId;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })  
    var pageNums = that.data.pageNum+1;//索引值
    console.log("---pageNums-----:" + pageNums);
    wx.request({
      url: httpRequestUtil.webUrl + 'fmServer/mobile/admin/queryUser',
      data: {
        userId: wx.userInfo,
        nickName: '', //that.data.nickname
        pageNum: pageNums, //查询的起始页码
        pageSize: that.data.pageSize, //查询页码大小默认6条
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值  application/x-www-form-urlencoded(post) application/json(get)
      },
      success: function (res) {
        var result = res.data.result;
        if (result == 0) {
          //数据设置
          that.setData({
            pageNum: that.data.pageNum + 1,//更新查询页码
            // concat将新数组的每个元素拆分出来单独加到数组当中。使用concat解决两个数组的拼接：
            userData: res.data.data.concat(res.data.data),
          })
          //数据加载成功后,隐藏
          wx.hideLoading();
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
  //详情显示
  getUserById: function (e) {
    wx.navigateTo({
      url: '../userUpdate/userUpdate?uid=' + e.currentTarget.dataset.uid
    })
  },
  //用户名查询
  queryUser:function(e){
    //let searchValue = e.detail.value.searchValue;
    console.log("----------queryUser is onclick---------------");
    console.log("用户id:" + wx.userInfo);
  },
  //初始查询
  initQuery: function () {
    console.log("用户id1:" + wx.userInfo);
    //wx.userInfo = res.data.data[0].id;//获取用户登录id
    var that = this;
    let userId;
    wx.request({
      url: httpRequestUtil.webUrl + 'fmServer/mobile/admin/queryUser',
      data: {
        userId: wx.userInfo,
        nickName: '', //that.data.nickname
        pageNum: that.data.pageNum, //查询的起始页码
        pageSize: that.data.pageSize, //查询页码大小默认6条
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
          //数据设置
          that.setData({
            userData: res.data.data,
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
 
})
