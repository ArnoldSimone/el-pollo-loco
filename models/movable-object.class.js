/**
 * Represents a movable object in the game, extending the basic drawable object functionality.
 * It handles movement, gravity, collision detection, and health management.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    speedX = 0;
    acceleration = 2.5;
    accelerationX = 1;
    energy = 100;
    lastHit = 0;
    bottles = 0;
    coins = 0;
    energyEndboss = 100;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    collisionLeft = false;
    collisionRight = false;


    /**
     * Applies gravity to the object by updating its vertical position.
     * The object will fall if it is above the ground or if it is moving downwards.
     * This method is repeatedly called at a set interval.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                this.setCorrectGround();
            }
            if (this.isDead()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * Adjusts the position of the object to stay above the ground (if the object is a character).
     */
    setCorrectGround() {
        if (this.y > 160 && this instanceof Character) {
            this.y = 160;
        }
    }


    /**
     * Applies the hit effect to the object, adjusting the horizontal position based on collision.
     * This method is repeatedly called at a set interval.
     */
    applyHit() {
        setInterval(() => {
            if (this.isHurt() || this.speedX < 0) {
                if (this.collisionRight) {
                    this.x -= this.speedX;
                } else {
                    this.x += this.speedX;
                }
                this.speedX += this.accelerationX;
                if (this.speedX > 0) {
                    this.speedX = 0;
                }
            }
        }, 1000 / 60);
    }


    /**
     * Checks if the object is above the ground.
     * The method returns different results depending on the object type (e.g., `ThrowableObject`, `ChickenSmall`, `Endboss`).
     * @returns {boolean} `true` if the object is above the ground, `false` otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else if (this instanceof ChickenSmall) {
            return this.y < 380;
        } else if (this instanceof Endboss) {
            return this.y < 50;
        } else {
            return this.y < 160;
        }
    }


    /**
     * Checks if the current object is colliding with another object.
     * @param {Object} mo - The other object to check for collision.
     * @returns {boolean} `true` if the objects are colliding, `false` otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
     * Checks the direction of collision between the current object and another object.
     * @param {Object} mo - The other object to check for collision.
     */
    checkCollisionDirection(mo) {
        if (this.isColliding(mo)) {
            const thisCenterX = (this.x + this.width) / 2;
            const otherCenterX = (mo.x + mo.width) / 2;
            this.updateCollisionDirection(thisCenterX, otherCenterX);
        }
        return null;
    }


    /**
     * Updates the collision direction based on the center positions of the current object and the other object.
     * @param {number} thisCenterX - The x-coordinate of the center of the current object.
     * @param {number} otherCenterX - The x-coordinate of the center of the other object.
     */
    updateCollisionDirection(thisCenterX, otherCenterX) {
        if (thisCenterX < otherCenterX) {
            this.collisionLeft = true;
            this.collisionRight = false;
        } else if (thisCenterX > otherCenterX) {
            this.collisionRight = true;
            this.collisionLeft = false;
        }
    }


    /**
     * Checks if a jump event has occurred with a specific object (e.g., hitting the top of an object).
     * @param {Object} mo - The other object to check for collision with the current object's jump.
     * @returns {boolean} `true` if the object has jumped on top of another, `false` otherwise.
     */
    isJumpOfChicken(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height - 30 < mo.y &&
            this.y + this.height > mo.y;
    }


    /**
     * Handles the hit logic for the object. 
     * If the object is an Endboss, it reduces energy and updates hit status accordingly.
     */
    hit() {
        if (this instanceof Endboss && !this.isHurt()) {
            this.reduceEnergy(25);
            this.isHitByBottle = false;
            this.lastHit = new Date().getTime();
            return;
        }
        this.reduceEnergy(25);
        this.lastHit = new Date().getTime();
    }


    /**
     * Reduces the energy of the object by a specified amount.
     * Ensures the energy doesn't drop below 0.
     * @param {number} amount - The amount by which the energy will be reduced.
     */
    reduceEnergy(amount) {
        this.energy -= amount;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }


    /**
     * Checks if the object is currently hurt (i.e., if the last hit occurred less than 1 second ago).
     * @returns {boolean} `true` if the object is hurt, `false` otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * Checks if the object is dead (i.e., if its energy is 0).
     * @returns {boolean} `true` if the object is dead, `false` otherwise.
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Retrieves the defense start flag for the Endboss from the world.
     * @returns {boolean} The defense start flag from the world.
     */
    defenseEndbossStart() {
        if (this.world) {
            return this.world.defenseStart;
        }
    }


    /**
     * Plays the object's animation based on the provided images.
     * @param {Array} images - The array of image paths to use for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Moves the object to the right by its speed value.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Moves the object to the left by its speed value.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 25;
    }
}