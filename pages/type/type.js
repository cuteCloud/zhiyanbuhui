const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
 
  jumpSearch:function(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  jumpList: function (event) {
    wx.navigateTo({
      url: '../list/list?type=' + event.currentTarget.dataset.type
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '分类'
    })
    app.apiPost("https://api.only1314.cn/apiArticles/getArticleList", {
      currentPage: 1,
      pageSize: 6
    },function(data){
      console.log("成功",data)
    },function(data){
      console.log("shibai",data)
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