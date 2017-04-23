var wrap = $('#wrap');

var ww = window.innerWidth;
var wh = window.innerHeight;
var sec = $('.pageWrap'),
  canswipe = ww*0.1,
  hadDown = false;

$('body').css({
  'width':ww+'px',
  'height':wh+'px'
});


var img = $('img');
var imglen = img.length;
for(var i = 0; i < imglen; i++){
  img.eq(i).attr('src',img.eq(i).attr('data'));
}
//调整画布的位置和大小
changeScene();



window.onresize = function(){
  canswipe = ww*0.1;
  //调整画布的位置和大小
  changeScene();
}

function changeScene(){
  var iniW = 1000,
    iniH = 640,
    tarW = 0,
    tarH = 0;
  ww = window.innerWidth;
  wh = window.innerHeight;


  if(ww > wh){    //如果浏览器的宽度大于高度，说明是横屏的，画布的宽度 == 浏览器的宽度
    // console.log('浏览器的宽度大于高度');
    tarW = ww;
    tarH = tarW*iniH/iniW;
    $('body').css({
      'width':ww+'px',
      'height':wh+'px'
    });

    wrap.css({
      'width':ww + 'px',
      'height':wh + 'px',
      'transform':'translate3d(-50%,-50%,0)',
      '-webkit-transform':'translate3d(-50%,-50%,0)'
    });


    // sec.bind('touchstart',function(){

    //  var touch = event.targetTouches[0];
    //  startX = touch.pageX;

    //  moveX = 0;
    //  hadDown = true;
    // });

    // sec.bind('touchmove',function(){
    //  if(hadDown == true){
    //      event.preventDefault();                   //不同的浏览器，阻止浏览器默认事件方法不同

    //    var touch = event.touches[0];
    //    endX = touch.pageX;

    //    moveX = endX - startX;
    //  }


    // });

    // sec.bind('touchend',function(){
    //  hadDown = false;
    //  if(moveX < -1*canswipe && $(this).index() != sec.length - 1){
    //    $(this).css({
    //      'transform':'translate3d(-100%,0,0)',
    //      '-webkit-transform':'translate3d(-100%,0,0)'
    //    });

    //    $(this).next().css({
    //      'transform':'translate3d(0,0,0)',
    //      '-webkit-transform':'translate3d(0,0,0)'
    //    });


    //    var thisindex = $(this).index();
    //    setTimeout(function(){
    //      console.log('this = '+thisindex);
    //      sec.eq(thisindex).find('div').css('display','none');
    //      sec.eq(thisindex+1).find('div').css('display','block');
    //    },1000);


    //  }else if(moveX > canswipe && $(this).index() != 0){
    //    $(this).css({
    //      'transform':'translate3d(100%,0,0)',
    //      '-webkit-transform':'translate3d(100%,0,0)'
    //    });

    //    $(this).prev().css({
    //      'transform':'translate3d(0,0,0)',
    //      '-webkit-transform':'translate3d(0,0,0)'
    //    });

    //    var thisindex = $(this).index();
    //    setTimeout(function(){
    //      console.log('this = '+thisindex);
    //      sec.eq(thisindex).find('div').css('display','none');
    //      sec.eq(thisindex-1).find('div').css('display','block');
    //    },1000);
    //  }
    // });



  }else if(ww <= wh){ //如果浏览器的宽度小于高度，说明是竖的，画布的宽度 == 浏览器的高度
    // console.log('浏览器的宽度小于高度');
    tarW = wh;
    tarH = tarW*iniH/iniW;

    $('body').css({
      'width':ww+'px',
      'height':wh+'px'
    });


    wrap.css({
      'width':wh + 'px',
      'height':ww + 'px',
      'transform':'translate3d(-50%,-50%,0) rotate(90deg)',
      '-webkit-transform':'translate3d(-50%,-50%,0) rotate(90deg)'
    });

    // sec.bind('touchstart',function(){

    //  var touch = event.targetTouches[0];
    //  startX = touch.pageY;

    //  moveX = 0;
    //  hadDown = true;
    // });

    // sec.bind('touchmove',function(){
    //  if(hadDown == true){
    //      event.preventDefault();                   //不同的浏览器，阻止浏览器默认事件方法不同

    //    var touch = event.touches[0];
    //    endX = touch.pageY;

    //    moveX = endX - startX;
    //  }


    // });

    // sec.bind('touchend',function(){
    //  hadDown = false;
    //  if(moveX < -1*canswipe && $(this).index() != sec.length - 1){

    //    $(this).css({
    //      'transform':'translate3d(-100%,0,0)',
    //      '-webkit-transform':'translate3d(-100%,0,0)'
    //    });

    //    $(this).next().css({
    //      'transform':'translate3d(0,0,0)',
    //      '-webkit-transform':'translate3d(0,0,0)'
    //    });

    //    var thisindex = $(this).index();
    //    setTimeout(function(){
    //      console.log('this = '+thisindex);
    //      sec.eq(thisindex).find('div').css('display','none');
    //      sec.eq(thisindex+1).find('div').css('display','block');
    //    },1000);


    //  }else if(moveX > canswipe && $(this).index() != 0){
    //    $(this).css({
    //      'transform':'translate3d(100%,0,0)',
    //      '-webkit-transform':'translate3d(100%,0,0)'
    //    });

    //    $(this).prev().css({
    //      'transform':'translate3d(0,0,0)',
    //      '-webkit-transform':'translate3d(0,0,0)'
    //    });

    //    var thisindex = $(this).index();
    //    setTimeout(function(){
    //      console.log('this = '+thisindex);
    //      sec.eq(thisindex).find('div').css('display','none');
    //      sec.eq(thisindex-1).find('div').css('display','block');
    //    },1000);
    //  }
    // });


  }

}