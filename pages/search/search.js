// pages/search/search.js
var app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotlist: [],
    hotlist_hidden: false,
    inputWords: '',
    searchlist: [],
    searchlist_hidden: true,
    allMatchlist: [],
    allMatchlist_hidden: true,
  },

  //获取热门搜索
  getHotLists(){
    let that = this
    wx.request({
      url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/search/hot/detail',
      success: function(res) {
        if(res.data.code===200){
          that.setData({
            hotlist: res.data.data
          })
        }
      }
    })
  },

  //搜索
  Search(){
    if(this.data.inputWords!==''){
      this.setData({
        allMatchlist_hidden: true, 
        searchlist_hidden: false,
        hotlist_hidden: true
      })
      let that = this
      wx.request({
        url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/search?keywords='+this.data.inputWords,
        success: function(res) {
          if(res.data.code===200){
            that.setData({
              searchlist: res.data.result.songs
            })
          }
        }
      })
    }
  },

  keyword(e){
    this.setData({
      inputWords: e.currentTarget.dataset.keyword
    })
    this.Search()
  },

  bindfocus(){
    console.log("bindfocus")
  },
  bindblur(){
    console.log("bindblur")
  },

  //获取输入框内容
  getInputWords(e){
    if(e.detail.value===""){
      this.setData({
        hotlist_hidden: false,
        allMatchlist_hidden: true,
        searchlist_hidden: true
      })
    }
    else{
      this.setData({
        inputWords: e.detail.value,
        hotlist_hidden: true,
        allMatchlist_hidden: false,
        searchlist_hidden: true 
      })
      let that = this
      wx.request({
        url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/search/suggest?keywords='+e.detail.value+'&type=mobile',
        success: function(res) {
          if(res.data.code===200){
            that.setData({
              allMatchlist: res.data.result.allMatch
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
    this.getHotLists()
    if(options.inputWords!==undefined){
      this.setData({
        inputWords: options.inputWords
      })
      this.Search()
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