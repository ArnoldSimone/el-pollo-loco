class Bottle extends MovableObject {
    y = 365;
    width = 60;
    height = 60;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = -480 + Math.random() * 2300;
        this.animate();
    }


    animate() {

        setInterval(() => {
            // bottle animation
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 600);
    }

}