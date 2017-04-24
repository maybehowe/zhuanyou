var kdata = [1169.15, 1189.45, 1142.35, 1145.7, 1156.56, 1153.96, 1168.11, 1166.01, 1167.21, 1175.91, 1173.47, 1175.64, 1180.2, 1172.55, 1168.97, 1166.01, 1167.21, 1178.91, 1182.56, 1180.2, 1172.55, 1170.58, 1155.48, 1158.49, 1159.61, 1163.85, 1158.33, 1156.87, 1149.88, 1145.73, 1141.81, 1156.56, 1153.96, 1168.11, 1166.01, 1167.21, 1178.91, 1182.56, 1171.36, 1183.07, 1193.84, 1188.96, 1173.76, 1172.06, 1177.98, 1170.88, 1170.34, 1174.48, 1171.11, 1160.86, 1162.83, 1158.72, 1143.8, 1159.59, 1163.91, 1180.86, 1173.14, 1181.4, 1188.42, 1192.02, 1195.87, 1197.92, 1203.19, 1214.77, 1212.85, 1190.05, 1185.06, 1183.07, 1193.84, 1188.96, 1173.76, 1172.06, 1177.98, 1170.88, 1170.34, 1174.48, 1171.11, 1160.86, 1162.83, 1159.5];
var ks = [
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false
];

