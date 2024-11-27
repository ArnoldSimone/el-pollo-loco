/**
 * Represents an object in the background of the game that can be placed at a specific position.
 * This class can be used to display various static or moving background elements.
 * The object will be loaded with an image and positioned within the game world.
 */
class BackgroundObject extends MovableObject {
    width = 721;
    height = 480;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}