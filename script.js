let buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keypress(function() {
    // check if started = false, go
    if(!started) {
        // change title based on level
        $('#level-title').text('Level ' + level);
        // run nextSequence()
        nextSequence();
        // change started to true
        started = true;
    }
});

$('div .btn').click(function(event) {
    // get id from clicked event
    let userChosenColour = event.target.id;

    // push the result to userClickedPattern
    userClickedPattern.push(userChosenColour);

    // animate the button
    animatePress(userChosenColour);

    // play sound each the button pressed
    playSound(userChosenColour);

    // check user answer
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    // check if gamePattern = userClickedPattern
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        // if gamePattern.length = userClickedPattern.length
        if(gamePattern.length === userClickedPattern.length) {

            // run nextSequence()
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        // if gamePattern != userClickedPattern

        // play wrong sound
        playSound('wrong');

        // add gameOver animate
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);

        // change title
        $('#level-title').text('Game Over, Press Any Key to Restart');

        // reclass all value
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    // incrase level each nextSequence called
    level++;
    // change level based on class level
    $('#level-title').text('Level ' + level);

    // make a random number
    let randomNumbers = Math.floor(Math.random()*3);

    // choose color from buttonColours base on randomNumbers
    let randomChosenColour = buttonColours[randomNumbers];

    // push the result to gamePattern
    gamePattern.push(randomChosenColour);

    // animate the button
    animatePress(randomChosenColour);

    // play sound each the button pressed
    playSound(randomChosenColour);
}

function playSound(name) {
    // play sound to selected name
    var audio = new Audio('sounds/' + name + '.mp3');
        audio.play();
}

function animatePress(color) {
    // animate to selected color
    $('#' + color).addClass('pressed');
    setTimeout(() => {
        $('#' + color).removeClass('pressed');
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}