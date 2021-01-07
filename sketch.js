
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup,monkey_dead;
var score,survivalTime;

score = 0;
survivalTime = 0;

function preload(){
  
  monkey_dead = loadAnimation("sprite_0.png");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,300);
  
  monkey = createSprite(40,255,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  
  ground = createSprite(250,287,500,10);

  obstacleGroup = createGroup();
  foodGroup = createGroup();
}


function draw() {
  
  background("cyan");
  
  stroke("black");
  fill("black");
  textSize(21);
  text("Score : " + score, 260, 50);
  
  stroke("black");
  textSize(21);
  fill("black");
  text("Survival Time : " + survivalTime, 30,50);
  
  if(gameState === PLAY){
    
    if(keyDown("space") && monkey.y >= 250){
      
      monkey.velocityY = -18;
      
    }
    
    if(foodGroup.isTouching(monkey)){
      
      score = score + 1;
      foodGroup.destroyEach();
      
    }
    
    if(obstacleGroup.isTouching(monkey)){
      
      gameState = END;
      
    }
    
    survivalTime = Math.ceil(frameCount/frameRate());
    
    monkey.velocityY = monkey.velocityY+ 1;
    
    obstacle1();
  
    foodie();
    
  }
  
  else if(gameState === END){
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    monkey.velocityY = 0;
    
  }
  
  monkey.collide(ground);
  
  drawSprites();
  
}

function obstacle1(){
  
  if(frameCount % 100==0){
    obstacle = createSprite(510,260,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -7;
    obstacle.scale = 0.15;
    obstacle.lifetime = 400;
    
    obstacle.setCollider("circle",0,0,200);
    obstacle.debug = false
    
    obstacleGroup.add(obstacle);
  }
  
}

function foodie(){
  
  if(frameCount % 140==0){
    
    var banana = createSprite(510,Math.round(random(120,200)));
    banana.addImage(bananaImage);
    banana.velocityX = -7;
    banana.scale = 0.1;
    banana.lifetime = 400;
    
    foodGroup.add(banana);
  }
  
}