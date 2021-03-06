var app =  getApp();

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    //导航栏
    navList:[{
      id: 0,
      text: "每日推荐",
    },{
      id: 1,
      text: "歌单",
    },{
      id: 2,
      text: "排行榜"
    },{
      id: 3,
      text: "歌手"
    },
    // {
    //   id: 4,
    //   text: "电台"   //无法获取电台节目url
    // }
    ],
    //被点击菜单索引
    currentIndexNav: 0,
    userAvatarUrl: '../../images/user.jpg',
    cookie: null,
    dailySongs: [],
    topPlaylists: [],
    allList:  [],
    topArtist: [],
    djRadios: [],
    navList_hidden: [false,true,true,true,true],
    coordinate: {
      startX: null,
      startY: null,
      endX: null,
      endY: null
    },
  },

  touchstart(e){
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY
    })
  },

  touchend(e){
    this.setData({
      endX: e.changedTouches[0].clientX,
      endY: e.changedTouches[0].clientY
    })
  },

  //点击首页导航按钮切换选中菜单
  activeNav: function (e) {
    console.log("切换到"+this.data.navList[e.target.dataset.index].text)
    this.setData({
      currentIndexNav: e.target.dataset.index
    })
    let arr = []
    for (let index = 0; index < this.data.navList_hidden.length; index++) {
      if(index===e.target.dataset.index){
        arr.push(false)
      }
      else{
        arr.push(true)
      }
    }
    this.setData({
      navList_hidden: arr
    })
  },
  
  getUserDetail(id){
    let that = this
    wx.request({
      url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/user/detail?uid='+id,
      success: function(res) {
        console.log(res)
      }
    })
  },

  //获取每日推荐歌曲
  getDailySongs(){
    let that = this;
    if(app.globalData.isLogin){
      wx.request({
        url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/recommend/songs?cookie='+app.globalData.cookie,
        success: function(res) {  
          if(res.data.code===200){
            that.setData({
              dailySongs: res.data.data.dailySongs
            })
          }
        }
      })
    }
    else{
      wx.request({
        url: 'https://www.fastmock.site/mock/110cab20463444af7b9baf258a742c29/music/recommend/songs',
        success: function(res) {  
          if(res.data.code===200){
            that.setData({
              dailySongs: res.data.data.dailySongs
            })
          }
        }
      })
    }
  },

  //获取热门歌单
  getTopPlaylist(){
    let that = this
    wx.request({
      url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/top/playlist?limit=51',
      success: function(res) {
        if(res.data.code===200){
          that.setData({
            topPlaylists: res.data.playlists
          })
        }
      }
    })
  },

  //获取榜单
  getAllList(){
    let that = this
    wx.request({
      url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/toplist',
      success: function(res) {
        if(res.data.code===200){
          that.setData({
            allList: res.data.list
          })
        }
      }
    })
  },

  //获取热门歌手
  getTopArtist(){
    let that = this
    wx.request({
      url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/top/artists',
      success: function(res) {
        if(res.data.code===200){
          that.setData({
            topArtist: res.data.artists
          })
        }
      }
    })
  },

  //获取热门电台
  getHotdjRadios(){
    let that = this
    wx.request({
      url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/dj/hot',
      success: function(res) {
        if(res.data.code===200){
          that.setData({
            djRadios: res.data.djRadios
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getLoginStatus()
    this.getDailySongs()
    this.getTopPlaylist()
    this.getAllList()
    //this.getHotdjRadios()
    this.getTopArtist()
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    this.setData({
      src: app.globalData.src
    })
    if(options.id!==undefined){
      this.getUserDetail(options.id)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();
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