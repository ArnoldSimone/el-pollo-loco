class World {

    character = new Character();  // hier legen wir Pepe an von der Schablone Character
    enemies = [   // hier fügen wir drei Chicken ein von der Schablone Chicken
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0)
    ]
    canvas;
    ctx;
    keyboard;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    // in dieser Funktion zeichnen wir alle Objekte
    draw() {
        // Canvas leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // draw BackgroundObjects
        this.addObjectsToMap(this.backgroundObjects);
        // draw Character
        this.addToMap(this.character);
        // draw Chickens
        this.addObjectsToMap(this.enemies);
        // draw Clouds
        this.addObjectsToMap(this.clouds);

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
            this.ctx.save(); // speichern wir die aktuellen Einstellungen von unserem Context. die nächsten Bilder wollen wir ja wieder gerade einfügen
            this.ctx.translate(mo.width, 0); // hier verändern wir die Methode, wie wir die Bilder einfügen. Um Canvasbreite mo.width verschieben. 
            this.ctx.scale(-1, 1);  // drehen das ganze um an der y-Achse. wir spiegel alles.
            mo.x = mo.x * -1; // hier drehen wir die x-Koordinate um wo wir das ganze einfügen.
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}


