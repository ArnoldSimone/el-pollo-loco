class Level {

    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 2700;

    constructor(enemies, clouds, coins, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;

    }

}