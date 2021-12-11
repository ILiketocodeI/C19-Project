var sky, bird, worm, branch, end
var skyImg, birdImg, branchImg, wormImg, endImg
var SCORE = 0;
var branchG, wormG, branchtwoG;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {

  skyImg = loadImage("SkyImage.jpg");
  birdImg = loadAnimation("BirdImage.png", "BirdImageTwo.png");
  wormImg = loadImage("Worm.png");
  branchImg = loadImage("Branch.png");
  endImg = loadImage("End.png");
}

function setup() {

  createCanvas(400, 600);
 
  sky = createSprite(200, 200);
  sky.addImage(skyImg);
  sky.velocityY = 4;


 
  bird = createSprite(70, 580, 20, 20);
  bird.addAnimation("BirdEndImage", birdImg);
  bird.scale = 0.08;
  end = createSprite(200, 300, 40, 50)
  end.addImage(endImg);
  branchG = new Group();
  wormG = new Group();


}

function draw() {

  if (gameState === PLAY) {
    background(0);
    bird.x = World.mouseX;

    edges = createEdgeSprites();
    bird.collide(edges);
    end.visible = false;
   
    if (sky.y > 400) {
      sky.y = height / 2;
    }

    createWorm();
    createBranch();

    if (wormG.isTouching(bird)) {
      wormG.destroyEach();
      SCORE = SCORE + 50;

    } else {
      if (branchG.isTouching(bird)) {
        gameState = END;

      }
    }
  }
  else if (gameState === END) {
    end.visible = true;
    sky.velocityY = 0;
    bird.addAnimation("BirdEndImage", birdImg);


    wormG.setLifetimeEach(-1)
    branchG.setLifetimeEach(-1)


    wormG.destroyEach();
    




    wormG.setVelocityYEach(0);
    branchG.setVelocityYEach(0);

   

  }



  drawSprites();
  textSize(20);
  fill(255);
  text("Score: " + SCORE, 10, 30);


}

function createWorm() {
  if (World.frameCount % 200 == 0) {
    var worm = createSprite(Math.round(random(50, 350), 40, 10, 10));
    worm.addImage(wormImg);
    worm.scale = 0.12;
    worm.velocityY = 3;
    worm.lifetime = 250;
    wormG.add(worm);
  }
}





function createBranch() {
  if (World.frameCount % 400 == 0) {
    var branch = createSprite(Math.round(random(50, 350), 40, 10, 10));
    branch.addImage(branchImg);
    branch.scale = 0.1;
    branch.velocityY = 3;
    branch.lifetime = 250;
    branchG.add(branch);
  }
}



