//Create variables here
var database
var dog, hDog, nDog, foodS, foodSt
function preload()
{
  //load images here
  nDog = loadImage("images/Dog.png")
  hDog = loadImage("images/happydog.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250, 250, 50, 50)
  dog.addImage(nDog)
  dog.scale = 0.35
  foodSt = database.ref('food');
  foodSt.on("value", readStock)
  
}


function draw() {  
  background(46, 139, 87)
  drawSprites();
  fill("white")
  text("Note: press up key to feed the dog!", 250, 30)
  text("Food left:" + foodS, 250, 430)
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(hDog); 
  }


}

function readStock(data){
foodS = data.val();

}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }else{
    x = x - 1
  }
database.ref('/').update({
  food:x
})
}