//index.js
//获取应用实例
var app = getApp()
var interval = null //倒计时函数
Page({
  data: {
    array: ['请选择孩子年龄','不到4岁', '4岁', '5岁', '6岁','7岁','8岁', '9岁', '10岁','11岁','12岁','12岁以上'],
    index:0,
    avatarUrl:'../../image/logo@2x.png',
    date:'请选择日期',
    fun_id:2,
    time: '获取验证码', //倒计时 
    currentTime:61
  },
  getCode: function (options){
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime+'秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime:61,
          disabled: false   
        })
      }
    }, 1000)  
  },
  //事件处理函数
  onLoad: function() {
    var that = this  
    //调用应用实例的方法获取全局数据  
    app.getUserInfo(function(userInfo){  
      //console.log(userInfo)
      //更新数据  
      that.setData({  
        userInfo:userInfo  
      })  
    })
  },
  bindPickerChange: function(e) {
    console.log(e.detail.value)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({  
        index : e.detail.value
      })
  },
  getVerificationCode:function(e){
    var that = this

    var userinfo = wx.getStorageSync('userinfo');
    //console.log(userinfo.tel_number)
    wx.request({  
    url: 'https://app.zaoliedu.com/get_phone_code?phone='+userinfo.tel_number+'&app=xcxhb1',
    headers: {
    'Content-Type': 'application/json'
    },
    success: function (res) {
    console.log(res.data.msg)
    if(res.data.msg == 'phone code is wrong')
    {
      wx.showModal({
      title: '温馨提示',
      content: '请输入正确的手机号码',
      success: function(res) {
        if (res.confirm) {
       console.log('用户点击确定')
        } else if (res.cancel) {
       console.log('用户点击取消')
    }
  }
})
    }

    if(res.data.msg == true)
    {
      that.getCode();
    that.setData({
      disabled:true
    })
      console.log("发送验证码成功")
      wx.showToast({
        title: '验证码发送成功',
        icon: 'success',
        duration: 2000
      })
    }
    }
  }) 
},
  verify:function(){
    var userinfo = wx.getStorageSync('userinfo');
    console.log(userinfo)
    wx.request({  
    url: 'https://app.zaoliedu.com/verify_phone_code?code='+userinfo.verify_code+'&phone='+userinfo.tel_number+'&app=xcxhb1',
    headers: {
    'Content-Type': 'application/json'
    },
    success: function (res) {
    console.log(res.data.msg)
    if(res.data.msg == "null")
    {
      if(userinfo.age != '请选择孩子年龄' && userinfo.nickname != '')
      {
        console.log("验证成功")
        wx.redirectTo({
        url:'../../pages/choice/choice'
        })
      }
      else{
        wx.showModal({
      title: '温馨提示',
      content: '请填写完整信息后注册',
      success: function(res) {
        if (res.confirm) {
       console.log('用户点击确定')
        } else if (res.cancel) {
       console.log('用户点击取消')
    }
  }
})
      }
    }
    else{
      wx.showModal({
      title: '温馨提示',
      content: '请输入正确的验证码',
      success: function(res) {
        if (res.confirm) {
       console.log('用户点击确定')
        } else if (res.cancel) {
       console.log('用户点击取消')
    }
  }
})
    }
    }
  })
  },
  formSubmit: function(e) {
    console.log(e.detail.value)
     wx.setStorageSync('userinfo', e.detail.value);
  },
  bindShowModal: function(e){
  wx.showModal({
  title: '温馨提示',
  content: '您还没有注册，注册后可查看所有绘本哦~',
  success: function(res) {
    if (res.confirm) {
      console.log('注册')
      wx.redirectTo({
        url: '../../pages/index_initiation/index_initiation'
        })
    } else if (res.cancel) {
      console.log('取消')
    }
  }
})
},
  
})