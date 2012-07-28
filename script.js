var ctx;
var personImg;

var landColor="#EFEBE1";
var parkColor="#CCDFA9";
var waterColor="#A7BEE0";
var borderColor="#DCD5CC";
var canMove=1;
function drawThing(x,y,img) {
	ctx.drawImage(img, (10+87)*x, (10+61)*y);
}
var LAND=0;
var PARK=1;
var WATER=2;
var good = ["You made a new friend!! You just doubled your money.", "You gota great massage!!! You just doubled your money!", "You had a great dinner with friend!!! Your just doubled our money."];
var bad = ["You got robbed by a tranny hooker. You just lost a quarter of your money!!", "You got caught with dope. You just lost half your money!!", "You got a stomach bug. You just lost half your money."];

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
function drawTile(n,m) {
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
function blowupTile(n,m,r) {
	var t=0;
	targetN=n-r/2;
	targetM=m-r/2;
	if(targetN < 0) {
		targetN=0;
	}
	else if(targetN >= 10-r) {
		targetN=10-r;
	}
	if(targetM < 0) {
		targetM=0;
	}
	else if(targetM >= 10-r) {
		targetM=10-r;
	}
	
	var i=setInterval(function() {
		var curN=n + t*(targetN-n);
		var curM=m + t*(targetM-m);
		ctx.fillStyle = "#ccc";
		ctx.fillRect(10+curN*(10+87),10+curM*(10+61),87+(r*87-87)*t,61+(r*61-61)*t);
		t += .01;
		if(t>=1) {
			$("#overlay").css("background-color","#eee");
			$("#overlay").css("position","absolute");
			$("#overlay").css("border","1px black solid");
			$("#overlay").css("left",16+curN*(10+87) + "px");
			$("#overlay").css("top",16+curM*(10+61) + "px");
			$("#overlay").css("width",r*87  + "px");
			$("#overlay").css("height",r*61 + "px");
			var rnd=Math.random();
			if(rnd < 0.5) {
				rnd=Math.random();
				if(rnd<.33) {
					$("#overlay").html(good[0]);
				}
				else if(rnd<.66) {
					$("#overlay").html(good[1]);
					
				}
				else {
					$("#overlay").html(good[2]);	
				}
			}
			else {
				rnd=Math.random();
				if(rnd<.33) {
					$("#overlay").html(bad[0]);
				}
				else if(rnd<.66) {
					$("#overlay").html(bad[1]);
				}
				else {
					$("#overlay").html(bad[2]);
				}	
			}
			$("#overlay").show();
			$("#overlay").click(function() {
				$("#overlay").hide();
				draw();
				canMove=1;
			});
			clearInterval(i);
		}
	},1);
}
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
			drawTile(n,m);
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

function rotateTile(n,m,dir) {
	var t=0.0;
	var i=setInterval(function(){
		t = t + 0.01;
		var xBase,yBase,x,y;

		xBase=n*(10+87);
		yBase=m*(10+61);
		
		if(dir==0 || dir==2) {
			x=xBase+87/2+(-87/2)*Math.abs(Math.cos(Math.PI*t));
			y=yBase;
			width=87*Math.abs(Math.cos(Math.PI*t));
			height=61;
			
		}
		else if(dir==1 || dir== 3) {
			x=xBase;
			y=yBase+61/2+(-61/2)*Math.abs(Math.cos(Math.PI*t));
			width=87;
			height=61*Math.abs(Math.cos(Math.PI*t));
		}
	
		
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(xBase,yBase,87,61);
		if(t < 0.5) {
			if(map[m][n]==0) {
				ctx.fillStyle = landColor;
			}
			else if(map[m][n]==1) {
				ctx.fillStyle = parkColor;
			}	
			else if(map[m][n]==2) {
				ctx.fillStyle = waterColor;
			}	
		}
		else {
			ctx.fillStyle = "red";
		}
		ctx.fillRect(x,y,width,height);
		drawThing(n,m,personImg);
		
		if(t >= 1) {
			clearInterval(i);
			if(Math.random() > 0.5) {
				blowupTile(n,m,4);
			}
			else {
				draw();
				canMove = 1;
			}
		}
	},1);
}
function movePerson(x,y,toX,toY, dir) {
	var t=0;
	var i=setInterval(function(){
		t += .01;
		drawTile(x,y);
		ctx.fillStyle="#FFF";
		draw();
		drawTile(toX,toY);
		drawThing(x+t*(toX-x),y+t*(toY-y),personImg);
		if(t >= 1) {
			clearInterval(i);
			rotateTile(toX,toY,dir);
		}
	},1);
}
$(document).ready(function(){
	$(document).keypress(function(e) {
		if(canMove==0) {
			return;
		}
		if(e.keyCode==37) {
			if(ourX > 0) {
				canMove=0;
				ourX = ourX - 1;
			//	draw();
				movePerson(ourX+1,ourY,ourX,ourY,0);
			}
		}
		else if(e.keyCode==38) {
			if(ourY > 0) {
				canMove=0;
				ourY = ourY - 1;
				movePerson(ourX,ourY+1,ourX,ourY,1);
			//	draw();
			}
		}
		else if(e.keyCode==39) {
			if(ourX < 9) {
				canMove=0;
				
				ourX = ourX + 1;
				movePerson(ourX-1,ourY,ourX,ourY,2);
				//draw();
			}
		}
		else if(e.keyCode==40) {
			if(ourY < 9) {
				canMove=0;
				ourY = ourY + 1;
				movePerson(ourX,ourY-1,ourX,ourY,3);
				//draw();
			}	
		}
	});
});
