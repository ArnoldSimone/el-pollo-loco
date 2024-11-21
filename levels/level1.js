let level1;

function initLevel1() {
    level1 = new Level(
        [
            new Endboss(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall()
        ],
        [
            new Cloud('img/5_background/layers/4_clouds/1.png', -300),
            new Cloud('img/5_background/layers/4_clouds/2.png', 200),
            new Cloud('img/5_background/layers/4_clouds/1.png', 1000),
            new Cloud('img/5_background/layers/4_clouds/2.png', 1600),
            new Cloud('img/5_background/layers/4_clouds/2.png', 2200),
            new Cloud('img/5_background/layers/4_clouds/1.png', 2800),
            new Cloud('img/5_background/layers/4_clouds/2.png', 3300)
        ],
        [
            new Coin(360, 90),
            new Coin(430, 50),
            new Coin(500, 30),
            new Coin(570, 50),
            new Coin(640, 90),
            new Coin((800 + Math.random() * 500), (50 + Math.random() * 300)),
            new Coin((800 + Math.random() * 500), (50 + Math.random() * 300)),
            new Coin((800 + Math.random() * 500), (50 + Math.random() * 300)),
            new Coin(1500, 80),
            new Coin(1550, 60),
            new Coin(1600, 50),
            new Coin(1650, 60),
            new Coin(1700, 80),
            new Coin((1900 + Math.random() * 500), (50 + Math.random() * 300)),
            new Coin((1900 + Math.random() * 500), (50 + Math.random() * 300)),
            new Coin((1900 + Math.random() * 500), (50 + Math.random() * 300))
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
        ]
    )
}

