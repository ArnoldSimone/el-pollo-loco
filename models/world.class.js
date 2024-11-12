class World {
    character = new Character();  // hier legen wir Pepe an von der Schablone Character
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0; // hier sage ich um wieviel ich die Kamera nach links verschieben möchte
    statusBarBottle = new StatusBarBottle();
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    throwableObjects = [];

    collectedBottles = 0;

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
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionsBottle();
        }, 100);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.collectedBottles -= 10;
            this.statusBarBottle.setPercentage(this.collectedBottles);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        })
    }

    checkCollisionsBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.collectedBottles += 10;
                this.statusBarBottle.setPercentage(this.collectedBottles);
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
        // draw Character
        this.addToMap(this.character);
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


