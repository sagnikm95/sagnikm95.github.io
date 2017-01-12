var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");

function Pos(x, y) {
	this.x = x;
	this.y = y;
}

function Velocity(v_x, v_y) {
	this.x = v_x;
	this.y = v_y;
}

var BALL_RADIUS = 10;

function Ball(pos, vel) {
	this.pos = pos;
	this.vel = vel;

	this.draw = function() {
		
		/*context.fillRect(
				this.pos.x - BALL_RADIUS, this.pos.y - BALL_RADIUS,
				2 * BALL_RADIUS, 2 * BALL_RADIUS);*/
		context.arc(this.pos.x,this.pos.y,BALL_RADIUS,0,2*Math.PI)
		context.fillStyle = "white";		;
		context.fill();
	}

	this.move = function() {
		if (this.pos.x +this.vel.x- BALL_RADIUS <0 ||
				this.pos.x +this.vel.x + BALL_RADIUS >= canvas.width) {
			//this.vel.x=-this.vel.x;
			//this.pos.x+=this.vel.x * dt;
			return false;
		}

		if (this.pos.y + this.vel.y - BALL_RADIUS <0 ||
				this.pos.y + this.vel.y + BALL_RADIUS > canvas.height  ) {
			this.vel.y = -this.vel.y;
		}
		this.pos.x += this.vel.x ;
		this.pos.y += this.vel.y ;

		return true;
	}
}

var PADDLE_HALF_BREADTH = 4;
var PADDLE_HALF_LENGTH = 25;

function Paddle(pos) {
	this.pos = pos;
	this.vel_y = 1;
	this.move_up = function(dt) {
		pos.y -= vel_y * dt;
	};
	this.move_down = function(dt) {
		pos.y += vel_y * dt;
	}
	this.draw = function() {
		context.fillstyle = "white";
		context.fillRect(pos.x - PADDLE_HALF_BREADTH,
				pos.y - PADDLE_HALF_LENGTH,
				2 * PADDLE_HALF_BREADTH, 2 * PADDLE_HALF_LENGTH);
	}
}

function draw_board() {
	context.beginPath();
	context.strokeStyle = "white";
	context.moveTo(canvas.width / 2, 0);
	context.lineTo(canvas.width / 2, canvas.height - 1);
	context.moveTo(canvas.width / 2 - 1, canvas.height - 1);
	context.lineTo(canvas.width / 2 - 1, 0);
	context.stroke();
	context.closePath();
}

var BALL_START_POS = new Pos(canvas.width / 2, BALL_RADIUS); //We are maintaing the centre of the balll in {pos}
var PADDLE1_START_POS = new Pos(9, canvas.height / 2); // We are maintaining the centre of the rectangle in { pos}
var PADDLE2_START_POS = new Pos(canvas.width - 1 - 9, canvas.height / 2);

var ball = new Ball(BALL_START_POS, new Velocity(-5, 5));
var paddle1 = new Paddle(PADDLE1_START_POS);
var paddle2 = new Paddle(PADDLE2_START_POS);
//var lastDrawnTime = new Date().getTime();

function drawGameState() {
	draw_board();
	ball.draw();
	paddle1.draw();
	paddle2.draw();
	//lastDrawnTime = new Date().getTime();
}

window.main = function() {
	window.requestAnimationFrame(main);
	//var now = new Date().getTime();
	if (ball.move()) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawGameState();
	}
	else{
		alert("LOST GAME OVER");
		document.location.reload();
	}
	
}

main();
