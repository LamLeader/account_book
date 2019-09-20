var httpRequestUtil = require("../../../utils/network.js"); //require引入
var md5 = require("../../../utils/md5/md5.js"); //require引入
var httpUrl = require("../../../utils/util.js"); //require引入
const app = getApp();
Page({
  data: {
    //goodsName: [{"name": '洗衣粉', "name":'肥皂', "name":'香皂'}],
    goodIndex:0,
    goodShow: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    goodsPrice: false,
    goodsCounts: false,
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['支出', '进账'], //下拉列表的数据
    index: 0, //选择的下拉列 表下标,
    optionGoodsName:'',//选择的商品名称
    optionGoodsId:0
  },

  // 点击下拉显示框
  selectGoods() {
    this.setData({
      goodShow: !this.data.goodShow,
    });
  },
  // 点击下拉列表 购物名称
  optionGoods(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      goodIndex: Index,
      goodShow: !this.data.goodShow,
      optionGoodsName: this.data.goodsName[Index].name,
      optionGoodsId: this.data.goodsName[Index].id
    });
    console.log("您选择的是：" + this.data.goodsName[Index].name);
    console.log("您选择的是goodid：" + this.data.goodsName[Index].id);
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
   // 页面渲染完成
  onReady: function () {
    this.queryGoods();
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
    var goodsName = that.data.optionGoodsName;
    var optionGoodsId = that.data.optionGoodsId;
    var goodsPrice = e.detail.value.goodsPrice;
    var goodsCounts = e.detail.value.goodsCounts;
    var show = that.data.index;
    console.log("下拉选项："+show);
    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    var regNum = new RegExp('[0-9]', 'g');//判断用户输入的是否为数字
    var rsNum = regNum.exec(goodsCounts);
    if (goodsName == '' || goodsPrice == '' || goodsCounts == '') {
      wx.showModal({
        title: '提示',
        content: '请输入商品价格，数量',
      })
      this.setData({
        goodsPrice: true,
        goodsCounts: true,
      })
      return false;
    } if (!reg.test(goodsPrice)) { //pData.mons就是金额
      wx.showToast({
        title: "请输入正确的金额",
        icon: 'none',
        duration: 1000
      })
      return
    } if (!rsNum) {
      wx.showToast({
        title: "请输入正确的购买数量",
        icon: 'none',
        duration: 1000
      })
      return
    }else {
      this.setData({
        goodsPrice: false,
        goodsCounts: false,
      })
    }
    if (goodsName !== '' && goodsPrice !== '' && goodsCounts !== '') {
      wx.showLoading({ title: '数据请求中...', icon: 'loading', duration: 10000 });//显示请求框
      let userId = httpUrl.userId;
      wx.request({
        url: httpRequestUtil.webUrl + 'fmServer/mobile/account/addAccount',
        data: {
          goodsId: optionGoodsId,
          price: goodsPrice,
          counts: goodsCounts,
          types: show,
          userId: userId,
        },
        dataType: 'json',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值  application/x-www-form-urlencoded(post) application/json(get)
        },
        success: function (res) {
          var result = res.data.result;
          if (result == 0) {
             wx.showModal({
               title: '提示',
               content: '添加账单成功！',
             })
             var pages = getCurrentPages(); // 当前页面
             var beforePage = pages[pages.length - 2]; // 前一个页面
             wx.navigateBack({
              success: function () {
                beforePage.onLoad(); // 执行前一个页面的onLoad方法
              }
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
  },
  //查询商品
  queryGoods:function(){
    let userId = httpUrl.userId;
    var that=this;
    wx.request({
      url: httpRequestUtil.webUrl + 'fmServer/mobile/goods/goodsList',
      data: {
        userId: userId,
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值  application/x-www-form-urlencoded(post) application/json(get)
      },
      success: function (res) {
        console.log("===msg==:" + res.data.data[0].name);
        var result = res.data.result;
        if (result == 0) {
          for (let index in res.data.data) {
            console.log("选择的类别:" + res.data.data[index].name);
          }
          //数据设置
          that.setData({
            goodsName: res.data.data
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
          content: '请求超时，请联系管理员！',
        })
      }
    })
  },
 
})