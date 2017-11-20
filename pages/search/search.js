var historyKey=[];
var common = require('../../commonJs/common.js');
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyArr:[]
  },
  clearAllKey:function(){
    try {
      wx.removeStorageSync('historyKey')
    } catch (e) {
      // Do something when catch error
    }
  },
  s_typeSearch: function (e) {
    if (historyKey.indexOf(e.detail.value)==-1){
      historyKey.unshift(e.detail.value)
    }
    app.apiPost("https://api.only1314.cn/apiArticles/articleSearchList", {
      queryParam: e.detail.value
    }, function (data) {
      console.log("成功",data.data)
      if(data.data.length==1){
        wx.navigateTo({
          url: '../detail/detail?aid=' + data.data[0]._id
        })
      } else if (data.data.length > 1) {
        wx.navigateTo({
          url: '../list/list?value=' + e.detail.value
        })
      }else{
        wx.showToast({
          title: '无此公司记录',
          icon: 'info',
          duration: 2000
        })
      }
    }, function (data) {
      console.log("shibai", data)
    })
    wx.setStorageSync('historyKey', historyKey);
    this.setData({
      historyArr:historyKey
    })
  },
  clearHistoryKey:function(event){
    historyKey.splice(event.currentTarget.dataset.id,1)
    this.setData({
      historyArr: historyKey
    })
    wx.setStorageSync('historyKey', historyKey);
  },
  jumpList:function(event){
    wx.navigateTo({
      url: '../list/list?value=' + event.currentTarget.dataset.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('historyKey')){
      historyKey = wx.getStorageSync('historyKey');
      this.setData({
        historyArr: historyKey
      })
    }
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
    
  }
})