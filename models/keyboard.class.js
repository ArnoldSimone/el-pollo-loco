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

    handleKeyEvents() {
        this.handleKeyDownEvents();
        this.handleKeyUpEvents();
    }

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


    bindBtsPressEvents() {
        let btnLeft = document.getElementById("btnLeft");
        let btnRight = document.getElementById("btnRight");
        let btnThrow = document.getElementById("btnThrow");
        let btnJump = document.getElementById("btnJump");

        if (btnLeft) {
            btnLeft.addEventListener("touchstart", (e) => {
                e.preventDefault();
                this.LEFT = true;
            });
            btnLeft.addEventListener("touchend", (e) => {
                e.preventDefault();
                this.LEFT = false;
            });
            btnLeft.addEventListener("mousedown", () => {
                this.LEFT = true;
            });
            btnLeft.addEventListener("mouseup", () => {
                this.LEFT = false;
            });
        }

        if (btnRight) {
            btnRight.addEventListener("touchstart", (e) => {
                e.preventDefault();
                this.RIGHT = true;
            });
            btnRight.addEventListener("touchend", (e) => {
                e.preventDefault();
                this.RIGHT = false;
            });
            btnRight.addEventListener("mousedown", () => {
                this.RIGHT = true;
            });
            btnRight.addEventListener("mouseup", () => {
                this.RIGHT = false;
            });
        }

        if (btnThrow) {
            btnThrow.addEventListener("touchstart", (e) => {
                e.preventDefault();
                this.D = true;
            });
            btnThrow.addEventListener("touchend", (e) => {
                e.preventDefault();
                this.D = false;
            });
            btnThrow.addEventListener("mousedown", () => {
                this.D = true;
            });
            btnThrow.addEventListener("mouseup", () => {
                this.D = false;
            });
        }

        if (btnJump) {
            btnJump.addEventListener("touchstart", (e) => {
                e.preventDefault();
                this.SPACE = true;
            });
            btnJump.addEventListener("touchend", (e) => {
                e.preventDefault();
                this.SPACE = false;
            });
            btnJump.addEventListener("mousedown", () => {
                this.SPACE = true;
            });
            btnJump.addEventListener("mouseup", () => {
                this.SPACE = false;
            });
        }
    }

}