class Level {

    enemies;
    clouds;
    backgroundObjects;
    bottles;
    level_end_x = 2700;

    constructor(enemies, clouds, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;

    }

}