var size = 20;
var snake = [[10, 10], [10, 9], [10, 8]];
var direction = 39;
var food = [];
var faster = 0;
var gameisover = false;

function resetvar(){
  $('#score').html("Score: 0");
  snake = [[10, 10], [10, 9], [10, 8]];
  direction = 39;
  faster = 0;
  gameisover = false;
}
function grid(size){
  $(".grid").empty();
  for (var i = 1; i <= size; i++){
    name = "row"+i;
    $(".grid").append("<div class='row "+name+"'></div>");
  }
  for (var j = 1; j<=size; j++){
    name = "box"+j;
    $(".row").append("<i class='box "+name+"'></i>");
  }
}
function box(pos) {
  return $(".row"+pos[0]+" .box"+pos[1]);
}
function addsnake(pos) {
  box(pos).removeClass("fade");
  box(pos).addClass("snake");
}
function removesnake(pos) {
  box(pos).removeClass("snake");
  box(pos).addClass("fade");
}

function rand(a, b) { 
  return Math.floor(Math.random() * (b - a + 1) + a); 
}

function snake_head(){
  return snake[0];
}
function snakemove(x, y){
  next = [snake_head()[0]+x, snake_head()[1]+y];
  crashed_self(next);
  eat();
  snake.forEach(function(pos){
    addsnake(pos);
  }); 
  crashed_wall();    
}
function crashed_self(next){
  if (box(next).hasClass("snake")){
    gameover();
  } else {
    snake.unshift(next);
  }
}
function crashed_wall(){
  if (snake_head().some(function(n){ return n < 1 || n > size})){
    gameover();
  }  
}

function addfood(){
  food = [rand(1, size), rand(1, size)];
  if (box(food).hasClass("snake")) {
    addfood();
  } else {
    box(food).addClass("food animated pulse fade");
  }
}
function eat(){
  if (!box(snake_head()).hasClass("food")) {
    removesnake(snake.pop());
  } else {
    box(snake_head()).removeClass("food animated pulse fade");
    faster+=5;
    $('#score').html("Score: "+faster);
    addfood();
  }
}
function go(direction){
  switch(direction) {
    case 38:
      snakemove(-1, 0);       
      break;
    case 40:
      snakemove(1, 0);  
      break;
    case 37:
      snakemove(0, -1); 
      break;
    case 39:
      snakemove(0, 1); 
      break;
  }
}
function snakedead(){ 
  for(i=0;i<3;i++) {
    $('.snake').fadeTo(200, 0.5).fadeTo(200, 1.0);
  }
}
function gameover(){
  snakedead();
  $('.snake').promise().done(function(){
    box(food).removeClass("pulse");
    $(".grid").addClass("grayout");
    $('.finalscore').html("Score: "+faster);
    $(".gameover").fadeIn(800);
  });
  gameisover = true;
}

function start(){
  if (!gameisover) {
   setTimeout(start,200-faster);
   go(direction);
  }
}
function play(){
  resetvar();
  grid(size);
  snake.forEach(function(pos){
    addsnake(pos);
  });
  addfood();
  start();
}
function pressButton(id){
  // id = direction.slice(5).toLowerCase();
  $("#a"+id).addClass("shadow").delay(200).queue(function(){
    $(this).removeClass("shadow").dequeue();
  });
}

$(document).ready(function() {
  grid(size);
  $(".startgame").click(function(){
    $(".startgame").hide();
    play();
  })
  $('.again').click(function(){
    $(".grid").removeClass("grayout");
    $(".gameover").hide();
    play();
  })
  $("body").keydown(function(e){
    direction = e.keyCode; //*
    pressButton(direction); //*
    });
  $("button").mousedown(function(){
    $(this).addClass("shadow");
  })
  $("button").mouseup(function(){
    $(this).removeClass("shadow");
  });
  $('#a37').click(function(){
    direction = 37;
  });
  $('#a39').click(function(){
    direction = 39;
  });
  $('#a38').click(function(){
    direction = 38;
  });
  $('#a40').click(function(){
    direction = 40;
  });
});

