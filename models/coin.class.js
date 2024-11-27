/**
 * Represents a coin object that can be collected in the game.
 * The coin animates by rotating between two images.
 */
class Coin extends MovableObject {
    width = 100;
    height = 100;
    offset = {
        top: 32,
        bottom: 32,
        left: 32,
        right: 32
    };
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.animate();
    }


    /**
     * Starts the animation of the coin by rotating between two images at regular intervals.
     * The animation is updated every 600 milliseconds.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 600);
    }
}