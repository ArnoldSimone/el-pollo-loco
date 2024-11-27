/**
 * Represents a drawable object on the screen.
 * This class handles loading images, drawing them, and drawing frames around the object.
 * @class
 */
class DrawableObject {
    x = 120;
    y = 250;
    height = 100;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;


    /**
     * Loads an image from a specified path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
      * Loads multiple images from an array of paths into the image cache.
      * @param {string[]} arr - An array of paths to image files.
      */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Draws the image onto the canvas at the object's current position.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    }


    /**
     * Draws the frames around the object. 
     * If the object is an instance of one of the relevant classes (Character, Chicken, etc.), it draws both a blue and a red frame.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss || this instanceof Bottle || this instanceof Coin) {
            this.drawBlueFrame(ctx, this.x, this.y, this.width, this.height);
        }
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss || this instanceof Bottle || this instanceof Coin) {
            this.drawRedFrame(ctx, this.x, this.y, this.width, this.height, this.offset);
        }
    }


    /**
     * Draws a blue frame around the object.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {number} x - The x-coordinate to start drawing the frame.
     * @param {number} y - The y-coordinate to start drawing the frame.
     * @param {number} width - The width of the frame.
     * @param {number} height - The height of the frame.
     */
    drawBlueFrame(ctx, x, y, width, height) {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'blue';
        ctx.rect(x, y, width, height);
        ctx.stroke();
    }


    /**
     * Draws a red frame around the object, considering the offsets for left, top, right, and bottom.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {number} x - The x-coordinate to start drawing the frame.
     * @param {number} y - The y-coordinate to start drawing the frame.
     * @param {number} width - The width of the frame.
     * @param {number} height - The height of the frame.
     * @param {Object} offset - The offset object used to adjust the frame size and position.
     * @param {number} offset.left - The left offset to adjust the x-coordinate.
     * @param {number} offset.top - The top offset to adjust the y-coordinate.
     * @param {number} offset.right - The right offset to adjust the width.
     * @param {number} offset.bottom - The bottom offset to adjust the height.
     */
    drawRedFrame(ctx, x, y, width, height, offset) {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'red';
        ctx.rect(x + offset.left, y + offset.top, width - offset.left - offset.right, height - offset.top - offset.bottom);
        ctx.stroke();
    }
}