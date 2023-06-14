;(function(window, undefined){
	var Tools={
	getRandom:function(min,max){
		return Math.floor(Math.random() * (max - min + 1)) +  min;
	}
}
window.Tools=Tools;
})(window, undefined)

//自调用函数 --开启一个新的作用域 避免命名冲突
;(function (window, undefined) {
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
})(window, undefined)

;(function (window, undefined){
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
})(window, undefined)

;(function (window, undefined){
	var that;  // 记录游戏对象
	function Game(map){
		this.food=new Food();
		this.snake=new Snake();
		this.map=map;
		that=this;
	}

	Game.prototype.start=function(){
		this.food.render(this.map);
		this.snake.render(this.map);
		runSnake();
		binKey();
	}

	//通过键盘控制蛇移动的方向
	function binKey(){
		// document.onkeydown = function () {};
		document.addEventListener('keydown',function(e){
        // 37 - left
        // 38 - top
        // 39 - right
        // 40 - bottom
			switch(e.keyCode){
			case 37:
				this.snake.direction='left';
				break;
			case 38:
				this.snake.direction='top';
				break;
			case 39:
				this.snake.direction='right';
				break;
			case 40:
				this.snake.direction='bottom';
				break;
			}
		}.bind(that),false)
	}

	function runSnake(){
		var timeId=setInterval(function(){
			//在定时器的function中this是指向window对象的
			//要获取游戏对象中的蛇属性
			that.snake.move(that.food,that.map);
			that.snake.render(that.map);

			var maxX=that.map.offsetWidth/that.snake.width;
			var maxY=that.map.offsetHeight/that.snake.height;
			var haedX=that.snake.body[0].x;
			var haedY=that.snake.body[0].y;
			if(haedX<0||haedX>=maxX){
				alert('Game Over');
				clearInterval(timeId);
			}

			if(haedY<0||haedY>=maxY){
				alert('Game Over');
				clearInterval(timeId);
			}
		},150)
	}
	window.Game=Game;
})(window, undefined)


;(function (window, undefined) {
  var map = document.getElementById('map');
  var game = new Game(map);
  game.start();
})(window, undefined);











