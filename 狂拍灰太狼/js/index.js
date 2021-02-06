$(function (){
   //1.监听游戏规则的点击
    $(".rules").click(function (){
        $(".rule").stop().fadeIn(100);
    })

   //2.监听关闭按钮的点击
    $(".close").click(function (){
        $(".rule").stop().fadeOut(100);
    })
    //监听开始游戏按钮的点击
    $(".start").click(function (){
        $(this).stop().fadeOut(100);
        //调用处理进度条的方法
        progressHandler();
        //调用处理灰太狼动画的方法
        startWolfAnimation();
    });
    //4.监听重新开始按钮的点击
    $(".reStart").click(function (){
        $(".mask").stop().fadeOut(100);
        progressHandler();
        //调用处理灰太狼动画的方法
        startWolfAnimation();
    });

    //定义一个专门处理进度条的方法
    function  progressHandler(){
        //重新设置进度条的宽度
        $(".progress").css({
           width: 180
        });

        //开启定时器处理进度条
        var timer=setInterval(function (){
            //拿到进度条当前的宽度
            var progressWidth=$(".progress").width();
            //减小当前的宽度
            progressWidth-=1;
            //重新给进度条赋值宽度
            $(".progress").css({
                width:progressWidth
            });
            //监听进度条是否走完
            if(progressWidth<=0){
                //关闭定时器
                clearInterval(timer);
                //显示重新开始界面
                $(".mask").stop().fadeIn(100);
                //停止灰太狼的动画
                stopWolfAnimation();

            }
        },100);
    }
    var wolfTimer;
    //定义一个专门处理灰太狼的方法
    function startWolfAnimation(){
        //1.定义两个数组保存所有灰太狼和小灰灰图片
        var wolf_1=['./灰太狼_images/h0.png','./灰太狼_images/h1.png','./灰太狼_images/h2.png','./灰太狼_images/h3.png','./灰太狼_images/h4.png','./灰太狼_images/h5.png','./灰太狼_images/h6.png','./灰太狼_images/h7.png','./灰太狼_images/h8.png','./灰太狼_images/h9.png'];
        var wolf_2=['./灰太狼_images/x0.png','./灰太狼_images/x1.png','./灰太狼_images/x2.png','./灰太狼_images/x3.png','./灰太狼_images/x4.png','./灰太狼_images/x5.png','./灰太狼_images/x6.png','./灰太狼_images/x7.png','./灰太狼_images/x8.png','./灰太狼_images/x9.png'];
        //2.定义一个数组保存所有可能出现的位置
        var arrPos=[
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];

        //3.创建一个图片
        var $wolfImage=$("<img src='' class='wolfImage'>");
        //随机获取图片的位置
        var posIndex=Math.round(Math.random()*8);
        //4.设置图片的位置
        $wolfImage.css({
            position:"absolute",
            left:arrPos[posIndex].left,
            top:arrPos[posIndex].top
        });
        //随机获取数组类型
        var wolfType=Math.round(Math.random())===0?wolf_1:wolf_2;
        //5.设置图片的内容
        window.wolfIndex=0;
        window.wolfIndexEnd=5;
        wolfTimer=setInterval(function (){
            if(wolfIndex>wolfIndexEnd){
                $wolfImage.remove();
                clearInterval(wolfTimer);
                startWolfAnimation();
            }
            $wolfImage.attr("src",wolfType[wolfIndex]);
            wolfIndex++;
        },300);
        //6.将图片添加到界面上
        $(".container").append($wolfImage);

        //7.调用处理游戏规则的方法
        gameRules($wolfImage);

    }
    function stopWolfAnimation(){

        $(".wolfImage").remove();
        clearInterval(wolfTimer);
    }
    function gameRules($wolfImage){
        $wolfImage.one("click",function (){
            //修改索引
            window.wolfIndex=5;
            window.wolfIndexEnd=9;

            //拿到当前点击图片地址
          var $src=$(this).attr("src");
          //根据图片地址判断是否是灰太狼
            var flag=$src.indexOf("h")>=0;
          //根据点击的图片类型增减分数
            if(flag){
                //+10
               $(".score").text( parseInt($(".score").text())+10);
            }else{
                //-10
                $(".score").text( parseInt($(".score").text())-10);
            }
        });
    }

    /*
    0
    0.1 *8=0
    0.2 *8=1.6
    0.3 *8=2.4
    0.4
    0.5
    0.6
    0.7
    0.8
    0.9
    1
     */

});