class Cloud extends MovableObject {
    y = 0;
    width = 500;
    height = 350;

    constructor(image, x) {
        super().loadImage(image);
        this.x = x;
        // this.x = -720 + Math.random() * 3600;
        this.animate();
    }


    animate() {
        this.moveLeft();
    }


    moveLeft() {
        setInterval(() => {
            this.x = this.x - this.speed;
        }, 1000 / 60);  // 60x/Sekunde werden die Wolken um 0,15 Pixel nach Links verschoben
    }
}