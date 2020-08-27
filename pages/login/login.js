var utilMd5 = require('../../utils/md5.js'); 
var app = getApp();

// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: null,
    password: '',
    md5_password: "2c06a779625c86a00756b342cbf9c1b8",
    userId: ''
  },

  login(){
    if(this.data.number===null||this.data.password===''){
      wx.showToast({
        title: '账号密码不能为空',
        icon: 'none'
      })
    }
    else if(this.data.number==13991042412&&utilMd5.hexMD5(this.data.password)==this.data.md5_password){
      wx.showLoading({
        title: '登录中...',
        mask: true,
      });
      let that = this
      wx.request({
        url: app.globalData.dataSource[app.globalData.dataSourcetype]+'/login/cellphone?phone='+this.data.number+'&md5_password='+utilMd5.hexMD5(this.data.password),
        success: function(res) {
          if(res.data.code===200){
            app.globalData.cookie = res.data.cookie
            app.globalData.isLogin = true
            app.globalData.src = res.data.profile.avatarUrl
            console.log(app.globalData.src)
            that.setData({
              userId: res.data.account.id
            })
            wx.hideLoading();
            wx.showToast({
              title: '登陆成功！',
              icon: 'success'
            })
            wx.reLaunch({
              url: '../../pages/index/index?id='+that.data.userId
            })
          }
          else{
            wx.hideLoading();
            wx.showToast({
              title: '登陆失败！',
              icon: 'none'
            })
          }
        }
      })
    }
    else{
      wx.showToast({
        title: '账号密码不正确',
        icon: 'none'
      })
    }
  },

  getInputNumber(e){
    if(e.detail.value!==null){
      this.setData({
        number: e.detail.value
      })
    }
  },

  getInputPassword(e){
    if(e.detail.value!==''){
      this.setData({
        password: e.detail.value
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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