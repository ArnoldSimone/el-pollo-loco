/**
 * Represents a cloud object that moves from right to left in the game.
 * The cloud is animated and moves horizontally at a constant speed.
 */
class Cloud extends MovableObject {
    y = 0;
    width = 500;
    height = 350;

    constructor(image, x) {
        super().loadImage(image);
        this.x = x;
        this.animate();
    }


    /**
     * Starts the animation of the cloud, which moves the cloud to the left.
     * This method calls `moveLeft()` to initiate horizontal movement.
     */
    animate() {
        this.moveLeft();
    }


    /**
     * Moves the cloud object from right to left at a constant speed.
     * The position of the cloud is updated every 1/60th of a second.
     */
    moveLeft() {
        setInterval(() => {
            this.x = this.x - this.speed;
        }, 1000 / 60);
    }
}