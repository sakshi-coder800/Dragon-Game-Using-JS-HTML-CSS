score = 0;
cross = true;

audio = new Audio('Music/music.mp3');
audiogo = new Audio('Music/gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode) // they return the keycode 
    if (e.keyCode == 38) { // "ArrowUp key"
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left')); // here they return dino left computed value
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    // check collied 
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));// they return diano computed left value
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));  // they give pixel value so we have to change this into integer
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));// they return obstacle computed left value 
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
    // now calculate its offset value
    offsetX = Math.abs(dx - ox);// they return absolute value of (dx-ox)
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni') // when they close each other then stop the animation
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000); // they work when game is over  // they pause after 1 seconds
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        // when cross then they update the score
        cross = false;
        setTimeout(() => { // after 1 second we will true this
            cross = true;
        }, 1000);

        // increase the obstacle speed when game is play
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's'; // that means .4s
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}