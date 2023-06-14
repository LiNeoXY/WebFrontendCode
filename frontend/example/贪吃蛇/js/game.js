(function (){
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
})();