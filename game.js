// alert("Hello")
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keydown(function(){
  if (!started){
      $("#level-title").text("Level "+level);
      nextSequence();
      started = true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("h1").text("Game Over, Press any key to restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+ level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name){

  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  console.log(gamePattern);
  started = false;
}
