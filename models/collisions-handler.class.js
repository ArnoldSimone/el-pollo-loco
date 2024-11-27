/**
 * The CollisionHandler class is responsible for handling all collision detection
 * and response in the game world. It checks collisions between the player character,
 * throwable objects, enemies, bottles, and coins, and handles the effects of these collisions.
 */
class CollisionHandler {
    constructor(world) {
        this.world = world;
    }


    /**
     * Checks for collisions between the player character and enemies (e.g., chickens).
     * If a collision occurs, applies the effects of the collision.
     */
    checkCollisionsChicken() {
        let handleFirstContact = false;
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy) && !this.world.character.isJumpOfChicken(enemy)) {
                if (!handleFirstContact) {
                    this.applyCollisionEffect(this.world.character, enemy);
                    handleFirstContact = true;
                }
            }
        });
    }


    /**
     * Applies the effects of a collision between the character and an enemy.
     * This includes reducing the character's health, applying movement effects,
     * and triggering the collision sound.
     * @param {Character} character - The player character.
     * @param {Enemy} enemy - The enemy that collided with the character.
     */
    applyCollisionEffect(character, enemy) {
        character.hit();
        this.world.soundManager.playSound(this.world.character_hurt_sound);
        this.world.statusBarHealth.setPercentage(character.energy);
        character.speedX = -15;
        character.checkCollisionDirection(enemy);
    }


    /**
     * Checks if the character is jumping on top of a chicken and applies the jump effect,
     * which causes the chicken to die and the character to jump.
     */
    checkJumpOfChicken() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isJumpOfChicken(enemy) && this.world.character.isAboveGround() && this.world.character.speedY < 0) {
                this.world.character.speedY = 0;
                enemy.enemyIsDead();
                this.world.character.jump();
            }
        });
    }


    /**
     * Checks for collisions between throwable bottles and the ground. If a bottle hits the ground,
     * it triggers the bottle splash animation and sound, and removes the bottle after a short delay.
     */
    checkCollisionBottleAndGround() {
        this.world.throwableObjects.forEach((bottle, bottleIndex) => {
            if (bottle.y > 360) {
                bottle.speedX = 3;
                bottle.speedY = 2;
                bottle.playAnimation(bottle.IMAGES_BOTTLE_SPLASH);
                this.world.soundManager.playSound(bottle.brocken_bottle_sound);
                setTimeout(() => {
                    this.world.throwableObjects.splice(bottleIndex, 1);
                }, 300);
            }
        });
    }


    /**
     * Checks for collisions between throwable bottles and enemies (e.g., chickens or endboss).
     * Depending on the type of enemy, it applies the appropriate collision response.
     */
    checkCollisionBottleAndChicken() {
        this.world.throwableObjects.forEach((bottle, bottleIndex) => {
            this.world.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
                        this.handleBottleCollisionWithChicken(bottle, bottleIndex, enemy);
                    } else if (enemy instanceof Endboss) {
                        this.handleBottleCollisionWithEndboss(bottle, bottleIndex, enemy);
                    }
                }
            });
        });
    }


    /**
     * Handles the collision between a throwable bottle and a chicken.
     * This includes playing the splash animation, triggering sound effects,
     * and removing the bottle after a short delay.
     * @param {ThrowableObject} bottle - The thrown bottle.
     * @param {number} bottleIndex - The index of the bottle in the throwableObjects array.
     * @param {Enemy} enemy - The chicken enemy that was hit by the bottle.
     */
    handleBottleCollisionWithChicken(bottle, bottleIndex, enemy) {
        bottle.playAnimation(bottle.IMAGES_BOTTLE_SPLASH);
        this.world.soundManager.playSound(bottle.brocken_bottle_sound);
        bottle.speedX = 3;
        bottle.speedY = 3;
        enemy.enemyIsDead();
        setTimeout(() => {
            this.world.throwableObjects.splice(bottleIndex, 1);
        }, 300);
    }


    /**
     * Handles the collision between a throwable bottle and the endboss.
     * This includes applying the bottle collision effects, updating the bottle speed,
     * and removing the bottle after a short delay.
     * @param {ThrowableObject} bottle - The thrown bottle.
     * @param {number} bottleIndex - The index of the bottle in the throwableObjects array.
     * @param {Endboss} enemy - The endboss that was hit by the bottle.
     */
    handleBottleCollisionWithEndboss(bottle, bottleIndex, enemy) {
        this.playBottleCollisionEffects(bottle);
        this.updateBottleSpeed(bottle);
        this.removeBottleAfterDelay(bottleIndex);
        this.hitEndbossIfNeeded(enemy);
    }


    /**
     * Plays the bottle collision effects, including playing the splash animation and sound.
     * @param {ThrowableObject} bottle - The thrown bottle.
     */
    playBottleCollisionEffects(bottle) {
        bottle.playAnimation(bottle.IMAGES_BOTTLE_SPLASH);
        this.world.soundManager.playSound(bottle.brocken_bottle_sound);
    }


    /**
     * Updates the speed of the bottle after it collides with the endboss.
     * @param {ThrowableObject} bottle - The thrown bottle.
     */
    updateBottleSpeed(bottle) {
        bottle.speedX = 1;
        bottle.speedY = -1;
    }


    /**
     * Removes the bottle from the world after a short delay.
     * @param {number} bottleIndex - The index of the bottle in the throwableObjects array.
     */
    removeBottleAfterDelay(bottleIndex) {
        setTimeout(() => {
            this.world.throwableObjects.splice(bottleIndex, 1);
        }, 300);
    }


    /**
     * Checks if the endboss has been hit. If it has not been hit before,
     * the endboss takes damage and its health is updated.
     * @param {Endboss} enemy - The endboss that was hit by the bottle.
     */
    hitEndbossIfNeeded(enemy) {
        if (!enemy.isHurt()) {
            enemy.hit();
            this.world.statusBarEndboss.setPercentage(enemy.energy);
        }
    }


    /**
     * Checks for collisions between the character and bottles. If a collision occurs,
     * the bottle is collected and the character's bottle count is updated.
     */
    checkCollisionsBottle() {
        this.world.level.bottles.forEach((bottle, index) => {
            if (this.world.character.isColliding(bottle)) {
                this.world.level.bottles.splice(index, 1);
                this.world.soundManager.playSound(this.world.collect_bottle_sound);
                this.world.collectedBottles += 20;
                this.world.statusBarBottle.setPercentage(this.world.collectedBottles);
            }
        });
    }


    /**
     * Checks for collisions between the character and coins. If a collision occurs,
     * the coin is collected and the character's coin count is updated.
     */
    checkCollisionsCoin() {
        this.world.level.coins.forEach((coin, index) => {
            if (this.world.character.isColliding(coin)) {
                this.world.soundManager.playSound(this.world.coin_sound);
                this.world.level.coins.splice(index, 1);
                this.world.collectedCoins += 5;
                this.world.statusBarCoin.setPercentage(this.world.collectedCoins);
            }
        });
    }
}
