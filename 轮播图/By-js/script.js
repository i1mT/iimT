var imgList = $(".img"),
	imgs = $(".img img"),
	panel = $(".panel"),
	SumHeight = 4*360,
	CurImgIndex = 1,
	next,
	speed = 10,
	target = 0,
	timer,
	CloneImg = imgs.clone(),
	DirectBtn = $(".direct button"),
	BottomBarBtn = $(".bottom-bar-con button"),
	direction = 1 ,//1 = 纵向 2 = 横向
	moveMethod = "top",//默认纵向
	target = -360,
	moveTimer,
	DotBtn = $("li"),
	delayTime = 2000,
	bottomBar = $(".bottom-bar");
$(DotBtn[0]).css('background', '#7CCD7C');
// CloneImg.appendTo('.img');

startMove();
function BottomBarToggle(state) {
	if (state) {
		bottomBar.css("top")==360? null:move(bottomBar,"top",360,speed/2);
		panel.on('mouseenter',function(event) {
			event.preventDefault();
			move(bottomBar,"top",310,5);
		});
		panel.on('mouseleave',function(event) {
			event.preventDefault();
			move(bottomBar,"top",360,5);
		});
	}else{
		bottomBar.css("top")==310? null:move(bottomBar,"top",310,speed/2);
		panel.unbind();
	}
}

BottomBarBtn.on('click',function(event) {
	if (this.innerHTML=="固 定") {
		BottomBarBtn[1].className = "";
		BottomBarBtn[0].className = "active";
		BottomBarToggle(false);
	}else if (this.innerHTML=="自 动") {
		BottomBarBtn[0].className = "";
		BottomBarBtn[1].className = "active";
		BottomBarToggle(true);
	}
});

DirectBtn.bind('click',function(event) {
	clearInterval(imgList.timer);
	clearInterval(moveTimer);
	if (this.innerHTML=="纵 向" && direction==2) {//当前是横向 点击了纵向
		imgList.css('width', '640px');
		moveMethod = "top";
		target = -360;
		//改变按钮颜色
		DirectBtn[1].className = "";
		DirectBtn[0].className = "active";
		direction = 1;
		delayTime = 2000;
		speed = 10;
	}else if (this.innerHTML=="横 向" && direction==1) {//当前是纵向 点击了横向
		imgList.css('width', '1280px');
		moveMethod = "left";
		target = -640;
		//改变按钮颜色
		DirectBtn[1].className = "active";
		DirectBtn[0].className = "";
		direction = 2;
		delayTime = 2500;
		speed = 16;
	}
	imgList.css({
		top: '0',
		left: '0'
	});
	startMove();
});

DotBtn.on('mouseenter',function(event) {
	event.preventDefault();
	clearInterval(imgList.timer);
	clearInterval(moveTimer);
	var curIndex = parseInt($(this).html());
	CurImgIndex = curIndex;
	next = CurImgIndex+1 > 5? 1 : CurImgIndex+1;
	changeImg();
	changeDotBac(CurImgIndex);
});

DotBtn.on('mouseleave',function(event) {
	event.preventDefault();
	startMove();
});

function changeDotBac(CurImgIndex){
	DotBtn.css('background', '#999');
	$tihs = $(DotBtn[CurImgIndex-1]);
	$tihs.css('background', '#7CCD7C');
}

function changeImg(){
	var src = "../images/"+ CurImgIndex +".jpg";
	imgs[0].remove;
	imgs[0].src = src;
	imgList.css(moveMethod, '0px');
	imgs[1].src = "../images/"+ next +".jpg";
}

function startMove () {
	moveTimer = setInterval(function (){
		imgs = $(".img img");
		move(imgList,moveMethod,target,speed,function () {
				CurImgIndex++;
				if (CurImgIndex>5) {CurImgIndex = 1;}
				next = CurImgIndex+1 > 5? 1 : CurImgIndex+1;
				changeImg();
				changeDotBac(CurImgIndex);
		});
	},delayTime);
}


function move(obj,attr,target,speed,fn){
	var att = parseInt(obj.css(attr));
	var dir = att<target;
	speed = dir? speed:-1*speed;//增大dir为true  减小dir为false
	if (obj.timer){
		clearInterval(obj.timer);
	}
	obj.timer = setInterval(function (){
		if (att==target ){
			obj.css(attr,att+"px");
			if (fn) {
			 	fn();
			 }
			clearInterval(obj.timer);
		}else{
			obj.css(attr,att+"px");
			att += speed;
			if (dir&&att>target) {att=target;}
			else if (!dir&&att<target) {att=target;}
		}
	},25);
}