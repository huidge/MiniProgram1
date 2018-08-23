//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

     var that = this  
     var user=wx.getStorageSync('user') || {};    
     var userInfo=wx.getStorageSync('userInfo') || {};   
     if((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600))&&(!userInfo.nickName)){   
        wx.login({    
        success: function(res){  
            if(res.code) { 
              //console.log(res)
              //未获取到UserInfo
                wx.getUserInfo({  
                    success: function (res) {  
                        var objz={};  
                        objz.avatarUrl=res.userInfo.avatarUrl;  
                        objz.nickName=res.userInfo.nickName;  
                        //console.log(objz);  
                        wx.setStorageSync('userInfo', objz);//存储userInfo  
                    }  
                })
                //未获取到UserInfo
                var d=that.globalData;//这里存储了appid、secret、token串  
                var l='https://api.weixin.qq.com/sns/jscode2session?appid='+d.appid+'&secret='+d.secret+'&js_code='+res.code+'&grant_type=authorization_code';    
                wx.request({    
                    url: l,    
                    data: {},    
                    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
                    // header: {}, // 设置请求的 header    
                    success: function(res){   
                        var obj={};  
                        obj.openid=res.data.openid; 
                        obj.expires_in=Date.now()+res.data.expires_in;    
                        //console.log(obj);  
                        wx.setStorageSync('openId', obj);//存储openid 
                        console.log(obj.openid);   
                    }    
                });  
            }else {  
                console.log('获取用户登录态失败！' + res.errMsg)  
            }            
        }    
      });   
    }  

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  getUserInfo:function(cb){  
    var that = this;  
    if(this.globalData.userInfo){  
      typeof cb == "function" && cb(this.globalData.userInfo)  
    }else{  
      //调用登录接口  
      wx.login({  
        success: function () {  
          wx.getUserInfo({  
            success: function (res) {  
              that.globalData.userInfo = res.userInfo; 
              console.log(that.globalData.userInfo) 
              typeof cb == "function" && cb(that.globalData.userInfo)  
            }  
          })  
        }  
      });  
    }  
  },  
  
  globalData: {
    userInfo: null,
    appid:'wx1e954460873ac40d',
    secret:'e0b926fa3206a9f364e9960b82027cf1'
  }
})