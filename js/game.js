let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let fullscreen = false;
let soundOn = false;
let bgMusic = new Audio('audio/salsa.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.1;


/**
 * Initializes the game by setting up the canvas, world, and keyboard.
 * Also checks the orientation of the device and adjusts UI accordingly.
 */
function initGame() {
    checkOrientation();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    keyboard.bindBtsPressEvents();
}


/**
 * Starts or stops the game depending on the current game state.
 * Toggles visibility of the start screen and mobile play panel.
 */
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        hideStartScreen();
        handleMobilePlayPanel();
        world.startGame();
        bgSound();
    } else {
        gameStarted = false;
        hideControls();
        hideMobilePlayPanel();
    }
}


/**
 * Checks the current orientation of the window.
 * Displays or hides UI elements based on whether the device is in portrait mode.
 */
function checkOrientation() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let portraitWarningMobile = document.getElementById('portraitWarningMobile');
    let headline = document.getElementById('headline');
    let content = document.getElementById('content');
    if (width <= 720 && height > width) {
        hidePortraitWarning(portraitWarningMobile, headline, content);
    } else {
        showPortraitWarning(portraitWarningMobile, headline, content);
    }
}


/**
 * Shows the portrait warning and hides the content when in portrait mode.
 * @param {HTMLElement} portraitWarningMobile - The element to show the portrait warning.
 * @param {HTMLElement} headline - The element to hide when in portrait mode.
 * @param {HTMLElement} content - The element to hide when in portrait mode.
 */
function showPortraitWarning(portraitWarningMobile, headline, content) {
    portraitWarningMobile.classList.add('dnone');
    headline.classList.remove('dnone');
    content.classList.remove('dnone');
}


/**
 * Hides the portrait warning and shows the content when not in portrait mode.
 * @param {HTMLElement} portraitWarningMobile - The element to hide the portrait warning.
 * @param {HTMLElement} headline - The element to show when not in portrait mode.
 * @param {HTMLElement} content - The element to show when not in portrait mode.
 */
function hidePortraitWarning(portraitWarningMobile, headline, content) {
    portraitWarningMobile.classList.remove('dnone');
    headline.classList.add('dnone');
    content.classList.add('dnone');
}


/**
 * Shows the start screen and hides other elements.
 */
function showStartScreen() {
    let startScreen = document.getElementById('startScreen');
    startScreen.classList.remove('dnone');
}


/**
 * Hides the start screen and other UI elements.
 */
function hideStartScreen() {
    let startScreen = document.getElementById('startScreen');
    startScreen.classList.add('dnone');
}


/**
 * Handles the display of the mobile play panel and the controls based on screen size and game state.
 */
function handleMobilePlayPanel() {
    if (gameStarted && (isTouchDevice() || window.innerWidth <= 720 || window.innerHeight <= 600)) {
        showMobilePlayPanel();
        hideControls();
    } else if (gameStarted && !isTouchDevice() && (window.innerWidth > 720 && window.innerHeight > 600)) {
        hideMobilePlayPanel();
        showControls();
    }
}


/**
 * Checks if the device supports touch input.
 * @returns {boolean} `true` if the device is a touch device, otherwise `false`.
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}


/**
 * Displays the mobile play panel.
 */
function showMobilePlayPanel() {
    let mobilePlayPanel = document.getElementById('mobilePlayPanel');
    mobilePlayPanel.classList.remove('dnone');
}


/**
 * Hides the mobile play panel.
 */
function hideMobilePlayPanel() {
    let mobilePlayPanel = document.getElementById('mobilePlayPanel');
    mobilePlayPanel.classList.add('dnone');
}


/**
 * Toggles sound on or off based on the current state.
 * Changes the icon and plays or pauses background music.
 */
function toggleSound() {
    let iconSound = document.getElementById('iconSound');
    world.soundManager.toggleSound();
    let soundOffPath = 'icons/sound-off.png';
    let soundOnPath = 'icons/sound-play.png';
    if (soundOn) {
        setSoundOff(iconSound, soundOffPath);
    } else {
        setSoundOn(iconSound, soundOnPath);
    }
}


