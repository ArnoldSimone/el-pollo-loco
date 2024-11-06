class MovableObject {
    x = 120;
    y = 250;
    height = 100;
    width = 100;
    img;
    speed = 0.15;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;

    // ladet  1 Bild
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    // Hier laden wir alle Bilder in das Json (imageCache).
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();  // legen Variable an mit einem neuen Bild
            img.src = path; // hier laden wir das Bild in das Image-Object
            this.imageCache[path] = img; // imageCache updaten -> imageCache[path] path ist hier der Schlüssel
        });
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        setInterval(() => {
            this.x = this.x - this.speed;
        }, 1000 / 60);  // 60x/Sekunde werden die Wolken um 0,15 Pixel nach Links verschoben
    }
}