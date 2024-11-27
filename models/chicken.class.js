/**
 * Represents a chicken enemy in the game. The chicken moves left across the screen and can be killed.
 * When the chicken is killed, it plays a death sound and stops moving.
 */
class Chicken extends MovableObject {
    y = 360;
    width = 60;
    height = 60;
    offset = {
        top: 8,
        bottom: 0,
        left: 5,
        right: 5
    };
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
        this.speed = 0.15 + Math.random() * 0.4;
        this.animate();
        this.soundManager = world.soundManager;
        this.soundManager.registerSound(this.chicken_dead_sound);
    }


    /**
     * Starts the chicken's movement and animation.
     * The chicken will move and play its walking animation at specified intervals.
     */
    animate() {
        setInterval(() => this.moveChicken(), 1000 / 60);
        setInterval(() => this.playMoveLeftChicken(), 200);
    }


    /**
     * Changes the state of the chicken to dead, plays the death sound, and removes the chicken from the game.
     */
    enemyIsDead() {
        this.chickenIsDead = true;
        this.soundManager.playSound(this.chicken_dead_sound);
        this.loadImage(this.IMAGE_DEAD_CHICKEN);
        this.removeChicken();
    }


    /**
     * Moves the chicken to the left. The chicken will only move if it is not dead.
     */
    moveChicken() {
        if (!this.chickenIsDead) {
            this.moveLeft();
        }
    }


    /**
     * Plays the walking animation for the chicken. 
     * The animation is only played if the chicken is not dead.
     */
    playMoveLeftChicken() {
        if (!this.chickenIsDead) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    /**
     * Removes the chicken from the level's list of enemies after a delay.
     * This method is called after the chicken is dead.
     */
    removeChicken() {
        setTimeout(() => {
            let index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }, 500);
    }
}