/**
 * Sets the sound to "off", pauses the background music, and updates the sound icon.
 * @param {HTMLElement} iconSound - The icon element for sound.
 * @param {string} soundOffPath - Path to the sound off icon.
 */
function setSoundOff(iconSound, soundOffPath) {
    soundOn = false;
    iconSound.src = soundOffPath;
    bgMusic.pause();
}


/**
 * Sets the sound to "on", plays the background music, and updates the sound icon.
 * @param {HTMLElement} iconSound - The icon element for sound.
 * @param {string} soundOnPath - Path to the sound on icon.
 */
function setSoundOn(iconSound, soundOnPath) {
    soundOn = true;
    iconSound.src = soundOnPath;
    bgMusic.play();
}


/**
 * Toggles fullscreen mode on or off.
 * Changes the fullscreen icon based on the current state.
 */
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


/**
 * Enters fullscreen mode for the provided element.
 * @param {HTMLElement} element - The element to display in fullscreen.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}


/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}


/**
 * Closes the description screen.
 */
function closeDescription() {
    let infoScreen = document.getElementById('infoScreen');
    infoScreen.classList.add('dnone');
}


/**
 * Opens the description screen.
 */
function openDescription() {
    let infoScreen = document.getElementById('infoScreen');
    infoScreen.classList.remove('dnone');
}


/**
 * Closes the impressum screen.
 */
function closeImpressum() {
    let impressumScreen = document.getElementById('impressumScreen');
    impressumScreen.classList.add('dnone');
}


/**
 * Opens the impressum screen.
 */
function openImpressum() {
    let impressumScreen = document.getElementById('impressumScreen');
    impressumScreen.classList.remove('dnone');
}


/**
 * Prevents event bubbling for the provided event.
 * @param {Event} event - The event to stop from bubbling.
 */
function bubblingProtection(event) {
    event.stopPropagation();
}


/**
 * Clears all intervals that are currently running.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


/**
 * Displays the win screen and hides all other UI elements.
 */
function showWinScreen() {
    let endScreenWin = document.getElementById('endScreenWin');
    endScreenWin.classList.remove('dnone');
    hideControls();
    hideMobilePlayPanel();
    bgMusic.pause();
}


/**
 * Displays the game over screen and hides all other UI elements.
 */
function showGameOverScreen() {
    let endScreenLost = document.getElementById('endScreenLost');
    endScreenLost.classList.remove('dnone');
    hideControls();
    hideMobilePlayPanel();
    bgMusic.pause();
}


/**
 * Resets the game to the home screen, initializes level 1, and starts a new world instance.
 */
function goHome() {
    hideAllScreens();
    showStartScreen();
    hideControls();
    hideMobilePlayPanel();
    initLevel1();
    world = new World(canvas, keyboard);
    gameStarted = false;
}


/**
 * Hides all the game over and win screens.
 */
function hideAllScreens() {
    let endScreenWin = document.getElementById('endScreenWin');
    endScreenWin.classList.add('dnone');
    let endScreenLost = document.getElementById('endScreenLost');
    endScreenLost.classList.add('dnone');
}


/**
 * Restarts the game by hiding all screens, initializing level 1, and starting a new world instance.
 */
function restartGame() {
    hideAllScreens();
    initLevel1();
    gameStarted = false;
    world = new World(canvas, keyboard);
    bgSound();
    startGame();
}


/**
 * Plays background music if sound is enabled.
 * @returns {void}
 */
function bgSound() {
    if (soundOn) {
        bgMusic.play();
    }
}


/**
 * Shows the start screen and stops the background music if the game is not started.
 */
function showStartScreen() {
    let startScreen = document.getElementById('startScreen');
    startScreen.classList.remove('dnone');
    bgMusic.pause();
    gameStarted = false;
}


/**
 * Hides the control elements.
 */
function hideControls() {
    let controls = document.getElementById('controls');
    controls.classList.add('dnone');
}


/**
 * Shows the control elements.
 */
function showControls() {
    let controls = document.getElementById('controls');
    controls.classList.remove('dnone');
}