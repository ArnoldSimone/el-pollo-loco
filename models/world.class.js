/**
 * World class represents the game world, including the character, level, 
 * status bars, enemies, and all game objects. It controls game logic, 
 * collisions, and rendering.
 */
class World {
    character;
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarBottle = new StatusBarBottle();
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    collectedBottles = 0;
    collectedCoins = 0;
    coin_sound = new Audio('audio/coin.mp3');
    collect_bottle_sound = new Audio('audio/collect-bottle.mp3');
    character_hurt_sound = new Audio('audio/hurt.mp3');
    defenseStart = false;
    endbossFirstHit = false;
    showEndbossStatus = false;
    soundManager;
    gameOver = false;

    /**
     * Creates an instance of the World class.
     * @param {HTMLCanvasElement} canvas - The HTML canvas element used to render the game.
     * @param {Object} keyboard - The keyboard input object for handling player input.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.soundManager = new SoundManager();
        this.soundManager.registerSound(this.coin_sound);
        this.soundManager.registerSound(this.collect_bottle_sound);
        this.soundManager.registerSound(this.character_hurt_sound);
        this.collisionHandler = new CollisionHandler(this);
    }


    /**
     * Starts the game, initializing the level, character, and other components.
     */
    startGame() {
        initLevel1();
        this.level = level1;
        this.character = new Character(this);
        this.character.soundManager = this.soundManager;
        this.level.enemies.forEach(enemy => {
            enemy.soundManager = this.soundManager;
        });
        this.throwableObjects.soundManager = this.soundManager;
        this.setWorld();
        this.draw();
        this.run();
    }


    /**
     * Sets the world context for the character and enemies.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }


    /**
     * Starts the game loop by initiating the main game loop and character loop.
     */
    run() {
        this.startMainGameLoop();
        this.startCharacterLoop();
    }


    /**
     * Starts the main game loop that checks for various game states and collisions.
     */
    startMainGameLoop() {
        setInterval(() => {
            this.checkThrowObjects();
            this.collisionHandler.checkCollisionsBottle();
            this.collisionHandler.checkCollisionsCoin();
            this.checkdefenseEndboss();
            this.checkEndbossDeath();
            this.checkCharacterDeath();
        }, 100);
    }


    /**
     * Starts the character loop to check for actions like jumping and collisions.
     */
    startCharacterLoop() {
        setInterval(() => {
            this.collisionHandler.checkJumpOfChicken();
            this.collisionHandler.checkCollisionsChicken();
            this.collisionHandler.checkCollisionBottleAndChicken();
            this.collisionHandler.checkCollisionBottleAndGround();
        }, 1000 / 60);
    }


    /**
     * Handles throwing a bottle when the player presses the 'D' key.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            let bottle;
            if (this.character.otherDirection) {
                bottle = new ThrowableObject(this.character.x, this.character.y + 120, this.character, this.keyboard);
            } else {
                bottle = new ThrowableObject(this.character.x + 80, this.character.y + 120, this.character, this.keyboard);
            }
            this.throwableObjects.push(bottle);
            this.collectedBottles -= 20;
            this.statusBarBottle.setPercentage(this.collectedBottles);
        }
    }


    /**
     * Checks if the endboss has started its defense phase.
     */
    checkdefenseEndboss() {
        if (this.character.x > 2200 && !this.defenseStart || this.endbossFirstHit == true) {
            this.defenseStart = true;
        }
    }


    /**
     * Checks if the endboss has died and triggers the game over state.
     */
    checkEndbossDeath() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss && endboss.isDead()) {
            this.gameOver = true;
            setTimeout(() => {
                showWinScreen();
                clearAllIntervals();
            }, 1500);
        }
    }


    /**
     * Checks if the character has died and triggers the game over state.
     */
    checkCharacterDeath() {
        if (this.character.isDead()) {
            this.gameOver = true;
            setTimeout(() => {
                showGameOverScreen();
                clearAllIntervals();
            }, 1500);
        }
    }


    /**
     * Renders the game world.
     */

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawLayers(this);
        this.drawMovingObjects(this);
        this.drawStatusBars(this);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        this.drawEndbossStatus(this);
        this.requestNextFrame(this);
    };


    /**
     * Requests the next frame to be drawn, enabling continuous rendering.
     */
    requestNextFrame() {
        requestAnimationFrame(() => this.draw());
    }


    /**
     * Draws the endboss status bar if enabled.
     */
    drawEndbossStatus() {
        if (this.showEndbossStatus) {
            this.addToMap(this.statusBarEndboss);
        }
    }


    /**
     * Draws each layer of the game world.
     */
    drawLayers() {
        this.drawLayer(this.level.airObjects, 0.3);
        this.drawLayer(this.level.thirdLayerObjects, 0.6);
        this.drawLayer(this.level.secondLayerObjects, 0.8);
        this.drawLayer(this.level.firstLayerObjects, 1);
    }


    /**
     * Draws a specific layer of the game world with the given speed factor.
     * @param {Array} objects - The objects in the layer to be drawn.
     * @param {number} speed - The speed factor for parallax scrolling.
     */
    drawLayer(objects, speed) {
        this.ctx.translate(this.camera_x * speed, 0);
        this.addObjectsToMap(objects);
        this.ctx.translate(-this.camera_x * speed, 0);
    }


    /**
     * Draws all moving objects in the game world.
     */
    drawMovingObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * Draws all status bars (health, bottle, coin).
     */
    drawStatusBars() {
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
    }


    /**
      * Adds a list of objects to the canvas.
      * @param {Array} objects - The objects to be added to the canvas.
      */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    /**
     * Adds an individual object to the canvas.
     * @param {Object} mo - The object to be drawn.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * Flips the image horizontally for objects facing the opposite direction.
     * @param {Object} mo - The object to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Restores the object to its original orientation after flipping.
     * @param {Object} mo - The object to be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}



