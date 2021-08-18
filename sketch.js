var minecart,cartImage;

var stone,stoneImage,stoneGroup;

var grass;

var clang;

var score=0;
var hiscore=0;
var gameState=0;

function preload(){

  cartImage=loadImage("minecart.png");
  
  stoneImage=loadImage("stone.png");
  
  clang=loadSound("clang.mp3");
  
}

function setup() {
 createCanvas(500,500)
  
  minecart=createSprite(50,330);
  minecart.addImage("cartImage",cartImage);
  minecart.scale=0.1
  
  grass=createSprite(250,485,500,30);
  grass.shapeColor="green";
  
  minecart.velocityY=8;
  
  stoneGroup=new Group();
  
}

function draw() {
  background("aqua")
  
  text("Distance: "+score+"   Best Distance: "+hiscore,100,20);
  
  if(gameState === 0){
    score=score+1;
  
    if(keyDown("space") && minecart.velocityY===0) {
      minecart.velocityY=-8;
      clang.play();
    }
    
    if(minecart.y<360) {
      minecart.velocityY=8;
    }
    //console.log(minecart.y);
      
    makeRocks();
    
    if(stoneGroup.isTouching(minecart)) {
      gameState=1;
      stoneGroup.destroyEach();
      clang.play();
      minecart.velocityY=0;
    }
  }
  
  if(gameState===1) {
    if(score>hiscore){
      hiscore=score;
    }
    textSize(20);
    text("GAME OVER, PRESS SHIFT TO RESTART",50,250);
    
    if(keyDown("shift")) {
      gameState=0;   
      score=0; 
    }
  }
  minecart.collide(grass);
  
  drawSprites();
}

function makeRocks() {

  if(frameCount % 60 === 0) {
  
    stone=createSprite(500,457)
    stone.addImage("stoneImage",stoneImage);
    stone.scale=0.1
    stone.velocityX=-(8+2*score/300)
    stoneGroup.add(stone);
    stone.lifetime=1000;
  }
}