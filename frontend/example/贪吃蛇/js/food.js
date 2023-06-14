//自调用函数 --开启一个新的作用域 避免命名冲突
(function () {
var position='absolute';
var elements=[];

function Food(options){
	options=options||{};
	this.x=options.x||0;
	this.y=options.y||0;
	this.width=options.width||20;
	this.height=options.height||20;
	this.color=options.color||'green';
}

Food.prototype.render=function(map) {
	//删除之前的食物	
	removeFood();
	var div=document.createElement('div');
	map.appendChild(div);
	elements.push(div);

    this.x=Tools.getRandom(0,map.offsetWidth/this.width-1)*this.width;
	this.y=Tools.getRandom(0,map.offsetHeight/this.height-1)*this.height;
	div.style.left=this.x+'px';
	div.style.top=this.y+'px';

	div.style.position=position;	
	div.style.width=this.width+'px';
	div.style.height=this.height+'px';
	div.style.backgroundColor=this.color;	
}

function removeFood(){
	for(var i=elements.length-1;i>=0;i--)
	{
		elements[i].parentNode.removeChild(elements[i]);
		//第一个参数从哪个元素开始删除 第二个参数删除几个元素
	    elements.splice(i,1);
	}
}
// 把Food构造函数 让外部可以访问
window.Food=Food;
})()









