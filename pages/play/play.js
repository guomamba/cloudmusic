// pages/play/play.js
const backAudioManager = wx.getBackgroundAudioManager();
var time = require('../../utils/util.js');
var app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicName: '',
    musicSrc: '',
    musicPicUrl : '../../images/album.jpg',
    buttonImage: '../../images/btn_pause.png',
    isPlay: false,
    animation: '',
    animation1: '',
    duration: null,
    currentTime: 0,
    currentAngle: 0,
    lyric: '',
    similist: [],
    hotComments: [],
  },

  //获取音乐 url
  getMusicSrc(id){
    let that = this
    wx.request({
      url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/song/url?id='+id,
      success: function(res) {
        if(res.data.code===200){
          if(res.data.data[0].url!==null){
            console.log("获取url成功！")
            that.setData({
              musicSrc: res.data.data[0].url
            })
          }
          else{
            console.log("未获取到可以播放的url")
          }
        }
      }
    })
  },

  //获取歌曲详情
  getMusicDetail(id){
    let that = this
    wx.request({
      url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/song/detail?ids='+id,
      success: function(res) {
        if(res.data.code===200){
          that.setData({
            duration: res.data.songs[0].dt
          })
          if(res.data.songs[0].al.picUrl!==null){
            that.setData({
              musicPicUrl: res.data.songs[0].al.picUrl,
            })
          }
        }
      }
    })
  },

  //音乐控制
  MusicControl(){
    if(this.data.isPlay===false){
      if(this.data.musicSrc!==''){
        this.setData({
          buttonImage: '../../images/btn_play.png',
          isPlay: true
        })
        backAudioManager.title = this.data.musicName
        backAudioManager.src = this.data.musicSrc
        backAudioManager.play();
        backAudioManager.onPlay(()=>{
          //console.log("开始播放")
          this.setData({
            currentTime: backAudioManager.currentTime,
            currentAngle: 180 / 5000 * backAudioManager.currentTime * 1000
          })
        });
        this.animation.rotate(180 / 5000 * this.data.duration).step({
          duration: this.data.duration - this.data.currentTime * 1000               
        })
        this.animation1.rotate(-180 / 5000 * this.data.duration).step({
          duration: this.data.duration - this.data.currentTime * 1000              
        })
        this.setData({
          animation: this.animation.export(),
          animation1: this.animation1.export()
        })
      }
      else{
        wx.showToast({
          title: '播放失败',
          icon: 'none'
        })
      }
    }
    else if(this.data.isPlay===true){
      this.setData({
        buttonImage: '../../images/btn_pause.png',
        isPlay: false
      })
      if(this.data.musicSrc!==''){
        backAudioManager.pause();
        backAudioManager.onPause(()=>{
          //console.log("暂停")
          //console.log(this.data.currentAngle)
        });
        this.animation.rotate(this.data.currentAngle).step({
          duration: 10                
        })
        this.animation1.rotate(-this.data.currentAngle).step({
          duration: 10                 
        })
        this.setData({
          animation: this.animation.export(),
          animation1: this.animation1.export()
        })
      }
    }
  },

  //获取歌词
  getMusicLyric(id){
    let that = this;
    wx.request({
      url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/lyric?id='+id,
      success: function(res) {
        if(res.data.code===200){
          that.setData({
            lyric: res.data.lrc.lyric
          })
        }
      }
    })
  },

  //获取相似音乐
  getSimilarMusic(id){
    let that = this
    wx.request({
      url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/simi/song?id='+id,
      success: function(res) {
        if(res.data.code===200){
          that.setData({
            similist: res.data.songs
          })
        }
      }
    })
  },

  //获取歌曲评论
  getMusicCommrnt(id){
    let that = this
    wx.request({
      url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/comment/music?id='+id+'&limit=0',
      success: function(res) {
        if(res.data.code===200){
          that.setData({
            hotComments: res.data.hotComments
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.setData({
      musicName: options.name
    })
    this.getMusicSrc(options.id)
    this.getMusicDetail(options.id)
    //this.getMusicLyric(options.id)
    this.getSimilarMusic(options.id)
    this.getMusicCommrnt(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '50% 50% 0'
    })
    this.animation1 = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '50% 50% 0'
    })
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