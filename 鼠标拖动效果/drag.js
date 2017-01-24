function getByClass(className,parent) {
	var oParent=parent?document.getElementById(parent):document,
	eles=[],
	elements=oParent.getElementsByTagName('*');
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].className==className){
			eles.push(elements[i]);
		}
	}
	return eles;
}

window.onload = drag;

function drag() {
	var oTitle = getByClass('text','things')[0];
	oTitle.onmousedown = fnDown;
	oTitle.onmouseup = function(){  
            document.onmousemove = null;  
        }
}

function fnDown() {
	var oDrag = document.getElementById('things'),
	disX = event.clientX-oDrag.offsetLeft,
	disY = event.clientY-oDrag.offsetTop;
	document.onmousemove=function(event) {
		event = event||window.event;
		move(event,disX,disY);
	}

}

function move(event,disX,disY) {
	var oDrag = document.getElementById('things'),
	l = event.clientX-disX,
	t = event.clientY-disY,
	winWidth = document.documentElement.clientWidth || document.body.clientWidth,
	winHeight = document.documentElement.clientHeight || document.body.clientHeight,
	maxW= winWidth-oDrag.offsetWidth,
	maxH = winHeight-oDrag.offsetHeight;
	if (l<0) {
		l = 0;
	}else if(l>maxW){
		l = maxW;
	}
	if (t<0) {
		t = 0;
	}else if (t>maxH) {
		t = maxH;
	}
	oDrag.style.left = l+'px';
	oDrag.style.top = t+'px';
}