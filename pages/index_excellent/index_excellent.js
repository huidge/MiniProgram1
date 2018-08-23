
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },
  onLoad:function(){
  	var that = this
  	wx.request({
  	url: 'https://app.zaoliedu.com/enhuiben.html?method=bookinfos&page=1&booktype=3',
  	headers: {
  	'Content-Type': 'application/json'
  	},
  	success: function (res) {
    console.log(res.data.msg)
    console.log(res.data.root)
  //将获取到的json数据，存在名字叫zhihu的这个数组中
   that.setData({
   book: res.data.msg,
   url:res.data.root
   //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
 
   })
  }
 })
  },
  detail:function(e)
  {
    //console.log(e.target.dataset.id)
    //console.log(e.target.dataset.name)
    wx.navigateTo({
      url:'../page/page?bookid='+e.target.dataset.id+'&bookname='+e.target.dataset.name,
    })
  },
  imageError: function(e) {
    console.log('image3发生error事件，携带值为', e.detail.errMsg)
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return {
      title: '免费的幼儿英文学习绘本',
      path: '/pages/index_initiation/index_initiation',
      //imageUrl: 'https://www.baidu.com/img/xinshouye_b4fb6197029635ff552aafdcb3ee1c51.png'
    }
  }
})