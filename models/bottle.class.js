/**
 * Represents a bottle object in the game that can animate between different states (images).
 * The bottle appears on the ground and cycles through different images to simulate an animation.
 */
class Bottle extends MovableObject {
    y = 370;
    width = 30;
    height = 50;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 300 + Math.random() * 2300;
        this.animate();
    }


    /**
     * Animates the bottle by cycling through its images at regular intervals.
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 600);
    }
}