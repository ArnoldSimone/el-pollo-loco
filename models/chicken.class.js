class Chicken extends MovableObject {
    y = 360;
    width = 60;
    height = 60;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD_CHICKEN = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    chickenIsDead = false;

    chicken_dead_sound = new Audio('audio/chicken-dead.mp3');

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        this.x = 300 + Math.random() * 2300;
        this.speed = 0.15 + Math.random() * 0.4;  // Zufällige Zahl zwischen 0.15 und 0.4
        this.animate();
        this.soundManager = world.soundManager;
        this.soundManager.registerSound(this.chicken_dead_sound);
    }

    animate() {
        setInterval(() => {
            if (!this.chickenIsDead) {
                this.moveLeft();
            } else {
                this.loadImage(this.IMAGE_DEAD_CHICKEN);
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.chickenIsDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    enemyIsDead() {
        this.chickenIsDead = true;
        this.soundManager.playSound(this.chicken_dead_sound);
        setTimeout(() => {
            let index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }, 500);
    }
}

