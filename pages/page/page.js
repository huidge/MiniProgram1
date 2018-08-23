//index.js
//获取应用实例
const app = getApp()
const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({
 data: {
    key:0,
    size:0
 },
 onLoad: function (e) {

 console.log(e)
 var that = this//不要漏了这句，很重要 
 wx.request({
  url: 'https://app.zaoliedu.com/enhuiben.html?method=bookinfo&bookid='+e.bookid,
  headers: {
  'Content-Type': 'application/json'
  },
  success: function (res) {
    //console.log(res.data.msg.data)
    //console.log(res.data)
  //将获取到的json数据，存在名字叫zhihu的这个数组中
   that.setData({
   bookname:e.bookname,
   size:res.data.msg.data.length,
   book:res.data.msg.data,
   url:res.data.root,
   //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
   })
   console.log(res.data.root+res.data.msg.data[that.data.key].audioUrl)
  backgroundAudioManager.src = res.data.root+res.data.msg.data[that.data.key].audioUrl
  }
 }),
  wx.onBackgroundAudioStop(function() {
    setTimeout(function(){     
      if(that.data.key<that.data.size-1)
      {
        that.setData({
        key : that.data.key+1
        })
      console.log(that.data.url+that.data.book[that.data.key].audioUrl)
       }
       else{
        wx.pauseBackgroundAudio()
      }
      backgroundAudioManager.src = that.data.url+that.data.book[that.data.key].audioUrl
      }, 1000)
        })
 },

 onReady: function (e) {
  },
  audioPause: function () {
    //this.audioCtx.pause()
    //wx.pauseBackgroundAudio()
  },
  goBack: function () {
    /*this.audioCtx.pause()
    this.setData({
        key : 100
          })*/
  wx.pauseBackgroundAudio()
  },
  last: function(e){ 
   var url = e.currentTarget.dataset.url
   var key = e.currentTarget.dataset.pageno
   console.log("key:"+key)
   if(key!=0)
   {
      this.setData({
        key : key-1
      })
   }
    backgroundAudioManager.src = this.data.url+url
  },

  next: function(e){
   var url = e.currentTarget.dataset.url
   var key = e.currentTarget.dataset.pageno
   var size = e.currentTarget.dataset.size
   console.log("key:"+key)

   if(key<size-1)
   {
    this.setData({
    key : key+1
    })
   }
    backgroundAudioManager.src = this.data.url+url
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