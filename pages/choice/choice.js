
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    items: [
      {name: '1', value: 'VIPKID 纯北美外教 代言人刘涛'},
      {name: '2', value: '哒哒英语 专属外教 代言人孙俪'},
      {name: '3', value: '51Talk 高校教材 代言人贾乃亮'},
      {name: '4', value: 'VipJr 量身定制课 代言人姚明'},
      //{name: '1234', value: '以上都想试听体验'},
    ]
  },
  checkboxChange: function(e) {
    console.log(e.detail.value)
    var choice = wx.setStorageSync('choice',e.detail.value)
  },
  ok:function(){
    var userinfo = wx.getStorageSync('userinfo')
    var choice = wx.getStorageSync('choice')
    var openId = wx.getStorageSync('openId')
    console.log(openId.openid)
    var organization = ''
    for(var i = 0;i < choice.length;i++)
    {
      organization = organization + choice[i]
    }
    if(organization == '')
    {
      organization = '0'
    }
    console.log(organization)
    var age = ''
    if(userinfo.age == '不到4岁')
    {
      age = 1
    }
    if(userinfo.age == '4岁')
    {
      age = 4
    }
    if(userinfo.age == '5岁')
    {
      age = 5
    }
    if(userinfo.age == '6岁')
    {
      age = 6
    }
    if(userinfo.age == '7岁')
    {
      age = 7
    }
    if(userinfo.age == '8岁')
    {
      age = 8
    }
    if(userinfo.age == '9岁')
    {
      age = 9
    }
    if(userinfo.age == '10岁')
    {
      age = 10
    }
    if(userinfo.age == '11岁')
    {
      age = 11
    }
    if(userinfo.age == '12岁')
    {
      age = 12
    }
     if(userinfo.age == '12岁以上')
    {
      age = 13
    }
    console.log("age:"+age)
    wx.request({  
    url: 'https://app.zaoliedu.com/set_register_info?age='+age+'&name='+userinfo.nickname+'&phone='+userinfo.tel_number+'&organization='+organization+'&app=xcxhb1&openid='+openId.openid,
    headers: {
    'Content-Type': 'application/json'
    },
    success: function (res) {
    console.log(res.data.msg)
    if(res.data.msg == 'null')
    {
      console.log("保存成功")
      wx.redirectTo({
      url:'../../pages/index_initiation/index_initiation'
    })
    }
    }
  })
  }
})