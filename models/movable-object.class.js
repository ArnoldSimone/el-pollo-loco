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


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;  // hier verändern wir die y-Position
                this.speedY -= this.acceleration; // hier verändern wir die Geschwindigkeit
            }
        }, 1000 / 25);
    }

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

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;  // Geworfene Objekte sind immer "in der Luft"
        } else if (this instanceof ChickenSmall) {
            // Spezielle Logik für ChickenSmall, z.B. Höhe 380 für den Boden
            return this.y < 380;  // Huhn ist in der Luft oder auf dem Boden, wenn y unter 380
        } else {
            // Allgemeine Bedingung für andere Objekte, falls nötig
            return this.y < 160;  //  Standardmäßig in der Luft, wenn y unter 160
        }
    }

    // character.isCollining(chicken);
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left && // 
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    checkCollisionDirection(mo) {
        let thisCenterX = (this.x + this.width) / 2;
        let otherCenterX = (mo.x + mo.width) / 2;

        if (this.isColliding(mo)) {
            if (thisCenterX < otherCenterX) {
                this.collisionLeft = true;
                this.collisionRight = false;
            }
            else if (thisCenterX > otherCenterX) {
                console.log('collision right');
                this.collisionRight = true;
                this.collisionLeft = false;
            }
        }
        return null;
    }


    isJumpOfChicken(mo) {
        // Check if the character is directly above the enemy (y-Position)
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height - 30 < mo.y && // Adjust to ensure the character is above the enemy
            this.y + this.height > mo.y;  // Make sure the character is falling onto the chicken
    }


    hit() {
        if (this instanceof Endboss && this.isHurt()) {
            this.energy -= 25;
            return; // Verhindert mehrfachen Schaden innerhalb von 1 Sekunde
        } else {
            this.energy -= 25;
        }
        if (this.energy < 0) {
            this.energy = 0;
        }
        this.lastHit = new Date().getTime();
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in sec
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    defenseEndbossStart() {
        if (this.world) {
            return this.world.defenseStart;
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 25;
    }

}