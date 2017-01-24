var playIndex=0;
window.onload = function(){
  var oTegMethod = document.getElementsByClassName("radio");
  var TegMethod = oTegMethod[0].getElementsByTagName("input");
/*
初始化页面 默认为鼠标滑过切换 默认标签1处于打开状态
*/
  var oTab = document.getElementsByClassName("tab");//获取所有的tab 影藏id不为ontab的
  hiddenNodeById(oTab,"ontab"); //隐藏id不为ontab的元素
  showFirst(playIndex);
  createTab(playIndex);
/*
初始化页面完成
*/
/*
对四个按钮添加点击事件并切换Tab类型
*/
  function changeTab(event){ //故意用事件委托机制写的 以后的li点击也这样写
    var e = event || window.event;
    var src = event.target || event.srcElement;
    for(var s in TegMethod){
      if(TegMethod[s] == src){
        playIndex = parseInt(s); break;
      }
    }
    console.log(playIndex);
    hiddenNodeByIndex(oTab,playIndex);
    showFirst(playIndex);
    createTab(playIndex);
  }
/*委托方法完成*/
/*
实现一个传入对象数组，id 将其他隐藏 特殊id显示的方法
*/
function hiddenNodeById(obj,id){
  for(var s=0;s<obj.length;s++){
    if(obj[s].id!=id) obj[s].style.display='none';
  }
}
/*
实现一个 传入i对象数组 index 隐藏其他，只显示index所在索引的方法
*/
function hiddenNodeByIndex(obj,index){
  for(var i=0;i<obj.length;i++){
    if(i==parseInt(index)) obj[i].style.display='block';
    else obj[i].style.display='none';
  }
}
/*
实现传入该索引，给该索引下的tab标签创建tab
*/
var conIndex = 0;
var time;
function createTab(index){
  conIndex=0;
  var oTits = oTab[index].getElementsByClassName("tab-tit");
  var ol =
  setBottom(oTits,conIndex);
  var tits = oTab[index].getElementsByClassName("tits")[0]; //获取到tab的标题栏，做事件委托机制
  var content = oTab[index].getElementsByClassName("content");
  //setBottom(oTits,conIndex);
  switch(index){//四种不同的切换方法
    case 0: tits.onmouseover = changeCon;break;
    case 1: tits.onclick = changeCon;break;
    case 2: autoTog();break;
    case 3: mixTab();break;
  }
  function changeCon(event){
    var e = event || window.event;
    var src = e.srcElement || e.target;
    for(var s in oTits){
      if(oTits[s] == src){
        conIndex = parseInt(s); break;
      }
    }
    setBottom(oTits,conIndex);
    hiddenNodeByIndex(content,conIndex);
  }
  function autoTog(){
    var i=0;
    var index=playIndex;
    hiddenNodeByIndex(content,i);
    setBottom(oTits,i);
    clearInterval(time);
    time = setInterval(function(){
      i++;
      if(i==4){
        i=0;
      }
      if(index!=playIndex){
        clearInterval(time);
      }
      hiddenNodeByIndex(content,i);
      setBottom(oTits,i);
    },2000);
  }
  function mixTab(){
    clearInterval(time);
    var i=0,state=1;
    var index=playIndex;
    hiddenNodeByIndex(content,i);
    setBottom(oTits,i);
    timer(i);
    function timer(){
       time = setInterval(function(){
       i++;
       if(i==4){
         i=0;
       }
       if(index!=playIndex){
         clearInterval(time);
       }
        hiddenNodeByIndex(content,i);
        setBottom(oTits,i);
        // console.log("state="+i);
      },1500);
    }
    tits.onmouseover=function(){
      clearInterval(time);
      changeCon();
    };
    tits.onmouseout=function(){
      timer();
    };
    for(var t=0;t<oTits.length;t++){
      oTits[t].index=t;
      oTits[t].onmouseout = function(){
        i = this.index;
        console.log(i);
      };
    }
  }
  function setBottom(o,i){
    for(var s=0;s<o.length;s++){
      if(s == i) o[i].style.borderBottom = '5px solid #eec900';
      else o[s].style.borderBottom = '5px solid #C6E2FF';
    }
  }
}
/*
传入index，只显示此index所指Tab下的第一个
*/
function showFirst(index){
  var oCon = oTab[index].getElementsByClassName("content");
  for(var i=1;i<oCon.length;i++){
    oCon[i].style.display = 'none';
  }
  oCon[0].style.display = 'block';
}

  oTegMethod[0].onclick = changeTab;
};
/*
绑定完成
*/
