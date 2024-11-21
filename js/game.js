let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let fullscreen = false;
let soundOn = false;
let bgMusic = new Audio('audio/salsa.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.1;

function initGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function startGame() {
    let startScreen = document.getElementById('startScreen');

    if (!gameStarted) {
        startScreen.classList.add('dnone');
        world.startGame();
        gameStarted = true;
    } else {
        // restartGame();
    }
}

function toggleSound() {
    let iconSound = document.getElementById('iconSound');
    let soundOffPath = 'icons/sound-off.png';
    let soundOnPath = 'icons/sound-play.png';

    if (soundOn) {
        soundOn = false;
        iconSound.src = soundOffPath;
        world.soundManager.toggleSound();
        bgMusic.pause();
    } else {
        soundOn = true;
        iconSound.src = soundOnPath;
        world.soundManager.toggleSound();
        bgMusic.play();
    }

}


function openFullscreen() {
    let content = document.getElementById('content');
    let iconFullscreen = document.getElementById('iconFullscreen');

    if (!document.fullscreenElement) {
        enterFullscreen(content);
        iconFullscreen.src = 'icons/minimize.png';
    } else {
        exitFullscreen();
        iconFullscreen.src = 'icons/fullscreen.png';
    }
}


function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}


function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}



