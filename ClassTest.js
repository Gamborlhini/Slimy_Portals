var canvas, ctx, x = 0, y = 0, dx = 5, dy = 20;
var rect,gravityspeed=2, char, groundclass, collision = false,grounded=false, imageObj = new Image();
imageObj.src="Capture.JPG";

var rect1simple = {height:10,width:10,x:11,y:11,color:"purple"};
var rect2simple = {height:50,width:50,x:51,y:11,color:"purple"};
var ground = {height:10,width:1000,x:0,y:490,color:"brown"};
canvas=document.getElementById("canvas");
ctx=canvas.getContext("2d");
console.log("canvas established");
function gravity() {
  if (grounded==false) {
    y+=gravityspeed;
  }
}
function drawNew() {
  rect = new rectangle(10,10,x,y,"purple");
  groundclass = new rectangle(ground.height,ground.width,ground.x,ground.y,ground.color);
  rect1render = new rectangle(rect1simple.height,rect1simple.width,rect1simple.x,rect1simple.y,rect1simple.color);
  rect2render = new rectangle(rect2simple.height,rect2simple.width,rect2simple.x,rect2simple.y,rect2simple.color);
  ctx.fillStyle="white";
	ctx.fillRect(0,0,1000,500);
  ctx.drawImage(imageObj, x,y,10,10);
  rect1render.render();
  rect2render.render();
  groundclass.render();
  detectCollisions();
  gravity();
}
function detectCollisions() {
  rect.collisionDetect(rect1simple);
  rect.collisionDetect(rect2simple);
  rect.groundDetect(ground);
}
// OPTIMIZE: fix this with Shivam to smooth
function doKeyDown(a){
    switch(a.keyCode){
    	case 65:/*left*/
      if (collision==false&&x>0) {
        	x=x-dx;
          //player=playerLeft;
      }
      else{
        console.log("we got a hit");
      }
      	break;
    	case 68:/*right*/
      if (collision==false&&x<990) {
          x=x+dx
          //player=playerRight;
      }
      else {
        console.log("we got a hit");
      }
      	break;
    	case 83:
      if (collision==false&&y<490&&grounded==false) {
        y=y+dy;
      }
      else {
        console.log("we got a hit");
      }
        break;
      case 87:
      if (collision==false&&y>0) {
        y=y-dy;
      }
      else {
        console.log("we got a hit");
      }
        break;
  }
}
class rectangle {
  constructor(height, width, x, y, color) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.color = color;
  }
  render(){
  	ctx.fillStyle=this.color;
  	ctx.fillRect(this.x,this.y,this.width,this.height);
  }
  collisionDetect(other){
    if(this.x<other.x+other.width&&
    	this.y<other.y+other.height&&
    	this.height+this.y>other.y&&
    	this.x+this.width>other.x) {
        collision = true;
    }
  }
  groundDetect(groundblock){
    if(this.x<groundblock.x+groundblock.width&&
    	this.y<groundblock.y+groundblock.height&&
    	this.height+this.y>groundblock.y&&
    	this.x+this.width>groundblock.x){
        grounded=true;
      }
      else {
        grounded=false;
      }
  }
}
class character{
  constructor(array) {
    this.array = array;
  }
  render(){
    for (var i = 0; i < this.array.length; i++) {
      ctx.fillStyle=this.array[i].color;
      ctx.fillRect(this.array[i].x,this.array[i].y,this.array[i].width,this.array[i].height);
    }
  }
}

window.addEventListener("keydown",doKeyDown,true);
console.log("keydown established");
setInterval(drawNew,16);
console.log("interval set")
