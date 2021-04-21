// page/component/new-pages/user/user.js
Page({
  data:{
    thumb:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F32%2F73%2Fb8%2F3273b8bc407e62debfa254e8c2e3077c.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621602840&t=847203e70220d6686864e33469118143',
    nickname:'1111',
    orders:[],
    hasAddress:false,
    address:{},
    isLogin: false
  },
  onLoad(){
    var self = this;
    /**
     * 获取用户信息
     */
    wx.getSetting({
      success: function(res) {
      }
  }),

    /**
     * 发起请求获取订单列表信息
     */
    wx.request({
      url: 'http://www.gdfengshuo.com/api/wx/orders.txt',
      success(res){
        self.setData({
          orders: res.data
        })
      }
    })
  },
  onShow(){
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
  },
  login() {
    let _this = this;
    console.log(_this.data.nickname);
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (file) => {
        console.log(file)
        _this.data.isLogin = true;
        let userInfo = JSON.stringify(file.userInfo);
        //that.thumb = userInfo.avatarUrl;
        _this.data.nickname = "wang";
        // console.log("11111" + that.isLogin);
        wx.login({
          success: (res) => {
            console.log(res);
          }
        })
      }
    })
  },
  /**
   * 发起支付请求
   */
  payOrders(){
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function(res){
        console.log(res)
      },
      fail: function(res) {
        wx.showModal({
          title:'支付提示',
          content:'<text>',
          showCancel: false
        })
      }
    })
  }
})