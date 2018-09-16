var body = document.querySelector("body");
var canvas = document.querySelector("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var ctx = canvas.getContext('2d');
var last_position = {
	offsetX: undefined,
	offsetY: undefined
}
var draw_begin = false;
var canvas_leave = false;
canvas.onmouseenter = function(){
	if (canvas_leave) {
		draw_begin = false;
	}
}
canvas.onmouseleave = function(){
	canvas_leave = true;
}
body.onmouseup = function(){
	if (canvas_leave) {
		draw_begin = false;
	}
}
body.onmouseleave = function(){
	draw_begin = false;
}
canvas.onmousedown = function(evt){
	if (evt.which == 1) {
		draw_begin = true;
		last_position.offsetX = evt.offsetX + 3;
		last_position.offsetY = evt.offsetY + 27 ;
	}
}
canvas.onmousemove = function(evt){
	if (draw_begin) {
		var canvas = document.querySelector("canvas");
		var color = document.querySelector(".color");
		var new_position = {
			offsetX: evt.offsetX + 3,
			offsetY: evt.offsetY + 27
		};
		ctx.beginPath();
		ctx.moveTo(last_position.offsetX, last_position.offsetY);
	    ctx.lineTo(new_position.offsetX, new_position.offsetY);
	    ctx.closePath();
	    switch(canvas.className){
	    	case "pencil": {
	    		ctx.lineWidth = 2;
	    		drow();
	    	}; break;
	    	case "pen": {
	    		ctx.lineWidth = 4;
	    		drow();
	    	}; break;
	    	case "brush": {
	    		ctx.lineWidth = 6;
	    		drow();
	    	}; break;
	    	case "eraser": {
	    		ctx.clearRect(new_position.offsetX -10, new_position.offsetY - 10, 20,20);

	    	}; break;
	    	default: {
	    		ctx.lineWidth = 2;
	    		drow();
	    	}
	    }
	    function drow(){
			ctx.strokeStyle = color.value;
	    	ctx.stroke();
	    }
	    last_position = new_position;
	}
}
canvas.onmouseup = function(evt){
	draw_begin = false;
}


changeCanvas();
function changeCanvas(){
	window.onresize = function(){
		var canvas = document.querySelector("canvas");
		var data_url = canvas.toDataURL();
	    canvas.width = document.documentElement.clientWidth;
    	canvas.height = document.documentElement.clientHeight;
		var image = new Image();
	 	image.src = data_url;
		image.onload = function(){
			ctx.drawImage(image, 0 ,0);
		}
	}
}
selectTool();
function selectTool(){
	var canvas = document.querySelector("canvas");
	var color = document.querySelector(".color");
	var pencil = document.querySelector(".pencil");
	var pen = document.querySelector(".pen");
	var brush = document.querySelector(".brush");
	var eraser = document.querySelector(".eraser");
	var reset = document.querySelector(".reset");
	var download = document.querySelector(".download");
	pencil.onclick = function(){
		changeCanvasClassName("pencil");
		pencil.classList.add('active');
		pen.classList.remove('active');
		brush.classList.remove('active');
		eraser.classList.remove('active');
	}
	pen.onclick = function(){
		changeCanvasClassName("pen");
		pen.classList.add('active');
		pencil.classList.remove('active');
		brush.classList.remove('active');
		eraser.classList.remove('active');
	}
	brush.onclick = function(){
		changeCanvasClassName("brush");
		brush.classList.add('active');
		pencil.classList.remove('active');
		pen.classList.remove('active');
		eraser.classList.remove('active');
	}
	eraser.onclick = function(){
		changeCanvasClassName("eraser");
		eraser.classList.add('active');
		pencil.classList.remove('active');
		brush.classList.remove('active');
		pen.classList.remove('active');
	};
	reset.onclick = function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	
	download.onclick = function(){
		download.href = canvas.toDataURL();
	}
	function changeCanvasClassName(className){
		canvas.className = className;
	}
}
