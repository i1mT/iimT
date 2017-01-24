/*用原生JS写getByClassName()*/

function getByClassName(obj,cls){//传入父元素和className
	var elements = obj.getElementsByTagName('*');//获取obj下所有节点
	var result = [];
	for (var i = elements.length - 1; i >= 0; i--) {
		if(elements[i].className == cls){
			result.push(elements[i]);
		}
	}
	return result;
}
