function keydown(e)
{
  //alert(e.keyCode);
  if(e.keyCode == 65 && player1.y + player1.height < height - verticalMargin)
    player1.dy = playerSpeed;
  if((e.keyCode == 222 || e.keyCode == 81) && player1.y > verticalMargin)
    player1.dy = -playerSpeed;
  if(e.keyCode == 38 && player2.y > verticalMargin)
    player2.dy = -playerSpeed;
  if(e.keyCode == 40 && player2.y + player2.height < height - verticalMargin)
  player2.dy = playerSpeed;
}
function keyup(e)
{
  //alert(e.keyCode);
  if(e.keyCode == 65 || e.keyCode == 222 || e.keyCode == 81)
    player1.dy = 0;
  if(e.keyCode == 38 || e.keyCode == 40)
    player2.dy = 0;
}

function toggleAi()
{
  p1ai = !p1ai;
  var oldButtStr = document.getElementById('ai').innerHTML;
  document.getElementById('ai').innerHTML = (oldButtStr == aistr1) ? aistr2 : aistr1;
  
  player1.height = playerHeight;
  player2.height = playerHeight;
  ball = {x:width/2, y:height/2, dx:-2, dy:-.5};
}
var aistr1 = "Turn Player 1 Computer Player Off";
var aistr2 = "Turn Player 1 Computer Player On";

function didload()
{	
	document.documentElement.style.overflow = 'hidden';	 // firefox, chrome
	document.body.scroll = "no";
  
	document.getElementById("canvas").innerHTML = '<canvas id="theCanvas" width="'+width+'" height="'+height+'" >You need to use Firefox, Google Chrome or IE 9 to Play"</canvas>';
	canvas = document.getElementById("theCanvas");
	context = canvas.getContext("2d");
	document.onkeydown = keydown;
	document.onkeyup = keyup;
  
	context.fillStyle = "rgba(0,0,5,1)";
	context.fillRect(0,0,width,height);
	context.fill();
  
  for(var i = 0; i < 10; i++)
    for(var j = 0; j < 10; j++)
      stars.push({x:i*(width/10), y:j*(height/10)});
  
  ballColor = whiteFill;
  p1Color = whiteFill;
  p2Color = whiteFill;
	updateGame();
}

function StarVecRand()
{
  return (Math.random()*4-2);
}

