/**
 * Represents a throwable object (such as a bottle) in the game.
 * The object rotates during flight and creates a splash animation when it hits a surface.
 */
class ThrowableObject extends MovableObject {

    IMAGES_BOTTLE_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    brocken_bottle_sound = new Audio('audio/broken-bottle.mp3');

    constructor(x, y, character, keyboard) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 40;
        this.character = character;
        this.keyboard = keyboard;
        this.throw();
        this.applyGravity();
        this.speedY = 25;
        this.soundManager = world.soundManager;
        this.soundManager.registerSound(this.brocken_bottle_sound);
    }


    /**
     * Initiates the throwing action by setting the object's speed and starting the animation.
     * Updates the x-coordinate of the object to move it along the screen.
     */
    throw() {
        this.setSpeedX();
        setInterval(() => {
            this.x += this.speedX;
        }, 25);
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
        }, 100);
    }


    /**
     * Sets the horizontal speed of the bottle based on the character's direction and keyboard input.
     * Adjusts the speed when the character is facing left or right.
     */
    setSpeedX() {
        if (this.character.otherDirection == false && this.keyboard.RIGHT) {
            this.speedX = 15;
        } else if (this.character.otherDirection == false) {
            this.speedX = 10;
        } else if (this.character.otherDirection && this.keyboard.LEFT) {
            this.speedX = -15;
        } else {
            this.speedX = -10;
        };
    }
}





