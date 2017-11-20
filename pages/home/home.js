const app = getApp();
var common = require('../../commonJs/common.js');
Page({
  data: {
    imgUrls: [
      '../../img/home_01.jpg',
      '../../img/home_02.jpg',
      '../../img/home_03.jpg'
    ],
    indicatorDots: true,
    articleLists:[],
    sortArticleList:[],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    goTop:false,
    scrollTop:0,
    navStyle:'',
    active:'',
    pcolor:"color:#000000",
  },
  jumpDetail:function(event){
      wx.navigateTo({
        url: '../detail/detail?aid=' + event.currentTarget.dataset.aid
      })
  },
  lookMore: function (event){
    wx.navigateTo({
      url: '../typeList/typeList?type=' + event.currentTarget.dataset.type
    })
  },
  jumpSearch: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  tapMove:function(){
    this.setData({
      scrollTop: 0
    })
  },
  position: function (event){
    var _this=this;
    if (event.detail.scrollTop>1700){
      _this.setData({
        goTop: true
      })
    }else{
      _this.setData({
        goTop: false
      })
    }
   
    if (event.detail.scrollTop <50) {
      _this.setData({
        navStyle: 'background-color:rgba(229,229,229,0.6)',
        active:'',
        pcolor: 'color:#000000'
      })
      
    } else {
      _this.setData({
        navStyle: 'background-color:' + 'rgba(229,229,229,' + event.detail.scrollTop / 100 + ')',
        active:'active',
        pcolor:'color:#F98585'
      })
    }
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var _this=this;
    wx.setNavigationBarTitle({
      title: '职言不悔'
    })
    wx.showLoading();
    app.apiPost("https://api.only1314.cn/apiArticles/getArticleList", {
      currentPage: 1,
      pageSize: 6
    }, function (data) {
      _this.setData({
        articleLists: data.data
      })
      var sortArticleList = data.data.sort(common.g.compared("replyNums"))
      _this.setData({
        sortArticleList: sortArticleList
      })
      wx.hideLoading();
      console.log("成功", data)
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

  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})