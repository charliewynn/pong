var canvas;
var context;
var width  = 500;
var	height = 300;

var playerWidth = 10;
var playerHeight = 100;
var ballWidth = 10;
var ballRotateAngle = 0;
var ballColor;

var shakeNDX = 0;
var shakeMaxNDX = 20;

var player1 = {y:5, dy:0, height:playerHeight};
var player2 = {y:5, dy:0, height:playerHeight};
var p1Color;
var p2Color;
var playerSpeed = 3;
var ball = {x:width/2, y:height/2, dx:-2, dy:-.5};

var particles = [];
var stars = [];

var horizontalMargin = 10;
var verticalMargin = 5;

var p1ai = true;