var game = {
    tradeMode: 0, //0未交易  1做空   2做多
    counteId: null,
    index: 0,
    asset: 100000.0,
    coinShow: false,
    shengyu: kdata.length,
    buyPrice: 0,
    hand: 0,
    income: 0.0,
    isTrain: true,
    init: function() {
        var self = this;
        self.bindEvent();
    },
    bindEvent: function() {
        var self = this;
        var $over = $('.over'),
            $share = $('.shareto');
        $('.game_rule_wrap').on('touchmove', function(e) {
            // alert();
            // e.stopPropagation()
        });

        $('.game_rule').on('touchstart', function() {
            self.showGameRule();
        });

        $('.game_share').on('touchstart', function () {
            over.showShare();
        })

        $('.rule_close').on('touchstart', function() {
            self.hideGameRule();
        });

        $('.game_begin_btn').on('touchstart', function() {
            $(this).removeClass('btn');
            self.beginGame();
        });

        $('.game_close').on('touchstart', function() {
            self.closeGame();
        });

        $('.getin_btn').on('touchstart', function() {
            if (!$(this).hasClass('unable')) {
                self.getIn();
            }
        });

        $('.getout_btn').on('touchstart', function() {
            if (!$(this).hasClass('unable')) {
                self.getOut();
            }
        });

        $('.goon_btn').on('touchstart', function() {
            self.operationSelf();
        });

        $over.on('touchstart', '.err_cancel', function() {

          over.closeShowErr();
        });
        $over.on('touchstart', '.err_share_btn', function() {
          over.closeShowErr();
          over.showShare();
        });

        $share.on('touchstart', '.close_share', function() {

          over.closeShare();
        })
    },
    //显示游戏规则
    showGameRule: function() {
        var rule_html = '<div class="item"> <h3 style="color:#f00; text-align:center;">活动规则</h3> </div> <div class="item"> <span>活动时间:</span>待定 </div> <div class="item"> <span>参与条件:</span>所有客户 （现有客户可参与游戏，但不获得对应奖励） </div> <div class="item"> <span>交易有效期:</span>30个自然日 </div> <table> <tr> <th>奖励标准</th> <th>奖励</th> <th>获奖须知</th> </tr> <tr> <td>收益率10%以下</td> <td>加入培训课程机会</td> <td>--</td> </tr> <tr> <td>收益率10%以上</td> <td>微信红包</td> <td>添加专属客户经理</td> </tr> </table> <div class="item"> <span>规则说明:</span> <p>1. 每一个注册新用户ID仅能参与领取一次奖金，不能重复领取。</p> <p>2. 赚钱小游戏奖励只适用于金道贵金属的新注册用户，且从未属开立过真实交易账户的用户。在活动期间收益率在15%以上需添加专属客户经理的微信，在致电核实身份后进行发放。</p> <p>3. 每个用户每天最多只能参与三局游戏机会，当参与机会达到上限时通过分享一次即可增加 “再挑战一次机会”的参与机会。</p> <p>4. 当游戏结束之后,领奖方式按当前游戏收益率为领奖依据。</p> <p>5. 赚钱小游戏中的现有客户即可参与，老用户不享有此游戏红包奖励，但有获得直播间VIP特权一个月体验机会（可累计叠加）。</p> <p>6. 金道贵金属保留随时修订、暂停、终止本活动及任何相关规则条款之权利及其解释权。</p> <p>7. 红包每天限量500份</p> <p>8. 一经发现任何违规套取返利的行为，将不予返利、追回相关余额或者封停账号，且依法追究其法律责任。</p> </div>';

        $('.game_rule_content').html(rule_html);
        $('.game_rule_wrap').show();
    },
    //隐藏游戏规则
    hideGameRule: function() {
        $('.game_rule_wrap').hide();
    },
    //开始游戏
    beginGame: function() {
        var self = this;
        if (!localStorage.getItem("times") || localStorage.getItem("times") <= 3) {
            $('.game').show();
            self.startCount();
            // _gaq.push(['_trackEvent', 'game', 'start', 'content', 1, true]);
        } else {
            over.showErr();
        }

    },
    replayGame: function() {
        var self = this;
        self.closeGame();
        $('.game').hide();
    },
    //关闭游戏
    closeGame: function() {
        var self = this;
        $('.game').hide();
        $('.zichan').html('10000');
        $('.shouyi').html('0.00%');
        $('.cangwei').html('持仓');
        $('.sheng_k').html('80');

        $('.fang').html('');
        self.closeTip();
        self.hideCircle();
        clearInterval(self.counteId);
        $('.getin_btn').addClass('btn unable');
        $('.getout_btn').addClass('btn unable');

        self.shengyu = kdata.length;
        self.index = 0;
        self.isTrain = true;
        self.tradeMode = 0;
        self.counteId = null;
        self.asset = 100000.0;
        self.coinShow = false;
        self.buyPrice = 0;
        self.hand = 0;
        self.income = 0.0;
        self.isTrain = true;
    },
    //买入
    getIn: function() {
        var self = this;
        // _gaq.push(['_trackEvent', 'game', 'get_in', 'content2', 1, true]);
        //判断类型
        if (self.tradeMode == 0) {
            self.buyPrice = kdata[self.index - 1];
            self.hand = (kdata[self.index - 1] * 10);
            self.tradeMode = 2;
            self.unableGetin();
        } else if (self.tradeMode == 1) {
            self.hand = 0;
            //收益
            var inmoney = (self.buyPrice - kdata[self.index - 1]) * 400;
            //收益率
            self.income = (parseFloat(self.income) + (self.buyPrice - kdata[self.index - 1]) * 400 / 1000);
            self.buyPrice = 0;
            self.asset = parseFloat(self.asset + inmoney);
            self.tradeMode = 0;
            self.enableGetout();

            // this.coinShow = true;
            // setTimeout(() => {
            //     this.coinShow = false;
            // }, 1000);
        }
        $('.zichan').html(parseInt(self.asset));
        $('.shouyi').html(parseFloat(self.income).toFixed(2) + '%');
        $('.cangwei').html(self.hand == 0 ? '空仓' : '持仓');
        if (self.isTrain) {
            self.unableGetin();
            self.unbaleGetout();
            self.closeTip();
            self.hideCircle();
            self.startCount();
        }
    },
    //卖出
    getOut: function() {
        var self = this;
        // _gaq.push(['_trackEvent', 'game', 'get_out', 'content2', 1, true]);
        if (self.tradeMode == 0) {
            self.buyPrice = kdata[self.index - 1];
            self.hand = (kdata[self.index - 1] * 10);
            self.tradeMode = 1;
            self.unbaleGetout();
        } else if (self.tradeMode == 2) {
            self.hand = 0;
            //收益
            var inmoney = (kdata[self.index - 1] - self.buyPrice) * 400;
            //收益率
            self.income = (parseFloat(self.income) + (kdata[self.index - 1] - self.buyPrice) * 400 / 1000);
            self.buyPrice = 0;
            self.asset = parseFloat(self.asset + inmoney);
            self.tradeMode = 0;
            self.enableGetin();

            // this.coinShow = true;
            // setTimeout(() => {
            //   this.coinShow = false;
            // }, 1000);
        }
        $('.zichan').html(parseInt(self.asset));
        $('.shouyi').html(parseFloat(self.income).toFixed(2) + '%');
        $('.cangwei').html(self.hand == 0 ? '空仓' : '持仓');
        if (self.isTrain) {
            self.unableGetin();
            self.unbaleGetout();
            self.closeTip();
            self.hideCircle();
            self.startCount();
        }
    },
    //买入按钮动
    enableGetin: function(calm) {
        var self = this;
        $('.getin_btn').removeClass('unable');
        if (calm) {
            $('.getin_btn').removeClass('btn');
        }
    },
    unableGetin: function() {
        var self = this;
        $('.getin_btn').addClass('unable');
    },
    //卖出按钮动
    enableGetout: function(calm) {
        var self = this;
        $('.getout_btn').removeClass('unable');
        if (calm) {
            $('.getout_btn').removeClass('btn');
        }
    },
    unbaleGetout: function() {
        var self = this;
        $('.getout_btn').addClass('unable');
    },
    //显示收益硬币
    showCoin: function() {
        var self = this;

    },
    //弹提示框
    alertTip: function(type) {
        var self = this;
        var html = '';
        var buy = "<span style='color:#ff5c66;font-weight:bold;'>“买入”</span>",
            sell = "<span style='color:#ff5c66;font-weight:bold;'>“卖空”</span>";
        if (type == '1') {
            html = "上涨动能强劲，预计上涨趋势延续，此时" + buy + "，将有机会盈利";
        } else if (type == '2') {
            html = "行情出现高点，预期行情会跌，此时" + sell + "，将有机会盈利";
        } else if (type == '3') {
            html = "行情一路下跌，预期行情会继续下跌，此时" + sell + "，将有机会盈利"
        } else if (type == '4') {
            html = "行情出现反弹，预期行情会涨，此时" + buy + "，将有机会盈利";
        } else {
            html = "接下来会出现62段K线，将根据您的判断做" + buy + "或" + sell + "操作。"
            $('.goon_btn').show();
        }

        $('.tip_conent').html(html);
        $('.tip').show();
    },
    //关闭提示框
    closeTip: function() {
        $('.tip_conent').html('');
        $('.tip').hide();
        $('.goon_btn').hide();
    },
    //显示圆圈提示
    showCircle: function(type) {
        var self = this;
        var circlePos = [{
            left: 20.5 + '%',
            top: 49.5 + '%'
        }, {
            left: 29.5 + '%',
            top: 43.2 + '%'
        }, {
            left: 31 + '%',
            top: 43.1 + '%'
        }, {
            left: 38.2 + '%',
            top: 45.4 + '%'
        }];
        $('.circle').css(circlePos[type]).show();
    },
    //关闭圆圈提示
    hideCircle: function() {
        $('.circle').hide();
    },
    //开始计数
    startCount: function() {
        var self = this;
        self.counteId = setInterval(function() {
            self.shengyu--;
            var new_img = '<img src="./img/lzt_' + (self.index + 3) + '.png" />';
            $('.sheng_k').html(self.shengyu);
            $('.fang').append(new_img);
            if (self.index >= 46) {
                $('.fang img').eq(0).remove();
            }
            self.index++;
            // return;

            if (self.index == kdata.length) {
                //结束
                self.unbaleGetout();
                self.unableGetin();
                clearInterval(self.counteId);
                self.counteId = null;
                //判断盈利比例
                // this.$store.commit('commitIncome', this.income);
                if (localStorage.getItem('times')) {
                    localStorage.setItem('times', parseInt(localStorage.getItem('times')) + 1);
                    if (self.income > parseFloat(localStorage.getItem('income'))) {
                        localStorage.setItem('income', self.income);
                    }
                } else {
                    localStorage.setItem('times', 1);
                    localStorage.setItem('income', self.income);
                }
                over.init(20);
                // over.init(self.income);

            } else if (self.index == 6) {
                clearInterval(self.counteId);
                self.counteId = null;
                self.enableGetin();
                self.alertTip('1');
                self.showCircle('0');
                self.unbaleGetout();
            } else if (self.index == 11) {
                clearInterval(self.counteId);
                self.counteId = null;
                self.enableGetout();
                self.alertTip('2');
                self.showCircle('1');
                self.unableGetin();
            } else if (self.index == 12) {
                clearInterval(self.counteId);
                self.counteId = null;
                self.enableGetout();
                self.alertTip('3');
                self.showCircle('2');
                self.unableGetin();
            } else if (self.index == 16) {
                clearInterval(self.counteId);
                self.counteId = null;
                self.enableGetin();
                self.alertTip('4');
                self.showCircle('3');
                self.unbaleGetout();
            } else if (self.index == 18) {
                clearInterval(self.counteId);
                self.counteId = null;
                self.alertTip("continue");
            }
        }, 100)
    },
    operationSelf() {
        var self = this;
        self.startCount();
        self.closeTip();
        self.isTrain = false;
        self.buyPrice = 0;
        self.asset = 100000.0;
        self.tradeMode = 0;
        self.income = 0.0;
        self.enableGetin(true);
        self.enableGetout(true);
        // _gaq.push(['_trackEvent', 'game', 'continue', 'content', 1, true]);
    }
};

game.init();
