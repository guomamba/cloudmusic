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
    },{
      id: 4,
      text: "电台"
    }],
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
    dataSource: [
      'http://localhost:3000',
      'http://www.hjmin.com',
      'https://www.fastmock.site/mock/110cab20463444af7b9baf258a742c29/music',
    ],
    dataSourcetype: 1
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
  
  //获取登录信息
  getLoginStatus(){
    let that = this;
    wx.request({
      url: this.data.dataSource[this.data.dataSourcetype]+'/login/status',
      success: function(res) {
        if(res.data.code===301){
          console.log("需要登陆！")
          that.getLoginInfo()
        }
        if(res.data.code===200){
          console.log("已登录！")
        }
      }
    })
  },

  //登录
  getLoginInfo(){
    let that = this;   
    wx.request({
      url: this.data.dataSource[this.data.dataSourcetype]+'/login/cellphone?phone=15915301322&md5_password=2c06a779625c86a00756b342cbf9c1b8',
      success: function(res) {
        if(res.data.code===200){
          console.log("登录成功！")
          that.setData({
            userAvatarUrl: res.data.profile.avatarUrl,
            cookie: res.data.cookie
          })
        }
      }
    })
  },

  //获取每日推荐歌曲
  getDailySongs(){
    let that = this;
    wx.request({
      url: this.data.dataSource[2]+'/recommend/songs',
      success: function(res) {  
        if(res.data.code===200){
          that.setData({
            dailySongs: res.data.data.dailySongs
          })
        }
      }
    })
  },

  //获取热门歌单
  getTopPlaylist(){
    let that = this
    wx.request({
      url: this.data.dataSource[this.data.dataSourcetype]+'/top/playlist/highquality?limit=51',
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
      url: this.data.dataSource[this.data.dataSourcetype]+'/toplist',
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
      url: this.data.dataSource[this.data.dataSourcetype]+'/top/artists',
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
      url: this.data.dataSource[this.data.dataSourcetype]+'/dj/hot',
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
    this.getHotdjRadios()
    this.getTopArtist()
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
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