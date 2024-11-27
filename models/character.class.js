/**
 * Represents a character in the game with various states such as walking, jumping, idle, and dead.
 * Handles animations, movement, sounds, and interactions with the environment.
 */
class Character extends MovableObject {
    width = 120;
    height = 270;
    y = 160;
    x = 100;
    speed = 6;
    speedJump = 25;
    inactivityTimer = 0;
    offset = {
        top: 120,
        bottom: 10,
        left: 25,
        right: 30
    };
    world;
    walking_sound = new Audio('audio/walking.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    snoring_sound = new Audio('audio/snoring.mp3');
    game_over_sound = new Audio('audio/game-over.mp3');
    isDeadState = false;
    jumpAfterDeath = false;
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


    /**
     * Creates an instance of the Character class and initializes the character.
     */
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
        this.applyHit();
        this.setCorrectGround();
        this.soundManager = world.soundManager;
        this.soundManager.registerSound(this.walking_sound);
        this.soundManager.registerSound(this.jump_sound);
        this.soundManager.registerSound(this.snoring_sound);
        this.soundManager.registerSound(this.game_over_sound);
    }


    /**
     * Starts the animation loops for character movement and actions.
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playMovementCharacter(), 70);
        setInterval(() => this.playJumpCharacter(), 100);
        setInterval(() => this.playIdleCharacter(), 200);
        setInterval(() => this.playSleepCharacter(), 500);
    }


    /**
    * Plays the character's sleep animation and snoring sound if inactive for too long.
    */
    playSleepCharacter() {
        if (this.inactivityTimer > 360 && !this.isDead()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            this.soundManager.playSound(this.snoring_sound);
        } else {
            this.snoring_sound.pause();
        }
    }


    /**
     * Plays the character's idle animation if the character is not moving or jumping.
     */
    playIdleCharacter() {
        if (!this.isAboveGround() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE && !this.world.keyboard.D && this.inactivityTimer < 360) {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }


    /**
     * Plays the character's jumping animation if the character is in the air.
     */
    playJumpCharacter() {
        if (this.isAboveGround() && !this.isDead()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }


    /**
     * Plays the appropriate movement or action animation based on the character's state.
     */
    playMovementCharacter() {
        if (this.isDead() && this.isDeadState) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt() && !this.isDeadState) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (!this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
            this.playAnimation(this.IMAGES_WALKING);
        }
        if (this.characterIsDead()) {
            this.playDead();
        }
    }


    /**
     * Moves the character and handles various states like death and jumping after death.
     */
    moveCharacter() {
        this.walking_sound.pause();
        this.handleDeathState();
        if (this.characterIsDead()) this.playDead();
        if (!this.isDeadState) {
            if (this.canMoveRight()) this.moveRight();
            if (this.canMoveLeft()) this.moveLeft();
            if (this.canJump()) this.jump();
            if (this.canResetTimer()) this.inactivityTimer = 0;
        }
        if (this.startInactivityTimer()) this.inactivityTimer++;
        this.world.camera_x = -this.x + 100;
    }


    /**
    * Checks if the character is inactive and should trigger the inactivity timer.
    * @returns {boolean} True if the character is inactive.
    */
    startInactivityTimer() {
        return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE && !this.world.keyboard.D && !this.isAboveGround();
    }


    /**
     * Determines if the character can move to the right.
     * @returns {boolean} True if the character can move right.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }


    /**
     * Determines if the character can move to the left.
     * @returns {boolean} True if the character can move left.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -600;
    }


    /**
     * Determines if the character can jump.
     * @returns {boolean} True if the character can jump.
    */
    canJump() {
        return (this.world.keyboard.SPACE) && !this.isAboveGround();
    }


    /**
     * Determines if the inactivity timer can be reset based on key presses or other states.
     * @returns {boolean} True if the inactivity timer can be reset.
     */
    canResetTimer() {
        return this.world.keyboard.D || this.world.keyboard.SPACE || this.world.keyboard.LEFT || this.world.keyboard.RIGHT || this.isHurt() || this.isAboveGround();
    }


    /**
     * Checks if the character is dead and should be handled accordingly.
     * @returns {boolean} True if the character is dead.
     */
    characterIsDead() {
        return this.isDead() && this.isDeadState && this.jumpAfterDeath;
    }


    /**
     * Moves the character to the right.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround()) {
            this.soundManager.playSound(this.walking_sound);
        }
    }


    /**
     * Moves the character to the left.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        if (!this.isAboveGround()) {
            this.soundManager.playSound(this.walking_sound);
        }
    }


    /**
     * Makes the character jump.
     */
    jump() {
        super.jump();
        this.walking_sound.pause();
        this.soundManager.playSound(this.jump_sound);
    }


    /**
     * Plays the "dead" animation and triggers the game over sound.
     */
    playDead() {
        this.jump();
        this.jumpAfterDeath = false;
        this.soundManager.playSound(this.game_over_sound);
    }


    /**
     * Handles the character's death state, setting flags when the character is dead.
     */
    handleDeathState() {
        if (this.isDead() && !this.isDeadState) {
            this.isDeadState = true;
            this.jumpAfterDeath = true;
        }
    }
}