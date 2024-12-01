/**
 * Represents the Endboss in the game, which is a large enemy with various states such as walking, alert, attacking, and dying.
 * The Endboss can move, attack, be hurt, and eventually die, with corresponding animations and sound effects for each state.
 */
class Endboss extends MovableObject {
    y = 50;
    width = 300;
    height = 400;
    x = 2500;
    offset = {
        top: 80,
        bottom: 60,
        left: 40,
        right: 60
    };
    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    soundManager = new SoundManager();
    endboss_hit_sound = new Audio('audio/endboss-hit.mp3');
    endboss_dead_sound = new Audio('audio/win.mp3');
    deadSoundPlayed = false;
    attackTriggered = false;
    attackStartTime = 0;
    attackDuration = 2000;
    jumpTriggered = false;

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 2;
        this.animate();
        this.applyGravity();
        this.soundManager = world.soundManager;
        this.soundManager.registerSound(this.endboss_hit_sound);
        this.soundManager.registerSound(this.endboss_dead_sound);
    }


    /**
     * Starts the animation loops for the Endboss, including movement, attack, and dead state.
     * @returns {void}
     */
    animate() {
        setInterval(() => this.moveLeftEndboss(), 1000 / 60);
        setInterval(() => {
            this.attackEndboss();
            this.deadJumpEndboss();
        }, 120);
        setInterval(() => this.playAnimationEndboss(), 200);
    }


    /**
      * Handles the Endboss's attack animation and resets the attack state after the attack duration.
      */
    attackEndboss() {
        if (this.attackTriggered && !this.isHurt()) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.speed = 4;
            if (Date.now() - this.attackStartTime >= this.attackDuration) {
                this.attackTriggered = false;
                this.speed = 1;
                this.currentImage = 0;
            }
        }
    }


    /**
     * Moves the Endboss to the left if it is in a defensive state and is not dead or hurt.
     */
    moveLeftEndboss() {
        if (this.defenseEndbossStart() && !this.isDead() && !this.isHurt()) {
            this.moveLeft();
            this.world.showEndbossStatus = true;
        }
    }


    /**
     * Makes the Endboss "jump" when it dies and plays the dead sound effect.
     */
    deadJumpEndboss() {
        if (this.isDead() && !this.deadSoundPlayed) {
            this.deadSoundPlayed = true;
            this.jump();
        }
    }


    /**
     * Plays the appropriate animation for the Endboss based on its current state (Dead, Hurt, Walking, Alert).
     */
    playAnimationEndboss() {
        if (this.isDead()) {
            this.playDeadEndboss();
        } else if (this.isHurt() && !this.isDead()) {
            this.playHurtEndboss();
        } else if (this.defenseEndbossStart() && !this.isDead() && !this.isHurt() && !this.attackTriggered) {
            this.playAnimation(this.IMAGES_WALK);
        } else if (!this.isDead() && !this.isHurt() && !this.defenseEndbossStart()) {
            this.playAnimation(this.IMAGES_ALERT);
        }
    }


    /**
    * Plays the dead animation for the Endboss and triggers the dead sound effect.
    */
    playDeadEndboss() {
        this.playAnimation(this.IMAGES_DEAD);
        this.soundManager.playSound(this.endboss_dead_sound);
        setTimeout(() => {
            this.endboss_dead_sound.pause();
        }, 4000);
    }


    /**
     * Plays the hurt animation for the Endboss and triggers the hit sound effect.
     */
    playHurtEndboss() {
        this.soundManager.playSound(this.endboss_hit_sound);
        this.playAnimation(this.IMAGES_HURT);
        this.attackTriggered = true;
        this.attackStartTime = Date.now();
    }
}
