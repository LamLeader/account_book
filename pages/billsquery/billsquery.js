//index.js
//获取应用实例
var app = getApp()
var fileData = require('../../utils/data.js');
var httpRequestUtil = require("../../utils/network.js"); //require引入
var utilsTimes = require('../../utils/util.js');
Page({
  // 页面初始数据
  data: {
    colors: ['red', 'orange', 'yellow', 'green', 'purple'],
    // banner 初始化
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
    curIndex: 0,
    billName:'',
    items: [
      { name: '0', value: '待审核' },
      { name: '1', value: '审核通过', },
      { name: '3', value: '审核失败' },
    ],
  },
  //复选框勾选
  checkboxChange: function (e) {
    var that = this;
    //赋值查询
    that.setData({
      types: e.detail.value
    });
  },
  
  //数据绑定
  searchName:function(e){
      var that=this;
      that.setData({
        billName: e.detail.value
      }) 
  },
  //输入完成触发事件
  searchBillByName:function(e){
    var that=this;
      wx.showModal({
        title: '提示',
        content: '您输入的是：'+that.data.billName,
      })
    for (var index in that.data.types) {
      console.log("选择的类别:" + that.data.types[index]);
    }
    //查询请求
  },
  //初次渲染函数 可多次渲染数据
  onReady: function () {
    //console.log("用户id1:" + wx.userInfo);
  },
  //函数加载 只加载一次 
  onLoad: function () {
    //console.log("用户id1:" + wx.userInfo);
    var that = this;
    this.initQuery();//初次渲染方法
    //时间格式化
    var sjc = 1488481383;
    console.log(utilsTimes.formatTime(sjc, 'Y-M-D h:m'));
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
    var pageNums = that.data.pageNum + 1;//索引值
    console.log("---pageNums-----:" + pageNums);
    wx.request({
      url: httpRequestUtil.webUrl + 'fmServer/mobile/account/accountList',
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
 
  //初始查询
  initQuery: function () {
    //console.log("用户id1:" + wx.userInfo);
    //wx.userInfo = res.data.data[0].id;//获取用户登录id
    var that = this;
    let userId;
    wx.request({
      url: httpRequestUtil.webUrl + 'fmServer/mobile/account/accountList',
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
          var datas = res.data.data;
          var dataList=[];
          for (let i = 0; i < datas.length; i++) {
           //datas[i]["start_time"] = Api.formatTime(datas[i]["start_time"])
            //时间格式化
            var sjc = datas[i].iobill.createdate;
            //console.log(utilsTimes.formatDates(sjc));
            dataList.push(utilsTimes.formatDates(sjc));
          }
          console.log("dataList[0]:"+dataList[0]);
          that.setData({
            //billsData: res.data.data.concat(dataList),
            //userData: res.data.data.concat(res.data.data),
            billsData: res.data.data,
          })
          console.log("billsData[0]:" + that.data.billsData.dataList);

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

  //跳转到详情页面
  getbillDetails: function (e) {
    wx.navigateTo({
      url: '../billsquery/billdetail/billdetail?goodsid=' + e.currentTarget.dataset.goodsid
    })
  },
  //审核
  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
 

})
