class ChickenSmall extends MovableObject {
    y = 380;
    width = 40;
    height = 40;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGEG_DEAD_CHICKEN_SMALL = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    chickenIsDead = false;

    chickenSmall_dead_sound = new Audio('audio/chicken-small-dead.mp3');

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
        this.x = 300 + Math.random() * 2300;
        this.speed = 0.15 + Math.random() * 0.25;  // Zufällige Zahl zwischen 0.15 und 0.25
        this.animate();
        this.applyGravity();
        this.soundManager = world.soundManager;
        this.soundManager.registerSound(this.chickenSmall_dead_sound);
    }

    animate() {
        setInterval(() => {
            if (!this.chickenIsDead) {
                this.moveLeft();
            } else {
                this.loadImage(this.IMAGEG_DEAD_CHICKEN_SMALL);
                this.speedY = 0;
            }
        }, 1000 / 60);

        let randomDelay = Math.random() * 3000;
        setTimeout(() => {
            if (!this.chickenIsDead) {
                this.jumpChickenSmall();
            }
        }, randomDelay);

        setInterval(() => {
            if (!this.chickenIsDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    jumpChickenSmall() {
        if (!this.chickenIsDead) {
            let randomInterval = Math.random() * (6000 - 3000) + 2000;
            setInterval(() => {
                this.speedY = 15;
            }, randomInterval);
        }
    }

    enemyIsDead() {
        this.chickenIsDead = true;
        this.soundManager.playSound(this.chickenSmall_dead_sound);
        setTimeout(() => {
            let index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }, 500);
    }
}

