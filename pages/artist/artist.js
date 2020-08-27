// pages/artist/artist.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    songs: [],
    briefDesc: '',
  },

  //获取歌手信息
  getArtistInfo(id){
    let that = this
    wx.request({
      url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/artist/desc?id='+id,
      success: function(res) {
        if(res.data.code===200){
          that.setData({
            briefDesc: res.data.briefDesc
          })
        }
      }
    })
  },

  //获取歌手热门歌曲
  getArtistTopSong(id){
    let that = this
    wx.request({
      url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/artist/top/song?id='+id,
      success: function(res) {
        if(res.data.code===200){
          that.setData({
            songs: res.data.songs
          })
        }
      }
    })
  },

  showBriefdetail(){
    wx.showModal({
      title: '基本信息',
      content: this.data.briefDesc,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    });   
    this.setData({
      imgSrc: decodeURIComponent(options.src)
    })
    this.getArtistTopSong(options.id)
    this.getArtistInfo(options.id)
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