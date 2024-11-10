class StatusBarBottle extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',   // Bild 0
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',  // Bild 1
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',  // Bild 2
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',  // Bild 3
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',  // Bild 4
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'  // Bild 5
    ];
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 10;
        this.width = 160;
        this.height = 45;
        this.setPercentage(100);  // Zunächst setzen wir das Bild mit 10%
    }

    // setPercentage(50); 
    setPercentage(percentage) {
        this.percentage = this.percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;  // Bild Nr. 5
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}


