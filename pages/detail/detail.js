const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleInfo:{},
    comments:[],
    f_comments: [],
    aid:'',
    like:''
  },
  heart: function () { //点击以后的飘心效果
    var _this=this;
    var articleInfo = _this.data.articleInfo;
    articleInfo.likeNums = articleInfo.likeNums+1;
    app.apiPost("https://api.only1314.cn/apiArticles/addLike", { aid: _this.data.aid }, function (data) {
      _this.setData({
        articleInfo: articleInfo
      })
      wx.showToast({
        title: '点赞成功',
        icon: 'success',
        duration: 500
      })
      
    }, function (data) {
      console.log("shibai", data)
    })
  },
  tipsA:function(){
    wx.showModal({
      title: '提示',
      content: '想体验评论功能，请移步至only1314.cn或下载app客户端',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var aid = options.aid,_this=this;
    _this.setData({
      aid: options.aid
    })
    app.apiPost("https://api.only1314.cn/apiArticles/getArticle", { aid: aid }, function (data) {
      _this.setData({
        articleInfo: data.data
      })
      wx.setNavigationBarTitle({
        title: data.data.companyName
      })
    }, function (data) {
      console.log("shibai", data)
    })
    app.apiPost("https://api.only1314.cn/apiComments/getComments", { aid: aid }, function (data) {
      var comments=data.data;
      var comments1 = JSON.parse(JSON.stringify(comments))
      var comments2 = JSON.parse(JSON.stringify(comments))
      var oneLevelLen = 0;
      var fcomments=[]
      for (var i = 0; i < comments1.length; i++) {
        if (comments1[i].re_cid == 0) {
          fcomments.push(comments1[i])
          _this.setData({
            f_comments: fcomments
          })
          for (var j = 0; j < comments2.length; j++) {
            if (comments2[j].re_cid == comments1[i].cid) {
              try {
                fcomments[oneLevelLen].subComments.push(comments2[j])
                _this.setData({
                  f_comments: fcomments
                })
              } catch (e) {
                fcomments[oneLevelLen].subComments = [comments2[j]]
                _this.setData({
                  f_comments: fcomments
                })
                // _this.$set(_this.f_comments[oneLevelLen], 'subComments', [comments2[j]])
              }
            }
          }
          oneLevelLen++
        }
      }
      console.log("获取评论成功", data)
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