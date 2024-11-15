class World {
    character = new Character();
    endboss = new Endboss(this.world);
    level = level1;
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
    brocken_bottle_sound = new Audio('audio/broken-bottle.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    defenseStart = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');  // hiermit kann mann einfach Dinge auf der Canvas zeichnen
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }

    run() {
        setInterval(() => {
            this.checkCollisionsChicken();
            this.checkCollisionsEndboss();
            this.checkThrowObjects();
            this.checkCollisionsBottle();
            this.checkCollisionsCoin();
            this.checkCollisionBottleAndChicken();
            this.checkCollisionBottleAndEndboss();
        }, 100);
        setInterval(() => {
            this.checkJumpOfChicken();
            this.checkdefenseEndboss();
        }, 1000 / 60);
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
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isJumpOfChicken(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        })
    }

    checkCollisionsEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }

    checkJumpOfChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumpOfChicken(enemy) && this.character.isAboveGround() && this.character.speedY < 0) {
                enemy.die();
                this.character.jump();
            }
        })
    }

    checkCollisionsBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.collectedBottles += 20;
                this.statusBarBottle.setPercentage(this.collectedBottles);
            }
        })
    }

    checkCollisionBottleAndChicken() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy)) {
                    enemy.die();
                    this.throwableObjects.splice(bottleIndex, 1);
                }
            });
        });
    }

    checkCollisionBottleAndEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(this.endboss)) {
                this.endboss.hit();
                this.statusBarEndboss.setPercentage(this.endboss.energy);
                this.brocken_bottle_sound.play();
            }
        });
    }

    checkdefenseEndboss() {
        if (this.character.x > 2000 && !this.defenseStart) {
            this.defenseStart = true;
        }
    }


    checkCollisionsCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coin_sound.play();
                this.level.coins.splice(index, 1);
                this.collectedCoins += 5;
                this.statusBarCoin.setPercentage(this.collectedCoins);
            }
        })
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
        // draw Character
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        // draw Chickens
        this.addObjectsToMap(this.level.enemies);

        // draw bottle
        this.addObjectsToMap(this.throwableObjects);
        // Ausschnitt um x nach rechts verschieben
        this.ctx.translate(-this.camera_x, 0);
        // draw StatusBar
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarEndboss);
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


