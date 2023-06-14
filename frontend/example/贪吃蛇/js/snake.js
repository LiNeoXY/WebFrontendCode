(function (){
var position='absolute';
var elements=[];

	function Snake(options){
		//蛇节 的大小
		options=options||{};
		this.width=options.width||20;
	    this.height=options.height||20;
	    //蛇移动的方向
	    this.direction=options.direction||'right';
	    //蛇的身体(蛇节)
	    this.body=[
	    	{x:3,y:2,color:'red'},
	    	{x:2,y:2,color:'blue'},
	    	{x:1,y:2,color:'blue'}
	    	];
	    } 

	Snake.prototype.render=function(map){
	    //删除之前的蛇	
	    removeSnake();

		//把每一个蛇节渲染到地图上 
		for(var i=0;i<this.body.length;i++)
		{
			var object=this.body[i];
			var div=document.createElement('div');
			map.appendChild(div);
			div.style.position=position;
			div.style.width=this.width+'px';
	        div.style.height=this.height+'px';
	        div.style.left=object.x*this.width+'px';
	        div.style.top=object.y*this.height+'px';
	        div.style.backgroundColor=object.color;	
	        elements.push(div);
		}
	}

	function removeSnake(){
	for(var i=elements.length-1;i>=0;i--)
	{
		elements[i].parentNode.removeChild(elements[i]);
		//第一个参数从哪个元素开始删除 第二个参数删除几个元素
	    elements.splice(i,1);
	}

	Snake.prototype.move=function(food,map){
		// 控制蛇的身体移动（当前蛇节 到 上一个蛇节的位置）

		var head=this.body[0];

		for(var i=this.body.length-1;i>0;i--){
			this.body[i].x=this.body[i-1].x;
			this.body[i].y=this.body[i-1].y;
		}
		switch(this.direction){
		case 'right':
			head.x+=1;
			break;
		case 'left':
			head.x-=1;
			break;
		case 'top':
			head.y-=1;
			break;
		case 'bottom':
			head.y+=1;
			break;
		}

		//判断蛇头是否和食物的坐标重合
		var headX=head.x*this.width;
		var headY=head.y*this.height;
		if(headX===food.x&&headY===food.y){
			var last = this.body[this.body.length - 1];
			this.body.push({
				x:last.x,
				y:last.y,
				color:last.color
			})
			food.render(map);
		}
	}
}
// 把Snake构造函数 让外部可以访问
window.Snake=Snake;
})()