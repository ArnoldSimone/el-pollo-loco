/**
 * Represents a keyboard input handler for detecting key events and button presses.
 * This class listens for both physical key presses and touch/mouse events from HTML buttons.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    constructor() {
        this.handleKeyEvents();
    }


    /**
     * Sets up event listeners for both keydown and keyup events.
     * Calls the methods to handle keydown and keyup events respectively.
     */
    handleKeyEvents() {
        this.handleKeyDownEvents();
        this.handleKeyUpEvents();
    }


    /**
     * Sets up event listeners for the keydown events.
     * This method updates the state of various keys (LEFT, RIGHT, UP, DOWN, SPACE, D) 
     * based on the key codes when a key is pressed down.
     */
    handleKeyDownEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 39) {
                keyboard.RIGHT = true;
            }
            if (e.keyCode == 37) {
                keyboard.LEFT = true;
            }
            if (e.keyCode == 38) {
                keyboard.UP = true;
            }
            if (e.keyCode == 40) {
                keyboard.DOWN = true;
            }
            if (e.keyCode == 32) {
                keyboard.SPACE = true;
            }
            if (e.keyCode == 68) {
                keyboard.D = true;
            }
        });
    }


    /**
     * Sets up event listeners for the keyup events.
     * This method updates the state of various keys (LEFT, RIGHT, UP, DOWN, SPACE, D) 
     * based on the key codes when a key is released.
     */
    handleKeyUpEvents() {
        window.addEventListener('keyup', (e) => {
            if (e.keyCode == 39) {
                keyboard.RIGHT = false;
            }
            if (e.keyCode == 37) {
                keyboard.LEFT = false;
            }
            if (e.keyCode == 38) {
                keyboard.UP = false;
            }
            if (e.keyCode == 40) {
                keyboard.DOWN = false;
            }
            if (e.keyCode == 32) {
                keyboard.SPACE = false;
            }
            if (e.keyCode == 68) {
                keyboard.D = false;
            }
        });
    }


    /**
     * Binds touch and mouse events to HTML buttons for simulating key presses.
     * Associates each button with a specific action property (e.g., LEFT, RIGHT, SPACE, D).
     */
    bindBtsPressEvents() {
        this.addButtonEventListeners("btnLeft", "LEFT");
        this.addButtonEventListeners("btnRight", "RIGHT");
        this.addButtonEventListeners("btnThrow", "D");
        this.addButtonEventListeners("btnJump", "SPACE");
    }


    /**
     * Adds touch and mouse event listeners to an HTML button to simulate key press actions.
     * @param {string} btnId - The ID of the button element.
     * @param {string} actionProperty - The property name to be set (e.g., 'LEFT', 'RIGHT', 'D', 'SPACE') when the button is pressed or released.
     */
    addButtonEventListeners(btnId, actionProperty) {
        let btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener("touchstart", (e) => {
                e.preventDefault();
                this[actionProperty] = true;
            });
            btn.addEventListener("touchend", (e) => {
                e.preventDefault();
                this[actionProperty] = false;
            });
            btn.addEventListener("mousedown", () => {
                this[actionProperty] = true;
            });
            btn.addEventListener("mouseup", () => {
                this[actionProperty] = false;
            });
        }
    }
}