var dog,dogimg,dogHappy,foodStock,foods;
var database;
var food1;

function preload(){
dogimg = loadImage("dog.png");
dogHappy = loadImage("happy.png");

}

function setup() {
  createCanvas(500, 500);
  
  
  dog = createSprite(250,250,50,50);
  dog.addImage(dogimg);
  dog.scale = 0.2;

  database = firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

 
 
}


function draw() {
  background(46,139,87); 
  
  if (keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(dogHappy);
  }

  if (keyWentUp(UP_ARROW)){
    dog.addImage(dogimg);
  }

  drawSprites();

  textSize(17);
  fill("white")
  text("food Remaining: "+foods,100,100);
  text("Note: Please Press The UP ARROW KEY To Feed Drago Milk!",20,50);
  
}

function readStock(data){
  foods = data.val();
}

function writeStock(x){
  if (x<=0){
    x = 0;
  }
  else {
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  });
}
