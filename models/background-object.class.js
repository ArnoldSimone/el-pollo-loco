class BackgroundObject extends MovableObject {
    width = 721;
    height = 480;  // für den Himmel sollte es soch hoch sein wie das Canvas

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}