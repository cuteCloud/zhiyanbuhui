const app = getApp();
var common = require('../../commonJs/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleLists: [],
    typeMore:'',
    currentPage:1,
    lockLoad:0
  },
  jumpDetail: function (event) {
    wx.navigateTo({
      url: '../detail/detail?aid=' + event.currentTarget.dataset.aid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  loadNew:function(){
    console.log("开始加重新的")
    var _this = this;
    if(this.data.lockLoad==0){
      _this.setData({
        lockLoad: 1
      })
      wx.showLoading();
      _this.setData({
        currentPage: this.data.currentPage + 1
      })
      app.apiPost("https://api.only1314.cn/apiArticles/getArticleList", {
        currentPage: this.data.currentPage,
        pageSize: 15
      }, function (data) {
        console.log()
        if (data.status == '200') {
          if (_this.data.typeMore == 'new') {
            var articleLists = _this.data.articleLists.concat(data.data)
            _this.setData({
              articleLists: articleLists
            })
            wx.hideLoading();
            _this.setData({
              lockLoad: 0
            })
          } else if (_this.data.typeMore == 'hot') {
            var sortArticleList = data.data.sort(common.g.compared("replyNums"))
            var sortArticleList = _this.data.articleLists.concat(sortArticleList)
            _this.setData({
              articleLists: sortArticleList
            })
            wx.hideLoading();
            _this.setData({
              lockLoad: 0
            })
          } else {
            if (_this.data.articleLists.length > 0) {
              wx.showToast({
                title: '已经加载完毕',
                icon: 'success',
                duration: 2000
              })
              wx.hideLoading();
              _this.setData({
                lockLoad: 0
              })
              return;
            }
          }
        }


      }, function (data) {
        console.log("shibai", data)
      })
    }else{
      console.log("等等")
    }
  
  },
  onLoad: function (option) {
    this.setData({
      typeMore:option.type
    })
    wx.showLoading();
    var _this=this;
    app.apiPost("https://api.only1314.cn/apiArticles/getArticleList", {
      currentPage: 1,
      pageSize: 20
    }, function (data) {
      if(option.type=='new'){
        _this.setData({
          articleLists: data.data
        })
        wx.setNavigationBarTitle({
          title: '最新文章'
        })
      } else if (option.type == 'hot'){
        var sortArticleList = data.data.sort(common.g.compared("replyNums"))
        _this.setData({
          articleLists: sortArticleList
        })
        wx.setNavigationBarTitle({
          title: '最热文章'
        })
      }
      wx.hideLoading();
    }, function (data) {
      console.log("shibai", data)
    })
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