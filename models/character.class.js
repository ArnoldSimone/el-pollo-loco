class Character extends MovableObject {
    width = 120;
    height = 270;
    y = 160;
    x = 100;
    speed = 6;
    speedJump = 30;
    inactivityTimer = 0;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'

    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    world;
    walking_sound = new Audio('audio/walking.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    snoring_sound = new Audio('audio/snoring.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.animate();
        this.applyGravity();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
                this.inactivityTimer = 0;
            }
            if (this.world.keyboard.LEFT && this.x > -600) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
                this.inactivityTimer = 0;
            }
            if ((this.world.keyboard.SPACE) && !this.isAboveGround()) {
                this.jump();
                this.walking_sound.pause();
                this.jump_sound.play();
                this.inactivityTimer = 0;
            }

            this.world.camera_x = -this.x + 100;
            this.world.camera_x_slow = -this.x * this.world.speed_slow + 100;
            if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE && !this.world.keyboard.D && !this.isAboveGround()) {
                this.inactivityTimer++; // Increment the inactivity timer
            }
            if (this.world.keyboard.D) {
                this.inactivityTimer = 0;
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                // is dead
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                // walk animation
                this.playAnimation(this.IMAGES_HURT);
            } else {
                if (!this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                    // walk animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 70);

        setInterval(() => {
            if (this.isAboveGround()) {
                // jump animation
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 100);
        setInterval(() => {
            if (!this.isAboveGround() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE && !this.world.keyboard.D && this.inactivityTimer < 360) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 200);

        setInterval(() => {
            if (this.inactivityTimer > 360) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
                // this.snoring_sound.play();
            } else {
                this.snoring_sound.pause();
            }
        }, 500);



    }



}