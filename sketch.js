var PLAY = 1, END = 0;
var gameState = PLAY;
var trex, trex_running, edges;
var groundImage, moving_ground;
var invisible_ground;
var cloudGroup, cloud, cloudImage;
var cactusGroup, cactus, cac1, cac2, cac3;
var score = 0;
var trexDEAD;

function preload()
{
   trex_running = loadAnimation("dino1.png","dino2.png","dino3.png");
   groundImage = loadImage("ground2.png")  
  cloudImage = loadImage("cloud.png")
  cac1 = loadImage("cactus1.png");
  cac2 = loadImage("cactus2.png");
  cac3 = loadImage("cactus3.png");
  trexDEAD = loadImage("deaddino.png");
}

function setup()
{
  createCanvas(1200,600);
  
  cloudGroup = new Group();
  cactusGroup = new Group();
  
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colided", trexDEAD);
  moving_ground = createSprite(300, 190, 600, 3)
  moving_ground.addImage(groundImage)
  invisible_ground = createSprite(300, 195, 600, 3)
  edges = createEdgeSprites();
  
  //adding scale and position to trex
  trex.scale = 0.20;
  trex.x = 50;
  trex.debug = true;
  
  invisible_ground.visible = false;
  
}


function draw()
{
   //set background color 
   background(rgb(149, 149, 149));
  
   fill("black")
   text("Score : " + score, 460, 20)
  
  if(gameState === PLAY){
      score = score + Math.round(frameCount/60);
      moving_ground.velocityX = -6;
      //logging the y position of the trex
      console.log(trex.y)
  
     //jump when space key is pressed
     if(keyDown("space") && trex.y >= 150) {
       trex.velocityY = -12;
     }
  
    trex.velocityY = trex.velocityY + 0.7;
      
    //infinite ground
    //console.log(moving_ground.x);
  
    if(moving_ground.x <0){
    moving_ground.x = moving_ground.width/2
    } 
    
    spawnCloud();
    spawnObstacles();
    
    if(trex.isTouching(cactusGroup)){
      gameState = END;
    }
    }
  
    else if(gameState === END){
      moving_ground.velocityX = 0;
      cloudGroup.setVelocityXEach(0);
      cactusGroup.setVelocityXEach(0);
      trex.changeAnimation("colided", trexDEAD);
      trex.scale = 0.08;
    }

  //setting depths
     
    trex.collide(invisible_ground);  
  drawSprites();
  }

function spawnCloud()
{

  if(frameCount%150 == 0)
    {
  c = Math.round(random(50, 100))
  cloud = createSprite(555, c, 10, 10);
  cloud.velocityX = -3;
  cloud.addImage(cloudImage);
  cloud.scale = 0.07;
  cloud.lifetime = 199;
  cloudGroup.add(cloud);
      
  trex.depth = cloud.depth
      trex.depth = trex.depth+1;
    }
  
  
  
}
  
function spawnObstacles()
{
  if(frameCount%100 == 0){
    var rand_no = Math.round(random(1,3))
    cactus = createSprite(600, 170);
    cactus.velocityX = -4;
    cactus.lifetime = 200;
    cactus.scale = 0.1;
    switch(rand_no)
      {
        case 1 : cactus.addImage(cac1);
          break;
        case 2 : cactus.addImage(cac2);
          break;
        case 3 : cactus.addImage(cac3);
          break;
      }
    cactusGroup.add(cactus);
  }
  
  
  
}