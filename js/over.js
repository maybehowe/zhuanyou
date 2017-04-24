var over = {
    showHistory: false,
    history: 0.0,
    buttonMsg: '',
    redAlert: false,
    curIncome: 0,
    hasBind: false,
    init: function(curIncome) {
        var self = this;
        self.curIncome = curIncome;
        self.bindEvent();
        self.mounted();
        self.showAlert();
    },
    bindEvent: function() {
        var self = this;
        var $over = $('.over'),
            $phone = $('.phone'),
            $prize = $('.prize');

        if(self.hasBind){
          return;
        }

        $over.on('touchstart', '.again_btn', function() {
            if (self.curIncome >= 10) {
                // _gaq.push(['_trackEvent', 'game', 'again', 'game>10%', 1, true]);
            } else {
                // _gaq.push(['_trackEvent', 'game', 'again', 'game<10%', 1, true]);
            }
            game.replayGame();
            self.closeAlert();
        });

        $over.on('touchstart', '.other_btn', function() {
            if (self.curIncome >= 10) {
                //领红包
                // _gaq.push(['_trackEvent', 'game', 'hongbao', ' game>10%', 1, true]);
                self.showPhone();
            } else {
                //直播
                // _gaq.push(['_trackEvent', 'game', 'chat_yy', ' game<10%', 1, true]);
                window.location.href = "http://pmchat.24k.hk/studio";
            }
            // this.$store.commit('commitIncome', 0);
        });

        $over.on('touchstart', '.share', function() {
            self.showShare();
        });

        //手机号提交
        $phone.on('touchstart', '.phone_submit', function () {
          var type = 1;
          self.showPrize(1);
        });

        // 发送验证码
        $phone.on('touchstart', '.code_btn', function () {

        });

        //关闭手机号提交
        $phone.on('touchstart', '.close_phone', function () {
          self.closePhone();
        });

        //关闭获奖
        $prize.on('touchstart', '.close_prize', function () {
          self.closePrize();
        });

        self.hasBind = true;
    },
    mounted: function() {
        var self = this;
        var curIncome = self.curIncome;
        if (!localStorage.getItem('times') || localStorage.getItem('times') == "1") {
            self.showHistory = false;
        } else {
            self.showHistory = true;
            if (localStorage.getItem('phone')) {
                //联网获取
                $.ajax({
                        url: '',
                    })
                    // axios.post('/activity/earnmoney/maxYield', {
                    //   activityPeriods: '20170411',
                    //   phone: localStorage.getItem('phone')
                    // }).then((res) => {
                    //   let response = JSON.parse(res);
                    //   if (response.code == '0') {
                    //     this.history = response.data.maxYield;
                    //   }
                    // }).catch((res) => {
                    //   console.log(res);
                    // });
            } else {
                //使用本地
                self.history = parseFloat(localStorage.getItem('income'));
            }
        }
        if (!localStorage.getItem("totalTimes")) {
            localStorage.setItem("totalTimes", 1);
        } else {
            localStorage.setItem("totalTimes", parseInt(localStorage.getItem("totalTimes")) + 1);
        }
        if (curIncome >= 10) {
            self.buttonMsg = '直接领红包';
            self.redAlert = false;
        } else {
            self.redAlert = true;
            self.buttonMsg = '去直播间课堂';
        }
    },
    showAlert: function() {
        var self = this;
        var curIncome = self.curIncome;
        var win = null;
        if (curIncome <= 1) {
            win = 53.7;
        } else {
            win = parseFloat((curIncome - 15) * 0.45 + 60).toFixed(2);
        }
        var income = parseFloat(curIncome).toFixed(2),
            history = parseFloat(self.history).toFixed(2);

        var html = '<div id="content"> <div class="item"> <span>当天排名</span> <span>您打败了<b id="win">' + win + '</b>%的用户</span> </div> <div class="item"> <span>收益率</span> <span class="red"><b id="income">' + income + '</b>%</span> </div>';

        if (self.redAlert) {
            html += '<p class="redAlert">收益达到10%以上，有机会获得微信红包呦</p>';
        }

        if (self.showHistory) {
            html += '<div class="item showHistory"><span>历史最高收益率</span><span class="red"><b id="history_income">' + history + '</b>%</span></div>';
        }

        html += ' <div class="opt"><div class="alert_btn again_btn">再挑战一次</div><div class="alert_btn other_btn">' + self.buttonMsg + '</div></div><div class="share">分享好友</div></div>';

        $('.over').append(html).removeClass('hidden');
    },
    closeAlert: function () {
      var self = this;
      $('.over').html('');
      $('.over').addClass('hidden');
    },
    showPhone: function () {
      var self = this;
        var html = '<div class="phone_content"> <div class="close_phone"></div> <div class="phone_form"> <div class="phone_form_item"> <input class="phone_num" type="text" maxlength="11" placeholder="请输入手机号码"> </div> <div class="phone_form_item"> <input class="code_num" type="text" maxlength="6" placeholder="请输入验证码"> <div class="code_btn">验证码</div> </div> </div> <div class="phone_submit">提交</div> </div>';

        $('.phone').append(html).removeClass('hidden');
    },
    closePhone: function () {
      var self = this;
      $('.phone').html('');
      $('.phone').addClass('hidden');
    },
    showErr: function () {
        var self = this;
        var html = '<div id="content" class="err_wrap"> <div class="err_txt"> Sorry，您的游戏次数已经用完，但只要您点<br>击分享，即可以再次获得一次游戏机会哟 </div> <div class="err_ctrl"> <div class="err_ctrl_btn err_share_btn">分享好友</div> <div class="err_ctrl_btn err_cancel">取消</div> </div> </div>';

        $('.over').append(html).removeClass('hidden');
    },
    closeShowErr: function () {
      var self = this;
      $('.over').html('');
      $('.over').addClass('hidden');
    },
    showShare: function () {
      var self = this;
      var html = '<div id="content"> <div class="close_share"></div> <img src="./img/share_img.png" alt=""> <div class="share_txt"> 长按上方图片保存到您的手机相册中。请打开微信将该<br>图片发送给好友，或者分享朋友圈，即分享成功啦！ </div> </div>';

      $('.shareto').append(html).removeClass('hidden');
      if (localStorage.getItem("times") && localStorage.getItem("times") > 3) {
        localStorage.setItem("times", 3);
      }
      // _gaq.push(['_trackEvent', 'game', 'share', ' share_wechat', 1, true]);
      // this.addShare();
    },
    closeShare: function () {
      var self = this;
      $('.shareto').html('');
      $('.shareto').addClass('hidden');
    },
    addShare: function() {
      var phone = localStorage.getItem('phone') || '';
      axios.post('/activity/earnmoney/addShareCount', {
        activityPeriods: '20170411',
        phone: phone
      }).then((res) => {

      }).catch((res) => {
        console.log(res);
      })
    },
    showPrize: function (type) {
      var self = this;
      self.closePhone();
      var html = '<div id="content"> <div class="close_prize"></div> <img src="./img/prize_img_' + type + '.png" alt=""> <div class="prize_txt"> 点击保存此图片，然后打开微信，点击右上角，扫一扫，从相册中选 <br>取该图片，即可以添加老师的微信。老师审核后将会把奖品发给您。 </div> </div>';

        $('.prize').append(html).removeClass('hidden');
    },
    closePrize: function () {
      var self = this;
      $('.prize').html('');
      $('.prize').addClass('hidden');
    }
}
