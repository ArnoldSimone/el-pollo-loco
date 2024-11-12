class ChickenSmall extends MovableObject {
    y = 380;
    width = 40;
    height = 40;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * 2300;
        this.speed = 0.15 + Math.random() * 0.25;  // Zufällige Zahl zwischen 0.15 und 0.25
        this.animate();
        this.applyGravity();
    }

    animate() {

        setInterval(() => {
            // move left
            this.moveLeft();
        }, 1000 / 60);

        let randomDelay = Math.random() * 3000;
        setTimeout(() => {
            this.jumpChickenSmall();
        }, randomDelay);

        setInterval(() => {
            // walk animation
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    jumpChickenSmall() {
        let randomInterval = Math.random() * (6000 - 3000) + 2000;  // Intervall zwischen 2 und 6 Sekunden
        setInterval(() => {
            this.speedY = 20; // Setzt die Sprungkraft
        }, randomInterval);
    }



}

