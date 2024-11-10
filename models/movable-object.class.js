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
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;  // hier verändern wir die y-Position
                this.speedY -= this.acceleration; // hier verändern wir die Geschwindigkeit
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 160;
    }

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
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // character.isCollining(chicken);
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in sec
        return timepassed < 1;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

}