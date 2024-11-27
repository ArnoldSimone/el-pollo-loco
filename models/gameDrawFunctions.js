/**
 * Requests the next frame to be drawn, enabling continuous rendering.
 */
function requestNextFrame(world) {
    requestAnimationFrame(() => world.draw());
}

/**
 * Draws the endboss status bar if enabled.
 */
function drawEndbossStatus(world) {
    if (world.showEndbossStatus) {
        world.addToMap(world.statusBarEndboss);
    }
}

/**
 * Draws each layer of the game world.
 */
function drawLayers(world) {
    drawLayer(world, world.level.airObjects, 0.3);
    drawLayer(world, world.level.thirdLayerObjects, 0.6);
    drawLayer(world, world.level.secondLayerObjects, 0.8);
    drawLayer(world, world.level.firstLayerObjects, 1);
}

/**
 * Draws a specific layer of the game world with the given speed factor.
 * @param {object} world - The world object.
 * @param {Array} objects - The objects in the layer to be drawn.
 * @param {number} speed - The speed factor for parallax scrolling.
 */
function drawLayer(world, objects, speed) {
    world.ctx.translate(world.camera_x * speed, 0);
    addObjectsToMap(objects, world);
    world.ctx.translate(-world.camera_x * speed, 0);
}

/**
 * Draws all moving objects in the game world.
 */
function drawMovingObjects(world) {
    world.ctx.translate(world.camera_x, 0);
    addObjectsToMap(world.level.clouds, world);
    addObjectsToMap(world.level.bottles, world);
    addObjectsToMap(world.level.coins, world);
    addToMap(world.character, world);
    addObjectsToMap(world.level.enemies, world);
    addObjectsToMap(world.throwableObjects, world);
    world.ctx.translate(-world.camera_x, 0);
}

/**
 * Draws all status bars (health, bottle, coin).
 */
function drawStatusBars(world) {
    addToMap(world.statusBarBottle, world);
    addToMap(world.statusBarHealth, world);
    addToMap(world.statusBarCoin, world);
}

/**
 * Adds a list of objects to the canvas.
 * @param {Array} objects - The objects to be added to the canvas.
 */
function addObjectsToMap(objects, world) {
    objects.forEach(o => {
        addToMap(o, world);
    });
}

/**
 * Adds an individual object to the canvas.
 * @param {Object} mo - The object to be drawn.
 */
function addToMap(mo, world) {
    if (mo.otherDirection) {
        flipImage(mo, world);
    }
    mo.draw(world.ctx);
    // mo.drawFrame(world.ctx);
    if (mo.otherDirection) {
        flipImageBack(mo, world);
    }
}

/**
 * Flips the image horizontally for objects facing the opposite direction.
 * @param {Object} mo - The object to be flipped.
 */
function flipImage(mo, world) {
    world.ctx.save();
    world.ctx.translate(mo.width, 0);
    world.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
}

/**
 * Restores the object to its original orientation after flipping.
 * @param {Object} mo - The object to be restored.
 */
function flipImageBack(mo, world) {
    mo.x = mo.x * -1;
    world.ctx.restore();
}

export { requestNextFrame, drawEndbossStatus, drawLayers, drawLayer, drawMovingObjects, drawStatusBars, addObjectsToMap, addToMap, flipImage, flipImageBack };
