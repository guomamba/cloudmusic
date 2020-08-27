// components/mycomponents/mycomponents.js
var app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    src: '../../images/user.jpg',
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  /**
  * 页面加载完成执行
  */
  lifetimes: {
    ready(){
      this.setData({
        src: app.globalData.src
      })
    }
  },
})
