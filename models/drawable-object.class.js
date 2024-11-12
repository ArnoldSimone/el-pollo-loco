class DrawableObject {
    x = 120;
    y = 250;
    height = 100;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss || this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}