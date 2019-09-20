// pages/home/home.js
//var base = require("../../utils/base.js"); //require引入
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrls: [
      {
        id:1,
        link: '/pages/index/index',
        url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2197066702,135802552&fm=26&gp=0.jpg'
      }, {
        id: 2,
        link: '/pages/logs/logs',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564145775519&di=2ebcf29f842a2a7ceb14352403bede37&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180608%2F71a9b9eb0c6346b9930cd5c893b069b6.jpeg'
      }, {
        id: 3,
        link: '/pages/test/test',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564145790173&di=df08e086f8b8943d032122ad014402e8&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn20%2F700%2Fw960h540%2F20180508%2F96cb-haichqy4851613.jpg'
      }, 
    ],
    routers: [
      {
        name: '用户管理',
        url: '/pages/users/users',
        icon: '../../images/bkgimg/user.png',
        code: '10'
      },
      {
        name: '账单查询',
        url: '/pages/billsquery/billsquery',
        icon: '../../images/bkgimg/billsquery.png',
        code: '11'
      },
      {
        name: '账单报表',
        url: '/pages/report/report',
        icon: '../../images/bkgimg/report.png',
        code: '12'
      },
      {
        name: '金额充值',
        url: '/pages/recharge/recharge',
        icon: '../../images/bkgimg/recharge.png',
        code: '13'
      },
      {
        name: '购物添加',
        url: '/pages/billsquery/goodsadd/goodsadd',
        icon: '../../images/bkgimg/buyCar.png',
        code: '14'
      },
      {
        name: '结算',
        url: '/pages/billsquery/billadd/billadd',
        icon: '../../images/bkgimg/billsadd.png',
        code: '15'
      },
      {
        name: '待开发',
        url: '/pages/Course/course',
        icon: '/image/java_ico.png',
        code: '16'
      },
      {
        name: '待开发',
        icon: '/image/python_ico.png',
        code: '17'
      },
      {
        name: '更多',
        url: '/pages/Course/course',
        icon: '../../images/bkgimg/more.png',
        code: '18'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {},
    goodsName: '',
  },  
  //加载内容
  onLoad: function () {
    //console.log('onLoad')
    var that = this

  },  
  /**
   * 组件的方法列表
   */
  methods: {

  },
  //获取用户输入的蛋糕名
  goodsNameInput: function (e) {
    this.setData({
      goodsName: e.detail.value
    })
  },
  //查询页面
  btnSearchs: function () {
    if ('' != this.data.goodsName && null != this.data.goodsName) {
      wx.showModal({
        title: '提示',
        content: '您查询的蛋糕名是：' + this.data.goodsName,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您没有输入任何东西！！！！',
      })
    }
  },
  //点击页面跳转
  onProductsItmesTap:function(event){
    var id = event.currentTarget.dataset.id;
    console.log("even:" + id);
      wx.navigateTo({
        url: 'homedetails/homedetails?id='+id,
      });
  }
 


})
