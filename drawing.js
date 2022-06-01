//Colors
var redFill = "rgba(255,0,0,1)";
var greenFill = "rgba(34,139,34,1)";
var orangeFill = "rgba(255,140,0,1)";
var blueFill = "rgba(0,0,255,1)";
var blackFill = "rgba(0,0,0,1)";
var whiteFill = "rgba(255,255,255,1)";
var lightblueFill = "rgba(100,100,255,1)";
var greyFill = "rgba(255,255,255,.5)";
var lightgreyFill = "rgba(200,200,200,1)";
var darkgreyFill = "rgba(169,169,169,1)";
var brownFill = "rgba(139,69,19,1)";
var purpleFill = "rgba(170,0,255,1)";

var colors = [redFill, greenFill, orangeFill, blueFill, lightblueFill, brownFill, purpleFill, whiteFill];

function redraw()
{	
	context.fillStyle = "rgba(0,0,5,.05)";
	context.fillRect(0,0,width,height);
	context.fill();
  
  if(shakeNDX != 0)
  {
    context.save();
    context.translate(Math.random()*shakeNDX, Math.random()*shakeNDX);
  }
  
  drawPlayer(1);
  drawPlayer(2);
  context.save();
  context.translate(ball.x+ballWidth/2, ball.y+ballWidth/2);
  context.rotate(ballRotateAngle);
  drawBall();
  context.restore();
	
  for(i in particles)
  {
    var p = particles[i];
    drawRect(p.x, p.y, 2, 2, p.color);
  }
  
  for(i in stars)
  {
    var s = stars[i];
    drawRect(s.x, s.y, 2, 2, "rgba(200,200,200,.6)");
  }
  
  if(shakeNDX != 0)
    context.restore();
  
};

function drawPlayer(player)
{
  var x = player == 1 ? horizontalMargin : width-playerWidth-horizontalMargin;
  var y = player == 1 ? player1.y : player2.y;
  var playerHeight = player == 1 ? player1.height : player2.height;
  var color = player == 1 ? p1Color : p2Color;
  drawRect(x, y, playerWidth, playerHeight, color);
}
function drawBall()
{
  drawRect(-ballWidth/2, -ballWidth/2, ballWidth, ballWidth, ballColor);
}

//generic draw rectangle function
function drawRect(x1,y1,x2,y2,color)
{
	context.beginPath();
	context.fillStyle = color;
	context.fillRect(x1,y1,x2,y2);
	context.closePath();
	context.fill();
};
