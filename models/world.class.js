class World {

    character = new Character();  // hier legen wir Pepe an von der Schablone Character

    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0; // hier sage ich um wieviel ich die Kamera nach links verschieben möchte


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');  // hiermit kann mann einfach Dinge auf der Canvas zeichnen
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                }
            })
        }, 200);
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
        // draw Character
        this.addToMap(this.character);
        // draw Chickens
        this.addObjectsToMap(this.level.enemies);

        // Ausschnitt um x nach rechts verschieben
        this.ctx.translate(-this.camera_x, 0);

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


