/**
 * Represents a smaller chicken enemy in the game. This chicken walks, occasionally jumps, and can be killed.
 * When the chicken is killed, it plays a death sound and stops moving.
 */
class ChickenSmall extends MovableObject {
    y = 380;
    width = 40;
    height = 40;
    offset = {
        top: 8,
        bottom: 0,
        left: 0,
        right: 0
    };
    IMAGEG_DEAD_CHICKEN_SMALL = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    chickenIsDead = false;
    chickenSmall_dead_sound = new Audio('audio/chicken-small-dead.mp3');
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
        this.x = 300 + Math.random() * 2300;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        this.applyGravity();
        this.soundManager = world.soundManager;
        this.soundManager.registerSound(this.chickenSmall_dead_sound);
    }


    /**
     * Starts the small chicken's movement, jumping, and walking animations.
     * The chicken will move left, randomly jump, and play its walking animation at specified intervals.
     */
    animate() {
        setInterval(() => this.moveChickenSmall(), 1000 / 60);
        let randomDelay = Math.random() * 3000;
        setTimeout(() => this.isJumpChickenSmall(), randomDelay);
        setInterval(() => this.playMoveLeftChickenSmall(), 200);
    }


    /**
     * Moves the small chicken to the left. The chicken will only move if it is not dead.
     * When dead, it stops moving vertically.
     */
    moveChickenSmall() {
        if (!this.chickenIsDead) {
            this.moveLeft();
        } else {
            this.speedY = 0;
        }
    }


    /**
     * Plays the walking animation for the small chicken. 
     * The animation is only played if the chicken is not dead.
     */
    playMoveLeftChickenSmall() {
        if (!this.chickenIsDead) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    /**
     * Changes the state of the small chicken to dead, plays the death sound, and removes the chicken from the game.
     */
    isJumpChickenSmall() {
        if (!this.chickenIsDead) {
            let randomInterval = Math.random() * (6000 - 3000) + 2000;
            setInterval(() => {
                this.speedY = 15;
            }, randomInterval);
        }
    }


    /**
     * Changes the state of the small chicken to dead, plays the death sound, and removes the chicken from the game.
     */
    enemyIsDead() {
        this.chickenIsDead = true;
        this.soundManager.playSound(this.chickenSmall_dead_sound);
        this.loadImage(this.IMAGEG_DEAD_CHICKEN_SMALL);
        this.removeChicken();
    }


    /**
   * Removes the small chicken from the level's list of enemies after a short delay.
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

