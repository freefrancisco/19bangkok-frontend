var ctx;
var personImg;

var landColor="#EFEBE1";
var parkColor="#CCDFA9";
var waterColor="#A7BEE0";
var borderColor="#DCD5CC";

function drawThing(x,y,img) {
	ctx.restore();
	ctx.drawImage(img, (10+87)*x, (10+61)*y);
}
var LAND=0;
var PARK=1;
var WATER=2;

var map=[[1,2,0,0,0,2,0,0,0,0],
		 [0,0,2,0,2,0,0,0,0,0],
		 [0,0,0,2,0,0,0,0,1,0],
		 [0,0,0,0,0,0,0,0,0,0],
		 [0,0,0,1,0,0,0,0,0,0],
		 [2,0,0,0,0,0,0,0,0,2],
		 [0,2,0,0,0,0,0,0,2,0],
		 [2,0,0,0,0,0,0,2,0,0],
		 [0,0,0,0,0,0,2,0,1,0],
		 [0,0,0,0,0,0,0,2,0,0]];

var ourX=9;
var ourY=0;
function draw() {
	var canvas = document.getElementById("main_canvas");
 	ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,960,700);
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,960,700);

	// 61px, 10px spacing vertical
	// 87px, 10px gutter	
	for(var n=0;n<10;n++) {
		for(var m=0;m<10;m++) {
			if(map[m][n]==0) {
				ctx.fillStyle = landColor;
			}
			else if(map[m][n]==1) {
				ctx.fillStyle = parkColor;
			}	
			else if(map[m][n]==2) {
				ctx.fillStyle = waterColor;
			}
			ctx.fillRect(n*(10+87),m*(10+61),87,61);
			ctx.strokeStyle = borderColor;
			ctx.strokeRect(n*(10+87),m*(10+61),87,61);
		}	
	}
	ctx.save();
	personImg = new Image();
	personImg.src='backpacker.gif';
	drawThing(ourX,ourY, personImg);
}
function load() {
	draw();
}
function rotateTile(n,m) {
	var t=0.0;
	var i=setInterval(function(){
		t = t + 0.01;
		var xBase=n*(10+87);
		var yBase=m*(10+61);
		var x=xBase+87/2+(-87/2)*Math.abs(Math.cos(Math.PI*t));
		var y=yBase;
		var width=87*Math.abs(Math.cos(Math.PI*t));
		var height=61;
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(xBase,yBase,87,61);
		ctx.fillStyle = landColor;
		ctx.fillRect(x,y,width,height);
		if(t >= 1) {
			clearInterval(i);
			draw();
		}
	},10);
}
$(document).ready(function(){
	$(document).keypress(function(e) {
		if(e.keyCode==37) {
			if(ourX > 0) {
				ourX = ourX - 1;
			//	draw();
				rotateTile(ourX,ourY);
			}
		}
		else if(e.keyCode==38) {
			if(ourY > 0) {
				ourY = ourY - 1;
				rotateTitle(ourX,ourY);
			//	draw();
			}
		}
		else if(e.keyCode==39) {
			if(ourX < 9) {
				ourX = ourX + 1;
				rotateTile(ourX,ourY);
				//draw();
			}
		}
		else if(e.keyCode==40) {
			if(ourY < 9) {
				ourY = ourY + 1;
				rotateTile(ourX,ourY);
				//draw();
			}	
		}
	});
});
