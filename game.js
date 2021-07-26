const buttonColours = ["red", "blue", "green", "yellow",];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
function nextSequence(){
    $('#level-title').text("Level: " + ++level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    fadeBtn(randomChosenColour);
    playSound(randomChosenColour);
}

$('.btn').on('click',function(){
  // console.log(this.id+ "Clicked");
  userChosenColour  = this.id;
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern)
  fadeBtn(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if(userClickedPattern.length<=level && level!=0){
    checkAnswer(userClickedPattern.length-1);
  }

});


function playSound(chosenColour){
  var audio = new Audio('sounds/'+chosenColour+'.mp3');
  audio.play();
}

function fadeBtn(chosenColour){
  $('#'+chosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(currentColour){
  $('#'+currentColour).addClass("pressed");
  setTimeout(function(){$('#'+currentColour).removeClass("pressed");}, 100);
}


$(document).keypress(function(){
  gamePattern.length = 0;
  level = 0;
  userClickedPattern.length = 0;
  nextSequence();
})

function checkAnswer(index){
  if(userClickedPattern[index] != gamePattern[index]){
    console.log("Wrong");
    var audio = new Audio('sounds\\wrong.mp3');
    audio.play();
    $('body').addClass("game-over");
    setTimeout(function(){$('body').removeClass("game-over");}, 200);
    $('#level-title').text('Game Over, Press Any Key to Restart !!!');
  }
  else if(index === gamePattern.length-1){
    console.log("Correct");
    userClickedPattern.length = 0;
    setTimeout(nextSequence, 1200);
  }
}

function logValues(){console.log(gamePattern); console.log(userClickedPattern);}