//this is called for every frame to update the location of the objects in the game
function updateGame()
{
  ball.x += ball.dx;
  ball.y += ball.dy;
  ballRotateAngle = (ballRotateAngle+ball.dx*-Math.PI/40)%(2*Math.PI);
  shakeNDX = Math.max(shakeNDX-1, 0);
  
  if(p1ai)
  {
    if(ball.y < player1.y+player1.height/10)
      player1.dy-=.5;
    else if(ball.y > player1.y+9*player1.height/10)
      player1.dy+=.5;
    else
      player1.dy = 0;
  }
  
  //bounce off the top and bottom
  if(ball.y <= 0 || ball.y >= height-ballWidth)
  {
    ball.dy = -1*ball.dy;
    ball.y += ball.dy;
    for(var i=0; i<5; ++i)
    {
      particles.push({x:ball.x, y:ball.y, dx:ball.dx/2 + Math.random()*2-1, dy:ball.dy/2, life:Math.random()*10 + 20, color:ballColor});
    }
    ballColor = colors[Math.floor(Math.random()*colors.length)];
    shakeNDX = shakeMaxNDX;
  }
  if(ball.x == horizontalMargin+playerWidth && (ball.y + ballWidth > player1.y && ball.y <= player1.y + player1.height))
  {
    p1Color = ballColor;
    ballColor = colors[Math.floor(Math.random()*colors.length)];
    ball.dx = -1*ball.dx;
    shakeNDX = shakeMaxNDX;
    
    for(var i=0; i<5; ++i)
    {
      particles.push({x:ball.x, y:ball.y, dx:ball.dx/2, dy:ball.dy/2 + Math.random()*2-1, life:Math.random()*10 + 20, color:p1Color});
    }
    if(ball.y < player1.y + player1.height/5)
      ball.dy--;
    if(ball.y < player1.y + 2*player1.height/5)
      ball.dy--;
    if(ball.y > player1.y + 3*player1.height/5)
      ball.dy++;
    if(ball.y > player1.y + 4*player1.height/5)
      ball.dy++;
  }
  if(ball.x + ballWidth == width-horizontalMargin-playerWidth && (ball.y + ballWidth > player2.y && ball.y <= player2.y + player2.height))
  {
    p2Color = ballColor;
    ballColor = colors[Math.floor(Math.random()*colors.length)];
    ball.dx = -1*ball.dx;
    shakeNDX = shakeMaxNDX;
    
    for(var i=0; i<5; ++i)
    {
      particles.push({x:ball.x + playerWidth, y:ball.y, dx:ball.dx/2, dy:ball.dy/2 + Math.random()*2-1, life:Math.random()*10 + 20, color:p2Color});
    }
    if(ball.y < player2.y + player2.height/5)
      ball.dy-=.25;
    if(ball.y < player2.y + 2*player2.height/5)
      ball.dy-=.25;
    if(ball.y > player2.y + 3*player2.height/5)
      ball.dy+=.25;
    if(ball.y > player2.y + 4*player2.height/5)
      ball.dy+=.25;
  }
  if(ball.x <= 0)
  {
    ball.dx = -1*ball.dx;
    ball.x = width/2;
    player2.height -= 10;
  }
  if(ball.x >= width)
  {
    ball.dx = -1*ball.dx;
    ball.x = width/2;
    player1.height -= 10;
  }
	
  if(ball.dy > 2)
    ball.dy = 2;
  if(ball.dy < -2)
    ball.dy = -2;
  
  player1.y += player1.dy;
  player2.y += player2.dy;
  
  if(player1.y <= verticalMargin)
  {
    if(player1.dy < 0)
    {
      for(var i=0; i<5; ++i)
      {
        particles.push({x:verticalMargin+playerWidth/2, y:verticalMargin, dx:Math.random()*2-1, dy:Math.random()*2, life:Math.random()*10 + 20, color:p1Color});
      }
    }
    player1.dy = 0;
  }
  if(player1.y + player1.height >= height - verticalMargin)
  {
    if(player1.dy > 0)
    {
      for(var i=0; i<5; ++i)
      {
        particles.push({x:verticalMargin+playerWidth/2, y:height - verticalMargin, dx:Math.random()*2-1, dy:-1*Math.random()*2, life:Math.random()*10 + 20, color:p1Color});
      }
    }
    player1.dy = 0;
  }
  if(player2.y <= verticalMargin)
  {
    if(player2.dy < 0)
    {
      for(var i=0; i<5; ++i)
      {
        particles.push({x:width-verticalMargin-playerWidth/2, y:verticalMargin, dx:Math.random()*2-1, dy:Math.random()*2, life:Math.random()*10 + 20, color:p2Color});
      }
    }
    player2.dy = 0;
  }
  if(player2.y + player2.height >= height - verticalMargin)
  {
    if(player2.dy > 0)
    {
      for(var i=0; i<5; ++i)
      {
        particles.push({x:width-verticalMargin-playerWidth/2, y:height - verticalMargin, dx:Math.random()*2-1, dy:-1*Math.random()*2, life:Math.random()*10 + 20, color:p2Color});
      }
    }
    player2.dy = 0;
  }
  
  if(player1.height <= 0)
  {
    alert("Player 1 Wins");
    player1.height = playerHeight;
    player2.height = playerHeight;
  }
  if(player2.height <= 0)
  {
    alert("Player 2 Wins");
    player1.height = playerHeight;
    player2.height = playerHeight;
  }
  
  if(ball.x%30 == 0)
    particles.push({x:ball.x, y:ball.y+ballWidth/2, dx:-.25*ball.dx, dy:-1*ball.dy + Math.random()*ball.dy-ball.dy/-2, life:Math.random()*10 + 40, color:ballColor});
  for(i in particles)
  {
    var p = particles[i];
    if(p.life <= 0)
      particles.splice(i, 1);
    p.x += p.dx;
    p.y += p.dy;
    p.life--;
  }
  
  for(i in stars)
  {
    var s = stars[i];
    
    s.x += ball.dx*2+Math.random()-.5;
    s.y += ball.dy*2+Math.random()-.5;
    
    if(s.x < 0)
      s.x = width;
    else if(s.x > width)
      s.x = 0;
    if(s.y < 0)
      s.y = height;
    else if(s.y > height)
      s.y = 0;
  }
  
	redraw();
	setTimeout( function(){	 updateGame(); }, 10);
};