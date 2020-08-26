// pages/play/play.js
const innerAudioContext  = wx.createInnerAudioContext();
var time = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicSrc: '',
    musicPicUrl : '',
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
    dataSource: [
      'http://localhost:3000',
      'http://www.hjmin.com'
    ],
    dataSourcetype: 1
  },

  //获取音乐 url
  getMusicSrc(id){
    let that = this
    wx.request({
      url: this.data.dataSource[this.data.dataSourcetype]+'/song/url?id='+id,
      success: function(res) {
        if(res.data.code===200){
          console.log("获取url成功！")
          that.setData({
            musicSrc: res.data.data[0].url
          })
        }
      }
    })
  },

  //获取歌曲详情
  getMusicDetail(id){
    let that = this
    wx.request({
      url: this.data.dataSource[this.data.dataSourcetype]+'/song/detail?ids='+id,
      success: function(res) {
        if(res.data.code===200){
          that.setData({
            musicPicUrl: res.data.songs[0].al.picUrl,
            duration: res.data.songs[0].dt
          })
        }
      }
    })
  },

  //音乐控制
  MusicControl(){
    if(this.data.isPlay===false){
      this.setData({
        buttonImage: '../../images/btn_play.png',
        isPlay: true
      })
      innerAudioContext.src = this.data.musicSrc
      innerAudioContext.play();
      innerAudioContext.onPlay(()=>{
        //console.log("开始播放")
        this.setData({
          currentTime: innerAudioContext.currentTime,
          currentAngle: 180 / 5000 * innerAudioContext.currentTime * 1000
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
    else if(this.data.isPlay===true){
      this.setData({
        buttonImage: '../../images/btn_pause.png',
        isPlay: false
      })
      innerAudioContext.pause();
      innerAudioContext.onPause(()=>{
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
  },

  //获取歌词
  getMusicLyric(id){
    let that = this;
    wx.request({
      url: this.data.dataSource[this.data.dataSourcetype]+'/lyric?id='+id,
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
      url: this.data.dataSource[this.data.dataSourcetype]+'/simi/song?id='+id,
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
      url: this.data.dataSource[this.data.dataSourcetype]+'/comment/music?id='+id+'&limit=0',
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
    this.getMusicSrc(options.id)
    this.getMusicDetail(options.id)
    //this.getMusicLyric(options.id)
    this.getSimilarMusic(options.id)
    this.getMusicCommrnt(options.id)

    //获取当前系统时间
    var timestamps = Math.round(new Date().getTime() / 1000).toString();
    //将时间戳转换为时间格式
    time.formatTimeTwo(timestamps,'Y年M月D日 h:m:s');
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