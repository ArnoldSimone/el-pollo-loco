/**
 * Represents a level in the game, containing various game elements such as enemies,
 * clouds, background objects, coins, bottles, and the level boundaries.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 2700;
    airObjects;
    thirdLayerObjects;
    secondLayerObjects;
    firstLayerObjects;

    constructor(enemies, clouds, coins, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
        this.airObjects = backgroundObjects.air;
        this.thirdLayerObjects = backgroundObjects.thirdLayer;
        this.secondLayerObjects = backgroundObjects.secondLayer;
        this.firstLayerObjects = backgroundObjects.firstLayer;
    }
}
