var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var gameStarted = false
var level = 0

$(document).keydown(function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + level)
    nextSecuence()
    gameStarted = true
  }
})

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id")
  userClickedPattern.push(userChosenColour)

  playSound(userChosenColour)
  animatePress(userChosenColour)

  checkAnswer(userClickedPattern.lastIndexOf(userChosenColour))
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success")
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSecuence()
      }, 1000);
    }
  }else {
    console.log("Wrong")
    var audio = new Audio('sounds/wrong.mp3')
    audio.play()

    $("#level-title").text("Game Over, Press Any Key to Restart")
    $("body").addClass("game-over")
    
    setTimeout(function () {
      $("body").removeClass("game-over")
    }, 200);
    startOver()
  }
}

function nextSecuence() {
  userClickedPattern = []
  level++
  $("#level-title").text("Level " + level)

  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
  playSound(randomChosenColour)
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3')
  audio.play()
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed")
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed")
  }, 100)
}

function startOver(){
  level = 0
  gamePattern = []
  gameStarted = false
}