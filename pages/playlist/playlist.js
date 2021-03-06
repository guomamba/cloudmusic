// pages/playlist/playlist.js
var app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    playlist: {},
  },

  description(){
    wx.showModal({
      title: '详情',
      content: this.data.playlist.description,
    })
  },

  playlist_name(){
    wx.showModal({
      title: '标题',
      content: this.data.playlist.name,
    })
  },

  //获取歌单详情
  getPlaylistDetail(id){
    let that = this
    if(app.globalData.isLogin){
      wx.request({
        url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/playlist/detail?id='+id+'&cookie='+app.globalData.cookie,
        success: function(res) {
          if(res.data.code===200){
            that.setData({
              playlist: res.data.playlist
            })
          }
        }
      })
    }
    else{
      wx.request({
        url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/playlist/detail?id='+id,
        success: function(res) {
          if(res.data.code===200){
            that.setData({
              playlist: res.data.playlist
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type==0){
      wx.setNavigationBarTitle({
        title: '歌单'
      })
    }
    else if(options.type==1){
      wx.setNavigationBarTitle({
        title: '排行榜'
      })
    }
    this.getPlaylistDetail(options.id)
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