const PLAY = 1;
const END = 0;
var gameState = PLAY;

var ghost, ghostImg;
var tower, towerImg;

var door, doorImg;
var climber, climberImg;
var block;

var invisibleGround;

var doorsGroup, climbersGroup, blocksGroup;


function preload(){
  
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
 
}


function setup(){
  createCanvas(500,500);
  
  //spookySound.play(); //loop()
  
  tower = createSprite(250,300);
  tower.addImage(towerImg)
  tower.velocityY = 3
  
  ghost = createSprite(300,430,50,50);
  ghost.addImage(ghostImg)
  ghost.scale = 0.3
  
  invisibleGround = createSprite(250,480,380,1);
  
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  blocksGroup = new Group();
  
  //console.log(tower.height/2);
  
}// ------------end of setup -------------------

function draw(){
  background(0);
  
  if (gameState == PLAY) {
    
    // for infinite ground
    if(tower.y > 400){
     tower.y = 300
     }
    
    
    //left and right movement to ghost
    if(keyDown("left")){
        ghost.x = ghost.x - 3;
      }
    
    if(keyDown("right")){
        ghost.x = ghost.x+ 3;
      }
    
    // make the ghost jump using gravity
    
    if(keyDown("up")){
      ghost.velocityY= -10
    }
    ghost.velocityY += 0.25
    
    // call function spawnDoors()
    
    spawnDoors()
    // ghost is touching climbersGroup
    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0
    }
    
    // ghost is touching blocksGroup
    if(ghost.isTouching(blocksGroup) || ghost.y>height){
      gameState = END
    }
    
     
  ghost.collide(invisibleGround);
    if(frameCount == 50){
      invisibleGround.destroy()
    }
  drawSprites();
    
  }else if(gameState == END){
    
    // "Game Over" should appear
    textAlign(CENTER, CENTER)
    textSize(50)
    text("Game Over", width/2, height/2)
    
    
    // tower should disappear
    
    
    
  }
  
}
// -----------------end of draw ---------------------


function spawnDoors() {
  
  if (frameCount % 100 === 0) {
    var x = Math.round(random(120,400));
    
    var door = createSprite(x, -50);
    var climber = createSprite(x, door.y + door.height/2);
    var block = createSprite(x, climber.y+15, 100, 5);
    
    // add images
    door.addImage(doorImg)
    climber.addImage(climberImg)
    
    // add velocities
    door.velocityY=3
    climber.velocityY = 3
    block.velocityY = 3
    block.visible = false;
    
    // add lifetime
    
    door.lifetime = height/3+20
    climber.lifetime = height/3+20
    block.lifetime = height/3+20
    
    // add sprites to different groups
    
    doorsGroup.add(door)
    climbersGroup.add(climber)
    blocksGroup.add(block)
    
    //change depth of the ghost
    ghost.depth = block.depth +1
  }
}


