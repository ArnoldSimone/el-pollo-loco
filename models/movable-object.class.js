class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    bottles = 0;
    coins = 0;
    energyEndboss = 100;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;  // hier verändern wir die y-Position
                this.speedY -= this.acceleration; // hier verändern wir die Geschwindigkeit
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;  // Geworfene Objekte sind immer "in der Luft"
        } else if (this instanceof ChickenSmall) {
            // Spezielle Logik für ChickenSmall, z.B. Höhe 380 für den Boden
            return this.y < 380;  // Huhn ist in der Luft oder auf dem Boden, wenn y unter 380
        } else {
            // Allgemeine Bedingung für andere Objekte, falls nötig
            return this.y < 160;  // Standardmäßig in der Luft, wenn y unter 160
        }
    }

    // character.isCollining(chicken);
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    isJumpOfChicken(mo) {
        // Check if the character is directly above the enemy (y-Position)
        return this.x + this.width > mo.x &&
            this.x < mo.x + mo.width &&
            this.y + this.height - 60 < mo.y && // Adjust to ensure the character is above the enemy
            this.y + this.height > mo.y;  // Make sure the character is falling onto the chicken
    }

    hit() {
        if (this instanceof Endboss) {
            this.energy -= 25;
        } else {
            this.energy -= 5;
        }
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    defenseEndbossStart() {
        if (this.world) {
            return this.world.defenseStart;
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in sec
        return timepassed < 1;
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
        this.speedY = 30;
    }

}