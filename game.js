let buttonColors = ['red', 'blue', 'green', 'yellow'];
let userClickedPattern = [];
let gamePattern = [];
let gameon = false;
let level = 0;

//this function makes sound
function soundMaker(chosenColor) {
  let audio = new Audio(`sounds/${chosenColor}.mp3`);
  audio.play();
}

//makes the button flash
function blink(chosenColor) {
  $(`.${chosenColor}`).fadeOut(100).fadeIn(100);
  soundMaker(chosenColor);
}
//animates the button clicks
function animatePress(currentColor) {
  $(`#${currentColor}`).addClass('pressed');
  setTimeout(() => {
    $(`#${currentColor}`).removeClass('pressed');
  }, 100)
}

//produces the next Sequence of Pattern
function nextSequence() {
  userClickedPattern = [];
  level++;
  $('h1').text(`Level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  blink(randomChosenColor);
}

//event listener for starting keypress
  $(document).on('keypress', () => {
    if (!gameon){
      gameon = true;
      $('h1').text(`Level ${level}`);
      nextSequence();
    }
  })

//gameOver function initialises the vairables
function gameOver(){
  gameon = false;
  gamePattern = [];
  level = 0;
}

//matches the user answer with the game Pattern
function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  }else{
    soundMaker("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(() => {
      $("body").removeClass('game-over');
    }, 200);

    gameOver();
  }
}

//event listener for button clicks
$('.btn').on('click', (event) => {
  let userChosenColor = $(event.target).attr('id');
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  soundMaker(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
