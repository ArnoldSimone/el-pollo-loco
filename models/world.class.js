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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.soundManager = new SoundManager();
        this.soundManager.registerSound(this.coin_sound);
        this.soundManager.registerSound(this.collect_bottle_sound);
        this.soundManager.registerSound(this.character_hurt_sound);
    }

    startGame() {
        initLevel1();
        this.level = level1;
        this.character = new Character(this);
        this.character.soundManager = this.soundManager;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof ChickenSmall) {
                enemy.soundManager = this.soundManager;  // SoundManager an alle Enemies übergeben
            }
        });
        this.throwableObjects.soundManager = this.soundManager;
        this.setWorld();
        this.draw();
        this.run();
    }


    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }

    run() {
        setInterval(() => {
            this.checkThrowObjects();
            this.checkCollisionsBottle();
            this.checkCollisionsCoin();
            this.checkCollisionBottleAndGround();
            this.checkdefenseEndboss();
            this.checkEndbossDeath();
            this.checkCharacterDeath();
            this.checkCollisionBottleAndChicken();
        }, 100);
        setInterval(() => {
            this.checkJumpOfChicken();
            this.checkCollisionsChicken();
        }, 1000 / 60);
    }


    checkCollisionBottleAndGround() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            if (bottle.y > 360) {
                bottle.playAnimation(bottle.IMAGES_BOTTLE_SPLASH);
                this.soundManager.playSound(bottle.brocken_bottle_sound);
                this.throwableObjects.splice(bottleIndex, 1);
            }
        });
    }

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

    checkCollisionsChicken() {
        let handleFirstContact = false;
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isJumpOfChicken(enemy)) {
                if (!handleFirstContact) {
                    this.character.hit();
                    this.soundManager.playSound(this.character_hurt_sound);
                    this.statusBarHealth.setPercentage(this.character.energy);
                    this.character.speedX = -15;
                    this.character.checkCollisionDirection(enemy);
                    handleFirstContact = true;
                }
            }
        });
    }

    checkJumpOfChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumpOfChicken(enemy) && this.character.isAboveGround() && this.character.speedY < 0) {
                this.character.speedY = 0;
                enemy.enemyIsDead();
                this.character.jump();
            }
        })
    }

    checkCollisionsBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.soundManager.playSound(this.collect_bottle_sound);
                this.collectedBottles += 20;
                this.statusBarBottle.setPercentage(this.collectedBottles);
            }
        })
    }

    checkCollisionBottleAndChicken() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
                        enemy.enemyIsDead();
                        bottle.playAnimation(bottle.IMAGES_BOTTLE_SPLASH);
                        this.throwableObjects.splice(bottleIndex, 1);
                    }
                    if (enemy instanceof Endboss) {
                        bottle.playAnimation(bottle.IMAGES_BOTTLE_SPLASH);
                        this.endbossFirstHit = true;
                        enemy.hit();
                        this.throwableObjects.splice(bottleIndex, 1);
                        setTimeout(() => {
                            this.throwableObjects.splice(bottleIndex, 1);
                        }, 500);
                        this.statusBarEndboss.setPercentage(enemy.energy);
                    }
                }
            });
        });
    }


    checkdefenseEndboss() {
        if (this.character.x > 2200 && !this.defenseStart || this.endbossFirstHit == true) {
            this.defenseStart = true;
        }
    }

    checkCollisionsCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.soundManager.playSound(this.coin_sound);
                this.level.coins.splice(index, 1);
                this.collectedCoins += 5;
                this.statusBarCoin.setPercentage(this.collectedCoins);
            }
        })
    }

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

    checkCharacterDeath() {
        if (this.character.isDead()) {
            this.gameOver = true;
            setTimeout(() => {
                showGameOverScreen();
                clearAllIntervals();
            }, 1500);
        }
    }


    // in dieser Funktion zeichnen wir alle Objekte
    draw() {
        // Canvas leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Ausschnitt um x nach links verschieben
        this.ctx.translate(this.camera_x, 0);
        // draw BackgroundObjects
        this.addObjectsToMap(this.level.backgroundObjects);
        // draw Clouds
        this.addObjectsToMap(this.level.clouds);
        // draw Bottles
        this.addObjectsToMap(this.level.bottles);
        // draw Coins
        this.addObjectsToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.ctx.translate(this.camera_x, 0);

        // draw Character
        this.addToMap(this.character);
        // draw Chickens
        this.addObjectsToMap(this.level.enemies);

        // draw bottle
        this.addObjectsToMap(this.throwableObjects);
        // Ausschnitt um x nach rechts verschieben
        this.ctx.translate(-this.camera_x, 0);
        // draw StatusBar


        if (this.showEndbossStatus) {
            this.addToMap(this.statusBarEndboss);
        }

        // durch diese Funktion wird draw() immer wieder aufgerufen.
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {  // Wenn Objekt eine andere Richtung hat. 
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save(); // speichern wir die aktuellen Einstellungen von unserem Context. die nächsten Bilder wollen wir ja wieder gerade einfügen
        this.ctx.translate(mo.width, 0); // hier verändern wir die Methode, wie wir die Bilder einfügen. Um Canvasbreite mo.width verschieben. 
        this.ctx.scale(-1, 1);  // drehen das ganze um an der y-Achse. wir spiegel alles.
        mo.x = mo.x * -1; // hier drehen wir die x-Koordinate um wo wir das ganze einfügen.
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}


