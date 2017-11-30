$(function(){
	init_data();
	link_socket();
	initGame();
	initBtn();
});
function initBtn(){
	var colors = ['black',//btn_black
	'#7F7F7F',//btn_grey
	'#880015',//btn_dark_red
	'#ED1C24',//btn_red
	'#FF7F27',//btn_orange
	'#FFF200',//btn_yellow
	'#22B14C',//btn_green
	'#00A2E8',//btn_blue
	'#3F48CC',//btn_dark_blue
	'#A349A4'//btn_purple
	]
	console.log('初始化按钮');
	$control_btn = $('.control_btn');
	$.each($control_btn, function(index) {
		$control_btn[index].onclick=function(){
			if(index==10){
				var draw_data = {};
				draw_data.setValidate = true;
				if(game.ws){
				console.log('发出清空命令道服务器');
				game.ws.send(JSON.stringify(draw_data));
			}
			}
			game.ctx.strokeStyle= colors[index];
		};
	});
}
function init_data(){
	//变量优化
	game ={
		canDraw:false, //can draw or not
		setValidate:false,
		$canvas:$('#drawing-pad'),//画布
		ctx : null,//画笔
		startX:0,//起笔x
		startY:0,//起笔y
		endX:0,//落笔x
		endY:0,//落笔y
		ws:null//socket
	};
	//方法优化--定义抽象方法
	game.startDraw = function(){};
	game.draw = function(){};
	game.stopDraw = function(){};
	game.drawLine = function(){};
}
function initGame(){
	game.ctx = game.$canvas.get(0).getContext('2d');
	game.drawLine = function(x1,y1,x2,y2,color){
		this.ctx.beginPath();{
			this.ctx.strokeStyle= color;
			this.ctx.lineWidth = 2;
			this.ctx.moveTo(x1,y1);
			this.ctx.lineTo(x2,y2);
		}this.ctx.closePath();
		this.ctx.stroke();
	}
	game.startDraw= function(e){
		this.canDraw=true;
		this.startX = e.offsetX;
		this.startY = e.offsetY;
	}
	game.draw = function(e){
		if(this.canDraw&&this.ctx){//ctx不为空
			console.log('canDraw'+e.type);
			if(e.type=='touchmove'){
				e.preventDefault();
				console.log('this.$canvas.pageX:'+this.$canvas.pageX);
				this.endX =e.targetTouches[0].pageX-this.$canvas.offset().left;//e.touches[0].pageX-this.$canvas.pageX;
				this.endY = e.targetTouches[0].pageY-this.$canvas.offset().top;
			}else{
				this.endX = e.offsetX;
				this.endY = e.offsetY;
			}
			
//			this.drawLine(
//				this.startX,
//				this.startY,
//				this.endX,
//				this.endY
//			);
			var draw_data={};
				draw_data.startX = this.startX;
				draw_data.startY = this.startY;
				draw_data.endX = this.endX;
				draw_data.endY = this.endY;
				draw_data.color = this.ctx.strokeStyle;
			console.log('把draw_data 发送到服务器：game.ws'+game.ws);
			if(game.ws){
				console.log('把draw_data 发送到服务器');
				game.ws.send(JSON.stringify(draw_data));
			}
			//重置画笔
			this.startX = this.endX;
			this.startY = this.endY;
		}
	}
	game.stopDraw = function(){
		this.canDraw=false;
	};
	game.$canvas.mousedown(function(e){//鼠标按下--开始
		game.startDraw(e);
	}).mousemove(function(e){//鼠标移动--画
//		console.log('mousedown');
		game.draw(e);
//		game.drawLine(e.offsetX,e.offsetY,e.offsetX+0.1,e.offsetY+0.1);
	}).mouseup(function(e){//鼠标松开--结束
		console.log('mouseup');
		game.stopDraw(e);
	}).mouseout(function(){
		console.log('mouseout');
		game.stopDraw();
	});
	game.$canvas.bind({
		'touchstart':function(e){
			console.log('touchstart');
			game.startDraw(e);
		},
		'touchmove':function(e){
			game.draw(e);
		},
		'touchend':function(e){
			console.log('touchend');
			game.stopDraw(e);
		},
		'touchcancel':function(e){
			console.log('touchcancel');
			game.stopDraw(e);
		}
	});
}
function link_socket() {
	console.log('Window:' + Window);
	if(window.WebSocket = window.WebSocket || window.MozWebSocket) {
		//			if('webSocket' in Window){
		console.log('该浏览器支持socket');
		game.ws = new WebSocket('ws://127.0.0.1:8999');
		game.ws.onopen = function() {
			console.log('onopen ws://127.0.0.1:8999');
		}
		game.ws.onclose = function() {
			console.log('onclose ws://127.0.0.1:8999');
		}
		game.ws.onerror = function() {
			console.log('onerror ws://127.0.0.1:8999');
		}
		game.ws.onmessage = function(msg) {
			console.log('onmessage ws://127.0.0.1:8999');
			console.log('onmessage msg:'+msg.data);
			var data =JSON.parse(msg.data);
			if(data.setValidate){
				console.log('clear');
				game.ctx.clearRect(0,0,500,400);
			}else{
				game.drawLine(
					data.startX,
					data.startY,
					data.endX,
					data.endY,
					data.color
				);
			}
			
		}
	} else {
		console.log('没有socket');
	}
}