class Cloud extends MovableObject {
    y = 0;
    width = 500;
    height = 350;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = -720 + Math.random() * 3600;
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