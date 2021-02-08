var ghost,ghostImage; 
var tower,towerImage;

var gameState = "play";

var invisibleOb,invisibleObGroup;
var door,doorImage,doorsGroup;
var climber,climberImage,climberGroup;
function preload(){
ghostImage=loadImage("ghost-standing.png")
towerImage=loadImage ("tower.png")
climberImage=loadImage("climber.png");
doorImage=loadImage("door.png");
}

function setup(){
createCanvas(600,600);
tower=createSprite(300,300,20,600)
tower.addImage("adc",towerImage)
tower.velocityY=1;
doorsGroup=createGroup();
climberGroup=createGroup();
invisibleObGroup=createGroup();
ghost=createSprite(300,300)
ghost.addImage("ll",ghostImage)
ghost.scale=.3;
}

function draw(){
    //background("white");

    if(gameState === "play"){
        if (tower.y>600){
            tower.y=300;  
           }
           if (keyDown("space")){
            ghost.velocityY=-5;
            }
            ghost.velocityX=0;
            if (keyDown("right")){
            ghost.velocityX=2;
            }
            if (keyDown("left")){
                ghost.velocityX=-2;
            }
            if (climberGroup.isTouching(ghost)){
                ghost.velocityY=0;
                }   
                spawnDoors();

                drawSprites();

        if (invisibleObGroup.isTouching(ghost)||ghost.y>600){
gameState="end";
        }        
    }
    if(gameState==="end"){
background("black")
textSize(30);
fill("yellow");
text("game over",250,300)
    }
    


     
    ghost.velocityY=ghost.velocityY+.5;
    
}
function spawnDoors(){
  if(frameCount%200==0){
door=createSprite(200,-30);
door.x=Math.round(random(120,400))
door.velocityY=1;
door.addImage("ba",doorImage);
door.lifetime=600;
doorsGroup.add(door);

climber=createSprite(200,-30)
climber.x = door.x;
climber.y = door.y+60;
climber.addImage("na",climberImage)
climber.velocityY=1;
climber.lifetime=600;
climberGroup.add(climber);

ghost.depth = climber.depth+1;

invisibleOb=createSprite(200,-30,50,10);
invisibleOb.x = climber.x;
invisibleOb.y = climber.y+10;
invisibleOb.velocityY=1;
invisibleOb.lifetime=600;
invisibleObGroup.add(invisibleOb);
  }  
}