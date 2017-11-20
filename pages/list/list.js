const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleLists:[]
  },
  jumpDetail: function (event) {
    wx.navigateTo({
      url: '../detail/detail?aid=' + event.currentTarget.dataset.aid
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    wx.setNavigationBarTitle({
      title: '公司列表'
    })
    console.log(option.value)
    var _this=this;
    if(option.value){
      app.apiPost("https://api.only1314.cn/apiArticles/articleSearchList", {
        queryParam: option.value
      }, function (data) {
        console.log("成功", data.data)
        _this.setData({
          articleLists: data.data
        })
      }, function (data) {
        console.log("shibai", data)
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