var over = {
    activityPeriods:'20170411',
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
        //self.showAlert();
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
            return false;
        });

        $over.on('touchstart', '.share', function() {
            self.showShare();
        });

        //手机号提交
        $phone.on('touchstart', '.phone_submit', function () {
            var url = 'http://testgwactivity.24k.hk:8098/unify-activity/activity/earnmoney/lottery',
                //url = '/api/yx/activity/earnmoney/lottery',
                url = './activity/earnmoney/lottery',
                phone = $.trim($('.phone_form .phone_num').val()),
                captcha = $.trim($('.phone_form .code_num').val()),
                status = '3',
                post = {activityPeriods:over.activityPeriods, status:status, phone:phone, captcha:captcha};
            $.post(url, post, function(res){
                if(res.ok && res.data.prize){
                    var type = res.data.prizeCode == 'CASH5YUAN' ? 1 : 2;
                    localStorage.setItem('phone', phone);
                    over.showPrize(type);
                }
            });
            return false;
        });

        // 发送验证码
        $phone.on('touchstart', '.code_btn', function () {
            var url = 'http://testgwactivity.24k.hk:8098/unify-activity/activity/sms/vericode',
                // url = '/api/yx/activity/sms/vericode',
                url = './activity/sms/vericode',
                phone = $.trim($('.phone_form .phone_num').val());
            if(phone == '' || $('.code_btn').attr('data-send') == '1'){
                return false;
            }

            $('.code_btn').attr('data-send', '1');
            $.post(url, {mobile:phone}, function(res){
                if(res.ok){
                    var timeDiff = 60,
                        sendCodeInterval = setInterval(function(){
                            if(timeDiff < 1){
                                $('.code_btn').html('验证码').css('background', '#5697fd');
                                clearInterval(sendCodeInterval);
                                $('.code_btn').attr('data-send', '0');
                            }else{
                                $('.code_btn').html('已发送('+timeDiff+'s)').css('background','#666');
                                timeDiff--;
                            }
                        }, 1000);
                }else{
                    $('.code_btn').attr('data-send', '0');
                }
            });
            return false;
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

        if (!localStorage.getItem('times') || localStorage.getItem('times') == "1") {
            self.showHistory = false;
            self.showAlert();
        } else {
            self.showHistory = true;
            if (localStorage.getItem('phone')) {
                //var url = '/api/yx/activity/earnmoney/maxYield',
                var url = './activity/earnmoney/maxYield',
                    phone = localStorage.getItem('phone'),
                    post = {activityPeriods: over.activityPeriods, phone:phone};
                $.post(url, post, function(res){
                    if(res.ok){
                        self.history = res.data.maxYield;
                        self.showAlert();
                    }
                });
            } else {
                //使用本地
                self.history = parseFloat(localStorage.getItem('income'));
                self.showAlert();
            }
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
        var html = '<div class="phone_content"> <div class="close_phone"></div> <div class="phone_form"> <div class="phone_form_item"> <input class="phone_num" type="text" name="mobile" maxlength="11" placeholder="请输入手机号码"> </div> <div class="phone_form_item"> <input class="code_num" type="text" name="captcha" maxlength="6" placeholder="请输入验证码"> <div class="code_btn">验证码</div> </div> </div> <div class="phone_submit">提交</div> </div>';

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
      var html = '<div id="content"> <div class="close_share"></div> <img src="./img/share_img.png" alt=""> <span class="share_txt"> 长按上方图片保存到您的手机相册中。请打开微信将该<br>图片发送给好友，或者分享朋友圈，即分享成功啦！ </span> </div>';

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
      axios.post('./activity/earnmoney/addShareCount', {
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
