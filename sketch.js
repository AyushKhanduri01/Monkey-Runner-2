var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,monkeys;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;


function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
    
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  monkeys = loadAnimation("sprite_1.png");
}



function setup() {
  createCanvas(600,300);
  monkey = createSprite(40,250,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300,284,1200,10); 
  ground.x = ground.width/2;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey.debug = false;
  
}


function draw() {
background(220);
  
  text("Survival Time:" + score,290,20);
  
  monkey.collide(ground); 
  console.log(monkey.y);
  
  if(gameState === PLAY){
      ground.velocityX = -6;
    
    if(ground.x<0){
        ground.x = ground.width /2;
    }
    
    if(keyDown("space")&& monkey.y >= 247){
       monkey.velocityY = -15;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    score = score + Math.round(frameCount/100);

    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    }
    if(obstacleGroup.isTouching(monkey)){
      monkey.velocityY = 0;
      gameState = END;
    }
    
  
  }
  else if(gameState === END){
    monkey.velocityX = 0;
    ground.velocityX = 0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
  }

  spawnObstacle(); 
  spawnBanana();
  drawSprites(); 
}

function spawnObstacle(){ 
  if(frameCount % 100 === 0){
     obstacle = createSprite(650,260,10,10);
     obstacle.addImage("obstacle",obstacleImage);
     obstacle.scale = 0.1;
     obstacle.velocityX = -9;
     obstacleGroup.add(obstacle);
     obstacleGroup.setLifetimeEach(70);

  }
}

function spawnBanana(){
  if(frameCount % 100 === 0){
    banana = createSprite(650,120,10,10);
    banana.y = Math.round(random(120,200));
    banana.addImage("fruit",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    FoodGroup.add(banana);
    FoodGroup.setLifetimeEach(100);
     
  } 
}